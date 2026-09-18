"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { cn, realValue } from "@/lib/utils";
import { contact } from "@/data/profile";
import { SerMark } from "@/components/brand/HarmonyMark";

/**
 * Navigation du portfolio.
 *
 * Elle porte le monogramme, six entrées et le CV. Le CV n'apparaît qu'ici
 * et dans le hero : inutile de le répéter à chaque section.
 *
 * Ce sont de vrais liens : bouton retour, ouverture dans un nouvel onglet
 * et référencement fonctionnent normalement.
 */
const LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/creation", label: "Réalisations" },
  { href: "/systemes", label: "Parcours IT" },
  { href: "/systemes#homelab", label: "Home lab" },
  { href: "/#apropos", label: "À propos" },
  { href: "/#contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const cv = realValue(contact.cv);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    if (base === "/") return pathname === "/" && !href.includes("#");
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-label focus:text-paper"
      >
        Aller au contenu
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[var(--z-index-sticky)] transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open ? "border-b border-line bg-paper/92 backdrop-blur-md" : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center gap-4 px-5 sm:px-8 lg:px-12">
          <Link href="/" className="press shrink-0 text-ink" aria-label="Salim El Rhalmani, accueil">
            <SerMark className="h-7 w-auto" />
          </Link>

          <nav aria-label="Navigation principale" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-7">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={isActive(l.href) ? "page" : undefined}
                    className={cn(
                      "link-underline text-label transition-colors duration-200",
                      isActive(l.href) ? "text-ink" : "text-ink-2 hover:text-ink"
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {cv && (
            <a
              href={cv}
              target="_blank"
              rel="noopener noreferrer"
              className="press ml-auto hidden items-center gap-2 rounded-sm border border-line-2 px-4 py-2 text-label text-ink hover:border-ink lg:ml-0 lg:inline-flex"
            >
              CV
              <Download aria-hidden className="size-3.5" strokeWidth={1.75} />
              <span className="sr-only">(PDF, nouvel onglet)</span>
            </a>
          )}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="press ml-auto inline-flex items-center gap-2 rounded-sm border border-line px-3 py-2 text-label text-ink-2 lg:hidden"
          >
            {open ? <X aria-hidden className="size-4" /> : <Menu aria-hidden className="size-4" />}
            {open ? "Fermer" : "Menu"}
          </button>
        </div>

        <div id="menu-mobile" hidden={!open} className="border-t border-line bg-paper px-5 pb-6 pt-2 sm:px-8 lg:hidden">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className="block border-b border-line py-3.5 text-body-lg text-ink-2"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          {cv && (
            <a
              href={cv}
              target="_blank"
              rel="noopener noreferrer"
              className="press mt-5 inline-flex items-center gap-2 rounded-sm border border-line-2 px-4 py-2.5 text-label text-ink"
            >
              Consulter mon CV
              <Download aria-hidden className="size-3.5" strokeWidth={1.75} />
            </a>
          )}
        </div>
      </header>
    </>
  );
}
