import { useState } from "react";
import { useCart } from "@/pages/CartContext";
import { ChevronDown, Info } from "lucide-react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();
  const [emailOffers, setEmailOffers] = useState(false);
  const [saveInfo, setSaveInfo] = useState(false);
  const [billingAddress, setBillingAddress] = useState("same");
  const [discountCode, setDiscountCode] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    state: "Telangana",
    pinCode: "",
    phone: "",
    country: "India"
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    console.log("Order submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-8 sm:pb-12">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Back to Home Button */}
        <div className="flex justify-end mb-4 sm:mb-6">
          <Link to="/">
            <button className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-2.5 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium shadow-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Back to Home</span>
            </button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          
          {/* Left Side - Form */}
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-lg border border-gray-200">
            <div className="space-y-6 sm:space-y-8">
              
              {/* Contact Section */}
              <div>
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold">Contact</h2>
                  <Link to="/user">
                    <button
                      type="button"
                      className="text-xs sm:text-sm text-blue-600 hover:underline"
                    >
                      Sign in
                    </button>
                  </Link>
                </div>
                
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Delivery Section */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Delivery</h2>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
                      style={{ WebkitAppearance: 'menulist', MozAppearance: 'menulist' }}
                    >
                      <option value="India">India</option>
                      <option value="United States">United States</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                    </select>
                    <label className="absolute -top-2 left-2 sm:left-3 px-1 bg-white text-xs text-gray-600">
                      Country/Region
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />

                  <input
                    type="text"
                    name="apartment"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent col-span-2 sm:col-span-1"
                      required
                    />
                    <div className="relative">
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-2 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer"
                        style={{ WebkitAppearance: 'menulist', MozAppearance: 'menulist' }}
                      >
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Puducherry">Puducherry</option>
                      </select>
                    </div>
                    <input
                      type="text"
                      name="pinCode"
                      placeholder="PIN code"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <Info className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                  </div>

                  <label className="flex items-start sm:items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={saveInfo}
                      onChange={(e) => setSaveInfo(e.target.checked)}
                      className="w-4 h-4 mt-0.5 sm:mt-0 text-blue-600 border-gray-300 rounded focus:ring-blue-500 flex-shrink-0"
                    />
                    <span className="ml-2 text-xs sm:text-sm text-gray-600">Save this information for next time</span>
                  </label>
                </div>
              </div>

              {/* Shipping Method */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Shipping method</h2>
                <div className="bg-gray-50 border border-gray-300 rounded-md p-3 sm:p-4 text-xs sm:text-sm text-gray-600 text-center">
                  Enter your shipping address to view available shipping methods.
                </div>
              </div>

              {/* Payment Section */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold mb-2">Payment</h2>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">All transactions are secure and encrypted.</p>
                
                <div className="border border-gray-300 rounded-md">
                  <div className="p-3 sm:p-4 bg-blue-50 border-b border-gray-300">
                    <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-3">
                      <span className="text-xs sm:text-sm font-medium">Razorpay Secure (UPI, Cards, Wallets)</span>
                      <div className="flex gap-1.5 sm:gap-2 items-center flex-wrap">
                        <div className="h-6 w-10 sm:h-7 sm:w-12 bg-white rounded border border-gray-200 flex items-center justify-center">
                          <svg className="h-4 w-8 sm:h-5 sm:w-10" viewBox="0 0 40 16" fill="none">
                            <circle cx="8" cy="8" r="7" fill="#097939" opacity="0.8"/>
                            <circle cx="20" cy="8" r="7" fill="#F37F20" opacity="0.8"/>
                            <circle cx="32" cy="8" r="7" fill="#5F259F" opacity="0.8"/>
                          </svg>
                        </div>
                        <div className="h-6 w-10 sm:h-7 sm:w-12 bg-white rounded border border-gray-200 flex items-center justify-center">
                          <svg className="h-3.5 w-8 sm:h-4 sm:w-10" viewBox="0 0 40 13" fill="none">
                            <path d="M16.5 1L13 12h3l3.5-11h-3z" fill="#1434CB"/>
                            <path d="M8.5 1L5 12h3l3.5-11h-3z" fill="#1434CB"/>
                          </svg>
                        </div>
                        <div className="h-6 w-10 sm:h-7 sm:w-12 bg-white rounded border border-gray-200 flex items-center justify-center">
                          <svg className="h-4 w-7 sm:h-5 sm:w-9" viewBox="0 0 36 22" fill="none">
                            <circle cx="13" cy="11" r="10" fill="#EB001B"/>
                            <circle cx="23" cy="11" r="10" fill="#F79E1B"/>
                          </svg>
                        </div>
                        <span className="text-[10px] sm:text-xs bg-gray-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-medium text-gray-700">+15</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 sm:p-6 text-center bg-white">
                    <div className="mb-3 sm:mb-4">
                      <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <rect x="3" y="8" width="18" height="12" rx="2" strokeWidth="2"/>
                        <path d="M3 10h18M7 15h6" strokeWidth="2"/>
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      After clicking "Pay now", you will be redirected to Razorpay Secure to complete your purchase securely.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gray-900 text-white py-3 sm:py-4 rounded-md font-medium hover:bg-gray-800 transition-colors text-base sm:text-lg"
              >
                Pay now
              </button>
            </div>
          </div>

          {/* Right Side - Order Summary */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl shadow-lg border border-gray-200 space-y-4 sm:space-y-6">
              
              {/* Cart Items */}
              <div className="space-y-3 sm:space-y-4">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-3 sm:gap-4">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-md border border-gray-200"
                      />
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-gray-600 text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.size}</p>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold whitespace-nowrap">₹{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Discount code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button 
                  type="button"
                  className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium transition-colors whitespace-nowrap"
                >
                  Apply
                </button>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-3 sm:pt-4 space-y-2 sm:space-y-3">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm items-center">
                  <div className="flex items-center gap-1">
                    <span>Shipping</span>
                    <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                  </div>
                  <span className="text-gray-500 text-[10px] sm:text-xs">Enter shipping address</span>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-3 sm:pt-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-base sm:text-lg font-semibold">Total</span>
                  <div className="text-right">
                    <span className="text-[10px] sm:text-xs text-gray-500 mr-1 sm:mr-2">INR</span>
                    <span className="text-xl sm:text-2xl font-bold">₹{cartTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;