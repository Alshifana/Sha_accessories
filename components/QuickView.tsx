"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { Rating } from "@/components/Rating";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { SafeImage } from "@/components/SafeImage";

export function QuickView({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addItem, openCart } = useCart();

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-charcoal/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-1/2 z-[70] mx-auto grid max-w-3xl -translate-y-1/2 grid-cols-1 gap-0 overflow-hidden bg-ivory shadow-soft sm:grid-cols-2"
          >
            <button
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center bg-ivory/90"
            >
              <X size={16} />
            </button>
            <div className="relative aspect-square sm:aspect-auto">
              <SafeImage src={product.images[0]} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-8">
              <p className="text-[11px] uppercase tracking-widest2 text-charcoal/40">
                {product.category ? product.category.replace("-", " ") : "Product"}
              </p>
              <h3 className="mt-2 font-display text-2xl">{product.name}</h3>
              <div className="mt-2">
                <Rating value={product.rating} count={product.reviewCount} />
              </div>
              <p className="mt-3 text-lg font-medium">{formatPrice(product.price)}</p>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/65 line-clamp-3">
                {product.description}
              </p>
              <div className="mt-6 flex gap-3">
                <Button
                  onClick={() => {
                    addItem(product.id);
                    onClose();
                    openCart();
                  }}
                  className="flex-1"
                >
                  Add to bag
                </Button>
                <Button asChild variant="outline" onClick={onClose}>
                  <Link href={`/product/${product.slug}`}>View full details</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
