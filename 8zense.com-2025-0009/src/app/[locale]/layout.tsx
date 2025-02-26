import Link from "next/link";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { ClerkProvider } from "@clerk/nextjs";
import { clsx } from "clsx";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { useMessages } from "next-intl";
import { ReactNode } from "react";
import { ThemeProvider } from "@/src/components/theme-provider"
import type { Metadata } from "next";
import SupabaseProvider from "@/src/providers/SupabaseProvider";
import UserProvider from "@/src/providers/UserProvider";
import Navigation from "@/src/components/layout/Navbar/navbar";
import InfoBar from "@/src/components/header";
import { Raleway, Architects_Daughter, Bowlby_One_SC } from "next/font/google";
import ScrollToTopButton from "@/src/components/ScrollToTopButton";
import Footer from "@/src/components/layout/Footer";
import { SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import "@/src/app/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const architectsDaughter = Architects_Daughter({
  subsets: ["latin"],

  weight: ["400"],

  variable: "--font-architectsDaughter",
});

const bowlbySC = Bowlby_One_SC({
  subsets: ["latin"],

  weight: ["400"],

  variable: "--font-bowlbySC",
});

const raleway = Raleway({
  subsets: ["latin"],

  weight: ["400"],

  variable: "--font-raleway",
});

type Props = {
  children: ReactNode;
  locale: string;
};

export const metadata: Metadata = {
  title: "8zense.com",
  description: "Landing page for Startup  8zense.com",
  icons: { icon: "/images/faxicon.svg" },
};

export default function LocaleLayout({ children, locale }: Props) {
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = useMessages();

  return (
   
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Europe/Paris">    
      <ClerkProvider>
    <html
      className={`${raleway.variable} ${bowlbySC.variable} ${architectsDaughter.variable} h-full`}
      lang={locale}
      {...mantineHtmlProps}
    >
      <head>
        <ColorSchemeScript />
      </head>
      <body suppressHydrationWarning={true} className={clsx(raleway.className, "flex h-full flex-col")}>
     
        
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            
            <div className="flex flex-row justify-between gap-3">
              <Image src="/images/LogoEZ990.svg" alt="8zense Logo" width={54} height={54} className="bg-black mb-3 ml-3 mt-3"/>
            <div className="h-8 items-center flex flex-row gap-3">
            <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          </div>
          <SignedIn>
          <UserButton afterSignOutUrl="/"/> 

          </SignedIn>
          </div>    
                              
                <Navigation />
            
                {children} <ToastContainer position="bottom-right" theme="dark" />
                <ScrollToTopButton />
                <Footer />
        
          </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  </NextIntlClientProvider>        
    
    
  );


  
}
