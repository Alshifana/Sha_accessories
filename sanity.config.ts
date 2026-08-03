import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { apiVersion, dataset, projectId } from "./sanity/env";
import { schema } from "./sanity/schemaTypes";

export default defineConfig({
  basePath: "/studio",
  name: "sha-accessories",
  title: "Sha-Accessories CMS",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool(),
    // Vision lets you run raw GROQ queries from within the Studio — handy
    // for testing the queries in sanity/lib/queries.ts. Safe to remove
    // `visionTool()` from plugins below for production if not needed.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
