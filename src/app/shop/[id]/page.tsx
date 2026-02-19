"use client";

import { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import ProductCard from "@/components/ProductCard";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const product = products.find((p) => p.id === parseInt(id));
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const { addToRecentlyViewed } = useRecentlyViewed();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "features" | "reviews">("description");
  const [selectedImageIndex] = useState(0);

  // Track recently viewed
  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-muted mb-6">The product you are looking for does not exist.</p>
          <Link
            href="/shop"
            className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary-dark transition-colors"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(`${product.name} (x${quantity}) added to cart!`, "success");
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    addToast(
      inWishlist ? `Removed from wishlist` : `${product.name} added to wishlist!`,
      inWishlist ? "info" : "success"
    );
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Generate mock thumbnails (same image repeated for demo)
  const thumbnails = [product.image, product.image, product.image];

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <span>/</span>
            <Link href={`/shop?category=${product.category}`} className="hover:text-primary transition-colors capitalize">
              {product.category.replace("-", " & ")}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden mb-4">
              <Image
                src={thumbnails[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.badge && (
                <span
                  className={`absolute top-4 left-4 px-4 py-1.5 text-sm font-semibold rounded-full ${
                    product.badge === "Sale"
                      ? "bg-red-500 text-white"
                      : product.badge === "New"
                      ? "bg-green-500 text-white"
                      : "bg-primary text-white"
                  }`}
                >
                  {product.badge}
                </span>
              )}
            </div>
            {/* Thumbnail gallery */}
            <div className="flex gap-3">
              {thumbnails.map((thumb, i) => (
                <button
                  key={i}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImageIndex === i ? "border-primary" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Image src={thumb} alt={`${product.name} view ${i + 1}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p className="text-sm text-primary font-medium uppercase tracking-wider mb-2">
              {product.category.replace("-", " & ")}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400"
                        : "text-gray-200"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-gray-900">{product.rating}</span>
              <span className="text-sm text-muted">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="px-3 py-1 bg-red-50 text-red-600 text-sm font-semibold rounded-full">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              <div
                className={`w-2.5 h-2.5 rounded-full ${
                  product.inStock ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  product.inStock ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            {product.inStock && (
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-6 py-3 font-medium text-gray-900 border-x border-gray-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-primary text-white rounded-xl font-semibold hover:bg-primary-dark transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            )}

            {/* Wishlist & Share */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleToggleWishlist}
                className={`flex-1 py-3 rounded-xl font-medium text-sm border transition-colors flex items-center justify-center gap-2 ${
                  inWishlist
                    ? "bg-red-50 border-red-200 text-red-600"
                    : "border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill={inWishlist ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {inWishlist ? "In Wishlist" : "Add to Wishlist"}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  addToast("Link copied to clipboard!", "info");
                }}
                className="px-6 py-3 rounded-xl font-medium text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share
              </button>
            </div>

            {/* Features Quick */}
            <div className="grid grid-cols-2 gap-3">
              {product.features.slice(0, 4).map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="flex border-b border-gray-200">
            {(["description", "features", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                  activeTab === tab
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-gray-900"
                }`}
              >
                {tab} {tab === "reviews" && `(${product.reviews})`}
              </button>
            ))}
          </div>
          <div className="py-8">
            {activeTab === "description" && (
              <div className="max-w-3xl">
                <p className="text-gray-600 leading-relaxed mb-6">
                  {product.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Shipping</h4>
                    <p className="text-sm text-gray-600">Free shipping on orders over $50. Standard delivery in 3-5 business days.</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 text-sm mb-2">Returns</h4>
                    <p className="text-sm text-gray-600">30-day hassle-free returns. See our return policy for details.</p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "features" && (
              <ul className="space-y-3 max-w-lg">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === "reviews" && (
              <div className="max-w-2xl">
                {/* Review Summary */}
                <div className="flex items-center gap-8 mb-8 p-6 bg-gray-50 rounded-2xl">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-gray-900">{product.rating}</p>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-xs text-muted mt-1">{product.reviews} reviews</p>
                  </div>
                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const percentage = star === 5 ? 68 : star === 4 ? 20 : star === 3 ? 8 : star === 2 ? 3 : 1;
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-xs text-muted w-3">{star}</span>
                          <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${percentage}%` }} />
                          </div>
                          <span className="text-xs text-muted w-8">{percentage}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[
                    { name: "Sarah M.", rating: 5, date: "Feb 8, 2026", text: "Absolutely love this product! The quality is outstanding and it exceeded my expectations. Would definitely recommend to anyone looking for a premium option." },
                    { name: "James K.", rating: 4, date: "Jan 25, 2026", text: "Great product overall. The build quality is solid and it works exactly as described. Shipping was fast too. Only giving 4 stars because the packaging could be better." },
                    { name: "Emily R.", rating: 5, date: "Jan 15, 2026", text: "This is my second purchase from ShopVerse and I am not disappointed. The product is fantastic and the customer service is top-notch." },
                  ].map((review, i) => (
                    <div key={i} className="border-b border-gray-100 pb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-semibold text-xs">
                            {review.name.split(" ").map(n => n[0]).join("")}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{review.name}</p>
                            <div className="flex">
                              {[...Array(5)].map((_, j) => (
                                <svg key={j} className={`w-3 h-3 ${j < review.rating ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs text-muted">{review.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
