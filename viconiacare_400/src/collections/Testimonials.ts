import type { CollectionConfig } from "payload";
import { cmsContentAccess } from "@/lib/access";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: {
    singular: "Testimonial",
    plural: "Testimonials",
  },
  admin: {
    group: "Sammlungen",
    useAsTitle: "name",
    defaultColumns: ["name", "rating", "updatedAt"],
  },
  access: cmsContentAccess,
  fields: [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "quote",
      label: "Zitat",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "rating",
      label: "Bewertung (1–5)",
      type: "number",
      min: 1,
      max: 5,
    },
    {
      name: 'avatar',
      label: 'Family Photo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: "published",
      label: "Veröffentlicht",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
