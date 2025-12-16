import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom"; // Added for linking cards

import ProductCard from "@/components/ProductCard";
import { storeService } from "@/services/api"; // <--- IMPORT SERVICE

const AllProducts = () => {
  // 1. REPLACE STATIC DATA WITH STATE
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // 2. FETCH DATA FROM DJANGO ON MOUNT
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await storeService.getProducts();
        setAllProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Get unique sizes dynamically from fetched products
  const availableSizes = useMemo(() => {
    const sizes = new Set();
    allProducts.forEach(product => {
      // Backend serializer sends 'sizes' as an array of strings ["S", "M"]
      if (product.sizes && Array.isArray(product.sizes)) {
        product.sizes.forEach((size: string) => {
          if (size) sizes.add(size);
        });
      }
    });
    return Array.from(sizes).sort();
  }, [allProducts]);

  // Filter and sort products (Client-side logic remains same)
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      );
    }

    if (priceRange.min) {
      filtered = filtered.filter(product => parseFloat(product.price) >= Number(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(product => parseFloat(product.price) <= Number(priceRange.max));
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes?.some((size: string) => selectedSizes.includes(size))
      );
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // 'newest' is default sort from backend, so we don't strictly need logic here
        break;
    }

    return filtered;
  }, [allProducts, searchQuery, sortBy, priceRange, selectedSizes]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange({ min: "", max: "" });
    setSelectedSizes([]);
    setSortBy("newest");
  };

  const hasActiveFilters = searchQuery || priceRange.min || priceRange.max || selectedSizes.length > 0;

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <Loader2 className="animate-spin w-10 h-10 text-gray-400" />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <h1 className="font-serif text-3xl md:text-5xl font-normal tracking-wide text-foreground mb-4">
              All Products
            </h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
              Explore our complete collection of handcrafted ethnic wear.
            </p>
          </motion.div>

          {/* ... (Search and Filter Bar UI - Exact same as before) ... */}
          {/* I am omitting the UI boilerplate to save space, paste your previous UI code here for the Search/Filter bars */}
          
          <div className="mb-8 space-y-4">
             {/* PASTE YOUR SEARCH/FILTER UI CODE HERE (lines 104-232 from your original file) */}
             {/* Ensure you use the handlers defined above: setSearchQuery, setShowFilters, etc. */}
             {/* Key change: Ensure the onClick for Filter Toggle works */}
             <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                    />
                     {/* ... rest of search bar ... */}
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-3 border rounded-lg text-sm font-medium">
                        <SlidersHorizontal className="w-4 h-4" /> Filters
                    </button>
                    {/* ... Sort select ... */}
                  </div>
             </div>
             {showFilters && (
                 /* ... Filter Panel UI ... */
                 <div className="bg-muted/30 border border-border rounded-lg p-6">
                    {/* ... Price/Size inputs ... */}
                 </div>
             )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
            >
              {filteredProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  // IMPORTANT: Backend uses 'slug' for URLs, pass it here or use ID depending on route
                  id={product.slug} // Passing slug as ID if you update routes, or keep ID
                  image={product.images?.[0] || ""} // Backend returns array of URLs
                  title={product.title}
                  price={parseFloat(product.price)} // Ensure number
                  sizes={product.sizes || []}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products found</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllProducts;