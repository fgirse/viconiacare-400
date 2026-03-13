"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, Check } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";
import type { AppLocale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import Logo from "../../public/Assets/SVG/ViconiaLogooBG.svg";

// ── Locale display labels & flags ────────────────────────────────────────────
const localeLabel: Record<string, string> = {
  de: "Deutsch",
  en: "English",
  tr: "Türkçe",
  ru: "Русский",
  ukr: "Українська",
};

const localeFlag: Record<string, string> = {
  de: "🇩🇪",
  en: "🇬🇧",
  tr: "🇹🇷",
  ru: "🇷🇺",
  ukr: "🇺🇦",
};

// ── Dynamic Lucide icon ───────────────────────────────────────────────────────
function NavIcon({ name, className }: { name?: string | null; className?: string }) {
  if (!name) return null;
  const icons = LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>;
  // Payload stores PascalCase names (e.g. "Heart"). Try exact match first,
  // then with the "Icon" suffix that some lucide-react versions use internally.
  const Icon = icons[name] ?? icons[`${name}Icon`] ?? null;
  if (!Icon) return null;
  return <Icon className={cn("size-4 shrink-0", className)} />;
}

// ── Language switcher ──────────────────────────────────────────────────────────
function LanguageSwitcher({ locale }: { locale: AppLocale }) {
  const pathname = usePathname();

  function hrefFor(next: AppLocale) {
    // Paths are always prefixed: /de/..., /en/...
    const segments = pathname.split("/");
    segments[1] = next;
    return segments.join("/") || "/";
  }

  return (
    <div className="relative group">
      <button className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-(--brand-black) hover:bg-black/5 transition-colors">
        <span className="text-base leading-none">{localeFlag[locale]}</span>
        <span className="uppercase">{locale}</span>
        <ChevronRight className="size-3.5 rotate-90 text-(--brand-gray)" />
      </button>
      <ul className="absolute right-0 top-full z-50 w-44 translate-y-0 rounded-xl border border-black/10 bg-white py-2 shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150">
        {locales.map((l) => (
          <li key={l}>
            <Link
              href={hrefFor(l)}
              className={cn(
                "flex items-center gap-2.5 px-4 py-2 text-sm transition-colors hover:bg-(--brand-yellow)/20",
                l === locale
                  ? "font-semibold text-(--brand-petrol)"
                  : "text-(--brand-black)",
              )}
            >
              <span className="text-base leading-none">{localeFlag[l]}</span>
              <span className="flex-1">{localeLabel[l]}</span>
              {l === locale && <Check className="size-3.5 shrink-0" />}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Mobile language switcher ───────────────────────────────────────────────────
function MobileLanguageSwitcher({ locale }: { locale: AppLocale }) {
  const pathname = usePathname();

  function hrefFor(next: AppLocale) {
    const segments = pathname.split("/");
    segments[1] = next;
    return segments.join("/") || "/";
  }

  return (
    <li className="pt-2">
      <p className="pb-1 text-xs font-semibold uppercase tracking-wider text-(--brand-gray)">Sprache</p>
      <div className="flex flex-wrap gap-2">
        {locales.map((l) => (
          <Link
            key={l}
            href={hrefFor(l)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              l === locale
                ? "border-(--brand-petrol) bg-(--brand-petrol) text-white"
                : "border-black/15 text-(--brand-black) hover:border-(--brand-petrol) hover:text-(--brand-petrol)",
            )}
          >
            <span className="text-sm leading-none">{localeFlag[l]}</span>
            {localeLabel[l]}
          </Link>
        ))}
      </div>
    </li>
  );
}

// ── Types (mirror the Payload Navigation global shape) ─────────────────────────
export interface SubSubItem {
  label: string;
  url: string;
  icon?: string | null;
  badge?: string | null;
  description?: string | null;
  openInNewTab?: boolean | null;
}

export interface SubItem {
  label: string;
  url?: string | null;
  icon?: string | null;
  badge?: string | null;
  description?: string | null;
  openInNewTab?: boolean | null;
  subSubItems?: SubSubItem[] | null;
}

export interface NavItem {
  label: string;
  url?: string | null;
  icon?: string | null;
  badge?: string | null;
  description?: string | null;
  openInNewTab?: boolean | null;
  highlighted?: boolean | null;
  subItems?: SubItem[] | null;
}

// ── Helpers ────────────────────────────────────────────────────────────────────
function NavLink({
  href,
  openInNewTab,
  className,
  children,
}: {
  href: string;
  openInNewTab?: boolean | null;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      className={className}
    >
      {children}
    </Link>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="ml-1.5 inline-flex items-center rounded-full bg-(--brand-petrol) px-1.5 py-0.5 text-[10px] font-semibold leading-none text-white">
      {text}
    </span>
  );
}

// ── Sub-Sub Flyout (level 3) ───────────────────────────────────────────────────
function SubSubMenu({ items }: { items: SubSubItem[] }) {
  return (
    <ul className="absolute left-full top-0 z-50 min-w-50 -translate-x-1 rounded-xl border border-black/10 bg-white py-2 shadow-lg opacity-0 pointer-events-none group-hover/sub:opacity-100 group-hover/sub:pointer-events-auto transition-opacity duration-150">
      {items.map((item) => (
        <li key={item.label}>
          <NavLink
            href={item.url}
            openInNewTab={item.openInNewTab}
            className="flex items-center gap-2 px-4 py-2 text-sm text-(--brand-black) hover:bg-(--brand-yellow)/20 transition-colors"
          >
            <NavIcon name={item.icon} className="text-(--brand-gray)" />
            <span>{item.label}</span>
            {item.badge && <Badge text={item.badge} />}
          </NavLink>
          {item.description && (
            <p className="px-4 pb-1 text-xs text-(--brand-gray)">{item.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
}

// ── Desktop Dropdown (level 2) ─────────────────────────────────────────────────
function DesktopDropdown({ items }: { items: SubItem[] }) {
  return (
    <ul className="absolute left-0 top-full z-40 min-w-55 translate-y-2 rounded-xl border border-black/10 bg-white py-2 shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-y-0 transition-all duration-150">
      {items.map((item) => {
        const hasChildren = Array.isArray(item.subSubItems) && item.subSubItems.length > 0;
        const inner = (
          <span className="flex items-center justify-between gap-2 w-full">
            <span className="flex items-center gap-2">
              <NavIcon name={item.icon} className="text-(--brand-petrol)" />
              <span className="text-sm text-(--brand-black)">{item.label}</span>
              {item.badge && <Badge text={item.badge} />}
            </span>
            {hasChildren && <ChevronRight className="size-3.5 shrink-0 text-(--brand-gray)" />}
          </span>
        );

        return (
          <li key={item.label} className="relative group/sub">
            {item.url ? (
              <NavLink
                href={item.url}
                openInNewTab={item.openInNewTab}
                className="flex items-center px-4 py-2 hover:bg-(--brand-yellow)/20 transition-colors"
              >
                {inner}
              </NavLink>
            ) : (
              <span className="flex items-center px-4 py-2 cursor-default">{inner}</span>
            )}
            {item.description && (
              <p className="px-4 pb-1 text-xs text-(--brand-gray)">{item.description}</p>
            )}
            {hasChildren && <SubSubMenu items={item.subSubItems!} />}
          </li>
        );
      })}
    </ul>
  );
}

// ── Mobile accordion item ──────────────────────────────────────────────────────
function MobileNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const hasChildren = Array.isArray(item.subItems) && item.subItems.length > 0;

  return (
    <li>
      <div className="flex items-center justify-between">
        {item.url ? (
          <NavLink
            href={item.url}
            openInNewTab={item.openInNewTab}
            className={cn(
              "flex flex-1 items-center gap-2 py-2 text-base font-medium text-(--brand-black)",
              item.highlighted && "text-(--brand-petrol)",
            )}
          >
            <NavIcon name={item.icon} className="text-(--brand-petrol)" />
            {item.label}
            {item.badge && <Badge text={item.badge} />}
          </NavLink>
        ) : (
          <span className="flex flex-1 items-center gap-2 py-2 text-base font-medium text-(--brand-black)">
            <NavIcon name={item.icon} className="text-(--brand-petrol)" />
            {item.label}
            {item.badge && <Badge text={item.badge} />}
          </span>
        )}
        {hasChildren && (
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 text-(--brand-gray)"
            aria-label={open ? "Schließen" : "Öffnen"}
          >
            <ChevronRight
              className={cn("size-4 transition-transform", open && "rotate-90")}
            />
          </button>
        )}
      </div>

      {hasChildren && open && (
        <ul className="ml-4 border-l border-black/10 pl-3">
          {item.subItems!.map((sub) => {
            const hasSubs = Array.isArray(sub.subSubItems) && sub.subSubItems.length > 0;
            return (
              <li key={sub.label}>
                <div className="flex items-center justify-between">
                  {sub.url ? (
                    <NavLink
                      href={sub.url}
                      openInNewTab={sub.openInNewTab}
                      className="flex flex-1 items-center gap-2 py-1.5 text-sm text-(--brand-black)"
                    >
                      <NavIcon name={sub.icon} className="text-(--brand-petrol)" />
                      {sub.label}
                      {sub.badge && <Badge text={sub.badge} />}
                    </NavLink>
                  ) : (
                    <span className="flex flex-1 items-center gap-2 py-1.5 text-sm text-(--brand-gray)">
                      <NavIcon name={sub.icon} className="text-(--brand-gray)" />
                      {sub.label}
                      {sub.badge && <Badge text={sub.badge} />}
                    </span>
                  )}
                </div>
                {sub.description && (
                  <p className="pb-1 pl-6 text-xs text-(--brand-gray)">{sub.description}</p>
                )}
                {hasSubs &&
                  sub.subSubItems!.map((ss) => (
                    <NavLink
                      key={ss.label}
                      href={ss.url}
                      openInNewTab={ss.openInNewTab}
                      className="flex items-center gap-2 py-1 pl-4 text-xs text-(--brand-gray) hover:text-(--brand-petrol)"
                    >
                      <NavIcon name={ss.icon} />
                      {ss.label}
                      {ss.badge && <Badge text={ss.badge} />}
                    </NavLink>
                  ))}
              </li>
            );
          })}
        </ul>
      )}
    </li>
  );
}

// ── Main NavbarClient ──────────────────────────────────────────────────────────
export function NavbarClient({
  items,
  locale,
}: {
  items: NavItem[];
  locale: AppLocale;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (mobileRef.current && !mobileRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    }
    if (mobileOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [mobileOpen]);

  return (
    <nav
      ref={mobileOpen ? mobileRef : undefined}
      className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 xl:px-10">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src={Logo}
            alt="Viconia Care"
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {items.map((item) => {
            const hasChildren = Array.isArray(item.subItems) && item.subItems.length > 0;

            return (
              <li key={item.label} className="relative group">
                {item.highlighted ? (
                  <NavLink
                    href={item.url ?? "#"}
                    openInNewTab={item.openInNewTab}
                    className="ml-2 rounded-full bg-(--brand-petrol) px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-px"
                  >
                    {item.label}
                    {item.badge && <Badge text={item.badge} />}
                  </NavLink>
                ) : item.url && !hasChildren ? (
                  <NavLink
                    href={item.url}
                    openInNewTab={item.openInNewTab}
                    className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-(--brand-black) hover:bg-black/5 transition-colors"
                  >
                    {item.label}
                    {item.badge && <Badge text={item.badge} />}
                  </NavLink>
                ) : (
                  <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-(--brand-black) hover:bg-black/5 transition-colors">
                    {item.label}
                    {item.badge && <Badge text={item.badge} />}
                    {hasChildren && (
                      <ChevronRight className="size-3.5 rotate-90 text-(--brand-gray)" />
                    )}
                  </button>
                )}

                {hasChildren && <DesktopDropdown items={item.subItems!} />}
              </li>
            );
          })}
        </ul>

        {/* Language switcher (desktop) */}
        <div className="hidden md:block ml-2">
          <LanguageSwitcher locale={locale} />
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex items-center justify-center rounded-lg p-2 text-(--brand-black) hover:bg-black/5 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menü"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-black/10 bg-white px-5 pb-6 md:hidden">
          <ul className="mt-3 space-y-1 divide-y divide-black/5">
            {items.map((item) => (
              <MobileNavItem key={item.label} item={item} />
            ))}
            <MobileLanguageSwitcher locale={locale} />
          </ul>
        </div>
      )}
    </nav>
  );
}
