"use client";

import { Rating } from "@/components/Rating";
import { SectionHeading } from "@/components/SectionHeading";
import { FadeIn } from "@/components/FadeIn";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
};

export function Testimonials({ items }: { items?: Testimonial[] }) {
  const testimonials =
    items ??
    [
      {
        name: "Ishita M.",
        role: "Verified Buyer",
        quote:
          "Six months of daily wear and the necklace still looks brand new. That anti-tarnish claim actually holds up.",
        rating: 5,
      },
      {
        name: "Rhea D.",
        role: "Verified Buyer",
        quote:
          "Ordered the walnut frame for my parents' anniversary. The finish felt far more expensive than what I paid.",
        rating: 5,
      },
      {
        name: "Naina P.",
        role: "Verified Buyer",
        quote:
          "Fast shipping, thoughtful packaging, and the earrings are lighter than I expected. Already ordering more.",
        rating: 4,
      },
    ];

  return (
    <section className="bg-sand py-24">
      <div className="container">
        <SectionHeading eyebrow="Loved, daily" title="What our customers say" />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <FadeIn key={t.name} delay={i * 0.1}>
              <div className="h-full bg-ivory p-8 shadow-card">
                <Rating value={t.rating} size={13} showCount={false} />
                <p className="mt-4 font-display text-lg leading-relaxed text-charcoal/90">
                  “{t.quote}”
                </p>
                <div className="mt-6">
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-charcoal/45">{t.role}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
