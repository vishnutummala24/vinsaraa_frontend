import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  price: number;
  sizes: string[];
  index?: number;
}

const ProductCard = ({ id, image, title, price, sizes, index = 0 }: ProductCardProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(price);
  };

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
          
          {/* Size Badges - Positioned at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 p-3">
            {sizes.map((size) => (
              <span
                key={size}
                className="size-badge"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="mt-4 text-center">
          <h3 className="font-sans text-sm md:text-base font-normal tracking-wide text-product-title leading-relaxed mb-2">
            {title}
          </h3>
          <p className="font-sans text-sm font-medium text-product-price">
            {formatPrice(price)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;