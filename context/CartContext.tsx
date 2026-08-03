"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { CartItem, Product } from "@/lib/types";

type CartContextType = {
  items: CartItem[];
  addItem: (productId: string, quantity?: number, variantId?: string) => void;
  removeItem: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  subtotal: number;
  totalCount: number;
  detailedItems: { product: Product; item: CartItem }[];
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const STORAGE_KEY = "aurelie_cart_v1";

function readLocalCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function mergeCartItems(localItems: CartItem[], remoteItems: CartItem[]) {
  const merged = new Map<string, CartItem>();

  [...remoteItems, ...localItems].forEach((item) => {
    const key = `${item.productId}:${item.variantId ?? ""}`;
    const existing = merged.get(key);
    merged.set(key, {
      ...item,
      quantity: (existing?.quantity ?? 0) + item.quantity,
    });
  });

  return Array.from(merged.values());
}

function normalizeCartItems(items: CartItem[], catalog: Product[]) {
  const validProductIds = new Set(catalog.map((product) => product.id));

  return items.filter((item) => item.quantity > 0 && validProductIds.has(item.productId));
}

export function CartProvider({
  children,
  catalog,
}: {
  children: ReactNode;
  catalog: Product[];
}) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const localItems = readLocalCart();
    setItems(normalizeCartItems(localItems, catalog));
    setReady(true);
  }, [catalog]);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const addItem = (productId: string, quantity = 1, variantId?: string) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === productId && i.variantId === variantId
      );
      if (existing) {
        return prev.map((i) =>
          i.productId === productId && i.variantId === variantId
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { productId, variantId, quantity }];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string, variantId?: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.variantId === variantId))
    );
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) return removeItem(productId, variantId);
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const detailedItems = useMemo(
    () =>
      items
        .map((item) => {
          const product = catalog.find((p) => p.id === item.productId);
          return product ? { product, item } : null;
        })
        .filter(Boolean) as { product: Product; item: CartItem }[],
    [items, catalog]
  );

  const subtotal = useMemo(
    () =>
      detailedItems.reduce(
        (sum, { product, item }) => sum + product.price * item.quantity,
        0
      ),
    [detailedItems]
  );

  const totalCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
        subtotal,
        totalCount,
        detailedItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
