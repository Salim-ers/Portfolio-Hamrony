"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { trainingProjects } from "@/data/it";

/**
 * Les treize projets professionnalisants, filtrables par domaine.
 *
 * Le filtre ne masque jamais définitivement l'information : « Tous » est
 * l'état par défaut et la liste complète est rendue côté serveur. Chaque
 * changement de filtre est annoncé par une région `aria-live`, et les
 * lignes réapparaissent avec un décalage court plutôt qu'un fondu global.
 */
export function TrainingProjects() {
  const [area, setArea] = useState<string>("Tous");

  const areas = useMemo(
    () => ["Tous", ...Array.from(new Set(trainingProjects.map((p) => p.area)))],
    []
  );
  const visible = area === "Tous" ? trainingProjects : trainingProjects.filter((p) => p.area === area);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrer les projets par domaine">
        {areas.map((a) => {
          const active = a === area;
          return (
            <button
              key={a}
              type="button"
              onClick={() => setArea(a)}
              aria-pressed={active}
              className={cn(
                "press rounded-sm border px-3.5 py-2 text-label transition-colors duration-200",
                active ? "border-accent bg-accent text-on-accent" : "border-line text-ink-2 hover:border-line-2 hover:text-ink"
              )}
            >
              {a}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} projet{visible.length > 1 ? "s" : ""} affiché{visible.length > 1 ? "s" : ""}
        {area !== "Tous" ? ` pour le domaine ${area}` : ""}.
      </p>

      <ol className="mt-8">
        {visible.map((p, i) => (
          <li
            key={p.n}
            className="fade-up grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1 border-t border-line py-4 sm:grid-cols-[auto_1fr_auto]"
            style={{ ["--delay" as string]: `${i * 35}ms` }}
          >
            <span className="font-mono text-tech text-accent-ink">{p.n}</span>
            <span className="text-body-lg text-ink">{p.label}</span>
            <span className="col-start-2 font-mono text-tech uppercase tracking-[0.14em] text-ink-3 sm:col-start-3">
              {p.area}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
