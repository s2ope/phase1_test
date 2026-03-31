import { defineType, defineField, defineArrayMember } from "sanity";

// ─── hero schema ──────────────────────────────────────────────────────────────
export const heroSchema = defineType({
  name: "hero",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({ name: "headlineStart", title: "Headline — Line 1", type: "string" }),
    defineField({ name: "headlineMiddle", title: "Headline — Line 2", type: "string" }),
    defineField({ name: "headlineEnd", title: "Headline — Line 3", type: "string" }),
    defineField({
      name: "emojiIcons",
      title: "Emoji Icons (inline)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({ name: "subtext", title: "Subtext", type: "text", rows: 3 }),
    defineField({ name: "ctaLabel", title: "CTA Button Label", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA Button URL", type: "string" }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "heroCaption", title: "Image Caption", type: "string" }),
  ],
});

// ─── searchSection schema ─────────────────────────────────────────────────────
export const searchSectionSchema = defineType({
  name: "searchSection",
  title: "Search Section",
  type: "object",
  fields: [
    defineField({ name: "searchPlaceholder", title: "Input Placeholder", type: "string" }),
    defineField({
      name: "searchImage",
      title: "Background Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "headlineStart", title: "Headline — Line 1", type: "string" }),
    defineField({ name: "headlineEnd", title: "Headline — Line 2", type: "string" }),
  ],
});

// ─── journeySection schema ────────────────────────────────────────────────────
export const journeySectionSchema = defineType({
  name: "journeySection",
  title: "Journey Section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "body", title: "Body Text", type: "text", rows: 3 }),
  ],
});

// ─── featureStrip schema ──────────────────────────────────────────────────────
export const featureItemSchema = defineType({
  name: "featureItem",
  title: "Feature Item",
  type: "object",
  fields: [
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA URL", type: "string" }),
  ],
});

// ─── propertyCard schema ──────────────────────────────────────────────────────
export const propertyCardSchema = defineType({
  name: "propertyCard",
  title: "Property Card",
  type: "object",
  fields: [
    defineField({ name: "price", title: "Price", type: "string" }),
    defineField({ name: "label", title: "Label (e.g. For Sale)", type: "string" }),
    defineField({ name: "title", title: "Property Title", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
});

// ─── stat item schema ─────────────────────────────────────────────────────────
export const statItemSchema = defineType({
  name: "statItem",
  title: "Stat Item",
  type: "object",
  fields: [
    defineField({ name: "value", title: "Value (e.g. 90k+)", type: "string" }),
    defineField({ name: "label", title: "Label (e.g. Customers)", type: "string" }),
  ],
});

// ─── serviceLocation schema ───────────────────────────────────────────────────
export const serviceLocationSchema = defineType({
  name: "serviceLocation",
  title: "Service Location",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "type", title: "Type (e.g. Villa)", type: "string" }),
    defineField({ name: "address", title: "Address", type: "string" }),
    defineField({ name: "lat", title: "Latitude", type: "number" }),
    defineField({ name: "lng", title: "Longitude", type: "number" }),
  ],
});

// ─── testimonial schema ───────────────────────────────────────────────────────
export const testimonialSchema = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({ name: "quote", title: "Quote", type: "text", rows: 3 }),
    defineField({ name: "authorName", title: "Author Name", type: "string" }),
    defineField({ name: "authorRole", title: "Author Role", type: "string" }),
    defineField({
      name: "authorImage",
      title: "Author Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
  ],
});

// ─── homepage document ────────────────────────────────────────────────────────
export const homepageSchema = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({ name: "hero", title: "Hero Section", type: "hero" }),
    defineField({ name: "searchSection", title: "Search Section", type: "searchSection" }),
    defineField({ name: "journeySection", title: "Journey Section", type: "journeySection" }),
    defineField({
      name: "featureStrip",
      title: "Feature Strip Items",
      type: "array",
      of: [defineArrayMember({ type: "featureItem" })],
    }),
    defineField({
      name: "neighborhoodsSection",
      title: "Neighborhoods Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "string" }),
        defineField({ name: "city", type: "string" }),
        defineField({ name: "searchMoreLabel", type: "string" }),
        defineField({ name: "viewMoreLabel", type: "string" }),
        defineField({
          name: "properties",
          type: "array",
          of: [defineArrayMember({ type: "propertyCard" })],
        }),
      ],
    }),
    defineField({
      name: "borrowSection",
      title: "Borrow Estimator Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "string" }),
        defineField({ name: "defaultAmount", type: "string" }),
      ],
    }),
    defineField({
      name: "aboutSection",
      title: "About / Stats Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "string" }),
        defineField({
          name: "stats",
          type: "array",
          of: [defineArrayMember({ type: "statItem" })],
        }),
      ],
    }),
    defineField({
      name: "serviceAreaSection",
      title: "Service Area Section",
      type: "object",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "headline", type: "string" }),
        defineField({
          name: "locations",
          type: "array",
          of: [defineArrayMember({ type: "serviceLocation" })],
        }),
      ],
    }),
    defineField({
      name: "testimonialsSection",
      title: "Testimonials Section",
      type: "object",
      fields: [
        defineField({ name: "sectionLabel", type: "string" }),
        defineField({ name: "viewMoreLabel", type: "string" }),
        defineField({
          name: "items",
          type: "array",
          of: [defineArrayMember({ type: "testimonial" })],
        }),
      ],
    }),
    defineField({
      name: "ctaBand",
      title: "CTA Footer Band",
      type: "object",
      fields: [
        defineField({ name: "headline", type: "string" }),
        defineField({ name: "ctaLabel", type: "string" }),
        defineField({ name: "ctaHref", type: "string" }),
      ],
    }),
  ],
});