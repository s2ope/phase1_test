import { type SchemaTypeDefinition } from 'sanity'
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
  homeRecordSchema, 
} from './homepage'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    homepageSchema,
    heroSchema,
    searchSectionSchema,
    journeySectionSchema,
    featureItemSchema,
    propertyCardSchema,
    statItemSchema,
    serviceLocationSchema,
    testimonialSchema,
    homeRecordSchema, 
  ],
}