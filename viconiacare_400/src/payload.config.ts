import path from "path";
import { fileURLToPath } from "url";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { resendAdapter } from "@payloadcms/email-resend";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";
import { buildConfig } from "payload";

// ── Collections ───────────────────────────────────────────────────────────────
// Sammlungen
import { Media } from "./collections/Media.ts";
import { Pages } from "./collections/Pages.ts";
import { Users } from "./collections/Users.ts";
import { Testimonials } from "./collections/Testimonials.ts";
// Patienten & Kunden
import { Patients } from "./collections/Patients.ts";
// Personal
import { Staff } from "./collections/Staff.ts";
import { ShiftPlans } from "./collections/ShiftPlans.ts";
import { TimeTrackings } from "./collections/TimeTrackings.ts";
// Dokumentenverwaltung
import { Dokumente } from "./collections/Dokumente.ts";
// Pflegemanagement
import { CarePlans } from "./collections/CarePlans.ts";
import { CareSchedules } from "./collections/CareSchedules.ts";
// Fakturierung
import { Invoices } from "./collections/Invoices.ts";
import { Receivables } from "./collections/Receivables.ts";
// Leistungserfassung
import { ServiceRecords } from "./collections/ServiceRecords.ts";
// Routenplanung
import { Routes } from "./collections/Routes.ts";
// Pflegeangebote
import { Leistungen } from "./collections/Leistungen.ts";

// ── Globals ───────────────────────────────────────────────────────────────────
import { Navigation } from "./globals/Navigation.ts";
import { SiteSettings } from "./globals/SiteSettings.ts";
import { GlobaleEinstellungen } from "./globals/GlobaleEinstellungen.ts";

// Image storage with Vercel Blob
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    // Sammlungen
    Users,
    Media,
    Pages,
    Testimonials,
    // Patienten & Kunden
    Patients,
    // Personal
    Staff,
    ShiftPlans,
    TimeTrackings,
    // Dokumentenverwaltung
    Dokumente,
    // Pflegemanagement
    CarePlans,
    CareSchedules,
    // Fakturierung
    Invoices,
    Receivables,
    // Leistungserfassung
    ServiceRecords,
    // Routenplanung
    Routes,
    // Pflegeangebote
    Leistungen,
  ],
  globals: [Navigation, SiteSettings, GlobaleEinstellungen],
  editor: lexicalEditor(),
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/viconia-care",
  }),
  sharp,
   // ── PluginsStorage ─────────────────────────────────────────────
  plugins: [
    vercelBlobStorage({
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // Bypass Vercel's 4.5 MB serverless body limit:
      // the browser uploads directly to Vercel Blob instead of routing
      // through the Next.js API function.
      clientUploads: true,
    }),
  ],

  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY || "",
    defaultFromAddress:
      process.env.RESEND_FROM_EMAIL ||
      process.env.RESEND_FROM_ADDRESS ||
      "no-reply@viconia-care.local",
    defaultFromName: process.env.RESEND_FROM_NAME || "Viconia Care",
  }),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  localization: {
    locales: [
      {
        label: "Deutsch",
        code: "de",
      },
      {
        label: "English",
        code: "en",
      },
      {
        label: "Turkce",
        code: "tr",
      },
      {
        label: "Russkiy",
        code: "ru",
      },
      {
        label: "Ukrainian",
        code: "ukr",
      },
    ],
    defaultLocale: "de",
    fallback: true,
  },
  cors: [process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"],
  csrf: [process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000"],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
