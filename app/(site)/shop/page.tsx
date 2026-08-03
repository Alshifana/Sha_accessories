import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopClient } from "@/components/ShopClient";
import { getAllCategories, getAllProducts } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Shop All",
  description: "Browse handcrafted photo frames and anti-tarnish jewelry — necklaces, earrings, bracelets and rings.",
};

export default async function ShopPage() {
  const [categories, products] = await Promise.all([getAllCategories(), getAllProducts()]);

  return (
    <Suspense fallback={<div className="pt-32 pb-24 container">Loading…</div>}>
      <ShopClient categories={categories} products={products} />
    </Suspense>
  );
}
