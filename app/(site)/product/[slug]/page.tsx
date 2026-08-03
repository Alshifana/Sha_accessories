import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/ProductDetailClient";
import { formatPrice } from "@/lib/utils";
import { getAllProducts, getProductBySlug, getProductsByCategory } from "@/sanity/lib/queries";
import type { Product } from "@/lib/types";

type ProductSlug = { slug: string };

export async function generateStaticParams() {
  const products = (await getAllProducts()) as ProductSlug[];
  return products.map((p: ProductSlug) => ({ slug: p.slug }));
}

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.name} — ${formatPrice(product.price)}. ${product.description.slice(0, 140)}`,
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = (await getProductBySlug(slug)) as Product | null;
  if (!product) notFound();
  const relatedProducts = await getProductsByCategory(product.category);
  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts.filter((item: Product) => item.id !== product.id)}
    />
  );
}
