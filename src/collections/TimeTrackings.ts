import type { CollectionConfig } from "payload";
import { adminContentAccess, hiddenFromNonAdmins } from "@/lib/access";

export const TimeTrackings: CollectionConfig = {
  slug: "time-trackings",
  labels: {
    singular: "Zeiterfassung",
    plural: "Zeiterfassungen",
  },
  admin: {
    group: "Personal",
    useAsTitle: "id",
    defaultColumns: ["staff", "date", "hoursWorked", "status", "updatedAt"],
    hidden: hiddenFromNonAdmins,
  },
  access: adminContentAccess,
  fields: [
    {
      name: "staff",
      label: "Mitarbeiter",
      type: "relationship",
      relationTo: "staff",
      required: true,
    },
    {
      name: "date",
      label: "Datum",
      type: "date",
      required: true,
    },
    {
      type: "row",
      fields: [
        { name: "startTime", label: "Beginn", type: "text" },
        { name: "endTime", label: "Ende", type: "text" },
        { name: "hoursWorked", label: "Stunden gearbeitet", type: "number" },
      ],
    },
    {
      name: "breakMinutes",
      label: "Pause (Minuten)",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "overtime",
      label: "Überstunden",
      type: "number",
      defaultValue: 0,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Ausstehend", value: "pending" },
        { label: "Genehmigt", value: "approved" },
        { label: "Abgelehnt", value: "rejected" },
      ],
    },
    {
      name: "notes",
      label: "Notizen",
      type: "textarea",
    },
  ],
};
