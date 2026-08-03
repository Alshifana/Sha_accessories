"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FaqAccordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, i) => (
        <div key={item.q}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between py-5 text-left"
          >
            <span className="font-display text-base pr-4">{item.q}</span>
            <ChevronDown
              size={18}
              className={cn("shrink-0 transition-transform duration-300", open === i && "rotate-180 text-gold-dark")}
            />
          </button>
          <div
            className={cn(
              "grid overflow-hidden transition-all duration-300",
              open === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
            )}
          >
            <p className="overflow-hidden text-sm leading-relaxed text-charcoal/65">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
