import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // `false` in development so edits show up immediately without needing to
  // wait for the CDN cache; Sanity recommends `true` in production.
  useCdn: process.env.NODE_ENV === "production",
});
