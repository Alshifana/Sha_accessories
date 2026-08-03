"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import type { Product } from "@/lib/types";

const CartDrawer = dynamic(() => import("@/components/CartDrawer").then((mod) => mod.CartDrawer), {
  ssr: false,
  loading: () => null,
});

const WhatsAppButton = dynamic(
  () => import("@/components/WhatsAppButton").then((mod) => mod.WhatsAppButton),
  {
    ssr: false,
    loading: () => null,
  }
);

export function SiteShell({
  children,
  catalog,
}: {
  children: React.ReactNode;
  catalog: Product[];
}) {
  return (
    <CartProvider catalog={catalog}>
      <WishlistProvider>
        <Navbar />
        <CartDrawer />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </WishlistProvider>
    </CartProvider>
  );
}