import type { CollectionConfig } from "payload";
import { cmsContentAccess } from "@/lib/access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Sammlungen",
    useAsTitle: "filename",
    defaultColumns: ["filename", "alt", "mimeType", "filesize", "updatedAt"],
    listSearchableFields: ["filename", "alt"],
    pagination: {
      defaultLimit: 25,
      limits: [10, 25, 50, 100],
    },
  },
  upload: {
    adminThumbnail: "card",
    imageSizes: [
      {
        name: "card",
        width: 600,
        height: 400,
        fit: "cover",
      },
      {
        name: "hero",
        width: 1600,
        height: 900,
        fit: "cover",
      },
    ],
    mimeTypes: ["image/*"],
  },
  access: cmsContentAccess,
  fields: [
    {
      name: "alt",
      type: "text",
      localized: true,
      required: true,
    },
  ],
};
