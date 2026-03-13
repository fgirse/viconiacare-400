import type { CollectionConfig } from "payload";
import {
  adminOnlyField,
  hiddenFromNonAdmins,
  isAdminOrAbove,
  isSuperAdmin,
} from "@/lib/access";

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  labels: {
    singular: "Benutzer",
    plural: "Benutzer",
  },
  admin: {
    group: "Sammlungen",
    useAsTitle: "email",
    defaultColumns: ["firstName", "lastName", "email", "role", "updatedAt"],
    listSearchableFields: ["email", "firstName", "lastName"],
    pagination: {
      defaultLimit: 25,
      limits: [10, 25, 50, 100],
    },
    // Only admins see user management in the sidebar
    hidden: hiddenFromNonAdmins,
  },
  access: {
    read: isAdminOrAbove,
    create: isAdminOrAbove,
    update: isAdminOrAbove,
    delete: isSuperAdmin,
    admin: ({ req: { user } }) =>
      !!user &&
      ["superadmin", "admin"].includes((user as { role?: string }).role ?? ""),
  },
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
    {
      name: "role",
      label: "Rolle",
      type: "select",
      required: true,
      defaultValue: "user",
      options: [
        { label: "Superadmin", value: "superadmin" },
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Benutzer (User)", value: "user" },
      ],
      // Only admins can read or change the role field
      access: {
        read: adminOnlyField,
        create: adminOnlyField,
        update: adminOnlyField,
      },
    },
    {
      name: "phone",
      label: "Telefon",
      type: "text",
    },
    {
      name: "notes",
      label: "Notizen",
      type: "textarea",
      access: {
        read: adminOnlyField,
        create: adminOnlyField,
        update: adminOnlyField,
      },
    },
  ],
};
