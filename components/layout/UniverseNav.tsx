"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

/**
 * Navigation persistante.
 *
 * Elle est présente sur toutes les pages, y compris la porte d'entrée :
 * on peut donc changer d'univers à tout moment, sans repasser par
 * l'accueil. L'univers courant est indiqué par `aria-current="page"`
 * et par un état visuel explicite, pas seulement par la couleur.
 *
 * Aucune interception de navigation : ce sont de vrais liens, le bouton
 * retour du navigateur fonctionne et chaque page a une URL directe.
 */

const UNIVERSES = [
  { href: "/creation", label: "Web & applications", short: "Création" },
  { href: "/systemes", label: "Systèmes & réseaux", short: "Systèmes" },
] as const;

const SECTIONS: Record<string, { href: string; label: string }[]> = {
  "/creation": [
    { href: "/creation#realisations", label: "Réalisations" },
    { href: "/creation#services", label: "Services" },
    { href: "/creation#contact", label: "Contact" },
  ],
  "/systemes": [
    { href: "/systemes#competences", label: "Compétences" },
    { href: "/systemes#homelab", label: "Home lab" },
    { href: "/systemes#support", label: "Support" },
    { href: "/systemes#parcours", label: "Parcours" },
    { href: "/systemes#contact", label: "Contact" },
  ],
};

export function UniverseNav() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const universe = pathname.startsWith("/systemes") ? "/systemes" : pathname.startsWith("/creation") ? "/creation" : null;
  const sections = universe ? SECTIONS[universe] : [];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Le menu mobile se referme à chaque changement de page.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-sm focus:bg-ink focus:px-4 focus:py-2 focus:text-label focus:text-paper"
      >
        Aller au contenu
      </a>

      {/* La barre adopte l'ambiance de l'univers consulté : sans cela, une
          barre ivoire resterait posée sur les pages graphite. Sur la porte
          d'entrée, elle reste neutre (ivoire) au-dessus des deux panneaux. */}
      <header
        data-universe={universe === "/systemes" ? "systems" : "creation"}
        className={cn(
          "fixed inset-x-0 top-0 z-[var(--z-index-sticky)] transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open ? "border-b border-line bg-paper/92 backdrop-blur-md" : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center gap-3 px-5 sm:gap-4 sm:px-8 lg:px-12">
          {/* Sous 640px, le nom complet ne tient pas à côté de la bascule
              d'univers : on affiche un monogramme plutôt que de tronquer. */}
          <Link
            href="/"
            className="press shrink-0 text-label font-medium tracking-tight text-ink"
            aria-label={`${profile.name}, retour à l'entrée du site`}
          >
            <span className="sm:hidden" aria-hidden>
              SER
            </span>
            <span className="hidden sm:inline" aria-hidden>
              {profile.name}
            </span>
          </Link>

          {/* Bascule d'univers — toujours visible, y compris sur la porte d'entrée */}
          <nav aria-label="Univers" className="ml-auto shrink-0">
            <ul className="flex items-center rounded-sm border border-line p-0.5">
              {UNIVERSES.map((u) => {
                const active = universe === u.href;
                return (
                  <li key={u.href}>
                    <Link
                      href={u.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "press block rounded-[3px] px-2.5 py-1.5 text-label sm:px-4",
                        active ? "bg-ink text-paper" : "text-ink-2 hover:text-ink"
                      )}
                    >
                      <span className="sm:hidden">{u.short}</span>
                      <span className="hidden sm:inline">{u.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Sections de l'univers courant */}
          {sections.length > 0 && (
            <nav aria-label="Sections" className="hidden lg:block">
              <ul className="flex items-center gap-6">
                {sections.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="link-underline text-label text-ink-2 hover:text-ink">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {sections.length > 0 && (
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="nav-sections"
              className="press shrink-0 rounded-sm border border-line px-2.5 py-1.5 text-label text-ink-2 lg:hidden"
            >
              {open ? "Fermer" : "Sections"}
            </button>
          )}
        </div>

        {sections.length > 0 && (
          <div
            id="nav-sections"
            hidden={!open}
            className="border-t border-line bg-paper px-5 pb-5 pt-3 sm:px-8 lg:hidden"
          >
            <ul className="flex flex-col">
              {sections.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="block border-b border-line py-3 text-body text-ink-2 last:border-0">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
}
