"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import QuickViewModal from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();
  const [showQuickView, setShowQuickView] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.inStock) {
      addToCart(product);
      addToast(`${product.name} added to cart!`, "success");
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    addToast(
      inWishlist ? `Removed from wishlist` : `Added to wishlist!`,
      inWishlist ? "info" : "success"
    );
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  return (
    <>
      <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        <Link href={`/shop/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {product.badge && (
            <span
              className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${
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

          {/* Hover overlay actions */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={handleQuickView}
              className="p-2.5 bg-white rounded-full shadow-lg hover:scale-110 transition-all text-gray-700 hover:text-primary"
              title="Quick View"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-3 right-3 p-2 rounded-full shadow-sm transition-all ${
              inWishlist
                ? "bg-red-50 text-red-500"
                : "bg-white/80 text-gray-400 hover:text-red-500 hover:bg-white"
            }`}
            title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
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
          </button>
        </Link>

        <div className="p-4">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">
            {product.category.replace("-", " & ")}
          </p>
          <Link href={`/shop/${product.id}`}>
            <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-3.5 h-3.5 ${
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
            <span className="text-xs text-muted">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-muted line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`p-2 rounded-full transition-all ${
                product.inStock
                  ? "bg-primary text-white hover:bg-primary-dark hover:scale-110"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              title={product.inStock ? "Add to cart" : "Out of stock"}
            >
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <QuickViewModal
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
}
