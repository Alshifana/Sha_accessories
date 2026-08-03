"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { Product } from "@/lib/types";
import { cn, discountPercent, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Rating } from "@/components/Rating";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { SafeImage } from "@/components/SafeImage";

export function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
}) {
  const { toggle, has } = useWishlist();
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);
  const wished = has(product.id);
  const discount = discountPercent(product.price, product.compareAtPrice);

  return (
    <div
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-sand">
        <Link href={`/product/${product.slug}`} aria-label={product.name}>
          <SafeImage
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className={cn(
              "object-cover transition-opacity duration-700",
              hovered && product.hoverImage ? "opacity-0" : "opacity-100"
            )}
          />
          {product.hoverImage && hovered && (
            <SafeImage
              src={product.hoverImage}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className={cn(
                "object-cover transition-opacity duration-700 absolute inset-0",
                hovered ? "opacity-100" : "opacity-0"
              )}
            />
          )}
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.badge && <Badge variant="charcoal">{product.badge}</Badge>}
          {discount > 0 && <Badge variant="gold">-{discount}%</Badge>}
        </div>

        <button
          onClick={() => toggle(product.id)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wished}
          className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center bg-ivory/90 backdrop-blur transition-transform duration-300 hover:scale-110"
        >
          <Heart
            size={16}
            className={cn(wished ? "fill-gold text-gold" : "text-charcoal")}
          />
        </button>

        <div
          className={cn(
            "absolute inset-x-3 bottom-3 flex gap-2 transition-all duration-300",
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none md:pointer-events-auto"
          )}
        >
          <button
            onClick={() => addItem(product.id)}
            className="flex-1 flex items-center justify-center gap-2 bg-charcoal text-ivory h-11 text-xs uppercase tracking-widest2 transition-colors hover:bg-gold-dark"
          >
            <ShoppingBag size={14} /> Add
          </button>
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              aria-label="Quick view"
              className="flex h-11 w-11 items-center justify-center bg-ivory/95 text-charcoal transition-colors hover:bg-ivory"
            >
              <Eye size={16} />
            </button>
          )}
        </div>
      </div>

      <Link href={`/product/${product.slug}`} className="mt-3.5 block">
        <p className="text-[11px] uppercase tracking-widest2 text-charcoal/40">
          {product.category ? product.category.replace("-", " ") : "Product"}
        </p>
        <h3 className="mt-1 font-display text-[15px] leading-snug text-charcoal">
          {product.name}
        </h3>
        <div className="mt-1.5">
          <Rating value={product.rating} count={product.reviewCount} />
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-sm font-medium text-charcoal">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <span className="text-xs text-charcoal/40 line-through">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        {product.variants && (
          <div className="mt-2 flex gap-1.5">
            {product.variants.map((v) => (
              <span
                key={v.id}
                title={v.color}
                className="h-3.5 w-3.5 rounded-full border border-charcoal/10"
                style={{ backgroundColor: v.hex }}
              />
            ))}
          </div>
        )}
      </Link>
    </div>
  );
}
