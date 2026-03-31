// sanity.config.ts  ← lives at the root of your project

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import {
  homepageSchema,
  heroSchema,
  searchSectionSchema,
  journeySectionSchema,
  featureItemSchema,
  propertyCardSchema,
  statItemSchema,
  serviceLocationSchema,
  testimonialSchema,
} from "./sanity/schemas/homepage";

export default defineConfig({
  // ── Project identity ──────────────────────────────────────────────────────
  name: "flatter-studio",
  title: "Flatter Studio",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  // ── Studio route (accessible at /studio in your Next.js app) ─────────────
  basePath: "/studio",

  // ── Plugins ───────────────────────────────────────────────────────────────
  plugins: [
    structureTool(),   // main content editor UI
    visionTool(),      // lets you run GROQ queries live in the studio
  ],

  // ── Schema types ──────────────────────────────────────────────────────────
  schema: {
    types: [
      // Document (the actual page in Sanity)
      homepageSchema,

      // Object types (reusable blocks used inside the document)
      heroSchema,
      searchSectionSchema,
      journeySectionSchema,
      featureItemSchema,
      propertyCardSchema,
      statItemSchema,
      serviceLocationSchema,
      testimonialSchema,
    ],
  },
});