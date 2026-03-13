import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const bowlbyOne = localFont({
  src: "../../../public/fonts/BowlbyOneSC/bowlby-one-sc-v19-latin-regular.woff2",
  variable: "--font-bowlby",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Viconia Care GmbH",
  description: "Next.js + Payload CMS + MongoDB + Resend",
};

export default function SiteRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className={`${barlow.variable} ${bowlbyOne.variable} antialiased`} suppressHydrationWarning>{children}</body>
    </html>
  );
}