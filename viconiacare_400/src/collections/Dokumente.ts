import type { CollectionConfig } from "payload";
import { careContentAccess } from "@/lib/access";

export const Dokumente: CollectionConfig = {
  slug: "dokumente",
  labels: {
    singular: "Dokument",
    plural: "Dokumente",
  },
  admin: {
    group: "Dokumentenverwaltung",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "patient", "updatedAt"],
    listSearchableFields: ["title"],
  },
  access: careContentAccess,
  fields: [
    {
      name: "title",
      label: "Titel",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "category",
      label: "Kategorie",
      type: "select",
      options: [
        { label: "Pflegedokumentation", value: "careDoc" },
        { label: "Arztbrief", value: "doctorLetter" },
        { label: "Rezept", value: "prescription" },
        { label: "Vertrag", value: "contract" },
        { label: "Einwilligung", value: "consent" },
        { label: "Sonstiges", value: "other" },
      ],
    },
    {
      name: "patient",
      label: "Patient",
      type: "relationship",
      relationTo: "patients",
    },
    {
      name: "file",
      label: "Datei",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "validUntil",
      label: "Gültig bis",
      type: "date",
    },
    {
      name: "notes",
      label: "Notizen",
      type: "textarea",
    },
  ],
};
