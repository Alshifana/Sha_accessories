import type { Metadata } from "next";
import Image from "next/image";
import { Gem, Hammer, Leaf, Users } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "About Us",
  description: "The story behind Sha-Accessories — handcrafted photo frames and anti-tarnish jewelry made in small batches.",
};

const values = [
  { icon: Hammer, title: "Made by hand", desc: "Every frame and every chain passes through a person's hands before yours." },
  { icon: Gem, title: "Built to last", desc: "Anti-tarnish plating and solid materials mean pieces that hold up to daily life." },
  { icon: Leaf, title: "Small batches", desc: "We produce in limited runs rather than mass volume, so quality control stays tight." },
  { icon: Users, title: "Women-led studio", desc: "Designed and run by a small team who wear and gift everything we make." },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden bg-charcoal">
        <Image
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1800&auto=format&fit=crop"
          alt="Craftsperson's workspace with tools and materials"
          fill
          className="object-cover opacity-60"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <p className="eyebrow text-gold-light">Our Story</p>
          <h1 className="mt-3 max-w-xl font-display text-4xl text-ivory sm:text-5xl">
            Small studio. Slow process. Pieces meant to stay.
          </h1>
        </div>
      </div>

      <section className="container py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <div className="relative aspect-[4/5] overflow-hidden bg-sand">
              <Image
                src="https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&auto=format&fit=crop"
                alt="Handcrafted jewelry pieces"
                fill
                className="object-cover"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="eyebrow">How we started</p>
            <h2 className="mt-3 font-display text-3xl">
              A frame shop that grew into a jewelry box
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-charcoal/65">
              Sha-Accessories began with a single walnut photo frame, made for a
              friend's wedding gift because nothing in the shops felt personal
              enough. That frame led to a dozen more, then to a small line of
              gold-toned jewelry designed to survive daily wear without
              fading — the same standard of care, just worn instead of hung
              on a wall.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-charcoal/65">
              Today every piece is still finished by hand in small batches.
              We'd rather make less and make it well than chase volume at the
              cost of quality.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-sand py-24">
        <div className="container">
          <SectionHeading eyebrow="What we stand for" title="Our values" />
          <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {values.map((v, i) => (
              <FadeIn key={v.title} delay={i * 0.08} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/40">
                  <v.icon size={22} className="text-gold-dark" />
                </div>
                <h3 className="mt-4 font-display text-base">{v.title}</h3>
                <p className="mt-1.5 text-sm text-charcoal/55">{v.desc}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
