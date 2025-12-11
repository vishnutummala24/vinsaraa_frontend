import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/data/products";

const AllProducts = () => {
  const allProducts = getAllProducts();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedSizes, setSelectedSizes] = useState([]);

  // Get unique sizes from all products
  const availableSizes = useMemo(() => {
    const sizes = new Set();
    allProducts.forEach(product => {
      if (product.sizes && Array.isArray(product.sizes)) {
        product.sizes.forEach(size => {
          if (size) sizes.add(String(size));
        });
      }
    });
    return Array.from(sizes).sort();
  }, [allProducts]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query)
      );
    }

    // Price range filter
    if (priceRange.min) {
      filtered = filtered.filter(product => product.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      filtered = filtered.filter(product => product.price <= Number(priceRange.max));
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes?.some(size => selectedSizes.includes(size))
      );
    }

    // Sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [allProducts, searchQuery, sortBy, priceRange, selectedSizes]);

  const toggleSize = (size) => {
    setSelectedSizes(prev =>
      prev.includes(size)
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setPriceRange({ min: "", max: "" });
    setSelectedSizes([]);
    setSortBy("newest");
  };

  const hasActiveFilters = searchQuery || priceRange.min || priceRange.max || selectedSizes.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <main className="pt-24 md:pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
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
              Explore our complete collection of handcrafted ethnic wear, where tradition meets contemporary elegance.
            </p>
          </motion.div>

          {/* Search and Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="mb-8 space-y-4"
          >
            {/* Search and Actions Row */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Filter Toggle and Sort */}
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-3 border rounded-lg text-sm font-medium transition-all ${
                    showFilters || hasActiveFilters
                      ? "bg-foreground text-background border-foreground"
                      : "bg-background border-border hover:border-foreground"
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
                  {hasActiveFilters && (
                    <span className="bg-background text-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {(selectedSizes.length > 0 ? 1 : 0) + 
                       (priceRange.min || priceRange.max ? 1 : 0)}
                    </span>
                  )}
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-background border border-border px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all cursor-pointer"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A-Z</option>
                </select>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-muted/30 border border-border rounded-lg p-6 space-y-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-foreground">Filter Options</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Price Range */}
                  <div className="w-full">
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Price Range
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <input
                        type="number"
                        placeholder="Min Price"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                        className="w-full sm:flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                      />
                      <span className="hidden sm:block text-muted-foreground text-center">—</span>
                      <input
                        type="number"
                        placeholder="Max Price"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                        className="w-full sm:flex-1 px-4 py-2.5 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Size Filter */}
                  <div className="w-full">
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Available Sizes
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map((size, idx) => (
                        <button
                          key={`size-${idx}-${size}`}
                          onClick={() => toggleSize(size)}
                          className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                            selectedSizes.includes(size)
                              ? "bg-foreground text-background"
                              : "bg-background border border-border hover:border-foreground"
                          }`}
                        >
                          {String(size)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Results Info */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Showing <span className="text-foreground font-medium">{filteredProducts.length}</span> of{" "}
                <span className="text-foreground font-medium">{allProducts.length}</span> products
              </p>
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-foreground/10 rounded-full text-xs">
                      Search: {searchQuery}
                      <button onClick={() => setSearchQuery("")} className="hover:text-foreground">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {selectedSizes.length > 0 && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-foreground/10 rounded-full text-xs">
                      Sizes: {selectedSizes.join(", ")}
                      <button onClick={() => setSelectedSizes([])} className="hover:text-foreground">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {(priceRange.min || priceRange.max) && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-foreground/10 rounded-full text-xs">
                      Price: {priceRange.min || "0"} - {priceRange.max || "∞"}
                      <button onClick={() => setPriceRange({ min: "", max: "" })} className="hover:text-foreground">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>

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
                  key={`product-${product.id}-${index}`}
                  id={product.id}
                  image={product.images?.[0]}
                  title={product.title}
                  price={product.price}
                  sizes={product.sizes || []}
                  index={index}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <p className="text-muted-foreground text-lg mb-4">No products found</p>
              <button
                onClick={clearFilters}
                className="text-sm text-foreground hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AllProducts;