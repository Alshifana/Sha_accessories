"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const { isOpen, closeCart, detailedItems, updateQuantity, removeItem, subtotal } =
    useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-ivory shadow-soft"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-display text-lg">
                Your Bag {detailedItems.length > 0 && `(${detailedItems.length})`}
              </h2>
              <button onClick={closeCart} aria-label="Close cart" className="p-1">
                <X size={20} />
              </button>
            </div>

            {detailedItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <p className="text-charcoal/60">Your bag is empty.</p>
                <Button onClick={closeCart} asChild>
                  <Link href="/shop">Continue shopping</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-5">
                  <ul className="space-y-5">
                    {detailedItems.map(({ product, item }) => (
                      <li key={`${product.id}-${item.variantId}`} className="flex gap-4">
                        <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-sand">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/product/${product.slug}`}
                              onClick={closeCart}
                              className="font-display text-sm leading-snug hover:text-gold-dark"
                            >
                              {product.name}
                            </Link>
                            <button
                              onClick={() => removeItem(product.id, item.variantId)}
                              aria-label="Remove item"
                              className="text-charcoal/40 hover:text-charcoal"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                          <span className="mt-1 text-sm text-charcoal/70">
                            {formatPrice(product.price)}
                          </span>
                          <div className="mt-2 flex items-center border border-border w-fit">
                            <button
                              onClick={() =>
                                updateQuantity(product.id, item.quantity - 1, item.variantId)
                              }
                              className="flex h-7 w-7 items-center justify-center hover:bg-beige/60"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-7 text-center text-xs">{item.quantity}</span>
                            <button
                              onClick={() =>
                                updateQuantity(product.id, item.quantity + 1, item.variantId)
                              }
                              className="flex h-7 w-7 items-center justify-center hover:bg-beige/60"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border px-6 py-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-charcoal/60">Subtotal</span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  <p className="mt-1 text-xs text-charcoal/45">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <Button asChild className="mt-4 w-full" onClick={closeCart}>
                    <Link href="/checkout">Checkout</Link>
                  </Button>
                  <Button asChild variant="outline" className="mt-2.5 w-full" onClick={closeCart}>
                    <Link href="/cart">View bag</Link>
                  </Button>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
