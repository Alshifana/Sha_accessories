import { ProductCardSkeleton } from "@/components/ProductCardSkeleton";

export default function Loading() {
  return (
    <div className="container pt-32 pb-24">
      <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
