"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navigation, type NavId } from "@/data/navigation";
import { profile } from "@/data/profile";
import { HarmonyMark } from "@/components/ui/HarmonyMark";
import { useOverlay } from "@/components/overlays/OverlayProvider";
import { cn } from "@/lib/utils";

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<NavId | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
        const first = els.find((el) => visible.has(el));
        if (first) setActive(first.dataset.nav as NavId);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return active;
}

export function Nav() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(onHome);
  const { open } = useOverlay();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-sm focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
      >
        Aller au contenu
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[var(--z-index-sticky)] transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled ? "border-b border-line bg-paper/90 backdrop-blur-md" : "border-b border-transparent"
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-[1320px] items-center gap-8 px-5 sm:px-8 lg:px-12">
          <Link href="/" className="group flex shrink-0 items-center gap-3 text-ink" aria-label={`${profile.name}, accueil`}>
            <HarmonyMark className="h-5 w-auto text-accent transition-colors duration-200 group-hover:text-brass-deep" strokeWidth={30} decorative />
            <span className="text-label tracking-[-0.005em]">{profile.name}</span>
          </Link>

          <nav aria-label="Sections du site" className="ml-auto hidden md:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = onHome && active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={href(item.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={cn(
                        "relative block px-3.5 py-2 text-label transition-colors duration-200",
                        isActive ? "text-ink" : "text-ink-2 hover:text-ink"
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden
                        className={cn(
                          "absolute inset-x-3.5 bottom-1 h-px origin-left bg-accent transition-transform duration-300",
                          isActive ? "scale-x-100" : "scale-x-0"
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="press ml-auto flex size-10 items-center justify-center rounded-sm border border-line-2 text-ink md:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
          >
            <Menu aria-hidden className="size-4" strokeWidth={1.75} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[var(--z-index-overlay)] flex flex-col bg-paper md:hidden"
        >
          <div className="flex h-[68px] items-center justify-between px-5 sm:px-8">
            <span className="text-label text-ink">{profile.name}</span>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="press flex size-10 items-center justify-center rounded-sm border border-line-2 text-ink"
              aria-label="Fermer le menu"
              autoFocus
            >
              <X aria-hidden className="size-4" strokeWidth={1.75} />
            </button>
          </div>
          <nav aria-label="Sections du site" className="flex-1 overflow-y-auto px-5 pt-6 sm:px-8">
            <ul>
              {navigation.map((item, i) => (
                <li key={item.id} className="border-b border-line last:border-b-0">
                  <a
                    href={href(item.id)}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-baseline gap-4 py-5 text-h2 text-ink"
                  >
                    <span className="font-mono text-tech text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="px-5 py-6 sm:px-8">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                open("palette");
              }}
              className="press text-label text-ink-2"
            >
              Rechercher dans le site
            </button>
          </div>
        </div>
      )}
    </>
  );
}
