import type { CollectionConfig } from "payload";
import { adminContentAccess, hiddenFromNonAdmins } from "@/lib/access";

export const Staff: CollectionConfig = {
  slug: "staff",
  labels: {
    singular: "Mitarbeiter",
    plural: "Mitarbeiter",
  },
  admin: {
    group: "Personal",
    useAsTitle: "lastName",
    defaultColumns: ["firstName", "lastName", "position", "status", "updatedAt"],
    listSearchableFields: ["firstName", "lastName", "staffId"],
    hidden: hiddenFromNonAdmins,
  },
  access: adminContentAccess,
  fields: [
    {
      name: "staffId",
      label: "Mitarbeiter-ID",
      type: "text",
      unique: true,
      index: true,
    },
    {
      type: "row",
      fields: [
        { name: "firstName", label: "Vorname", type: "text", required: true },
        { name: "lastName", label: "Nachname", type: "text", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "dateOfBirth", label: "Geburtsdatum", type: "date" },
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
      name: "position",
      label: "Position",
      type: "select",
      options: [
        { label: "Pflegefachkraft", value: "nurse" },
        { label: "Pflegehilfskraft", value: "careAide" },
        { label: "Pflegedienstleitung", value: "careManager" },
        { label: "Verwaltung", value: "administration" },
        { label: "Fahrer", value: "driver" },
      ],
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      defaultValue: "active",
      options: [
        { label: "Aktiv", value: "active" },
        { label: "Krank", value: "sick" },
        { label: "Urlaub", value: "vacation" },
        { label: "Inaktiv", value: "inactive" },
      ],
    },
    {
      name: "contact",
      label: "Kontaktdaten",
      type: "group",
      fields: [
        { name: "phone", label: "Telefon", type: "text" },
        { name: "email", label: "E-Mail", type: "email" },
        { name: "street", label: "Straße + Nr.", type: "text" },
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
      name: "qualifications",
      label: "Qualifikationen",
      type: "array",
      fields: [
        { name: "title", label: "Bezeichnung", type: "text", required: true },
        { name: "issuedAt", label: "Ausgestellt am", type: "date" },
        { name: "expiresAt", label: "Gültig bis", type: "date" },
      ],
    },
    {
      name: "linkedUser",
      label: "Verknüpfter Benutzer-Account",
      type: "relationship",
      relationTo: "users",
    },
  ],
};
