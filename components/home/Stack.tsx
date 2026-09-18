"use client";

import { useState } from "react";
import { stackCategories } from "@/data/it";
import { cn } from "@/lib/utils";
import { Section, SectionHead } from "@/components/ui/Section";

/**
 * Environnement technique.
 *
 * Huit catégories, une seule ouverte à la fois : on ne montre pas soixante
 * badges d'un bloc. Les boutons sont de vrais boutons, la liste change
 * sous une région `aria-live`, et rien n'est masqué au rendu serveur.
 */
export function Stack() {
  const [active, setActive] = useState(stackCategories[0].id);
  const current = stackCategories.find((c) => c.id === active) ?? stackCategories[0];

  return (
    <Section id="technologies" tone="paper-2">
      <SectionHead
        index="09"
        eyebrow="Environnement technique"
        title="Ce que je pratique."
        lede={
          <p>
            Pas de jauge, pas de pourcentage : une jauge de compétence ne veut rien dire. Les environnements que
            j&apos;ai installés, configurés ou administrés.
          </p>
        }
      />

      <div className="mt-16 grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <ul role="tablist" aria-label="Catégories techniques" className="border-t border-line">
            {stackCategories.map((c) => {
              const on = c.id === active;
              return (
                <li key={c.id} className="border-b border-line">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="stack-liste"
                    onClick={() => setActive(c.id)}
                    className={cn(
                      "press flex w-full items-center justify-between gap-4 py-4 text-left transition-colors duration-200",
                      on ? "text-ink" : "text-ink-3 hover:text-ink"
                    )}
                  >
                    <span className="text-h3">{c.name}</span>
                    <span className="font-mono text-tech text-ink-3">{String(c.items.length).padStart(2, "0")}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div id="stack-liste" role="tabpanel" aria-live="polite" className="lg:col-span-7 lg:col-start-6">
          <ul className="flex flex-wrap gap-3">
            {current.items.map((item, i) => (
              <li
                key={item}
                className="fade-up border border-line-2 bg-surface px-4 py-2.5 text-body text-ink"
                style={{ ["--delay" as string]: `${i * 35}ms` }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
