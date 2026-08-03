export type Category = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export type ProductVariant = {
  id: string;
  color: string;
  hex: string;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  hoverImage?: string;
  description: string;
  specifications: { label: string; value: string }[];
  variants?: ProductVariant[];
  tags?: string[];
  badge?: "New" | "Bestseller" | "Limited";
  stock: number;
  reviews: Review[];
};

export type CartItem = {
  productId: string;
  variantId?: string;
  quantity: number;
};
