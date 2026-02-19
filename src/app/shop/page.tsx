"use client";

import { Suspense, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductSkeleton from "@/components/ProductSkeleton";
import { products, categories } from "@/data/products";

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [selectedCategory, sortBy, priceRange, searchQuery]);

  // Count products per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const activeFilterCount = [
    selectedCategory !== "all",
    searchQuery !== "",
    priceRange[0] > 0 || priceRange[1] < 500,
  ].filter(Boolean).length;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop</h1>
          <p className="text-muted">
            Discover our collection of {products.length} premium products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-24">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </h2>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Category
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                      selectedCategory === "all"
                        ? "bg-primary text-white font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-xs opacity-70">{products.length}</span>
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${
                        selectedCategory === cat.slug
                          ? "bg-primary text-white font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <span>
                        {cat.icon} {cat.name}
                      </span>
                      <span className="text-xs opacity-70">{categoryCounts[cat.slug] || 0}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-full pl-7 pr-2 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Min"
                    />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full pl-7 pr-2 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Max"
                    />
                  </div>
                </div>
                {/* Quick price buttons */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    { label: "Under $50", range: [0, 50] as [number, number] },
                    { label: "$50-$150", range: [50, 150] as [number, number] },
                    { label: "$150-$300", range: [150, 300] as [number, number] },
                    { label: "$300+", range: [300, 500] as [number, number] },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setPriceRange(preset.range)}
                      className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                        priceRange[0] === preset.range[0] && priceRange[1] === preset.range[1]
                          ? "bg-primary text-white border-primary"
                          : "border-gray-200 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stock Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Availability
                </label>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>{products.filter(p => p.inStock).length} products in stock</span>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setPriceRange([0, 500]);
                  setSearchQuery("");
                  setSortBy("featured");
                }}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6 bg-white rounded-xl p-4 border border-gray-100">
              <p className="text-sm text-muted">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>
              <div className="flex items-center gap-3">
                {/* View Mode Toggle */}
                <div className="hidden sm:flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 transition-colors ${
                      viewMode === "grid" ? "bg-primary text-white" : "text-gray-400 hover:text-gray-600"
                    }`}
                    title="Grid view"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 transition-colors ${
                      viewMode === "list" ? "bg-primary text-white" : "text-gray-400 hover:text-gray-600"
                    }`}
                    title="List view"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {categories.find(c => c.slug === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory("all")} className="hover:text-primary-dark">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    &quot;{searchQuery}&quot;
                    <button onClick={() => setSearchQuery("")} className="hover:text-primary-dark">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 500) && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    ${priceRange[0]} - ${priceRange[1]}
                    <button onClick={() => setPriceRange([0, 500])} className="hover:text-primary-dark">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
              </div>
            )}

            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "grid grid-cols-1 gap-4"
              }>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-muted mb-6">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setPriceRange([0, 500]);
                    setSearchQuery("");
                  }}
                  className="px-6 py-2.5 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-gray-50 min-h-screen">
          <div className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="h-8 bg-gray-200 rounded w-32 animate-pulse mb-2" />
              <div className="h-4 bg-gray-200 rounded w-64 animate-pulse" />
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="lg:w-64 shrink-0">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse space-y-4">
                  <div className="h-10 bg-gray-200 rounded-xl" />
                  <div className="space-y-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-8 bg-gray-200 rounded-lg" />
                    ))}
                  </div>
                </div>
              </aside>
              <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <ProductSkeleton key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
