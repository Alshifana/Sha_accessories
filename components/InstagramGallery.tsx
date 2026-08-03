import Image from "next/image";
import { Instagram } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const images = [
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582645636188-542b3d9c98be?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
];

export function InstagramGallery() {
  return (
    <section className="py-24">
      <div className="container">
        <SectionHeading
          eyebrow="@shaaccessories"
          title="Follow along for styling notes"
        />
      </div>
      <div className="mt-12 grid grid-cols-3 gap-1 sm:grid-cols-6">
        {images.map((src, i) => (
          <a
            key={i}
            href="#"
            className="group relative aspect-square overflow-hidden"
            aria-label="View on Instagram"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="16vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/40">
              <Instagram
                size={20}
                className="text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
