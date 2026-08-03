"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { QuickView } from "@/components/QuickView";
import { Product } from "@/lib/types";

export function CategoryClient({
  items,
  categoryName,
}: {
  items: Product[];
  categoryName: string;
}) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <div className="container py-16">
      {items.length === 0 ? (
        <p className="py-16 text-center text-charcoal/50">
          No {categoryName.toLowerCase()} available right now — check back soon.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 xl:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
          ))}
        </div>
      )}
      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}
