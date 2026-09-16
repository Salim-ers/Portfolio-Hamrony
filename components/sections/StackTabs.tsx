"use client";

import { useState } from "react";
import { skills } from "@/data/skills";
import { cn } from "@/lib/utils";

/**
 * Environnement technique : cinq catégories, une seule visible à la fois.
 * Aucun compteur, aucun niveau : uniquement les technologies pratiquées.
 */
export function StackTabs() {
  const [active, setActive] = useState(skills[0].id);
  const current = skills.find((s) => s.id === active) ?? skills[0];

  return (
    <div className="mt-24 md:mt-32">
      <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
        <h3 className="text-h2 text-ink lg:col-span-7">Environnement technique</h3>
        <p className="text-body text-ink-2 lg:col-span-5">Les technologies que je pratique, par domaine.</p>
      </div>

      <div className="mt-12 grid gap-10 border-t border-line-2 pt-2 lg:grid-cols-12 lg:gap-12">
        {/* Catégories */}
        <div className="lg:col-span-4">
          <ul role="tablist" aria-label="Catégories techniques" className="flex flex-col">
            {skills.map((g) => {
              const isActive = g.id === active;
              return (
                <li key={g.id}>
                  <button
                    type="button"
                    role="tab"
                    id={`tab-${g.id}`}
                    aria-selected={isActive}
                    aria-controls={`panel-${g.id}`}
                    onClick={() => setActive(g.id)}
                    className={cn(
                      "press group flex w-full items-baseline gap-4 border-b border-line py-5 text-left transition-colors",
                      isActive ? "text-ink" : "text-ink-2 hover:text-ink"
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "h-px w-6 shrink-0 self-center transition-all duration-300",
                        isActive ? "w-10 bg-accent" : "bg-line-2"
                      )}
                    />
                    <span className="text-h3">{g.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Technologies */}
        <div
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          className="lg:col-span-7 lg:col-start-6 lg:pt-5"
        >
          <p className="font-mono text-tech uppercase tracking-[0.16em] text-ink-3">{current.context}</p>
          <ul key={current.id} className="mt-7 flex flex-wrap gap-x-3 gap-y-3">
            {current.items.map((item, i) => (
              <li
                key={item}
                className="fade-up border border-line bg-paper-3 px-4 py-2 text-small text-ink"
                style={{ ["--delay" as string]: `${i * 28}ms` }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
