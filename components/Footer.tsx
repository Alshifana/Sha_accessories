import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/category/photo-frames", label: "Photo Frames" },
      { href: "/category/necklaces", label: "Necklaces" },
      { href: "/category/earrings", label: "Earrings" },
      { href: "/category/bracelets", label: "Bracelets" },
      { href: "/category/rings", label: "Rings" },
    ],
  },
  {
    title: "Help",
    links: [
      { href: "/contact", label: "Contact Us" },
      { href: "/faq", label: "FAQ" },
      { href: "/shipping", label: "Shipping Info" },
      { href: "/returns", label: "Return Policy" },
      { href: "/wishlist", label: "Wishlist" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms & Conditions" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="container py-16">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-5">
          <div className="col-span-2">
            <span className="font-display text-2xl">Sha-Accessories</span>
            <p className="mt-4 max-w-xs text-sm text-ivory/60">
              Elegant photo frames and premium anti-tarnish jewelry, designed
              in small batches and finished entirely by hand.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-9 w-9 items-center justify-center border border-ivory/20 transition-colors hover:border-gold hover:text-gold-light"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-widest2 text-ivory/50">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-ivory/75 transition-colors hover:text-gold-light"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ivory/10 pt-6 text-xs text-ivory/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Sha-Accessories. All rights reserved.</p>
          <p>Crafted with care, worn every day.</p>
        </div>
      </div>
    </footer>
  );
}
