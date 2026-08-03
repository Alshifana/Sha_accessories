"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPage() {
  const { items } = useWishlist();

  return (
    <div className="pt-32 pb-24">
      <div className="container">
        <SectionHeading eyebrow="Saved for later" title="Your Wishlist" align="left" />

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-4 py-16 text-center">
            <Heart size={36} className="text-charcoal/20" />
            <p className="text-charcoal/60">Nothing saved yet. Tap the heart on any product to add it here.</p>
            <Button asChild>
              <Link href="/shop">Browse the shop</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 xl:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
