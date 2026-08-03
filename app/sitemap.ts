import type { MetadataRoute } from "next";
import { getAllCategories, getAllProducts } from "@/sanity/lib/queries";

type SitemapCategory = { slug: string };
type SitemapProduct = { slug: string };

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://sha-accessories.example.com";
  const staticPages = [
    "",
    "/shop",
    "/about",
    "/contact",
    "/faq",
    "/shipping",
    "/returns",
    "/privacy",
    "/terms",
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));

  const [categories, products] = (await Promise.all([
    getAllCategories(),
    getAllProducts(),
  ])) as [SitemapCategory[], SitemapProduct[]];

  const categoryPages = categories.map((c: SitemapCategory) => ({
    url: `${base}/category/${c.slug}`,
    lastModified: new Date(),
  }));

  const productPages = products.map((p: SitemapProduct) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
