"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Tag, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

const VALID_COUPONS: Record<string, number> = {
  AURELIE10: 0.1,
  WELCOME15: 0.15,
};

export default function CartPage() {
  const { detailedItems, updateQuantity, removeItem, subtotal } = useCart();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState<string | null>(null);
  const [error, setError] = useState("");

  const discountRate = applied ? VALID_COUPONS[applied] : 0;
  const discount = subtotal * discountRate;
  const shipping = subtotal > 1999 || subtotal === 0 ? 0 : 99;
  const total = subtotal - discount + shipping;

  const applyCoupon = () => {
    const upper = code.trim().toUpperCase();
    if (VALID_COUPONS[upper]) {
      setApplied(upper);
      setError("");
    } else {
      setError("Invalid or expired coupon code.");
      setApplied(null);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container">
        <SectionHeading eyebrow="Review your order" title="Shopping Bag" align="left" />

        {detailedItems.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-charcoal/60">Your bag is empty.</p>
            <Button asChild>
              <Link href="/shop">Continue shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]">
            <ul className="divide-y divide-border">
              {detailedItems.map(({ product, item }) => (
                <li key={`${product.id}-${item.variantId}`} className="flex gap-5 py-6">
                  <Link href={`/product/${product.slug}`} className="relative h-32 w-24 shrink-0 overflow-hidden bg-sand">
                    <Image src={product.images[0]} alt={product.name} fill sizes="96px" className="object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <Link href={`/product/${product.slug}`} className="font-display text-base hover:text-gold-dark">
                          {product.name}
                        </Link>
                        {item.variantId && product.variants && (
                          <p className="mt-1 text-xs text-charcoal/50">
                            {product.variants.find((v) => v.id === item.variantId)?.color}
                          </p>
                        )}
                        <p className="mt-1 text-sm text-charcoal/70">{formatPrice(product.price)}</p>
                      </div>
                      <button
                        onClick={() => removeItem(product.id, item.variantId)}
                        aria-label="Remove item"
                        className="text-charcoal/40 hover:text-charcoal"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center border border-border w-fit">
                        <button
                          onClick={() => updateQuantity(product.id, item.quantity - 1, item.variantId)}
                          className="flex h-9 w-9 items-center justify-center hover:bg-beige/60"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="w-9 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, item.quantity + 1, item.variantId)}
                          className="flex h-9 w-9 items-center justify-center hover:bg-beige/60"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <p className="text-sm font-medium">
                        {formatPrice(product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="h-fit border border-border p-6">
              <h3 className="font-display text-lg">Order Summary</h3>

              <div className="mt-5">
                <label className="text-xs uppercase tracking-widest2 text-charcoal/50">
                  Coupon code
                </label>
                <div className="mt-2 flex gap-2">
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="e.g. WELCOME15"
                    className="w-full border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
                  />
                  <button
                    onClick={applyCoupon}
                    className="shrink-0 border border-charcoal px-4 text-xs uppercase tracking-widest2 hover:bg-charcoal hover:text-ivory"
                  >
                    Apply
                  </button>
                </div>
                {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
                {applied && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-gold-dark">
                    <Tag size={12} /> {applied} applied — {discountRate * 100}% off
                  </p>
                )}
              </div>

              <div className="mt-6 space-y-2.5 border-t border-border pt-5 text-sm">
                <div className="flex justify-between text-charcoal/70">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-gold-dark">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-charcoal/70">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base font-medium">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <Button asChild className="mt-6 w-full">
                <Link href="/checkout">
                  Proceed to Checkout <ArrowRight size={15} />
                </Link>
              </Button>
              <p className="mt-3 text-center text-xs text-charcoal/40">
                Free shipping on orders above {formatPrice(1999)}
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
