"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/lib/data";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/shop", label: "Shop" },
  { href: "/category/photo-frames", label: "Photo Frames" },
  { href: "/category/necklaces", label: "Jewelry" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const { totalCount, openCart } = useCart();
  const { ids } = useWishlist();
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth
      .getUser()
      .then(({ data }) => setIsAuthed(!!data.user && !data.user.is_anonymous));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(!!session?.user && !session.user.is_anonymous);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const transparent = isHome && !scrolled && !mobileOpen;
  const suggestions =
    query.length > 1
      ? products
          .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5)
      : [];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        transparent
          ? "bg-transparent py-6"
          : "bg-ivory/95 backdrop-blur shadow-[0_1px_0_0_rgba(28,26,23,0.08)] py-3.5"
      )}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span
            className={cn(
              "font-display text-xl tracking-wide transition-colors",
              transparent ? "text-ivory" : "text-charcoal"
            )}
          >
            Sha-Accessories
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-[13px] uppercase tracking-widest2 transition-colors relative py-1",
                "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full",
                transparent ? "text-ivory/90 hover:text-ivory" : "text-charcoal/80 hover:text-charcoal"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <div ref={searchRef} className="relative">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen((s) => !s)}
              className={cn(
                "flex h-10 w-10 items-center justify-center transition-colors",
                transparent ? "text-ivory" : "text-charcoal"
              )}
            >
              <Search size={18} />
            </button>
            {searchOpen && (
              <div className="absolute right-0 top-12 w-80 bg-ivory shadow-soft p-4 animate-fade-up">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && query) {
                      router.push(`/shop?q=${encodeURIComponent(query)}`);
                      setSearchOpen(false);
                    }
                  }}
                  placeholder="Search frames, necklaces..."
                  className="w-full border-b border-charcoal/20 bg-transparent pb-2 text-sm text-charcoal placeholder:text-charcoal/40 focus:outline-none focus:border-gold"
                />
                {suggestions.length > 0 && (
                  <ul className="mt-3 space-y-2.5">
                    {suggestions.map((p) => (
                      <li key={p.id}>
                        <Link
                          href={`/product/${p.slug}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center justify-between text-sm text-charcoal/80 hover:text-gold-dark"
                        >
                          <span>{p.name}</span>
                          <span className="text-charcoal/40">₹{p.price}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className={cn(
              "relative flex h-10 w-10 items-center justify-center transition-colors",
              transparent ? "text-ivory" : "text-charcoal"
            )}
          >
            <Heart size={18} />
            {ids.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] text-ivory">
                {ids.length}
              </span>
            )}
          </Link>

          <Link
            href={isAuthed ? "/profile" : "/login"}
            aria-label="Account"
            className={cn(
              "hidden sm:flex h-10 w-10 items-center justify-center transition-colors",
              transparent ? "text-ivory" : "text-charcoal"
            )}
          >
            <User size={18} />
          </Link>

          <button
            aria-label="Open cart"
            onClick={openCart}
            className={cn(
              "relative flex h-10 w-10 items-center justify-center transition-colors",
              transparent ? "text-ivory" : "text-charcoal"
            )}
          >
            <ShoppingBag size={18} />
            {totalCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] text-ivory">
                {totalCount}
              </span>
            )}
          </button>

          <button
            aria-label="Menu"
            onClick={() => setMobileOpen((s) => !s)}
            className={cn(
              "flex h-10 w-10 items-center justify-center lg:hidden transition-colors",
              transparent ? "text-ivory" : "text-charcoal"
            )}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-ivory border-t border-border mt-3.5 animate-fade-up">
          <nav className="container flex flex-col py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-sm uppercase tracking-widest2 text-charcoal/80 border-b border-border last:border-0"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
