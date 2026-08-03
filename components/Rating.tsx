import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function Rating({
  value,
  count,
  size = 14,
  showCount = true,
}: {
  value: number;
  count?: number;
  size?: number;
  showCount?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={cn(
              i < Math.round(value) ? "fill-gold text-gold" : "fill-transparent text-beige"
            )}
            strokeWidth={1.5}
          />
        ))}
      </div>
      {showCount && count !== undefined && (
        <span className="text-xs text-charcoal/50">({count})</span>
      )}
    </div>
  );
}
