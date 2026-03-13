import type { GlobalConfig } from "payload";
import { hiddenFromNonAdmins, isAdminOrAbove } from "@/lib/access";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Website-Einstellungen",
  admin: {
    group: "Globale Einstellungen",
    hidden: hiddenFromNonAdmins,
  },
  access: {
    read: isAdminOrAbove,
    update: isAdminOrAbove,
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      localized: true,
      required: true,
      defaultValue: "Viconia Care",
    },
    {
      name: "defaultSEO",
      type: "group",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          localized: true,
        },
        {
          name: "metaDescription",
          type: "textarea",
          localized: true,
        },
      ],
    },
    {
      name: "logos",
      type: "group",
      fields: [
        {
          name: "primaryLogo",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "secondaryLogo",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "brandColors",
      type: "array",
      defaultValue: [
        { name: "GELB", hex: "#fecc00" },
        { name: "PETROL", hex: "#00998a" },
        { name: "SCHWARZ", hex: "#1d1d1b" },
        { name: "GRAU", hex: "#575756" },
      ],
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "hex",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};
