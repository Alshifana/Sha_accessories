"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";

const QuickView = dynamic(() => import("@/components/QuickView").then((mod) => mod.QuickView), {
  ssr: false,
  loading: () => null,
});

type ShopClientProps = {
  categories: { slug: string; name: string; description: string; image: string }[];
  products: Product[];
};

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

export function ShopClient({ categories, products }: ShopClientProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialFilter = searchParams.get("filter");

  const [query, setQuery] = useState(initialQuery);
  const [activeCategories, setActiveCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(4000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const toggleCategory = (slug: string) => {
    setActiveCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const filtered = useMemo(() => {
    let list = [...products];

    if (query) {
      list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    }
    if (activeCategories.length > 0) {
      list = list.filter((p) => activeCategories.includes(p.category));
    }
    if (initialFilter === "bestseller") list = list.filter((p) => p.badge === "Bestseller");
    if (initialFilter === "new") list = list.filter((p) => p.badge === "New");

    list = list.filter((p) => p.price <= priceRange);
    list = list.filter((p) => p.rating >= minRating);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        list.sort((a, b) => (a.badge === "New" ? -1 : 1) - (b.badge === "New" ? -1 : 1));
        break;
    }
    return list;
  }, [products, query, activeCategories, priceRange, minRating, sort, initialFilter]);

  return (
    <div className="pt-32 pb-24">
      <div className="container">
        <SectionHeading eyebrow="The full collection" title="Shop All" align="left" />

        <div className="mt-10 flex items-center justify-between gap-4 border-b border-border pb-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 text-xs uppercase tracking-widest2 lg:hidden"
          >
            <SlidersHorizontal size={14} /> Filters
          </button>
          <p className="text-xs text-charcoal/50">{filtered.length} products</p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-border bg-ivory px-3 py-2 text-xs uppercase tracking-wide focus:outline-none focus:border-gold"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[240px_1fr]">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <FilterPanel
              categories={categories}
              query={query}
              setQuery={setQuery}
              activeCategories={activeCategories}
              toggleCategory={toggleCategory}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              minRating={minRating}
              setMinRating={setMinRating}
            />
          </aside>

          <div>
            {filtered.length === 0 ? (
              <div className="py-24 text-center">
                <p className="font-display text-xl">No products match your filters</p>
                <p className="mt-2 text-sm text-charcoal/50">Try widening your price range or clearing filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 xl:grid-cols-4">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onQuickView={setQuickViewProduct} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-charcoal/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto bg-ivory p-6">
            <div className="flex items-center justify-between">
              <span className="font-display text-lg">Filters</span>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="mt-6">
              <FilterPanel
                categories={categories}
                query={query}
                setQuery={setQuery}
                activeCategories={activeCategories}
                toggleCategory={toggleCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                minRating={minRating}
                setMinRating={setMinRating}
              />
            </div>
          </div>
        </div>
      )}

      <QuickView product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
    </div>
  );
}

function FilterPanel({
  categories,
  query,
  setQuery,
  activeCategories,
  toggleCategory,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
}: {
  categories: { slug: string; name: string; description: string; image: string }[];
  query: string;
  setQuery: (v: string) => void;
  activeCategories: string[];
  toggleCategory: (slug: string) => void;
  priceRange: number;
  setPriceRange: (v: number) => void;
  minRating: number;
  setMinRating: (v: number) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products"
          className="w-full border border-border bg-ivory px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
        />
      </div>

      <div>
        <h4 className="text-xs uppercase tracking-widest2 text-charcoal/50">Category</h4>
        <ul className="mt-3 space-y-2.5">
          {categories.map((c) => (
            <li key={c.slug}>
              <label className="flex items-center gap-2.5 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeCategories.includes(c.slug)}
                  onChange={() => toggleCategory(c.slug)}
                  className="h-4 w-4 accent-gold"
                />
                {c.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-xs uppercase tracking-widest2 text-charcoal/50">
          Max Price: {formatPrice(priceRange)}
        </h4>
        <input
          type="range"
          min={500}
          max={4000}
          step={100}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="mt-3 w-full accent-gold"
        />
      </div>

      <div>
        <h4 className="text-xs uppercase tracking-widest2 text-charcoal/50">Minimum Rating</h4>
        <div className="mt-3 flex gap-2">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={cn(
                "border px-3 py-1.5 text-xs",
                minRating === r ? "border-gold bg-gold text-ivory" : "border-border text-charcoal/60"
              )}
            >
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
