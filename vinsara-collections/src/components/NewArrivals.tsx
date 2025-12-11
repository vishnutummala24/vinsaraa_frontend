import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { getNewArrivals } from "@/data/products";

const NewArrivals = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true
  });

  const newArrivalsProducts = getNewArrivals();

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <h2 className="text-2xl mb-6 font-light tracking-[0.3em] text-[#440504]">New Arrivals</h2>
          <Link
  to="/all-products"
  className="view-all-btn inline-block hover:bg-[#440504] hover:text-white"
>
  View All
</Link>

        </motion.div>

        {/* Desktop Grid - Hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {newArrivalsProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.images[0]}
              title={product.title}
              price={product.price}
              sizes={product.sizes}
              index={index}
            />
          ))}
        </div>

        {/* Mobile Carousel - Visible only on mobile */}
        <div className="md:hidden relative">
          {/* Carousel Navigation */}
          {/* <button
            onClick={scrollPrev}
            className="absolute -left-2 top-1/3 z-10 p-2 bg-background/80 shadow-md backdrop-blur-sm hover:bg-background transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button> */}
          {/* <button
            onClick={scrollNext}
            className="absolute -right-2 top-1/3 z-10 p-2 bg-background/80 shadow-md backdrop-blur-sm hover:bg-background transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button> */}

          {/* Embla Carousel */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {newArrivalsProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex-[0_0_75%] min-w-0"
                >
                  <ProductCard
                    id={product.id}
                    image={product.images[0]}
                    title={product.title}
                    price={product.price}
                    sizes={product.sizes}
                    index={index}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Swipe Indicator */}
          {/* <p className="text-center text-xs text-muted-foreground mt-4 tracking-wider">
            SWIPE TO EXPLORE →
          </p> */}
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;