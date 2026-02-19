"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const inWishlist = isInWishlist(product.id);

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (product.inStock) {
      addToCart(product, quantity);
      addToast(`${product.name} added to cart!`, "success");
    }
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    addToast(
      inWishlist ? `Removed from wishlist` : `Added to wishlist!`,
      inWishlist ? "info" : "success"
    );
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-gray-100 transition-colors shadow-sm"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative aspect-square bg-gray-50">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover rounded-l-3xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {product.badge && (
              <span
                className={`absolute top-4 left-4 px-3 py-1.5 text-xs font-semibold rounded-full ${
                  product.badge === "Sale"
                    ? "bg-red-500 text-white"
                    : product.badge === "New"
                    ? "bg-green-500 text-white"
                    : product.badge === "Sold Out"
                    ? "bg-gray-500 text-white"
                    : "bg-primary text-white"
                }`}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-6 md:p-8 flex flex-col">
            <p className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
              {product.category.replace("-", " & ")}
            </p>
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-200"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-muted">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-base text-muted line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="px-2 py-0.5 bg-red-50 text-red-600 text-xs font-semibold rounded-full">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
              {product.description}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.features.slice(0, 3).map((feature, i) => (
                <span key={i} className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-100">
                  {feature}
                </span>
              ))}
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className={`text-xs font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <div className="mt-auto space-y-3">
              {/* Quantity & Add to Cart */}
              {product.inStock && (
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 font-medium text-gray-900 text-sm border-x border-gray-200">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 text-gray-600 hover:bg-gray-50 transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-2.5 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleToggleWishlist}
                  className={`flex-1 py-2.5 rounded-xl font-medium text-sm border transition-colors flex items-center justify-center gap-2 ${
                    inWishlist
                      ? "bg-red-50 border-red-200 text-red-600"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill={inWishlist ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {inWishlist ? "In Wishlist" : "Add to Wishlist"}
                </button>
                <Link
                  href={`/shop/${product.id}`}
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl font-medium text-sm border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors text-center"
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
