import type { CollectionConfig } from "payload";
import { careContentAccess } from "@/lib/access";

export const CarePlans: CollectionConfig = {
  slug: "care-plans",
  labels: {
    singular: "Pflegeplan",
    plural: "Pflegepläne",
  },
  admin: {
    group: "Pflegemanagement",
    useAsTitle: "title",
    defaultColumns: ["title", "patient", "careLevel", "status", "updatedAt"],
  },
  // Users (patient role) can read their care plans.
  // Editors and above can create/update.
  access: careContentAccess,
  fields: [
    {
      name: "title",
      label: "Titel",
      type: "text",
      required: true,
    },
    {
      name: "patient",
      label: "Patient",
      type: "relationship",
      relationTo: "patients",
      required: true,
    },
    {
      name: "careLevel",
      label: "Pflegegrad",
      type: "select",
      options: [
        { label: "Pflegegrad 1", value: "1" },
        { label: "Pflegegrad 2", value: "2" },
        { label: "Pflegegrad 3", value: "3" },
        { label: "Pflegegrad 4", value: "4" },
        { label: "Pflegegrad 5", value: "5" },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      defaultValue: "active",
      options: [
        { label: "Aktiv", value: "active" },
        { label: "Überarbeitung", value: "review" },
        { label: "Abgeschlossen", value: "closed" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "startDate", label: "Beginn", type: "date" },
        { name: "endDate", label: "Ende", type: "date" },
      ],
    },
    {
      name: "goals",
      label: "Pflegeziele",
      type: "array",
      fields: [
        { name: "goal", label: "Ziel", type: "text", required: true },
        {
          name: "priority",
          label: "Priorität",
          type: "select",
          options: [
            { label: "Hoch", value: "high" },
            { label: "Mittel", value: "medium" },
            { label: "Niedrig", value: "low" },
          ],
        },
      ],
    },
    {
      name: "measures",
      label: "Pflegemaßnahmen",
      type: "richText",
    },
    {
      name: "assignedStaff",
      label: "Zuständige Pflegekräfte",
      type: "relationship",
      relationTo: "staff",
      hasMany: true,
    },
    {
      name: "notes",
      label: "Notizen",
      type: "textarea",
    },
  ],
};
