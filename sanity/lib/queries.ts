import { client } from "./client";
import { urlFor } from "./image";

// These fetchers return data shaped to closely match the `Product` /
// `Category` types in lib/types.ts, so pages can switch from
// lib/data.ts (mock) to these (live Sanity content) with minimal changes.
// Reviews currently stay inline on the product in lib/data.ts; here they're
// fetched as separate `review` documents referencing the product.

const productProjection = /* groq */ `{
  "id": _id,
  "slug": slug.current,
  name,
  "category": category->slug.current,
  price,
  compareAtPrice,
  "images": images[].asset->url,
  description,
  specifications,
  variants,
  badge,
  stock,
  "reviews": *[_type == "review" && references(^._id)] | order(publishedAt desc) {
    "id": _id,
    author,
    rating,
    "date": publishedAt,
    title,
    body,
    verified
  },
  "rating": round(math::avg(*[_type == "review" && references(^._id)].rating) * 10) / 10,
  "reviewCount": count(*[_type == "review" && references(^._id)])
}`;

export async function getAllProducts() {
  return client.fetch(`*[_type == "product"] | order(_createdAt desc) ${productProjection}`);
}

export async function getProductBySlug(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] ${productProjection}`,
    { slug }
  );
}

export async function getProductsByCategory(categorySlug: string) {
  return client.fetch(
    `*[_type == "product" && category->slug.current == $categorySlug] ${productProjection}`,
    { categorySlug }
  );
}

export async function getFeaturedProducts() {
  return client.fetch(`*[_type == "product" && featured == true] ${productProjection}`);
}

export async function getAllCategories() {
  return client.fetch(/* groq */ `
    *[_type == "category"] | order(order asc) {
      "slug": slug.current,
      name,
      description,
      "image": image.asset->url
    }
  `);
}

export async function getTestimonials() {
  return client.fetch(/* groq */ `
    *[_type == "testimonial" && featured == true] | order(_createdAt desc) {
      name, role, quote, rating
    }
  `);
}

export async function getActiveBanner(placement: "hero" | "limited-offer-strip" | "promo-banner") {
  return client.fetch(
    /* groq */ `
    *[_type == "banner" && placement == $placement && active == true
      && (!defined(startsAt) || startsAt <= now())
      && (!defined(endsAt) || endsAt >= now())
    ] | order(_createdAt desc)[0] {
      heading, subheading, "image": image.asset->url, ctaLabel, ctaHref
    }`,
    { placement }
  );
}

export { urlFor };
