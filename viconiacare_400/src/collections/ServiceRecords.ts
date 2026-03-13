import type { CollectionConfig } from "payload";
import { careContentAccess } from "@/lib/access";

export const ServiceRecords: CollectionConfig = {
  slug: "service-records",
  labels: {
    singular: "Leistungsnachweis",
    plural: "Leistungsnachweise",
  },
  admin: {
    group: "Leistungserfassung",
    useAsTitle: "id",
    defaultColumns: ["patient", "staff", "serviceDate", "totalHours", "status", "updatedAt"],
  },
  access: careContentAccess,
  fields: [
    {
      name: "patient",
      label: "Patient",
      type: "relationship",
      relationTo: "patients",
      required: true,
    },
    {
      name: "staff",
      label: "Pflegekraft",
      type: "relationship",
      relationTo: "staff",
      required: true,
    },
    {
      name: "carePlan",
      label: "Pflegeplan",
      type: "relationship",
      relationTo: "care-plans",
    },
    {
      name: "serviceDate",
      label: "Leistungsdatum",
      type: "date",
      required: true,
    },
    {
      name: "services",
      label: "Erbrachte Leistungen",
      type: "array",
      fields: [
        {
          name: "leistung",
          label: "Leistung",
          type: "relationship",
          relationTo: "leistungen",
        },
        { name: "durationMinutes", label: "Dauer (Minuten)", type: "number" },
        { name: "notes", label: "Notiz", type: "text" },
      ],
    },
    {
      name: "totalHours",
      label: "Gesamtstunden",
      type: "number",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Ausstehend", value: "pending" },
        { label: "Bestätigt", value: "confirmed" },
        { label: "In Abrechnung", value: "billed" },
      ],
    },
    {
      name: "notes",
      label: "Anmerkungen",
      type: "textarea",
    },
  ],
};
