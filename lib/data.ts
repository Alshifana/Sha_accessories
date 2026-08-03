import { Category, Product } from "./types";

export const categories: Category[] = [
  {
    slug: "photo-frames",
    name: "Photo Frames",
    description: "Hand-finished frames in wood, brass and resin",
    image:
      "https://images.unsplash.com/photo-1582645636188-542b3d9c98be?q=80&w=900&auto=format&fit=crop",
  },
  {
    slug: "necklaces",
    name: "Anti-Tarnish Necklaces",
    description: "Everyday gold-toned layers that keep their shine",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=900&auto=format&fit=crop",
  },
  {
    slug: "earrings",
    name: "Earrings",
    description: "Studs, hoops and drops for every occasion",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=900&auto=format&fit=crop",
  },
  {
    slug: "bracelets",
    name: "Bracelets",
    description: "Stackable bands finished by hand",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=900&auto=format&fit=crop",
  },
  {
    slug: "rings",
    name: "Rings",
    description: "Minimal bands and statement pieces",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=900&auto=format&fit=crop",
  },
];

const placeholderReviews = (seed: string) => [
  {
    id: `${seed}-r1`,
    author: "Ananya R.",
    rating: 5,
    date: "2026-05-14",
    title: "Exceeded expectations",
    body: "The finish feels so much more premium than the price suggests. Packaging was lovely too.",
    verified: true,
  },
  {
    id: `${seed}-r2`,
    author: "Meera K.",
    rating: 4,
    date: "2026-04-02",
    title: "Lovely, true to photos",
    body: "Exactly as pictured, arrived quickly and well protected.",
    verified: true,
  },
  {
    id: `${seed}-r3`,
    author: "Priya S.",
    rating: 5,
    date: "2026-02-21",
    title: "My go-to gift now",
    body: "Bought this for a friend and ended up ordering one for myself the same week.",
    verified: false,
  },
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "walnut-edge-frame",
    name: "Walnut Edge Photo Frame",
    category: "photo-frames",
    price: 1899,
    compareAtPrice: 2499,
    rating: 4.8,
    reviewCount: 132,
    images: [
      "https://images.unsplash.com/photo-1582645636188-542b3d9c98be?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
    ],
    hoverImage:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop",
    description:
      "Solid walnut frame with a hand-sanded bevel edge and museum-grade glass. Each piece is finished individually, so light grain variation is part of its character, not a flaw.",
    specifications: [
      { label: "Material", value: "Solid walnut wood" },
      { label: "Glass", value: "Anti-glare museum glass" },
      { label: "Fits", value: "5x7 in, 8x10 in" },
      { label: "Finish", value: "Hand-sanded, oiled" },
      { label: "Care", value: "Wipe with a dry soft cloth" },
    ],
    variants: [
      { id: "v1", color: "Walnut", hex: "#6B4A31" },
      { id: "v2", color: "Ebony", hex: "#2B2420" },
    ],
    tags: ["frame", "wood", "bestseller"],
    badge: "Bestseller",
    stock: 24,
    reviews: placeholderReviews("p1"),
  },
  {
    id: "p2",
    slug: "brushed-brass-frame",
    name: "Brushed Brass Frame",
    category: "photo-frames",
    price: 1599,
    rating: 4.6,
    reviewCount: 84,
    images: [
      "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?q=80&w=1200&auto=format&fit=crop",
    ],
    hoverImage:
      "https://images.unsplash.com/photo-1524634126442-357e0eac3c14?q=80&w=1200&auto=format&fit=crop",
    description:
      "A slim brushed-brass frame that catches the light without overpowering the photograph inside. Tarnish-resistant coating keeps the warmth intact for years.",
    specifications: [
      { label: "Material", value: "Brushed brass, lacquer sealed" },
      { label: "Glass", value: "Clear tempered glass" },
      { label: "Fits", value: "4x6 in" },
      { label: "Finish", value: "Brushed matte" },
    ],
    tags: ["frame", "brass", "new"],
    badge: "New",
    stock: 40,
    reviews: placeholderReviews("p2"),
  },
  {
    id: "p3",
    slug: "layered-coin-necklace",
    name: "Layered Coin Necklace",
    category: "necklaces",
    price: 1299,
    compareAtPrice: 1799,
    rating: 4.9,
    reviewCount: 210,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop",
    ],
    hoverImage:
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop",
    description:
      "Two fine chains layered with a coin pendant, plated in 18k gold over brass with an anti-tarnish sealant so it holds its colour through daily wear, water and sweat.",
    specifications: [
      { label: "Base metal", value: "Brass" },
      { label: "Plating", value: "18k gold, anti-tarnish sealed" },
      { label: "Length", value: "16 in + 2 in extender" },
      { label: "Water resistant", value: "Yes, avoid prolonged soaking" },
    ],
    variants: [
      { id: "v1", color: "Gold", hex: "#C9A66B" },
      { id: "v2", color: "Rose Gold", hex: "#D9B7A3" },
    ],
    tags: ["necklace", "bestseller"],
    badge: "Bestseller",
    stock: 60,
    reviews: placeholderReviews("p3"),
  },
  {
    id: "p4",
    slug: "petite-hoop-earrings",
    name: "Petite Hoop Earrings",
    category: "earrings",
    price: 699,
    rating: 4.7,
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop",
    ],
    hoverImage:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop",
    description:
      "Lightweight hoops finished with the same anti-tarnish plating used across the jewelry line, so they stay bright with everyday wear.",
    specifications: [
      { label: "Base metal", value: "Brass" },
      { label: "Plating", value: "18k gold, anti-tarnish sealed" },
      { label: "Diameter", value: "18mm" },
    ],
    tags: ["earrings", "new"],
    badge: "New",
    stock: 75,
    reviews: placeholderReviews("p4"),
  },
  {
    id: "p5",
    slug: "stacking-bangle-set",
    name: "Stacking Bangle Set",
    category: "bracelets",
    price: 999,
    compareAtPrice: 1299,
    rating: 4.5,
    reviewCount: 98,
    images: [
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "A set of three slim bangles designed to be worn together or separately, plated to resist tarnish from daily wear.",
    specifications: [
      { label: "Base metal", value: "Brass" },
      { label: "Plating", value: "18k gold, anti-tarnish sealed" },
      { label: "Set includes", value: "3 bangles" },
    ],
    tags: ["bracelet", "limited"],
    badge: "Limited",
    stock: 12,
    reviews: placeholderReviews("p5"),
  },
  {
    id: "p6",
    slug: "signet-band-ring",
    name: "Signet Band Ring",
    category: "rings",
    price: 799,
    rating: 4.6,
    reviewCount: 61,
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "A minimal signet-style band with a brushed face, sized to layer alongside thinner stacking rings.",
    specifications: [
      { label: "Base metal", value: "Brass" },
      { label: "Plating", value: "18k gold, anti-tarnish sealed" },
      { label: "Sizes", value: "US 5–9" },
    ],
    variants: [
      { id: "v1", color: "Gold", hex: "#C9A66B" },
      { id: "v2", color: "Silver", hex: "#C7C7C7" },
    ],
    tags: ["ring"],
    stock: 33,
    reviews: placeholderReviews("p6"),
  },
  {
    id: "p7",
    slug: "gallery-collage-frame",
    name: "Gallery Collage Frame (Set of 5)",
    category: "photo-frames",
    price: 3499,
    compareAtPrice: 4299,
    rating: 4.9,
    reviewCount: 47,
    images: [
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549187774-b4e9b0445b41?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "A curated set of five frames in mixed sizes and finishes, designed to be arranged together as a single gallery wall moment.",
    specifications: [
      { label: "Set includes", value: "5 frames, mixed sizes" },
      { label: "Material", value: "Walnut & brushed brass" },
      { label: "Hanging kit", value: "Included" },
    ],
    tags: ["frame", "limited"],
    badge: "Limited",
    stock: 8,
    reviews: placeholderReviews("p7"),
  },
  {
    id: "p8",
    slug: "pearl-drop-earrings",
    name: "Pearl Drop Earrings",
    category: "earrings",
    price: 899,
    rating: 4.8,
    reviewCount: 73,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1200&auto=format&fit=crop",
    ],
    description:
      "Freshwater pearl drops on anti-tarnish gold-plated hooks, light enough for all-day wear.",
    specifications: [
      { label: "Base metal", value: "Brass, anti-tarnish plated" },
      { label: "Stone", value: "Freshwater pearl" },
      { label: "Drop length", value: "28mm" },
    ],
    tags: ["earrings", "bestseller"],
    badge: "Bestseller",
    stock: 51,
    reviews: placeholderReviews("p8"),
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (slug: string) =>
  products.filter((p) => p.category === slug);

export const getRelatedProducts = (product: Product, count = 4) =>
  products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, count);

export const bestSellers = products.filter((p) => p.badge === "Bestseller");
export const newArrivals = products.filter((p) => p.badge === "New");
export const limitedOffers = products.filter((p) => p.badge === "Limited" || p.compareAtPrice);
