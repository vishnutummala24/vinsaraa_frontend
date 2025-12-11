import { useState, useMemo } from "react";
import { SlidersHorizontal, ChevronDown, Search, X } from "lucide-react";

import { getProductsByCategory } from "@/data/allProducts";
import ProductCard from "@/components/ProductCard";

const sortOptions = [
  "Date, new to old",
  "Date, old to new",
  "Price, low to high",
  "Price, high to low",
  "Alphabetically, A-Z",
  "Alphabetically, Z-A",
];

const Sleeveless = () => {
  const products = getProductsByCategory("sleeveless");
  const [sortBy, setSortBy] = useState("Date, new to old");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedSizes, setSelectedSizes] = useState([]);

  // Get unique sizes from all products
  const availableSizes = useMemo(() => {
    const sizes = new Set();
    products.forEach(product => {
      if (product.sizes && Array.isArray(product.sizes)) {
        product.sizes.forEach(size => {
          if (size) sizes.add(String(size));
        });
      }
    });
    return Array.from(sizes).sort();
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(query)
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
        product.sizes?.some(size => selectedSizes.includes(String(size)))
      );
    }

    // Sorting
    switch (sortBy) {
      case "Price, low to high":
        return filtered.sort((a, b) => a.price - b.price);
      case "Price, high to low":
        return filtered.sort((a, b) => b.price - a.price);
      case "Alphabetically, A-Z":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      case "Alphabetically, Z-A":
        return filtered.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return filtered;
    }
  }, [products, searchQuery, sortBy, priceRange, selectedSizes]);

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
  };

  const hasActiveFilters = searchQuery || priceRange.min || priceRange.max || selectedSizes.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Page Title */}
      <div className="text-center py-10 md:py-14 mt-6">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-[0.2em] text-foreground">
          Sleeveless
        </h1>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 pb-6">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-12 py-3 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Filter Button and Product Count */}
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className={`flex items-center gap-2 px-4 py-2.5 border transition-all ${
                showFilter || hasActiveFilters
                  ? "bg-foreground text-background border-foreground"
                  : "border-border hover:border-foreground"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm tracking-wide">Filter</span>
              {hasActiveFilters && (
                <span className="bg-background text-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                  {(selectedSizes.length > 0 ? 1 : 0) + 
                   (priceRange.min || priceRange.max ? 1 : 0)}
                </span>
              )}
            </button>

            <span className="text-sm text-muted-foreground tracking-wide">
              {filteredAndSortedProducts.length} of {products.length} products
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 border border-border hover:border-foreground transition-colors sm:min-w-[200px] justify-between"
            >
              <span className="text-sm tracking-wide">{sortBy}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showSortDropdown ? "rotate-180" : ""
                }`}
              />
            </button>

            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-1 bg-background border border-border shadow-lg z-20 w-full sm:min-w-[200px]">
                {sortOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSortBy(option);
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm tracking-wide hover:bg-secondary transition-colors ${
                      sortBy === option ? "bg-secondary" : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Active Filters Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-border">
            <span className="text-xs text-muted-foreground">Active filters:</span>
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
            <button
              onClick={clearFilters}
              className="text-xs text-muted-foreground hover:text-foreground underline ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Filter Panel */}
        {showFilter && (
          <div className="mt-6 p-6 border border-border bg-muted/30 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-medium text-foreground tracking-wide">Filter Options</h3>
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
                <label className="block text-sm font-medium text-foreground mb-3 tracking-wide">
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
                <label className="block text-sm font-medium text-foreground mb-3 tracking-wide">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.length > 0 ? (
                    availableSizes.map((size, idx) => (
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
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No sizes available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {filteredAndSortedProducts.map((product, index) => (
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
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-4">No products found</p>
            <button
              onClick={clearFilters}
              className="text-sm text-foreground hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
      {showSortDropdown && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowSortDropdown(false)}
        />
      )}
    </div>
  );
};

export default Sleeveless;