"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Passage d'un aperçu de projet à son étude de cas.
 *
 * L'aperçu se rapproche brièvement (220 ms) avant que la page ne prenne
 * le relais, où la même capture réapparaît en grand par un masque : la
 * continuité est visuelle, sans dépendre d'une API expérimentale.
 *
 * Le lien reste un vrai lien : Ctrl/Cmd + clic, clic milieu, ouverture
 * dans un nouvel onglet et référencement fonctionnent normalement. Avec
 * prefers-reduced-motion, la navigation est immédiate et sans animation.
 */
export function OpeningLink({
  href,
  children,
  className,
  ariaLabel,
  stretch = true,
}: {
  href: string;
  children?: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  /** Rend toute la carte parente cliquable */
  stretch?: boolean;
}) {
  const router = useRouter();
  const ref = useRef<HTMLAnchorElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    []
  );

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault();
      // La carte parente porte l'animation : elle contient l'aperçu.
      const card = ref.current?.closest<HTMLElement>("[data-work-card]");
      if (card) card.dataset.opening = "true";
      timer.current = setTimeout(() => router.push(href), 220);
    },
    [href, router]
  );

  return (
    <Link
      ref={ref}
      href={href}
      onClick={onClick}
      prefetch
      aria-label={ariaLabel}
      className={cn(stretch && "after:absolute after:inset-0 after:z-10 after:content-['']", className)}
    >
      {children}
    </Link>
  );
}
