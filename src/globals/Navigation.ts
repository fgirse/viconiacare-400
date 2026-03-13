import type { Field, GlobalConfig } from "payload";
import { isEditorOrAbove } from "@/lib/access";

// ── Sub-Sub Items ─────────────────────────────────────────────────────────────
const subSubItems: Field = {
  name: "subSubItems",
  label: "Sub-Sub Items",
  type: "array",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "label",
          label: "Bezeichnung",
          type: "text",
          localized: true,
          required: true,
        },
        {
          name: "url",
          label: "URL",
          type: "text",
          required: true,
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "icon",
          label: "Icon (Lucide-Name)",
          type: "text",
          admin: { width: "50%", placeholder: "z.B. Activity" },
        },
        {
          name: "badge",
          label: "Badge / Label",
          type: "text",
          admin: { width: "50%", placeholder: "z.B. Neu" },
        },
      ],
    },
    {
      name: "description",
      label: "Kurzbeschreibung",
      type: "text",
      localized: true,
    },
    {
      name: "openInNewTab",
      label: "In neuem Tab öffnen",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};

// ── Sub Items ─────────────────────────────────────────────────────────────────
const subItems: Field = {
  name: "subItems",
  label: "Sub Items",
  type: "array",
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "label",
          label: "Bezeichnung",
          type: "text",
          localized: true,
          required: true,
        },
        {
          name: "url",
          label: "URL",
          type: "text",
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "icon",
          label: "Icon (Lucide-Name)",
          type: "text",
          admin: { width: "50%", placeholder: "z.B. Heart" },
        },
        {
          name: "badge",
          label: "Badge / Label",
          type: "text",
          admin: { width: "50%", placeholder: "z.B. Beliebt" },
        },
      ],
    },
    {
      name: "description",
      label: "Kurzbeschreibung",
      type: "text",
      localized: true,
    },
    {
      name: "openInNewTab",
      label: "In neuem Tab öffnen",
      type: "checkbox",
      defaultValue: false,
    },
    subSubItems,
  ],
};

// ── Navigation Global ─────────────────────────────────────────────────────────
export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  admin: {
    group: "Globale Einstellungen",
  },
  access: {
    read: isEditorOrAbove,
    update: isEditorOrAbove,
  },
  fields: [
    {
      name: "items",
      label: "Navigations-Items",
      type: "array",
      required: true,
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "label",
              label: "Bezeichnung",
              type: "text",
              localized: true,
              required: true,
            },
            {
              name: "url",
              label: "URL",
              type: "text",
            },
          ],
        },
        {
          type: "row",
          fields: [
            {
              name: "icon",
              label: "Icon (Lucide-Name)",
              type: "text",
              admin: { width: "50%", placeholder: "z.B. Home" },
            },
            {
              name: "badge",
              label: "Badge / Label",
              type: "text",
              admin: { width: "50%", placeholder: "z.B. Neu" },
            },
          ],
        },
        {
          name: "description",
          label: "Kurzbeschreibung",
          type: "text",
          localized: true,
        },
        {
          type: "row",
          fields: [
            {
              name: "openInNewTab",
              label: "In neuem Tab öffnen",
              type: "checkbox",
              defaultValue: false,
            },
            {
              name: "highlighted",
              label: "Hervorgehoben (CTA)",
              type: "checkbox",
              defaultValue: false,
            },
          ],
        },
        subItems,
      ],
    },
  ],
};
