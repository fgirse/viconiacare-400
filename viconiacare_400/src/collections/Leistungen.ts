import type { CollectionConfig } from "payload";
import { careContentAccess } from "@/lib/access";

export const Leistungen: CollectionConfig = {
  slug: "leistungen",
  labels: {
    singular: "Leistung",
    plural: "Leistungen",
  },
  admin: {
    group: "Pflegeangebote",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "price", "updatedAt"],
    listSearchableFields: ["title"],
  },
  access: careContentAccess,
  fields: [
    {
      name: "title",
      label: "Bezeichnung",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "category",
      label: "Kategorie",
      type: "select",
      options: [
        { label: "Grundpflege", value: "basicCare" },
        { label: "Behandlungspflege", value: "medicalCare" },
        { label: "Hauswirtschaft", value: "housekeeping" },
        { label: "Begleitung & Beratung", value: "companionship" },
        { label: "Intensivpflege", value: "intensiveCare" },
      ],
    },
    {
      name: "description",
      label: "Beschreibung",
      type: "richText",
      localized: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "price",
          label: "Preis pro Stunde (€)",
          type: "number",
        },
        {
          name: "billingUnit",
          label: "Abrechnungseinheit",
          type: "select",
          options: [
            { label: "Pro Stunde", value: "perHour" },
            { label: "Pro Besuch", value: "perVisit" },
            { label: "Pro Tag", value: "perDay" },
            { label: "Pro Monat", value: "perMonth" },
          ],
        },
      ],
    },
    {
      name: "active",
      label: "Aktiv",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
