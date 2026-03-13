import type { CollectionConfig } from "payload";
import { adminContentAccess, hiddenFromNonAdmins } from "@/lib/access";

export const Invoices: CollectionConfig = {
  slug: "invoices",
  labels: {
    singular: "Rechnung",
    plural: "Rechnungen",
  },
  admin: {
    group: "Fakturierung",
    useAsTitle: "invoiceNumber",
    defaultColumns: ["invoiceNumber", "patient", "totalAmount", "status", "dueDate", "updatedAt"],
    listSearchableFields: ["invoiceNumber"],
    hidden: hiddenFromNonAdmins,
  },
  access: adminContentAccess,
  fields: [
    {
      name: "invoiceNumber",
      label: "Rechnungsnummer",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "patient",
      label: "Patient",
      type: "relationship",
      relationTo: "patients",
      required: true,
    },
    {
      type: "row",
      fields: [
        { name: "invoiceDate", label: "Rechnungsdatum", type: "date", required: true },
        { name: "dueDate", label: "Fälligkeitsdatum", type: "date" },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      defaultValue: "draft",
      options: [
        { label: "Entwurf", value: "draft" },
        { label: "Versendet", value: "sent" },
        { label: "Bezahlt", value: "paid" },
        { label: "Überfällig", value: "overdue" },
        { label: "Storniert", value: "cancelled" },
      ],
    },
    {
      name: "items",
      label: "Positionen",
      type: "array",
      fields: [
        { name: "description", label: "Beschreibung", type: "text", required: true },
        {
          type: "row",
          fields: [
            { name: "quantity", label: "Menge", type: "number", required: true, defaultValue: 1 },
            { name: "unitPrice", label: "Einzelpreis (€)", type: "number", required: true },
          ],
        },
      ],
    },
    {
      name: "totalAmount",
      label: "Gesamtbetrag (€)",
      type: "number",
    },
    {
      name: "notes",
      label: "Notizen",
      type: "textarea",
    },
  ],
};
