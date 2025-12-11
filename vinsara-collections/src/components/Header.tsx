import { useState, useEffect } from "react";
import { X, User, Search, ShoppingBag, Instagram, Facebook, Youtube, Linkedin, ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPinterest } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "@/assets/LOGOV.png";
import { useCart } from "@/pages/CartContext";

const promoMessages = [
  "10% OFF YOUR FIRST PURCHASE! CODE: VINSARANEW",
  "MADE WITH LOVE AND PURE FABRICS",
  "FREE SHIPPING ON ORDERS OVER $100",
  "HANDCRAFTED TRADITIONAL ARTISTRY",
  "NEW COLLECTION JUST ARRIVED"
];

const menuCategories = [
  {
    title: "PRODUCTS",
    items: [
      { name: "New Arrivals", path: "/" },
      { name: "All Products", path: "/all-products" }
    ]
  },
  {
    title: "CLOTHING",
    items: [
      { name: "Sleeved", path: "/sleeved" },
      { name: "Sleeveless", path: "/sleeveless" }
    ]
  },
];

interface HeaderProps {
  forceScrolled?: boolean;
}

const Header = ({ forceScrolled = false }: HeaderProps) => {
  const [currentPromoIndex, setCurrentPromoIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("PRODUCTS");
  const [isScrolled, setIsScrolled] = useState(forceScrolled);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartItems, cartCount, updateQuantity, removeFromCart, cartTotal } = useCart();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromoIndex((prev) => (prev + 1) % promoMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (forceScrolled) {
      setIsScrolled(true);
      return;
    }
    
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceScrolled]);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-sans">
      {/* Promo Banner */}
      <div className="bg-promo text-promo-foreground py-2 text-center text-xs md:text-sm tracking-wider overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPromoIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="font-medium"
          >
            {promoMessages[currentPromoIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Main Header */}
      <div 
        className={`transition-all duration-300 ${
          isScrolled 
            ? 'bg-background text-foreground ' 
            : 'bg-transparent text-hero-text'
        }`}
      >
        <div className="container mx-auto px-4">

          {/* Top row - Social Icons (hidden on scroll & mobile) */}
          {!isScrolled && (
            <div className="hidden lg:flex justify-end items-center gap-4 py-2 border-b border-hero-text/10">
              <a href="https://www.instagram.com/vinsaraa_official?igsh=MXFlazR1dWF1dnlydQ%3D%3D&utm_source=qr"><Instagram className="w-4 h-4" /></a>
              {/* <a href="#"><Facebook className="w-4 h-4" /></a>
              <a href="#"><Youtube className="w-4 h-4" /></a>
              <a href="#"><FaPinterest className="w-4 h-4" /></a>
              <a href="#"><Linkedin className="w-4 h-4" /></a> */}
            </div>
          )}

          {/* Bottom row */}
          <div className="flex items-center justify-between h-14 md:h-20">

            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="p-2 flex flex-col gap-1.5 hover:opacity-70"
            >
              <span className="w-6 h-0.5 bg-current"></span>
              <span className="w-4 h-0.5 bg-current"></span>
              <span className="w-6 h-0.5 bg-current"></span>
            </button>

            {/* Logo */}
            <div className="flex-1 text-center">
              <Link to="/">
                <img
  src={logo}
  alt="VINSARAA"
  className="h-12 md:h-20 mx-auto transition-all duration-300"
  style={{
    filter: isScrolled
      ? 'brightness(0) invert(1) sepia(1) saturate(10000%) hue-rotate(315deg) brightness(0.3) contrast(1.5)' // GOLD AFTER SCROLL
      : 'brightness(0) invert(1)' // PURE WHITE BEFORE SCROLL
  }}
/>

              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-2 md:gap-3">
<Link to="/user">
  <button className="p-2 hover:bg-foreground/5">
    <User className="w-5 h-5" />
  </button>
</Link>
              {/* <button className="p-2 hover:bg-foreground/5"><Search className="w-5 h-5" /></button> */}

              {/* Shopping Cart */}
              <button 
                className="relative p-2 hover:bg-foreground/5"
                onClick={toggleCart}
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 text-xs w-4 h-4 flex items-center justify-center rounded-full bg-red-500 text-white font-bold">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-hero-overlay/50 z-50"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed left-0 top-0 bottom-0 w-80 md:w-96 bg-menu text-menu-foreground z-50 overflow-y-auto"
            >
              {/* Close Button */}
              <div className="flex justify-end p-4 border-b border-menu-border">
                <button onClick={() => setIsMenuOpen(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Menu */}
              <nav className="p-6">
                {menuCategories.map((category, index) => (
                  <motion.div 
                    key={category.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="border-b border-menu-border"
                  >
                    <button
                      onClick={() => toggleCategory(category.title)}
                      className="w-full flex justify-between py-4 text-sm font-medium"
                    >
                      {category.title}
                      {expandedCategory === category.title ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedCategory === category.title && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <ul className="pb-4 space-y-2">
                            {category.items.map((item) => (
                              <li key={item.name}>
                                <Link
                                  to={item.path}
                                  className="block py-2 pl-4 text-sm"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={toggleCart}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 bottom-0 w-80 md:w-96 bg-background z-50 shadow-lg overflow-y-auto"
            >
              <div className="flex justify-between items-center p-4 border-b border-border">
                <h2 className="font-medium text-lg">Your Cart</h2>
                <button onClick={toggleCart}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 space-y-4">
                {cartItems.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Your cart is empty.</p>
                ) : (
                  cartItems.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex items-center gap-3 border-b border-border pb-3">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                        <p className="text-sm font-medium">₹{item.price}</p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-1">
                          <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="p-1 border rounded">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="p-1 border rounded">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id, item.size)} className="p-1 hover:text-red-500">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="p-4 border-t border-border">
                  <p className="text-sm font-medium mb-2">Total: ₹{cartTotal}</p>
                 <Link to="/checkout">
  <button 
    onClick={toggleCart}
    className="w-full bg-foreground text-background py-3 font-medium text-sm hover:bg-foreground/90 transition-all"
  >
    Checkout
  </button>
</Link>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;