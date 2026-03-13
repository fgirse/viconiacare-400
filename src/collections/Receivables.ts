import type { CollectionConfig } from "payload";
import { adminContentAccess, hiddenFromNonAdmins } from "@/lib/access";

export const Receivables: CollectionConfig = {
  slug: "receivables",
  labels: {
    singular: "Forderung",
    plural: "Forderungen",
  },
  admin: {
    group: "Fakturierung",
    useAsTitle: "id",
    defaultColumns: ["patient", "amount", "dueDate", "status", "updatedAt"],
    hidden: hiddenFromNonAdmins,
  },
  access: adminContentAccess,
  fields: [
    {
      name: "patient",
      label: "Patient",
      type: "relationship",
      relationTo: "patients",
      required: true,
    },
    {
      name: "invoice",
      label: "Rechnung",
      type: "relationship",
      relationTo: "invoices",
    },
    {
      name: "amount",
      label: "Betrag (€)",
      type: "number",
      required: true,
    },
    {
      name: "dueDate",
      label: "Fälligkeitsdatum",
      type: "date",
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      defaultValue: "open",
      options: [
        { label: "Offen", value: "open" },
        { label: "In Klärung", value: "inProgress" },
        { label: "Beglichen", value: "settled" },
        { label: "Abgeschrieben", value: "writtenOff" },
      ],
    },
    {
      name: "notes",
      label: "Notizen",
      type: "textarea",
    },
  ],
};
