import { defineField, defineType } from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "author", title: "Author name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      validation: (r) => r.required().min(1).max(5),
    }),
    defineField({ name: "title", title: "Review title", type: "string" }),
    defineField({ name: "body", title: "Review body", type: "text", rows: 3 }),
    defineField({ name: "verified", title: "Verified buyer", type: "boolean", initialValue: true }),
    defineField({ name: "publishedAt", title: "Date", type: "datetime", initialValue: () => new Date().toISOString() }),
  ],
});

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Customer name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "role", title: "Role / label", type: "string", initialValue: "Verified Buyer" }),
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "rating", title: "Rating", type: "number", validation: (r) => r.min(1).max(5) }),
    defineField({ name: "featured", title: "Show on homepage", type: "boolean", initialValue: true }),
  ],
});

export const bannerType = defineType({
  name: "banner",
  title: "Banner",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Internal title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "ctaLabel", title: "Button label", type: "string" }),
    defineField({ name: "ctaHref", title: "Button link", type: "string" }),
    defineField({
      name: "placement",
      title: "Placement",
      type: "string",
      options: { list: ["hero", "limited-offer-strip", "promo-banner"] },
    }),
    defineField({ name: "active", title: "Active", type: "boolean", initialValue: true }),
    defineField({ name: "startsAt", title: "Starts at", type: "datetime" }),
    defineField({ name: "endsAt", title: "Ends at", type: "datetime" }),
  ],
});
