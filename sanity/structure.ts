import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Flatter CMS')
    .items([
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(
          S.document()
            .schemaType('homepage')
            .documentId('e3f0f7a6-ae96-405b-b43d-e94664b3a94f') // ← real ID
        ),
    ])