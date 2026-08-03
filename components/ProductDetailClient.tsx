"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Heart, ShieldCheck, Truck as TruckIcon, RotateCcw } from "lucide-react";
import { Product } from "@/lib/types";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import { Rating } from "@/components/Rating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/components/ProductGallery";
import { DeliveryChecker } from "@/components/DeliveryChecker";
import { ProductReviews } from "@/components/ProductReviews";
import { ProductCard } from "@/components/ProductCard";
import { QuickView } from "@/components/QuickView";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { trackView, useRecentlyViewed } from "@/lib/useRecentlyViewed";

const tabs = ["Description", "Specifications", "Reviews"] as const;

export function ProductDetailClient({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const router = useRouter();
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const [variant, setVariant] = useState(product.variants?.[0]?.id);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<(typeof tabs)[number]>("Description");
  const discount = discountPercent(product.price, product.compareAtPrice);
  const wished = has(product.id);

  useEffect(() => {
    trackView(product.id);
  }, [product.id]);

  const recentlyViewed = useRecentlyViewed(product.id);
  const related = relatedProducts;
  const bundle = [product, ...related.slice(0, 2)];
  const bundleTotal = bundle.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="pt-28 pb-24">
      <div className="container">
        <nav className="text-xs text-charcoal/45">
          <Link href="/" className="hover:text-gold-dark">Home</Link> /{" "}
          <Link href="/shop" className="hover:text-gold-dark">Shop</Link> /{" "}
          <Link href={`/category/${product.category}`} className="hover:text-gold-dark capitalize">
            {product.category.replace("-", " ")}
          </Link>{" "}
          / <span className="text-charcoal/70">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <ProductGallery images={product.images} name={product.name} />

          <div>
            <p className="text-[11px] uppercase tracking-widest2 text-charcoal/40">
              {product.category.replace("-", " ")}
            </p>
            <h1 className="mt-2 font-display text-3xl sm:text-4xl">{product.name}</h1>

            <div className="mt-3 flex items-center gap-3">
              <Rating value={product.rating} count={product.reviewCount} />
              {product.badge && <Badge variant="charcoal">{product.badge}</Badge>}
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
              {product.compareAtPrice && (
                <>
                  <span className="text-base text-charcoal/40 line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                  <Badge variant="gold">-{discount}%</Badge>
                </>
              )}
            </div>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-charcoal/65">
              {product.description}
            </p>

            {product.variants && (
              <div className="mt-6">
                <h4 className="text-xs uppercase tracking-widest2 text-charcoal/50">
                  Color: <span className="text-charcoal">{product.variants.find((v) => v.id === variant)?.color}</span>
                </h4>
                <div className="mt-2.5 flex gap-2.5">
                  {product.variants.map((v) => (
                    <button
                      key={v.id}
                      onClick={() => setVariant(v.id)}
                      aria-label={v.color}
                      className={cn(
                        "h-9 w-9 rounded-full border-2 transition-all",
                        variant === v.id ? "border-gold scale-110" : "border-transparent"
                      )}
                      style={{ backgroundColor: v.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-12 w-11 items-center justify-center hover:bg-beige/60"
                  aria-label="Decrease quantity"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                  className="flex h-12 w-11 items-center justify-center hover:bg-beige/60"
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>
              <span className="text-xs text-charcoal/45">
                {product.stock > 10 ? "In stock" : `Only ${product.stock} left`}
              </span>
            </div>

            <div className="mt-6 flex gap-3">
              <Button onClick={() => addItem(product.id, qty, variant)} className="flex-1">
                Add to Cart
              </Button>
              <Button
                variant="gold"
                className="flex-1"
                onClick={() => {
                  addItem(product.id, qty, variant);
                  router.push("/checkout");
                }}
              >
                Buy Now
              </Button>
              <button
                onClick={() => toggle(product.id)}
                aria-label="Toggle wishlist"
                className="flex h-12 w-12 shrink-0 items-center justify-center border border-border hover:border-gold"
              >
                <Heart size={18} className={cn(wished ? "fill-gold text-gold" : "text-charcoal")} />
              </button>
            </div>

            <div className="mt-8">
              <DeliveryChecker />
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-[11px] text-charcoal/55">
              <div className="flex flex-col items-center gap-1.5">
                <ShieldCheck size={18} className="text-gold-dark" /> Anti-tarnish sealed
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <TruckIcon size={18} className="text-gold-dark" /> Insured shipping
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <RotateCcw size={18} className="text-gold-dark" /> 7-day returns
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Bought Together */}
        {related.length > 0 && (
          <div className="mt-24 border border-border p-6 sm:p-8">
            <h3 className="font-display text-xl">Frequently Bought Together</h3>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {bundle.map((p, i) => (
                <div key={p.id} className="flex items-center gap-4">
                  <Link href={`/product/${p.slug}`} className="w-24 text-center">
                    <div className="relative aspect-square w-24 overflow-hidden bg-sand">
                      <Image src={p.images[0]} alt={p.name} fill sizes="96px" className="object-cover" />
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs text-charcoal/70">{p.name}</p>
                  </Link>
                  {i < bundle.length - 1 && <Plus size={16} className="text-charcoal/30" />}
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              <p className="text-sm">
                Total: <span className="font-medium">{formatPrice(bundleTotal)}</span>
              </p>
              <Button
                onClick={() => bundle.forEach((p) => addItem(p.id))}
                variant="outline"
              >
                Add all to cart
              </Button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mt-24">
          <div className="flex gap-8 border-b border-border">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "pb-4 text-sm uppercase tracking-widest2 transition-colors",
                  tab === t ? "text-charcoal border-b-2 border-gold" : "text-charcoal/40"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="py-10">
            {tab === "Description" && (
              <p className="max-w-2xl text-sm leading-relaxed text-charcoal/70">
                {product.description}
              </p>
            )}
            {tab === "Specifications" && (
              <dl className="max-w-md divide-y divide-border">
                {product.specifications.map((s) => (
                  <div key={s.label} className="flex justify-between py-3 text-sm">
                    <dt className="text-charcoal/50">{s.label}</dt>
                    <dd className="text-charcoal">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {tab === "Reviews" && (
              <ProductReviews
                reviews={product.reviews}
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            )}
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h3 className="font-display text-2xl">You may also like</h3>
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Recently viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mt-20">
            <h3 className="font-display text-2xl">Recently viewed</h3>
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
              {recentlyViewed.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
