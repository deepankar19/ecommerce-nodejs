"use client";

import Link from "next/link";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import RecentlyViewed from "@/components/RecentlyViewed";
import { products, categories } from "@/data/products";

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.badge);
  const topProducts = products.slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-yellow-300 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                New Collection 2026
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Discover Your
                <span className="text-yellow-300"> Perfect Style</span>
              </h1>
              <p className="text-lg text-blue-100 mb-8 max-w-lg leading-relaxed">
                Explore our curated collection of premium products. From tech gadgets
                to fashion essentials, find everything you need in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="px-8 py-3.5 bg-white text-blue-700 rounded-full font-semibold hover:bg-yellow-300 hover:text-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Shop Now
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-3.5 border-2 border-white/50 rounded-full font-semibold hover:bg-white/10 transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-10">
                <div>
                  <p className="text-2xl font-bold">10K+</p>
                  <p className="text-sm text-blue-200">Happy Customers</p>
                </div>
                <div className="w-px h-10 bg-white/30" />
                <div>
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-sm text-blue-200">Products</p>
                </div>
                <div className="w-px h-10 bg-white/30" />
                <div>
                  <p className="text-2xl font-bold">4.9</p>
                  <p className="text-sm text-blue-200">Star Rating</p>
                </div>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-white/10 rounded-3xl rotate-6" />
                <div className="absolute inset-0 bg-white/5 rounded-3xl -rotate-3" />
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"
                  alt="Shopping"
                  fill
                  className="object-cover rounded-3xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Shop by Category
            </h2>
            <p className="text-muted max-w-2xl mx-auto">
              Browse our wide selection of categories to find exactly what you
              are looking for.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/shop?category=${cat.slug}`}
                className="group bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <span className="text-4xl block mb-3">{cat.icon}</span>
                <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-muted">{cat.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-muted">
                Handpicked favorites our customers love.
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl p-8 lg:p-16 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 bg-white/20 rounded-full text-sm font-medium mb-4">
                Limited Time Offer
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold mb-4">
                Up to 40% Off
              </h2>
              <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto">
                Don&apos;t miss out on our biggest sale of the season. Premium products
                at unbeatable prices.
              </p>
              <Link
                href="/shop"
                className="inline-flex px-8 py-3.5 bg-white text-orange-600 rounded-full font-semibold hover:bg-orange-50 transition-all shadow-lg"
              >
                Shop the Sale
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Viewed */}
      <RecentlyViewed />

      {/* Trust Badges */}
      <section className="py-16 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Free Shipping</h3>
              <p className="text-sm text-muted">On orders over $50</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Secure Payment</h3>
              <p className="text-sm text-muted">100% protected</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Easy Returns</h3>
              <p className="text-sm text-muted">30-day return policy</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">24/7 Support</h3>
              <p className="text-sm text-muted">Always here to help</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
