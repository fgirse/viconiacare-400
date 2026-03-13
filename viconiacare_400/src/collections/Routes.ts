import type { CollectionConfig } from "payload";
import { adminContentAccess, hiddenFromNonAdmins } from "@/lib/access";

export const Routes: CollectionConfig = {
  slug: "routes",
  labels: {
    singular: "Route",
    plural: "Routen",
  },
  admin: {
    group: "Routenplanung",
    useAsTitle: "title",
    defaultColumns: ["title", "driver", "date", "status", "updatedAt"],
    hidden: hiddenFromNonAdmins,
  },
  access: adminContentAccess,
  fields: [
    {
      name: "title",
      label: "Routenbezeichnung",
      type: "text",
      required: true,
    },
    {
      name: "driver",
      label: "Fahrer / Pflegekraft",
      type: "relationship",
      relationTo: "staff",
    },
    {
      name: "date",
      label: "Datum",
      type: "date",
      required: true,
    },
    {
      name: "stops",
      label: "Haltepunkte",
      type: "array",
      fields: [
        {
          name: "patient",
          label: "Patient",
          type: "relationship",
          relationTo: "patients",
          required: true,
        },
        {
          name: "estimatedArrival",
          label: "Geplante Ankunft",
          type: "text",
        },
        {
          name: "durationMinutes",
          label: "Dauer (Minuten)",
          type: "number",
          defaultValue: 60,
        },
        { name: "notes", label: "Notiz", type: "text" },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      defaultValue: "planned",
      options: [
        { label: "Geplant", value: "planned" },
        { label: "Unterwegs", value: "inProgress" },
        { label: "Abgeschlossen", value: "completed" },
        { label: "Abgebrochen", value: "cancelled" },
      ],
    },
    {
      name: "notes",
      label: "Notizen",
      type: "textarea",
    },
  ],
};
