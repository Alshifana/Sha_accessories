import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCategories, getProductsByCategory } from "@/sanity/lib/queries";
import { CategoryClient } from "@/components/CategoryClient";
import { SafeImage } from "@/components/SafeImage";

type CategorySlug = { slug: string };
type CategoryCard = {
  slug: string;
  name: string;
  description: string;
  image: string;
};

export async function generateStaticParams() {
  const categories = (await getAllCategories()) as CategorySlug[];
  return categories.map((c: CategorySlug) => ({ slug: c.slug }));
}

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = (await getAllCategories()) as CategoryCard[];
  const category = categories.find((category: CategoryCard) => category.slug === slug);
  if (!category) return {};
  return {
    title: category.name,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const categories = (await getAllCategories()) as CategoryCard[];
  const category = categories.find((category: CategoryCard) => category.slug === slug);
  if (!category) notFound();
  const items = await getProductsByCategory(category.slug);

  return (
    <div className="pt-16">
      <div className="relative h-64 w-full overflow-hidden bg-charcoal sm:h-80">
        <SafeImage
          src={category.image}
          alt={category.name}
          fill
          className="object-cover opacity-60"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-6">
          <p className="eyebrow text-gold-light">Category</p>
          <h1 className="mt-3 font-display text-4xl text-ivory">{category.name}</h1>
          <p className="mt-2 max-w-md text-sm text-ivory/70">{category.description}</p>
        </div>
      </div>

      <CategoryClient items={items} categoryName={category.name} />
    </div>
  );
}
