"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { products } from "@/lib/data";
import { Product } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import type { Database } from "@/lib/supabase/types";

type WishlistContextType = {
  ids: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  items: Product[];
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const STORAGE_KEY = "aurelie_wishlist_v1";

function readLocalWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    let cancelled = false;

    async function loadWishlist() {
      const localIds = readLocalWishlist();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        if (!cancelled) {
          setUserId(null);
          setIds(localIds);
          setReady(true);
        }
        return;
      }

      const { data } = await supabase
        .from("wishlist_items")
        .select("product_id")
        .eq("user_id", user.id);

      const remoteIds =
        (data as Database["public"]["Tables"]["wishlist_items"]["Row"][] | null)?.map(
          (row) => row.product_id
        ) ?? [];

      if (!cancelled) {
        setUserId(user.id);
        setIds(Array.from(new Set([...remoteIds, ...localIds])));
        setReady(true);
      }
    }

    loadWishlist();
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadWishlist();
    });

    return () => {
      cancelled = true;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!ready) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));

    if (!userId) return;

    const supabase = createClient();
    supabase.from("wishlist_items").delete().eq("user_id", userId).then(() => {
      if (ids.length === 0) return;

      const wishlistInsert: Database["public"]["Tables"]["wishlist_items"]["Insert"][] =
        ids.map((productId) => ({
          user_id: userId,
          product_id: productId,
        }));

      supabase.from("wishlist_items").insert(wishlistInsert as any);
    });
  }, [ids, ready, userId]);

  const toggle = (productId: string) => {
    setIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const has = (productId: string) => ids.includes(productId);

  const items = useMemo(
    () => products.filter((p) => ids.includes(p.id)),
    [ids]
  );

  return (
    <WishlistContext.Provider value={{ ids, toggle, has, items }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
