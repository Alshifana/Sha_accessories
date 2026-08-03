"use client";

import { useState, useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { SafeImage } from "@/components/SafeImage";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoomStyle, setZoomStyle] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomStyle({ x, y });
  };

  return (
    <div>
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setZoomStyle(null)}
        className="relative aspect-square overflow-hidden bg-sand cursor-zoom-in"
      >
        <SafeImage
          src={images[active]}
          alt={name}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-300"
          style={
            zoomStyle
              ? { transform: "scale(1.9)", transformOrigin: `${zoomStyle.x}% ${zoomStyle.y}%` }
              : undefined
          }
        />
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActive(i)}
              className={cn(
                "relative h-20 w-16 overflow-hidden border transition-colors",
                active === i ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
              )}
            >
                <SafeImage src={img} alt="" fill sizes="64px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
