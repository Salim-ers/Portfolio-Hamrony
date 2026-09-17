"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Révélation au défilement.
 *
 * Quatre effets distincts, pour ne jamais faire apparaître deux sections
 * voisines de la même manière :
 *   rise  — montée courte, listes et détails techniques
 *   slide — glissement latéral, colonnes éditoriales
 *   rule  — filet qui se trace, intertitres et séparateurs
 *   mask  — masque vertical, réservé aux captures
 *
 * Le contenu est présent dans le DOM dès le rendu serveur : sans
 * JavaScript, sans IntersectionObserver ou avec prefers-reduced-motion,
 * tout reste lisible.
 */
export type RevealEffect = "rise" | "slide" | "rule" | "mask";

const EFFECT: Record<RevealEffect, string> = {
  rise: "rise-in",
  slide: "slide-in",
  rule: "rule-in",
  mask: "mask-in",
};

export function Reveal({
  children,
  className,
  effect = "rise",
  delay = 0,
  from,
  as: As = "div",
  once = true,
}: {
  children: React.ReactNode;
  className?: string;
  effect?: RevealEffect;
  delay?: number;
  /** Décalage de départ pour l'effet « slide », ex. "28px" ou "-28px" */
  from?: string;
  as?: "div" | "li" | "section" | "article" | "header" | "figure" | "p" | "span";
  once?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) io.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  const style = { "--delay": `${delay}ms`, ...(from ? { "--from": from } : {}) } as React.CSSProperties;

  return (
    <As ref={ref as never} data-visible={visible} className={cn(EFFECT[effect], className)} style={style}>
      {children}
    </As>
  );
}

/** Marque un sous-arbre entier comme visible : pilote les tracés SVG et les flux. */
export function InView({
  children,
  className,
  rootMargin = "0px 0px -15% 0px",
  id,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  rootMargin?: string;
  id?: string;
  as?: "div" | "section" | "figure";
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <As ref={ref as never} data-visible={visible} className={className} id={id}>
      {children}
    </As>
  );
}
