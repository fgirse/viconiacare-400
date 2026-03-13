import de from "@/messages/de/common.json";
import en from "@/messages/en/common.json";
import tr from "@/messages/tr/common.json";
import ru from "@/messages/ru/common.json";
import ukr from "@/messages/ukr/common.json";
import type { AppLocale } from "@/lib/i18n/config";

const dictionaries = {
  de,
  en,
  tr,
  ru,
  ukr,
};

export type CommonDictionary = (typeof dictionaries)["de"];

export function getCommonDictionary(locale: AppLocale): CommonDictionary {
  return dictionaries[locale];
}
