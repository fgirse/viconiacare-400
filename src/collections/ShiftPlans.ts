import type { CollectionConfig } from "payload";
import { adminContentAccess, hiddenFromNonAdmins } from "@/lib/access";

export const ShiftPlans: CollectionConfig = {
  slug: "shift-plans",
  labels: {
    singular: "Dienstplan",
    plural: "Dienstpläne",
  },
  admin: {
    group: "Personal",
    useAsTitle: "title",
    defaultColumns: ["title", "weekStart", "weekEnd", "updatedAt"],
    hidden: hiddenFromNonAdmins,
  },
  access: adminContentAccess,
  fields: [
    {
      name: "title",
      label: "Bezeichnung",
      type: "text",
      required: true,
    },
    {
      type: "row",
      fields: [
        { name: "weekStart", label: "Woche ab", type: "date", required: true },
        { name: "weekEnd", label: "Woche bis", type: "date", required: true },
      ],
    },
    {
      name: "shifts",
      label: "Schichten",
      type: "array",
      fields: [
        {
          name: "staff",
          label: "Mitarbeiter",
          type: "relationship",
          relationTo: "staff",
          required: true,
        },
        {
          name: "day",
          label: "Wochentag",
          type: "select",
          required: true,
          options: [
            { label: "Montag", value: "mon" },
            { label: "Dienstag", value: "tue" },
            { label: "Mittwoch", value: "wed" },
            { label: "Donnerstag", value: "thu" },
            { label: "Freitag", value: "fri" },
            { label: "Samstag", value: "sat" },
            { label: "Sonntag", value: "sun" },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "startTime", label: "Beginn", type: "text" },
            { name: "endTime", label: "Ende", type: "text" },
          ],
        },
        {
          name: "shiftType",
          label: "Schichtart",
          type: "select",
          options: [
            { label: "Frühschicht", value: "early" },
            { label: "Spätschicht", value: "late" },
            { label: "Nachtschicht", value: "night" },
            { label: "Bereitschaft", value: "oncall" },
          ],
        },
      ],
    },
    {
      name: "notes",
      label: "Anmerkungen",
      type: "textarea",
    },
  ],
};
