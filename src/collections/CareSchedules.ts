import type { CollectionConfig } from "payload";
import { careContentAccess } from "@/lib/access";

export const CareSchedules: CollectionConfig = {
  slug: "care-schedules",
  labels: {
    singular: "Pflegetermin",
    plural: "Pflegetermine",
  },
  admin: {
    group: "Pflegemanagement",
    useAsTitle: "id",
    defaultColumns: ["patient", "staff", "scheduledAt", "type", "status", "updatedAt"],
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
      name: "scheduledAt",
      label: "Termin",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "dayAndTime" } },
    },
    {
      name: "durationMinutes",
      label: "Dauer (Minuten)",
      type: "number",
      defaultValue: 60,
    },
    {
      name: "type",
      label: "Art",
      type: "select",
      options: [
        { label: "Grundpflege", value: "basicCare" },
        { label: "Behandlungspflege", value: "medicalCare" },
        { label: "Hauswirtschaft", value: "housekeeping" },
        { label: "Begleitung", value: "companionship" },
        { label: "Beratung", value: "counseling" },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      defaultValue: "scheduled",
      options: [
        { label: "Geplant", value: "scheduled" },
        { label: "Durchgeführt", value: "completed" },
        { label: "Abgesagt", value: "cancelled" },
        { label: "Ausgefallen", value: "missed" },
      ],
    },
    {
      name: "visitNotes",
      label: "Besuchsnotiz",
      type: "textarea",
    },
  ],
};
