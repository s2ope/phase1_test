// sanity/queries.ts

// Used by SearchBar to populate autocomplete suggestions
export const searchLocationsQuery = `
  *[_type == "homeRecord"] {
    title,
    location,
    address
  }
`

// Used by properties/page.tsx — fetches everything, filtering happens in JS
export const allPropertiesQuery = `
  *[_type == "homeRecord"] {
    _id,
    title,
    price,
    location,
    address,
    type,
    bedrooms,
    bathrooms,
    area,
    description,
    "image": image {
      "url": asset->url,
      alt
    }
  }
`