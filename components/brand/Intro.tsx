"use client";

import { useEffect, useState } from "react";
import { HarmonyMark } from "@/components/brand/HarmonyMark";

/**
 * Ouverture : les traits du monogramme se dessinent, puis le voile
 * s'efface. Un peu plus d'une seconde au total.
 *
 * Ce n'est jamais un écran de chargement : la page est déjà rendue
 * dessous, le voile ne bloque pas les interactions au-delà de sa durée,
 * et il est entièrement retiré du DOM ensuite. Il est sauté pour qui a
 * demandé moins d'animations, et ne rejoue pas d'une page à l'autre
 * pendant la même visite.
 */
const DRAW_MS = 900;
const HOLD_MS = 260;

export function Intro() {
  const [phase, setPhase] = useState<"hidden" | "playing" | "leaving">("hidden");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    try {
      if (sessionStorage.getItem("intro-vue") === "1") return;
      sessionStorage.setItem("intro-vue", "1");
    } catch {
      // Navigation privée ou stockage bloqué : on joue l'ouverture, sans plus.
    }

    setPhase("playing");
    const toLeaving = setTimeout(() => setPhase("leaving"), DRAW_MS + HOLD_MS);
    const toGone = setTimeout(() => setPhase("hidden"), DRAW_MS + HOLD_MS + 520);
    return () => {
      clearTimeout(toLeaving);
      clearTimeout(toGone);
    };
  }, []);

  if (phase === "hidden") return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-paper transition-opacity duration-[500ms] [transition-timing-function:var(--ease-out)]"
      style={{ opacity: phase === "leaving" ? 0 : 1 }}
    >
      {/* data-visible déclenche le tracé échelonné défini par la classe
          `.draw`, la même que pour les schémas : un seul mécanisme. */}
      <div data-visible="true">
        <HarmonyMark decorative draw strokeWidth={16} className="h-24 w-auto text-accent md:h-32" />
      </div>
    </div>
  );
}
