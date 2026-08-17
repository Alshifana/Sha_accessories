import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Storefront pages should show newly published Studio content immediately
  // after deployment/request instead of waiting for Sanity CDN cache.
  useCdn: false,
});
