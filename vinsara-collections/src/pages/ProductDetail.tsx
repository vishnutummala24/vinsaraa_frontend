import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Minus, Plus, Ruler, X } from "lucide-react";

import { getProductById, allProducts as products } from "@/data/allProducts";
import ProductCard from "@/components/ProductCard";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/pages/CartContext";
import Chart from "@/assets/Chart.jpeg";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || "");
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [showSizeChart, setShowSizeChart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="pt-32 text-center">
          <h1 className="text-2xl font-serif">Product not found</h1>
          <button
            onClick={() => navigate("/")}
            className="mt-4 text-primary underline"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(price);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose a size before adding to cart",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: quantity,
      sku: product.sku,
    });

    toast({
      title: "Added to cart",
      description: `${product.title} (${selectedSize}) x ${quantity}`,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        description: "Choose a size before proceeding",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      quantity: quantity,
      sku: product.sku,
    });

    toast({
      title: "Proceeding to checkout",
      description: "Redirecting to payment...",
    });

    navigate("/checkout");
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  // Size chart image URL - replace with your actual size chart image
  const sizeChartImage = "https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=800&q=80";

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-muted-foreground mb-6"
          >
            <span
              onClick={() => navigate("/")}
              className="hover:text-foreground cursor-pointer"
            >
              Home
            </span>
            <span className="mx-2">/</span>
            <span
              onClick={() => navigate("/all-products")}
              className="hover:text-foreground cursor-pointer"
            >
              Products
            </span>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.title}</span>
          </motion.nav>

          {/* Product Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col-reverse md:flex-row gap-4"
            >
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-24 md:w-24 md:h-28 border-2 transition-all overflow-hidden ${
                      selectedImage === index
                        ? "border-foreground"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 relative overflow-hidden bg-secondary">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage]}
                    alt={product.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-[400px] md:h-[600px] object-cover"
                  />
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              {/* Title & SKU */}
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-normal tracking-wide text-foreground mb-2">
                  {product.title}
                </h1>
                <p className="text-sm text-muted-foreground tracking-wider">
                  {product.sku}
                </p>
              </div>

              {/* Price */}
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  {product.originalPrice && (
                    <span className="text-muted-foreground line-through text-lg">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-2xl font-medium text-foreground">
                    {formatPrice(product.price)}
                  </span>
                  {discount > 0 && (
                    <span className="text-sm font-medium text-green-600">
                      Save {discount}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Inclusive of all Taxes.
                </p>
              </div>

              {/* Size Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium tracking-wider text-foreground">
                    SIZE
                  </span>
                  <button 
                    onClick={() => setShowSizeChart(true)}
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Ruler className="w-4 h-4" />
                    <span className="underline">Size Chart</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] px-4 py-2.5 text-sm font-medium border transition-all ${
                        selectedSize === size
                          ? "border-foreground bg-foreground text-background"
                          : "border-border hover:border-foreground text-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <span className="text-sm font-medium tracking-wider text-foreground">
                  QUANTITY
                </span>
                <div className="flex items-center border border-border w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-2 text-center min-w-[60px] font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 border-2 border-foreground text-foreground py-4 text-sm font-medium tracking-[0.2em] hover:bg-[#440504] hover:text-background transition-all"
                >
                  ADD TO CART
                </button>

                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-[#440504] text-accent-foreground py-4 text-sm font-medium tracking-[0.2em] hover:bg-[#b5b2b1] transition-all"
                >
                  BUY IT NOW
                </button>
              </div>

              {/* Product Details */}
              <div className="space-y-2 pt-4 border-t border-border">
                <ul className="space-y-2 text-sm text-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>
                      <strong>Fabric:</strong> {product.fabric}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>
                      <strong>Color:</strong> {product.color}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span>
                      <strong>Wash care:</strong> {product.washCare}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Shipping Info */}
              <div className="space-y-2 pt-4 border-t border-border">
                <h3 className="text-sm font-semibold text-foreground">
                  Shipping Info
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>This product cannot be returned or exchanged</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>To be shipped in 5-7 working days</span>
                  </li>
                </ul>
              </div>

              {/* Accordions */}
              <div className="space-y-0 border-t border-border">
                {/* Disclaimer */}
                <div className="border-b border-border">
                  <button
                    onClick={() => toggleAccordion("disclaimer")}
                    className="w-full flex items-center justify-between py-4 text-sm font-medium tracking-wider hover:text-muted-foreground transition-colors"
                  >
                    DISCLAIMER
                    {openAccordion === "disclaimer" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openAccordion === "disclaimer" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 text-sm text-muted-foreground leading-relaxed">
                          Product color may slightly vary due to photographic
                          lighting or your device settings. The product is
                          handcrafted and may have slight variations which add
                          to its uniqueness.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Manufacturer Info */}
                <div className="border-b border-border">
                  <button
                    onClick={() => toggleAccordion("manufacturer")}
                    className="w-full flex items-center justify-between py-4 text-sm font-medium tracking-wider hover:text-muted-foreground transition-colors"
                  >
                    MANUFACTURER INFO
                    {openAccordion === "manufacturer" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openAccordion === "manufacturer" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 text-sm text-muted-foreground leading-relaxed space-y-2">
                          <p>
                            <strong>Manufactured by:</strong> VINSARAA 
                            
                          </p>
                          <p>
                            <strong>Address:</strong> AndhraPradesh
                            
                          </p>
                          <p>
                            <strong>Country of Origin:</strong> India
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-16 md:mt-24"
            >
              <h2 className="text-xl md:text-2xl font-light tracking-[0.2em] text-center mb-10">
                You May Also Like
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {relatedProducts.map((relProduct, index) => (
                  <ProductCard
                    key={relProduct.id}
                    id={relProduct.id}
                    image={relProduct.images[0]}
                    title={relProduct.title}
                    price={relProduct.price}
                    sizes={relProduct.sizes}
                    index={index}
                  />
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>

      {/* Size Chart Modal */}
      <AnimatePresence>
        {showSizeChart && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSizeChart(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="w-full max-w-4xl max-h-[90vh] bg-background rounded-lg shadow-2xl flex flex-col pointer-events-auto"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-4 md:p-6 border-b border-border flex-shrink-0">
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif tracking-wide">Size Chart</h2>
                    <p className="text-sm text-muted-foreground mt-1">Find your perfect fit</p>
                  </div>
                  <button
                    onClick={() => setShowSizeChart(false)}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                    aria-label="Close size chart"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Image Container */}
                <div className="flex-1 overflow-auto p-4 md:p-6">
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={Chart}
                      alt="Size Chart"
                      className="max-w-full max-h-full object-contain rounded-lg shadow-md"
                    />
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 md:p-6 border-t border-border bg-muted/30 flex-shrink-0">
                  <p className="text-xs md:text-sm text-muted-foreground text-center">
                    All measurements are in inches. For any queries, please contact our customer support.
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetail;