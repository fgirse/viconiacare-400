import type { GlobalConfig } from "payload";
import { hiddenFromNonSuperAdmins, isSuperAdmin } from "@/lib/access";

export const GlobaleEinstellungen: GlobalConfig = {
  slug: "globale-einstellungen",
  label: "Globale Einstellungen",
  admin: {
    group: "Globale Einstellungen",
    hidden: hiddenFromNonSuperAdmins,
  },
  access: {
    read: isSuperAdmin,
    update: isSuperAdmin,
  },
  fields: [
    {
      name: "maintenanceMode",
      label: "Wartungsmodus aktiv",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "allowedEmailDomains",
      label: "Erlaubte E-Mail-Domains (Registrierung)",
      type: "array",
      fields: [
        { name: "domain", label: "Domain", type: "text", required: true },
      ],
    },
    {
      name: "defaultRole",
      label: "Standard-Rolle für neue Benutzer",
      type: "select",
      defaultValue: "user",
      options: [
        { label: "Editor", value: "editor" },
        { label: "Benutzer (User)", value: "user" },
      ],
    },
  ],
};
