import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Ruler, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/pages/CartContext";
import { storeService } from "@/services/api";
import Chart from "@/assets/Chart.jpeg";

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // UI State
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeChart, setShowSizeChart] = useState(false);

  // FETCH DATA
  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const data = await storeService.getProductBySlug(slug);
        setProduct(data);
        setSelectedImage(0);
        setSelectedSize(null); 
        setQuantity(1);
      } catch (err) {
        console.error("Fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  // --- DYNAMIC PRICE CALCULATION ---
  const currentPriceInfo = useMemo(() => {
    if (!product) return { price: 0, original: 0 };

    let basePrice = parseFloat(product.price);
    let original = parseFloat(product.originalPrice || 0);

    // Find the selected variant object
    if (selectedSize && product.variants) {
      const variant = product.variants.find((v: any) => v.size === selectedSize);
      if (variant && variant.additional_price) {
        const extra = parseFloat(variant.additional_price);
        basePrice += extra;
        if (original > 0) original += extra; // Apply to original price too if exists
      }
    }

    return { price: basePrice, original: original };
  }, [product, selectedSize]);

  // Format Currency
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    addToCart({
      id: product.id,
      title: product.title,
      price: currentPriceInfo.price, // Use calculated price
      image: product.images[0],
      size: selectedSize,
      quantity: quantity,
      sku: product.sku,
    });
    toast.success("Added to cart");
  };

  if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin"/></div>;
  if (!product) return <div>Product Not Found</div>;

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-32 pb-16">
      <div className="container mx-auto px-4">
        {/* ... (Keep Breadcrumb & Layout wrapper) ... */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Image Gallery (Keep existing code) */}
           <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* ... Image thumbnails and main image code ... */}
              <div className="flex-1">
                <img src={product.images[selectedImage]} className="w-full object-cover" alt={product.title} />
              </div>
           </div>

           {/* Product Info */}
           <div className="space-y-6">
              <h1 className="font-serif text-3xl">{product.title}</h1>
              
              {/* DYNAMIC PRICE DISPLAY */}
              <div className="flex items-center gap-3">
                 {currentPriceInfo.original > 0 && (
                   <span className="text-muted-foreground line-through text-lg">
                     {formatPrice(currentPriceInfo.original)}
                   </span>
                 )}
                 <span className="text-2xl font-medium">
                   {formatPrice(currentPriceInfo.price)}
                 </span>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex justify-between mb-2">
                    <span className="font-medium">SIZE</span>
                    <button onClick={() => setShowSizeChart(true)} className="text-sm underline flex items-center gap-1"><Ruler className="w-4"/> Size Chart</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {/* Map over VARIANTS now, not sizes array */}
                  {product.variants?.map((variant: any) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedSize(variant.size)}
                      className={`px-4 py-2 border transition-all ${
                        selectedSize === variant.size 
                        ? "bg-black text-white border-black" 
                        : "hover:border-black"
                      }`}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Buttons (Keep existing code) */}
              <div className="flex items-center border w-fit">
                 <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3"><Minus className="w-4"/></button>
                 <span className="px-6">{quantity}</span>
                 <button onClick={() => setQuantity(quantity + 1)} className="p-3"><Plus className="w-4"/></button>
              </div>

              <button onClick={handleAddToCart} className="w-full bg-[#440504] text-white py-4 tracking-widest hover:opacity-90">
                  ADD TO CART
              </button>
              
              {/* Description */}
              <div className="pt-4 border-t text-sm text-gray-600 space-y-2">
                  <p>{product.description}</p>
                  <p><strong>Fabric:</strong> {product.fabric}</p>
                  <p><strong>Wash Care:</strong> {product.washCare}</p>
              </div>
           </div>
        </div>
      </div>
      {/* ... (Keep SizeChart Modal) ... */}
    </div>
  );
};

export default ProductDetail;