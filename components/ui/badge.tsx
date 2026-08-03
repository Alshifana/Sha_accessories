import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "gold" | "charcoal" | "outline" | "blush";

export function Badge({
  className,
  variant = "gold",
  children,
}: {
  className?: string;
  variant?: Variant;
  children: React.ReactNode;
}) {
  const styles: Record<Variant, string> = {
    gold: "bg-gold text-ivory",
    charcoal: "bg-charcoal text-ivory",
    outline: "border border-charcoal/40 text-charcoal bg-ivory/80",
    blush: "bg-blush text-charcoal",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest2",
        styles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
