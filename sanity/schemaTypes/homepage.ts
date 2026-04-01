import { defineType, defineField, defineArrayMember } from 'sanity'

export const heroSchema = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({ name: 'headlineStart', title: 'Headline — Line 1', type: 'string' }),
    defineField({ name: 'headlineMiddle', title: 'Headline — Line 2', type: 'string' }),
    defineField({ name: 'headlineEnd', title: 'Headline — Line 3', type: 'string' }),
    defineField({
      name: 'emojiIcons',
      title: 'Emoji Icons',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'subtext', title: 'Subtext', type: 'text', rows: 3 }),
    defineField({ name: 'ctaLabel', title: 'CTA Button Label', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'CTA Button URL', type: 'string' }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({ name: 'heroCaption', title: 'Image Caption', type: 'string' }),
  ],
})

export const searchSectionSchema = defineType({
  name: 'searchSection',
  title: 'Search Section',
  type: 'object',
  fields: [
    defineField({ name: 'searchPlaceholder', title: 'Input Placeholder', type: 'string' }),
    defineField({
      name: 'searchImage',
      title: 'Background Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({ name: 'headlineStart', title: 'Headline — Line 1', type: 'string' }),
    defineField({ name: 'headlineEnd', title: 'Headline — Line 2', type: 'string' }),
  ],
})

export const journeySectionSchema = defineType({
  name: 'journeySection',
  title: 'Journey Section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', title: 'Eyebrow Label', type: 'string' }),
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'body', title: 'Body Text', type: 'text', rows: 3 }),
  ],
})

export const featureItemSchema = defineType({
  name: 'featureItem',
  title: 'Feature Item',
  type: 'object',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'ctaLabel', title: 'CTA Label', type: 'string' }),
    defineField({ name: 'ctaHref', title: 'CTA URL', type: 'string' }),
  ],
})

export const propertyCardSchema = defineType({
  name: 'propertyCard',
  title: 'Property Card',
  type: 'object',
  fields: [
    defineField({ name: 'price', title: 'Price', type: 'string' }),
    defineField({ name: 'label', title: 'Label (e.g. For Sale)', type: 'string' }),
    defineField({ name: 'title', title: 'Property Title', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
  ],
})

export const statItemSchema = defineType({
  name: 'statItem',
  title: 'Stat Item',
  type: 'object',
  fields: [
    defineField({ name: 'value', title: 'Value (e.g. 90k+)', type: 'string' }),
    defineField({ name: 'label', title: 'Label (e.g. Customers)', type: 'string' }),
  ],
})

export const serviceLocationSchema = defineType({
  name: 'serviceLocation',
  title: 'Service Location',
  type: 'object',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'type', title: 'Type (e.g. Villa)', type: 'string' }),
    defineField({ name: 'address', title: 'Address', type: 'string' }),
    defineField({ name: 'lat', title: 'Latitude', type: 'number' }),
    defineField({ name: 'lng', title: 'Longitude', type: 'number' }),
  ],
})

export const testimonialSchema = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'object',
  fields: [
    defineField({ name: 'quote', title: 'Quote', type: 'text', rows: 3 }),
    defineField({ name: 'authorName', title: 'Author Name', type: 'string' }),
    defineField({ name: 'authorRole', title: 'Author Role', type: 'string' }),
    defineField({
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
  ],
})

export const homepageSchema = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({ name: 'hero', title: 'Hero Section', type: 'hero' }),
    defineField({ name: 'searchSection', title: 'Search Section', type: 'searchSection' }),
    defineField({ name: 'journeySection', title: 'Journey Section', type: 'journeySection' }),
    defineField({
      name: 'featureStrip',
      title: 'Feature Strip Items',
      type: 'array',
      of: [defineArrayMember({ type: 'featureItem' })],
    }),
    defineField({
      name: 'neighborhoodsSection',
      title: 'Neighborhoods Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'headline', type: 'string', title: 'Headline' }),
        defineField({ name: 'city', type: 'string', title: 'City' }),
        defineField({ name: 'searchMoreLabel', type: 'string', title: 'Search More Label' }),
        defineField({ name: 'viewMoreLabel', type: 'string', title: 'View More Label' }),
        defineField({
          name: 'properties',
          title: 'Properties',
          type: 'array',
          of: [defineArrayMember({ type: 'propertyCard' })],
        }),
      ],
    }),
    defineField({
      name: 'borrowSection',
      title: 'Borrow Estimator Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'headline', type: 'string', title: 'Headline' }),
        defineField({ name: 'defaultAmount', type: 'string', title: 'Default Amount' }),
      ],
    }),
defineField({
  name: 'aboutSection',
  title: 'About / Stats Section',
  type: 'object',
  fields: [
    defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
    defineField({ name: 'headline', type: 'string', title: 'Headline' }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [defineArrayMember({ type: 'statItem' })],
    }),
    defineField({                          // ← add this
      name: 'image',
      title: 'Side Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
  ],
}),
    defineField({
      name: 'serviceAreaSection',
      title: 'Service Area Section',
      type: 'object',
      fields: [
        defineField({ name: 'eyebrow', type: 'string', title: 'Eyebrow' }),
        defineField({ name: 'headline', type: 'string', title: 'Headline' }),
        defineField({
          name: 'locations',
          title: 'Locations',
          type: 'array',
          of: [defineArrayMember({ type: 'serviceLocation' })],
        }),
      ],
    }),
    defineField({
      name: 'testimonialsSection',
      title: 'Testimonials Section',
      type: 'object',
      fields: [
        defineField({ name: 'sectionLabel', type: 'string', title: 'Section Label' }),
        defineField({ name: 'viewMoreLabel', type: 'string', title: 'View More Label' }),
        defineField({
          name: 'items',
          title: 'Testimonials',
          type: 'array',
          of: [defineArrayMember({ type: 'testimonial' })],
        }),
      ],
    }),
    defineField({
      name: 'ctaBand',
      title: 'CTA Footer Band',
      type: 'object',
      fields: [
        defineField({ name: 'headline', type: 'string', title: 'Headline' }),
        defineField({ name: 'ctaLabel', type: 'string', title: 'CTA Label' }),
        defineField({ name: 'ctaHref', type: 'string', title: 'CTA URL' }),
      ],
    }),
  ],
})

// Add this schema
export const homeRecordSchema = defineType({
  name: 'homeRecord',
  title: 'Home Record',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Property Title', type: 'string' }),
    defineField({ name: 'price', title: 'Price', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'address', title: 'Full Address', type: 'string' }),
    defineField({
      name: 'type',
      title: 'Listing Type',
      type: 'string',
      options: {
        list: [
          { title: 'For Sale', value: 'for-sale' },
          { title: 'For Rent', value: 'for-rent' },
        ],
      },
    }),
    defineField({
      name: 'image',
      title: 'Property Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt text', type: 'string' })],
    }),
    defineField({ name: 'bedrooms', title: 'Bedrooms', type: 'number' }),
    defineField({ name: 'bathrooms', title: 'Bathrooms', type: 'number' }),
    defineField({ name: 'area', title: 'Area (sqft)', type: 'number' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
  ],
})

