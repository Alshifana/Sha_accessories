import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "price", title: "Price (INR)", type: "number", validation: (r) => r.required().positive() }),
    defineField({ name: "compareAtPrice", title: "Compare-at price (INR)", type: "number" }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "specifications",
      title: "Specifications",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
          ],
        },
      ],
    }),
    defineField({
      name: "variants",
      title: "Color variants",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "color", type: "string", title: "Color name" },
            { name: "hex", type: "string", title: "Hex color", description: "e.g. #C9A66B" },
          ],
        },
      ],
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      options: { list: ["New", "Bestseller", "Limited"] },
    }),
    defineField({ name: "stock", title: "Stock quantity", type: "number", initialValue: 0 }),
    defineField({ name: "featured", title: "Featured on homepage", type: "boolean", initialValue: false }),
  ],
  preview: {
    select: { title: "name", media: "images.0", subtitle: "price" },
    prepare({ title, media, subtitle }) {
      return { title, subtitle: subtitle ? `₹${subtitle}` : "", media };
    },
  },
});
