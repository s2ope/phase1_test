// sanity/queries.ts
export const searchLocationsQuery = `
  *[_type == "homeRecord"] {
    location
  }
`

export const searchPropertiesQuery = `
  *[_type == "homeRecord" && location match $location + "*"] {
    _id,
    title,
    price,
    location,
    address,
    type,
    bedrooms,
    bathrooms,
    area,
    "image": image { 
      "url": asset->url, 
      alt 
    }
  }
`