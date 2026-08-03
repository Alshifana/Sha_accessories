import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

type SafeImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
  style?: CSSProperties;
};

export function SafeImage({
  src,
  alt,
  className,
  sizes,
  priority,
  fill,
  width,
  height,
  style,
}: SafeImageProps) {
  const normalizedSrc = typeof src === "string" ? src.trim() : "";

  if (normalizedSrc) {
    return (
      <Image
        src={normalizedSrc}
        alt={alt}
        className={className}
        sizes={sizes}
        priority={priority}
        fill={fill}
        width={width}
        height={height}
        style={style}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("bg-sand text-charcoal/30 flex items-center justify-center", className)}
      style={style}
    >
      <span className="px-3 text-center text-[11px] uppercase tracking-widest2">
        Image coming soon
      </span>
    </div>
  );
}