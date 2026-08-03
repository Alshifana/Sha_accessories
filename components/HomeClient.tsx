"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight, ShieldCheck, Truck, RefreshCcw, Gem } from "lucide-react";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { FadeIn } from "@/components/FadeIn";
import { ProductCard } from "@/components/ProductCard";
import { Testimonials } from "@/components/Testimonials";
import { InstagramGallery } from "@/components/InstagramGallery";
import { Newsletter } from "@/components/Newsletter";
import { Product } from "@/lib/types";
import { SafeImage } from "@/components/SafeImage";

const QuickView = dynamic(() => import("@/components/QuickView").then((mod) => mod.QuickView), {
  ssr: false,
  loading: () => null,
});

type HomeClientProps = {
  categories: { slug: string; name: string; description: string; image: string }[];
  featuredProducts: Product[];
  testimonials?: { name: string; role: string; quote: string; rating: number }[];
};

const whyUs = [
  { icon: Gem, title: "Hand-finished", desc: "Every piece finished individually, never mass-stamped." },
  { icon: ShieldCheck, title: "Anti-tarnish tested", desc: "18k gold plating sealed to resist daily wear." },
  { icon: Truck, title: "Insured shipping", desc: "Tracked delivery, carefully packed." },
  { icon: RefreshCcw, title: "7-day returns", desc: "Not right? Send it back, no questions." },
];

export function HomeClient({ categories, featuredProducts, testimonials }: HomeClientProps) {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const bestSellers = featuredProducts.filter((p) => p.badge === "Bestseller").slice(0, 4);
  const newArrivals = featuredProducts.filter((p) => p.badge === "New").slice(0, 4);
  const limitedOffers = featuredProducts.filter((p) => p.badge === "Limited").slice(0, 4);

  const sections = {
    bestSellers: bestSellers.length > 0 ? bestSellers : featuredProducts.slice(0, 4),
    newArrivals: newArrivals.length > 0 ? newArrivals : featuredProducts.slice(0, 4),
    limitedOffers: limitedOffers.length > 0 ? limitedOffers : featuredProducts.slice(0, 4),
  };

  return (
    <>
      <Hero />

      {/* Featured Categories */}
      <section className="py-24">
        <div className="container">
          <SectionHeading eyebrow="Shop by category" title="Find your piece" />
          <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-5">
            {categories.map((cat, i) => (
              <FadeIn key={cat.slug} delay={i * 0.06}>
                <Link href={`/category/${cat.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-sand">
                    <SafeImage
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width:768px) 50vw, 20vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="font-display text-ivory text-[15px] leading-tight">
                        {cat.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-sand py-24">
        <div className="container">
          <div className="flex items-end justify-between">
            <SectionHeading eyebrow="Most loved" title="Best Sellers" align="left" />
            <Link
              href="/shop?filter=bestseller"
              className="hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-widest2 text-charcoal/60 hover:text-gold-dark"
            >
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {sections.bestSellers.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24">
        <div className="container">
          <div className="flex items-end justify-between">
            <SectionHeading eyebrow="Just landed" title="New Arrivals" align="left" />
            <Link
              href="/shop?filter=new"
              className="hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-widest2 text-charcoal/60 hover:text-gold-dark"
            >
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {sections.newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Limited Time Offers */}
      <section className="bg-charcoal py-24 text-ivory">
        <div className="container">
          <div className="text-center">
            <p className="eyebrow text-gold-light">While they last</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">Limited-Time Offers</h2>
            <div className="thread-divider thread-divider-animate mx-auto mt-4" />
          </div>
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {sections.limitedOffers.map((p) => (
              <div key={p.id} className="[&_h3]:text-ivory [&_p]:text-ivory/50 [&_span]:text-ivory">
                <ProductCard product={p} onQuickView={setQuickViewProduct} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container">
          <SectionHeading eyebrow="Why Sha-Accessories" title="Made to be worn, not just bought" />
          <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {whyUs.map((w, i) => (
              <FadeIn key={w.title} delay={i * 0.08} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40">
                  <w.icon size={22} className="text-gold-dark" />
                </div>
                <h3 className="mt-4 font-display text-base">{w.title}</h3>
                <p className="mt-1.5 text-sm text-charcoal/55">{w.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Testimonials items={testimonials} />
      <InstagramGallery />
      <Newsletter />

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </>
  );
}
