"use client";

import { cn } from "@/lib/utils";
import { InView } from "@/components/ui/Reveal";

/**
 * Éléments graphiques dérivés du logo.
 *
 * Le monogramme Harmony est fait de traits parallèles et de traverses qui
 * dépassent. On en tire trois motifs réutilisés dans tout le portfolio,
 * pour que l'identité ne se limite pas à un logo posé dans la navigation.
 */

/** Filet double, comme les montants du monogramme. Se trace au défilement. */
export function RuleDouble({ className }: { className?: string }) {
  return (
    <InView className={cn("w-full", className)} rootMargin="0px 0px -5% 0px">
      <div className="rule-in rule-double" />
    </InView>
  );
}

/**
 * Traverse d'angle : le coin du « H », posé en tête de section.
 * Elle prolonge le filet horizontal du logo au-delà du montant vertical,
 * exactement comme sur la marque.
 */
export function CornerRule({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 40"
      className={cn("h-8 w-[120px] text-accent", className)}
      fill="none"
      preserveAspectRatio="xMinYMid meet"
    >
      <g stroke="currentColor" strokeWidth="1.5" pathLength={1}>
        <path className="draw" d="M0 6 H 96" />
        <path className="draw" style={{ ["--delay" as string]: "90ms" }} d="M0 14 H 72" />
        <path className="draw" style={{ ["--delay" as string]: "180ms" }} d="M96 6 V 34" />
      </g>
    </svg>
  );
}

/**
 * Colonnes appariées en fond de composition. Deux traits rapprochés qui se
 * répètent : la respiration du monogramme, à l'échelle de la page.
 */
export function RuledBackground({ className }: { className?: string }) {
  return <div aria-hidden className={cn("ruled-bg pointer-events-none absolute inset-0 -z-10", className)} />;
}

/**
 * Grand monogramme en filigrane, ancré dans un angle. Il rappelle la marque
 * sans jamais concurrencer le contenu : très basse opacité, décoratif,
 * retiré de l'arbre d'accessibilité.
 */
export function WatermarkMark({
  className,
  mark,
}: {
  className?: string;
  mark: React.ReactNode;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute select-none opacity-[0.045]", className)}>
      {mark}
    </div>
  );
}
