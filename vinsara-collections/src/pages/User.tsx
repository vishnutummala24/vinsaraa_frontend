import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, MapPin, LogOut, ArrowLeft, Loader2, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { orderService } from "@/services/api";

interface OrderItem {
  id: number;
  product_name: string;
  variant_label: string;
  price: string;
  quantity: number;
}

interface Order {
  id: number;
  total_amount: string;
  payment_status: string;
  order_status: string;
  created_at: string;
  shipping_address: string;
  phone: string;
  items: OrderItem[];
}
const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses'>('orders');
  
  // Data State
  const [addresses, setAddresses] = useState<any[]>([]); 
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  // --- SECURITY CHECK ---
  // If user is not logged in, force them to Login Page
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
        // Not logged in? Go to Login
        navigate("/login");
    }
  }, [navigate]);
  // --- FETCH ORDERS ---

   useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoadingOrders(true);
        const data = await orderService.getUserOrders();
        setOrders(Array.isArray(data) ? data : data.results || []);
      } catch (error: any) {
        console.error("Failed to load orders", error);
        toast.error("Could not load orders");
        setOrders([]);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

    const handleLogout = () => {
    localStorage.removeItem("userToken");
    // ✅ CLEAR CART ON LOGOUT
    localStorage.removeItem('cart');
    toast.success("Logged out successfully");
    navigate("/login"); 
    };
    const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };
  const getStatusColor = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'paid' || s === 'delivered') return 'bg-green-100 text-green-700';
    if (s === 'shipped') return 'bg-blue-100 text-blue-700';
    if (s === 'pending') return 'bg-yellow-100 text-yellow-700';
    if (s === 'cancelled') return 'bg-red-100 text-red-700';
    return 'bg-gray-100 text-gray-700';
  };


  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        {/* Back Button */}
        <button 
            onClick={() => navigate("/")} 
            className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 transition-colors"
        >
            <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b pb-6">
            <div>
                <h1 className="text-3xl font-serif text-gray-900">My Account</h1>
                <p className="text-gray-500 mt-1">Manage your orders and details</p>
            </div>
            <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium mt-4 md:mt-0">
                <LogOut className="w-4 h-4" /> Logout
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* Sidebar Navigation */}
            <div className="bg-white p-4 rounded-xl shadow-sm h-fit">
                <button 
                    onClick={() => setActiveTab('orders')} 
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left mb-2 transition-all ${activeTab === 'orders' ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                    <Package className="w-5 h-5" /> Orders
                </button>
                <button 
                    onClick={() => setActiveTab('addresses')} 
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all ${activeTab === 'addresses' ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-700'}`}
                >
                    <MapPin className="w-5 h-5" /> Addresses
                </button>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3">
                
                {/* --- ORDERS TAB --- */}
                {activeTab === 'orders' && (
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Order History</h2>
                    
                    {loadingOrders ? (
                      <div className="flex justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="text-center py-12 bg-white rounded-xl border border-dashed">
                        <p className="text-gray-500">No orders found yet.</p>
                        <button 
                          onClick={() => navigate("/all-products")} 
                          className="text-black underline mt-2 font-medium hover:no-underline"
                        >
                          Start Shopping
                        </button>
                      </div>
                ) : (
                orders.map((order) => (
                <div key={order.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    
                    {/* Order Header */}
                    <div 
                    className="p-4 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                    >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        
                        <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(order.payment_status)}`}>
                            {order.payment_status}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(order.order_status)}`}>
                            {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                            </span>
                        </div>
                        <p className="text-sm text-gray-500">{formatDate(order.created_at)}</p>
                        </div>
                        <div className="flex items-center justify-between md:flex-col md:items-end gap-4">
                                <div>
                                  <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                                  <p className="text-xl font-bold">
                                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(parseFloat(order.total_amount))}
                                  </p>
                                </div>
                                <ChevronDown 
                                  className={`w-5 h-5 text-gray-400 transition-transform ${expandedOrderId === order.id ? 'rotate-180' : ''}`}
                                />
                              </div>
                            </div>
                          </div>
                          {/* Expanded Details */}
                          {expandedOrderId === order.id && (
                            <div className="border-t border-gray-200 bg-gray-50">
                              
                              {/* Order Items */}
                              <div className="p-4 md:p-6 border-b border-gray-200">
                                <h4 className="font-semibold mb-4 text-sm">Items ({order.items.length})</h4>
                                <div className="space-y-3">
                                  {order.items.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start bg-white p-3 rounded-md border border-gray-100">
                                      <div className="flex-1">
                                        <p className="font-medium text-sm">{item.product_name}</p>
                                        <p className="text-xs text-gray-500 mt-1">{item.variant_label}</p>
                                        <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                                      </div>
                                      <p className="font-semibold text-sm whitespace-nowrap ml-2">
                                        {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(parseFloat(item.price) * item.quantity)}
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              {/* Shipping Address */}
                              <div className="p-4 md:p-6">
                                <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
                                  <MapPin className="w-4 h-4" /> Shipping Address
                                </h4>
                                <div className="bg-white p-3 rounded-md border border-gray-100 text-sm">
                                  <p className="text-gray-700 whitespace-pre-wrap">{order.shipping_address}</p>
                                  <p className="text-gray-500 mt-2">Phone: {order.phone}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
                {/* --- ADDRESSES TAB --- */}
                {activeTab === 'addresses' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Saved Addresses</h2>
                    </div>

                    {addresses.length === 0 ? (
                      <div className="text-center py-12 bg-white rounded-xl border border-dashed">
                        <p className="text-gray-500">No addresses saved.</p>
                        <p className="text-xs text-gray-400 mt-1">Add them at checkout.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {addresses.map((addr, idx) => (
                          <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200">
                            {/* Address content */}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

