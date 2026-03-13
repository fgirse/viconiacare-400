import configPromise from "@payload-config";
import { getPayload } from "payload";

import type { AppLocale } from "@/lib/i18n/config";
import { NavbarClient, type NavItem } from "./navbar-client";

export async function Navbar({ locale }: { locale: AppLocale }) {
  const payload = await getPayload({ config: configPromise });

  const nav = await payload.findGlobal({
    slug: "navigation",
    locale,
    depth: 0,
  });

  const items: NavItem[] = (nav?.items ?? []) as NavItem[];

  return <NavbarClient items={items} locale={locale} />;
}
