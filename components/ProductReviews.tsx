import { Review } from "@/lib/types";
import { Rating } from "@/components/Rating";
import { ShieldCheck } from "lucide-react";

export function ProductReviews({
  reviews,
  rating,
  reviewCount,
}: {
  reviews: Review[];
  rating: number;
  reviewCount: number;
}) {
  const breakdown = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    return { star, pct: reviews.length ? (count / reviews.length) * 100 : 0 };
  });

  return (
    <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
      <div>
        <p className="font-display text-5xl">{rating.toFixed(1)}</p>
        <Rating value={rating} showCount={false} size={16} />
        <p className="mt-1 text-xs text-charcoal/50">Based on {reviewCount} reviews</p>
        <div className="mt-5 space-y-1.5">
          {breakdown.map((b) => (
            <div key={b.star} className="flex items-center gap-2 text-xs">
              <span className="w-6 text-charcoal/50">{b.star}★</span>
              <div className="h-1.5 flex-1 bg-beige">
                <div className="h-full bg-gold" style={{ width: `${b.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <ul className="space-y-6">
        {reviews.map((r) => (
          <li key={r.id} className="border-b border-border pb-6 last:border-0">
            <div className="flex items-center justify-between">
              <Rating value={r.rating} showCount={false} size={13} />
              <span className="text-xs text-charcoal/40">{r.date}</span>
            </div>
            <p className="mt-2 font-display text-base">{r.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-charcoal/65">{r.body}</p>
            <p className="mt-2 flex items-center gap-1.5 text-xs text-charcoal/45">
              {r.author}
              {r.verified && (
                <span className="flex items-center gap-1 text-gold-dark">
                  <ShieldCheck size={12} /> Verified buyer
                </span>
              )}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
