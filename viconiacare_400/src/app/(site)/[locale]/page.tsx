import { notFound } from "next/navigation";

import { isValidLocale } from "@/lib/i18n/config";

import { Hero79 } from "@/components/hero79";
import Testimonials from "@/components/TestimonialsSection";
import {TeamSection} from "@/components/TeamSection";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function LocalizedHomePage({ params }: Props) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  return (
    <>
      <Hero79 />
      <Testimonials />
      <TeamSection/>
    </>
  );
}
