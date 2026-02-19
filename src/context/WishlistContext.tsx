"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Product } from "@/data/products";

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("shopverse-wishlist");
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch {
      // Ignore parse errors
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("shopverse-wishlist", JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addToWishlist = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const toggleWishlist = useCallback((product: Product) => {
    setItems((prev) => {
      if (prev.find((item) => item.id === product.id)) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: number) => {
      return items.some((item) => item.id === productId);
    },
    [items]
  );

  const totalItems = items.length;

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        totalItems,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
