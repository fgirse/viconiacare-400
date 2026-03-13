import "dotenv/config";

import configPromise from "@payload-config";
import { getPayload, type Payload } from "payload";

const locales = ["de", "en", "tr", "ru", "ukr"] as const;
const adminEmail = "admin@viconia-care.local";
const defaultAdminPassword = "ChangeMe123!";
const seededHomeSlug = "home";

type Locale = (typeof locales)[number];

const pageLocales = {
  de: {
    title: "Willkommen bei Viconia Care",
    headline: "Pflege mit Haltung und digitaler Klarheit",
    subline: "Dieses Demo-Projekt zeigt Payload CMS mit lokalisierter Seitenstruktur.",
  },
  en: {
    title: "Welcome to Viconia Care",
    headline: "Care with clarity and a digital backbone",
    subline: "This demo project showcases Payload CMS with localized page structures.",
  },
  tr: {
    title: "Viconia Care'a hos geldiniz",
    headline: "Bakimda netlik, dijital olarak guclu",
    subline: "Bu demo proje, lokalize sayfa yapilari ile Payload CMS'i gosterir.",
  },
  ru: {
    title: "Dobro pozhalovat v Viconia Care",
    headline: "Ukhod s yasnostyu i tsifrovoy osnovoy",
    subline: "Etot demo-proekt pokazyvaet Payload CMS s lokalizovannymi strukturami stranits.",
  },
  ukr: {
    title: "Laskavo prosymo do Viconia Care",
    headline: "Dohlyad iz chytnistyu ta tsyfrovoyu osnovoyu",
    subline: "Tsei demo-proiekt pokazuye Payload CMS z lokalizovanymy strukturamy storinok.",
  },
} as const;

const navigationByLocale = {
  de: {
    home: "Startseite",
    services: "Leistungen",
    homeCare: "Ambulante Pflege",
    intensiveCare: "Intensivpflege",
    contact: "Kontakt",
  },
  en: {
    home: "Home",
    services: "Services",
    homeCare: "Home Care",
    intensiveCare: "Intensive Care",
    contact: "Contact",
  },
  tr: {
    home: "Ana Sayfa",
    services: "Hizmetler",
    homeCare: "Evde Bakim",
    intensiveCare: "Yogun Bakim",
    contact: "Iletisim",
  },
  ru: {
    home: "Glavnaya",
    services: "Uslugi",
    homeCare: "Ambulatornyy ukhod",
    intensiveCare: "Intensivnyy ukhod",
    contact: "Kontakt",
  },
  ukr: {
    home: "Holovna",
    services: "Posluhy",
    homeCare: "Ambulatornyi dohlyad",
    intensiveCare: "Intensyvnyi dohlyad",
    contact: "Kontakt",
  },
} as const;

async function ensureAdminUser(payload: Payload) {

  const existing = await payload.find({
    collection: "users",
    where: {
      email: {
        equals: adminEmail,
      },
    },
    limit: 1,
  });

  if (existing.docs.length > 0) {
    return { created: false, email: adminEmail };
  }

  await payload.create({
    collection: "users",
    data: {
      email: adminEmail,
      password: defaultAdminPassword,
      firstName: "Viconia",
      lastName: "Admin",
    },
  });

  return { created: true, email: adminEmail };
}

async function resetSeedData(payload: Payload) {
  const users = await payload.find({
    collection: "users",
    where: {
      email: {
        equals: adminEmail,
      },
    },
    limit: 100,
  });

  for (const user of users.docs) {
    await payload.delete({
      collection: "users",
      id: user.id,
    });
  }

  const pages = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: seededHomeSlug,
      },
    },
    locale: "all",
    limit: 100,
  });

  for (const page of pages.docs) {
    await payload.delete({
      collection: "pages",
      id: page.id,
    });
  }

  payload.logger.info(
    `Reset abgeschlossen. Geloescht: users=${users.docs.length}, pages=${pages.docs.length}`,
  );
}

async function seedNavigation(payload: Payload) {
  for (const locale of locales) {
    const labels = navigationByLocale[locale];

    await payload.updateGlobal({
      slug: "navigation",
      locale,
      data: {
        items: [
          {
            label: labels.home,
            url: `/${locale}`,
            subItems: [
              {
                label: labels.services,
                url: `/${locale}/leistungen`,
                subSubItems: [
                  {
                    label: labels.homeCare,
                    url: `/${locale}/leistungen/ambulant`,
                  },
                  {
                    label: labels.intensiveCare,
                    url: `/${locale}/leistungen/intensiv`,
                  },
                ],
              },
              {
                label: labels.contact,
                url: `/${locale}/kontakt`,
                subSubItems: [],
              },
            ],
          },
        ],
      },
    });
  }
}

async function seedSiteSettings(payload: Payload) {

  await payload.updateGlobal({
    slug: "site-settings",
    data: {
      siteName: "Viconia Care",
      defaultSEO: {
        metaTitle: "Viconia Care",
        metaDescription: "Pflegeleistungen mit klarer Struktur und lokaler Naehe.",
      },
      brandColors: [
        { name: "GELB", hex: "#fecc00" },
        { name: "PETROL", hex: "#00998a" },
        { name: "SCHWARZ", hex: "#1d1d1b" },
        { name: "GRAU", hex: "#575756" },
      ],
    },
    locale: "de",
  });

  const localizedSiteMeta: Record<Exclude<Locale, "de">, { title: string; description: string }> = {
    en: {
      title: "Viconia Care",
      description: "Care services with clear structure and local presence.",
    },
    tr: {
      title: "Viconia Care",
      description: "Acik bir yapi ve yerel yaklasim ile bakim hizmetleri.",
    },
    ru: {
      title: "Viconia Care",
      description: "Uslugi ukhoda s yasnoy strukturoy i lokalnym podkhodom.",
    },
    ukr: {
      title: "Viconia Care",
      description: "Posluhy dohlyadu z chitkoyu strukturoyu ta lokalnym pidkhodom.",
    },
  };

  for (const locale of locales) {
    if (locale === "de") continue;

    await payload.updateGlobal({
      slug: "site-settings",
      locale,
      data: {
        siteName: "Viconia Care",
        defaultSEO: {
          metaTitle: localizedSiteMeta[locale].title,
          metaDescription: localizedSiteMeta[locale].description,
        },
      },
    });
  }
}

async function seedPage(payload: Payload) {

  const slug = seededHomeSlug;
  const existing = await payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    locale: "de",
  });

  let id: number | string;

  if (existing.docs.length === 0) {
    const created = await payload.create({
      collection: "pages",
      locale: "de",
      data: {
        slug,
        title: pageLocales.de.title,
        hero: {
          headline: pageLocales.de.headline,
          subline: pageLocales.de.subline,
          link: {
            label: "Admin",
            url: "/admin",
            newTab: false,
          },
        },
      },
    });

    id = created.id;
  } else {
    id = existing.docs[0].id;
  }

  for (const locale of locales) {
    await payload.update({
      collection: "pages",
      id,
      locale,
      data: {
        title: pageLocales[locale].title,
        hero: {
          headline: pageLocales[locale].headline,
          subline: pageLocales[locale].subline,
          link: {
            label: locale === "de" ? "Admin" : "Admin",
            url: "/admin",
            newTab: false,
          },
        },
      },
    });
  }
}

async function runSeed() {
  const resetMode = process.argv.includes("--reset") || process.argv.includes("-r");
  const payload = await getPayload({ config: configPromise });

  try {
    if (resetMode) {
      await resetSeedData(payload);
    }

    const adminInfo = await ensureAdminUser(payload);
    await seedNavigation(payload);
    await seedSiteSettings(payload);
    await seedPage(payload);

    payload.logger.info(
      `Seed erfolgreich${resetMode ? " (reset mode)" : ""}. Admin: ${adminInfo.email} (${adminInfo.created ? "created" : "exists"}), Passwort: ${defaultAdminPassword}`,
    );
  } finally {
    if (typeof payload.destroy === "function") {
      await payload.destroy();
    }
  }
}

void runSeed();
