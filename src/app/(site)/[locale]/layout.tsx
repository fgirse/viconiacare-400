import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { isValidLocale, type AppLocale } from "@/lib/i18n/config";
import { Navbar } from "@/components/navbar";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <>
      <Navbar locale={locale as AppLocale} />
      <div className="pt-16">{children}</div>
    </>
  );
}
