export const locales = ["de", "en", "tr", "ru", "ukr"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "de";

export const localePrefix = "always";

export function isValidLocale(locale: string): locale is AppLocale {
  return locales.includes(locale as AppLocale);
}
