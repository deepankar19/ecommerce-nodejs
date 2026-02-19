"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Product } from "@/data/products";

interface RecentlyViewedContextType {
  items: Product[];
  addToRecentlyViewed: (product: Product) => void;
  clearRecentlyViewed: () => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const MAX_RECENT_ITEMS = 8;

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("shopverse-recently-viewed");
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
      localStorage.setItem("shopverse-recently-viewed", JSON.stringify(items));
    }
  }, [items, isHydrated]);

  const addToRecentlyViewed = useCallback((product: Product) => {
    setItems((prev) => {
      const filtered = prev.filter((item) => item.id !== product.id);
      return [product, ...filtered].slice(0, MAX_RECENT_ITEMS);
    });
  }, []);

  const clearRecentlyViewed = useCallback(() => {
    setItems([]);
  }, []);

  return (
    <RecentlyViewedContext.Provider
      value={{ items, addToRecentlyViewed, clearRecentlyViewed }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider");
  }
  return context;
}
