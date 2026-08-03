import { cn } from "@/lib/utils";
import { FadeIn } from "./FadeIn";

export function SectionHeading({
  eyebrow,
  title,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <FadeIn className={cn(align === "center" ? "text-center" : "text-left", className)}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl sm:text-4xl text-charcoal">{title}</h2>
      <div
        className={cn(
          "thread-divider thread-divider-animate mt-4",
          align === "center" && "mx-auto"
        )}
      />
    </FadeIn>
  );
}
