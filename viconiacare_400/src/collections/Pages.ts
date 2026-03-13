import type { CollectionConfig, Field } from "payload";
import { cmsContentAccess } from "@/lib/access";

const linkField: Field = {
  name: "link",
  type: "group",
  fields: [
    {
      name: "label",
      type: "text",
      localized: true,
      required: true,
    },
    {
      name: "url",
      type: "text",
      required: true,
    },
    {
      name: "newTab",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    group: "Sammlungen",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "_status", "updatedAt", "createdAt"],
    listSearchableFields: ["title", "slug"],
    pagination: {
      defaultLimit: 25,
      limits: [10, 25, 50, 100],
    },
  },
  access: cmsContentAccess,
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "hero",
      type: "group",
      fields: [
        {
          name: "headline",
          type: "text",
          localized: true,
        },
        {
          name: "subline",
          type: "textarea",
          localized: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        linkField,
      ],
    },
    {
      name: "content",
      type: "richText",
      localized: true,
    },
  ],
};
