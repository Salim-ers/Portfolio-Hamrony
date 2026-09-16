"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { navigation, type NavId } from "@/data/navigation";
import { HarmonyMark } from "@/components/ui/HarmonyMark";
import { useOverlay } from "@/components/overlays/OverlayProvider";
import { cn } from "@/lib/utils";

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<NavId | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-nav]"));
    const visible = new Map<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.set(e.target, e.boundingClientRect.top) : visible.delete(e.target)));
        const candidates = els.filter((el) => visible.has(el));
        if (candidates.length) setActive(candidates[0].dataset.nav as NavId);
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
  const [isMac, setIsMac] = useState(true);

  useEffect(() => setIsMac(/Mac|iPhone|iPad/.test(navigator.platform)), []);
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
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-sm focus:bg-brass focus:px-4 focus:py-2 focus:text-brass-ink">
        Aller au contenu
      </a>
      <header className="fixed inset-x-0 top-0 z-[var(--z-index-sticky)] border-b border-line/80 bg-ink-0/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1320px] items-center gap-6 px-5 sm:px-8 lg:px-12">
          <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Salim El Rhalmani, accueil">
            <HarmonyMark className="h-5 w-auto" strokeWidth={30} decorative />
            <span className="text-label text-fg">Salim El Rhalmani</span>
          </Link>

          <nav aria-label="Sections" className="ml-auto hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigation.map((item) => {
                const isActive = onHome && active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={href(item.id)}
                      aria-current={isActive ? "location" : undefined}
                      className={cn("relative block rounded-sm px-3 py-2 text-label transition-colors duration-150", isActive ? "text-fg" : "text-fg-3 hover:text-fg")}
                    >
                      {item.label}
                      <span aria-hidden className={cn("absolute inset-x-3 -bottom-[13px] h-px bg-brass transition-opacity duration-200", isActive ? "opacity-100" : "opacity-0")} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-2">
            <button
              type="button"
              onClick={() => open("palette")}
              className="press flex h-9 items-center gap-2 rounded-sm border border-line-strong px-2.5 text-fg-3 hover:border-fg-3 hover:text-fg"
              aria-label="Ouvrir la command palette"
            >
              <Search aria-hidden className="size-3.5" strokeWidth={1.75} />
              <span className="font-mono text-tech">{isMac ? "⌘K" : "Ctrl K"}</span>
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="press flex size-9 items-center justify-center rounded-sm border border-line-strong text-fg lg:hidden"
              aria-label="Ouvrir le menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Menu aria-hidden className="size-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="appear fixed inset-0 z-[var(--z-index-overlay)] flex flex-col bg-ink-0 lg:hidden" style={{ ["--delay" as string]: "0ms" }}>
          <div className="flex h-16 items-center justify-between border-b border-line px-5 sm:px-8">
            <span className="text-label text-fg">Salim El Rhalmani</span>
            <button type="button" onClick={() => setMenuOpen(false)} className="press flex size-9 items-center justify-center rounded-sm border border-line-strong" aria-label="Fermer le menu" autoFocus>
              <X aria-hidden className="size-4" strokeWidth={1.75} />
            </button>
          </div>
          <nav aria-label="Sections" className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
            <ul>
              {navigation.map((item) => (
                <li key={item.id} className="border-b border-line last:border-b-0">
                  <a href={href(item.id)} onClick={() => setMenuOpen(false)} className={cn("flex h-14 items-center text-h2", onHome && active === item.id ? "text-fg" : "text-fg-2")}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-line px-5 py-4 sm:px-8">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                open("palette");
              }}
              className="press flex h-11 w-full items-center justify-center gap-2 rounded-sm border border-line-strong text-label text-fg-2"
            >
              <Search aria-hidden className="size-4" strokeWidth={1.75} />
              Rechercher
            </button>
          </div>
        </div>
      )}
    </>
  );
}
