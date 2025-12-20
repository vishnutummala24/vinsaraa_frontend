import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  originalPrice?: number; // ✅ Added optional original price
  sizes: string[];
  index?: number;
}

const ProductCard = ({ id, image, title, price, originalPrice = 0, sizes, index = 0 }: ProductCardProps) => {
  
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Calculate discount percentage
  const discount = originalPrice > price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      <Link to={`/product/${id}`}>
        {/* Image Container */}
        <div className="relative overflow-hidden bg-product-card aspect-[2/3]">
          <img
            src={image}
            alt={title}
            className="product-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* ✅ Discount Badge on Image (Top Right) */}
          {discount > 0 && (
            <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider z-10">
              -{discount}%
            </div>
          )}

          {/* Size Badges - Positioned at bottom of image */}
          {/* Added opacity transition so they appear on hover */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {sizes.map((size) => (
              <span
                key={size}
                className="bg-white/90 backdrop-blur-sm text-black text-[10px] font-medium px-2 py-1 shadow-sm"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 text-center">
          <h3 className="font-sans text-sm md:text-base font-normal tracking-wide text-product-title leading-relaxed mb-1 line-clamp-1 group-hover:text-black transition-colors">
            {title}
          </h3>
          
          {/* ✅ UPDATED PRICE SECTION */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {/* Original Price (Strikethrough) */}
            {originalPrice > price && (
              <span className="text-xs text-gray-400 line-through decoration-gray-400">
                {formatPrice(originalPrice)}
              </span>
            )}

            {/* Current Price (Highlighted) */}
            <span className="font-sans text-base md:text-lg font-bold text-gray-900">
              {formatPrice(price)}
            </span>

            {/* Discount Text (Green) */}
            {discount > 0 && (
              <span className="text-xs font-bold text-green-600">
                {discount}% OFF
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;