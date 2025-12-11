import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Package, MapPin, LogOut, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const UserProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses'>('orders');
  
  // Data State
  const [addresses, setAddresses] = useState<any[]>([]); 
  const [orders, setOrders] = useState<any[]>([]);

  // --- SECURITY CHECK ---
  // If user is not logged in, force them to Login Page
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
        // Not logged in? Go to Login
        navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    // 1. Remove the fake token
    localStorage.removeItem("userToken");
    // 2. Notify user
    toast.success("Logged out successfully");
    // 3. Redirect to Login Page (as requested: default page for non-logged users)
    navigate("/login"); 
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
                        {orders.length === 0 ? (
                            <div className="text-center py-12 bg-white rounded-xl border border-dashed">
                                <p className="text-gray-500">No orders found yet.</p>
                                <button onClick={() => navigate("/all-products")} className="text-black underline mt-2 font-medium">Start Shopping</button>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div key={order.id}>{/* Order Item Code */}</div>
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
                             // Address List Code placeholder
                             <div></div>
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