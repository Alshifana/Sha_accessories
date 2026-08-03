"use client";

import { useEffect, useState } from "react";
import { products } from "@/lib/data";
import { Product } from "@/lib/types";

const KEY = "aurelie_recently_viewed";
const MAX = 8;

export function trackView(productId: string) {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(KEY);
    const ids: string[] = raw ? JSON.parse(raw) : [];
    const next = [productId, ...ids.filter((id) => id !== productId)].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {}
}

export function useRecentlyViewed(excludeId?: string): Product[] {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      const ids: string[] = raw ? JSON.parse(raw) : [];
      const found = ids
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => !!p && p.id !== excludeId);
      setItems(found);
    } catch {
      setItems([]);
    }
  }, [excludeId]);

  return items;
}
