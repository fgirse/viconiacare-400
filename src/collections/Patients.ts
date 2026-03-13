import type { CollectionConfig } from "payload";
import { careContentAccess } from "@/lib/access";

export const Patients: CollectionConfig = {
  slug: "patients",
  labels: {
    singular: "Patient",
    plural: "Patienten",
  },
  admin: {
    group: "Patienten & Kunden",
    useAsTitle: "lastName",
    defaultColumns: [
      "firstName",
      "lastName",
      "dateOfBirth",
      "status",
      "updatedAt",
    ],
    listSearchableFields: ["firstName", "lastName", "patientId"],
  },
  // All logged-in users can read patient data.
  // Only editors and above can create/update.
  // Only admins can delete.
  access: careContentAccess,
  fields: [
    {
      name: "patientId",
      label: "Patienten-ID",
      type: "text",
      unique: true,
      index: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "firstName",
          label: "Vorname",
          type: "text",
          required: true,
        },
        {
          name: "lastName",
          label: "Nachname",
          type: "text",
          required: true,
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "dateOfBirth",
          label: "Geburtsdatum",
          type: "date",
          admin: { date: { pickerAppearance: "dayOnly" } },
        },
        {
          name: "gender",
          label: "Geschlecht",
          type: "select",
          options: [
            { label: "Männlich", value: "male" },
            { label: "Weiblich", value: "female" },
            { label: "Divers", value: "diverse" },
          ],
        },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      defaultValue: "active",
      options: [
        { label: "Aktiv", value: "active" },
        { label: "Inaktiv", value: "inactive" },
        { label: "Aufnahme ausstehend", value: "pending" },
        { label: "Entlassen", value: "discharged" },
      ],
    },
    {
      name: "contact",
      label: "Kontaktdaten",
      type: "group",
      fields: [
        { name: "phone", label: "Telefon", type: "text" },
        { name: "email", label: "E-Mail", type: "email" },
        {
          type: "row",
          fields: [
            { name: "street", label: "Straße", type: "text" },
            { name: "houseNumber", label: "Nr.", type: "text", admin: { width: "20%" } },
          ],
        },
        {
          type: "row",
          fields: [
            { name: "zip", label: "PLZ", type: "text", admin: { width: "30%" } },
            { name: "city", label: "Stadt", type: "text" },
          ],
        },
      ],
    },
    {
      name: "emergencyContact",
      label: "Notfallkontakt",
      type: "group",
      fields: [
        { name: "name", label: "Name", type: "text" },
        { name: "relationship", label: "Beziehung", type: "text" },
        { name: "phone", label: "Telefon", type: "text" },
      ],
    },
    {
      name: "insurance",
      label: "Versicherung",
      type: "group",
      fields: [
        {
          name: "type",
          label: "Art",
          type: "select",
          options: [
            { label: "Gesetzlich", value: "statutory" },
            { label: "Privat", value: "private" },
          ],
        },
        { name: "provider", label: "Krankenkasse", type: "text" },
        { name: "insuranceNumber", label: "Versicherungsnummer", type: "text" },
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
      ],
    },
    {
      name: "assignedStaff",
      label: "Zugewiesene Pflegekräfte",
      type: "relationship",
      relationTo: "staff",
      hasMany: true,
    },
    {
      name: "medicalNotes",
      label: "Medizinische Hinweise",
      type: "richText",
    },
  ],
};
