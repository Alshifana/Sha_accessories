import type { Metadata } from "next";
import { HomeClient } from "@/components/HomeClient";
import { getAllCategories, getFeaturedProducts, getTestimonials } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Elegant Photo Frames & Premium Anti-Tarnish Jewelry",
  description:
    "Shop handcrafted photo frames and anti-tarnish necklaces, earrings, bracelets and rings. Free shipping on orders above ₹1999.",
};

export default async function HomePage() {
  const [categories, featuredProducts, testimonials] = await Promise.all([
    getAllCategories(),
    getFeaturedProducts(),
    getTestimonials(),
  ]);

  return (
    <HomeClient
      categories={categories}
      featuredProducts={featuredProducts}
      testimonials={testimonials}
    />
  );
}
