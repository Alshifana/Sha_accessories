import type { SchemaTypeDefinition } from "sanity";
import { productType } from "./product";
import { categoryType } from "./category";
import { reviewType, testimonialType, bannerType } from "./misc";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [productType, categoryType, reviewType, testimonialType, bannerType],
};
