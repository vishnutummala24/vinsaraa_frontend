import { motion } from "framer-motion";
import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, Loader2, ChevronLeft, ChevronRight } from "lucide-react"; 
import ProductCard from "@/components/ProductCard";
import { storeService } from "@/services/api";

const AllProducts = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, priceRange, selectedSizes, sortBy]);

  const availableSizes = useMemo(() => {
    const sizes = new Set();
    allProducts.forEach(product => {
      if (product.sizes && Array.isArray(product.sizes)) {
        product.sizes.forEach((size: string) => {
          if (size) sizes.add(size);
        });
      }
    });
    return Array.from(sizes).sort();
  }, [allProducts]);

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
        break;
    }

    return filtered;
  }, [allProducts, searchQuery, sortBy, priceRange, selectedSizes]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

          <div className="mb-8 space-y-4">
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
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setShowFilters(!showFilters)} className={`flex items-center gap-2 px-4 py-3 border rounded-lg text-sm font-medium transition-all ${showFilters || hasActiveFilters ? "bg-black text-white border-black" : "bg-white hover:border-black"}`}>
                        <SlidersHorizontal className="w-4 h-4" /> Filters
                    </button>
                    
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-white border border-border px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/10 transition-all cursor-pointer"
                    >
                      <option value="newest">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="name">Name: A-Z</option>
                    </select>
                  </div>
             </div>

             {/* ✅ FILTERS UI: Fully Implemented */}
             {showFilters && (
                 <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-6 animate-in slide-in-from-top-2">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">Filter Options</h3>
                      {hasActiveFilters && (
                        <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-black underline">
                          Clear all
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Price Range Inputs */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={priceRange.min}
                                    onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:border-black"
                                />
                                <span className="text-gray-400">-</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={priceRange.max}
                                    onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                                    className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:border-black"
                                />
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-3">Sizes</label>
                            <div className="flex flex-wrap gap-2">
                                {availableSizes.map((size: any) => (
                                    <button
                                        key={size}
                                        onClick={() => toggleSize(size)}
                                        className={`px-3 py-1.5 rounded text-xs font-medium border transition-colors ${
                                            selectedSizes.includes(size)
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-gray-700 border-gray-300 hover:border-black"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                 </div>
             )}
          </div>

          {filteredProducts.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
              >
                {currentProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    id={product.slug}
                    image={product.images?.[0] || ""}
                    title={product.title}
                    price={parseFloat(product.price)}
                    originalPrice={parseFloat(product.originalPrice || 0)}
                    sizes={product.sizes || []}
                    index={index}
                  />
                ))}
              </motion.div>

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(page => Math.abs(page - currentPage) <= 1 || page === 1 || page === totalPages)
                      .map((page, i, arr) => (
                        <div key={page} className="flex items-center">
                           {i > 0 && arr[i-1] !== page - 1 && <span className="px-2 text-gray-400">...</span>}
                           <button
                            onClick={() => handlePageChange(page)}
                            className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                              currentPage === page
                                ? "bg-black text-white"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            {page}
                          </button>
                        </div>
                      ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 border rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
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