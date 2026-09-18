"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { labNodes, lab, type LabNode } from "@/data/it";
import { InView } from "@/components/ui/Reveal";

/**
 * Laboratoire — représentation interactive.
 *
 * Ce que le schéma montre : l'ordre des rôles et le sens de circulation.
 * Ce qu'il ne montre pas, parce que ce serait inventé : le nombre de
 * machines, le plan d'adressage, un taux de disponibilité. Les flux
 * animés illustrent un principe de fonctionnement, jamais une supervision.
 *
 * Chaque composant est un vrai bouton : atteignable au clavier, annoncé
 * par un lecteur d'écran. Le panneau de détail est une région `aria-live`,
 * donc la sélection est annoncée sans déplacer le focus. Le contenu
 * complet reste disponible en texte (`LabFallbackList`) si le JavaScript
 * ne s'exécute pas.
 */

const TIERS: { tier: LabNode["tier"]; label: string }[] = [
  { tier: 0, label: "Accès" },
  { tier: 1, label: "Filtrage" },
  { tier: 2, label: "Commutation" },
  { tier: 3, label: "Virtualisation" },
  { tier: 4, label: "Services" },
];

export function LabArchitecture() {
  const [selectedId, setSelectedId] = useState<string>("pfsense");
  const selected = labNodes.find((n) => n.id === selectedId) ?? labNodes[0];

  return (
    <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
      {/* ---------------- Schéma ---------------- */}
      <InView className="lg:col-span-7" rootMargin="0px 0px -8% 0px">
        <p className="font-mono text-tech uppercase text-ink-3">Schéma de principe</p>

        <div className="mt-7 flex flex-col">
          {TIERS.map((t, ti) => {
            const nodes = labNodes.filter((n) => n.tier === t.tier);
            const previous = labNodes.filter((n) => n.tier === TIERS[ti - 1]?.tier).length;
            return (
              <div key={t.tier}>
                {ti > 0 && <Connector from={previous} to={nodes.length} />}
                <div
                  className={cn(
                    "grid gap-2.5",
                    nodes.length === 1 && "grid-cols-1",
                    nodes.length === 2 && "grid-cols-2",
                    nodes.length >= 3 && "grid-cols-2 sm:grid-cols-4"
                  )}
                >
                  {nodes.map((n, i) => (
                    <NodeButton
                      key={n.id}
                      node={n}
                      active={n.id === selectedId}
                      delay={ti * 110 + i * 60}
                      onSelect={() => setSelectedId(n.id)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-8 border-t border-line pt-5 text-small text-ink-3">{lab.flowNote}</p>
      </InView>

      {/* ---------------- Panneau de détail ---------------- */}
      <div className="lg:col-span-4 lg:col-start-9">
        <div className="lg:sticky lg:top-28" aria-live="polite" aria-atomic="true">
          <p className="font-mono text-tech uppercase text-accent">Composant sélectionné</p>
          <h3 className="mt-4 text-h1 text-ink">{selected.label}</h3>
          <p className="mt-3 text-body-lg text-ink-2">{selected.role}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {selected.tech.map((t) => (
              <li key={t} className="border border-line-2 px-2.5 py-1 font-mono text-tech uppercase text-ink-2">
                {t}
              </li>
            ))}
          </ul>

          <ul className="mt-8 space-y-3">
            {selected.built.map((b) => (
              <li key={b} className="bracket text-body text-ink-2">
                {b}
              </li>
            ))}
          </ul>

          <p className="mt-8 border-l-2 border-accent pl-5 text-body text-ink-3">{selected.learned}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function NodeButton({
  node,
  active,
  delay,
  onSelect,
}: {
  node: LabNode;
  active: boolean;
  delay: number;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      style={{ ["--delay" as string]: `${delay}ms` }}
      className={cn(
        "rise-in press group/node border px-3.5 py-3.5 text-left transition-colors duration-200",
        active ? "border-accent bg-surface" : "border-line bg-transparent hover:border-line-2"
      )}
    >
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className={cn("size-1.5 shrink-0 transition-colors duration-200", active ? "bg-accent" : "bg-line-2")}
        />
        <span className="text-label font-medium text-ink">{node.label}</span>
      </span>
      <span className="mt-1.5 block font-mono text-tech uppercase text-ink-3">{node.tech.slice(0, 2).join(" · ")}</span>
    </button>
  );
}

/**
 * Liaisons entre deux rangées, en pourcentage : le tracé suit la grille
 * quelle que soit la largeur. Un point circule sur chaque liaison pour
 * indiquer le sens de lecture.
 */
function Connector({ from, to }: { from: number; to: number }) {
  const xs = (count: number) => Array.from({ length: count }, (_, i) => ((i + 0.5) / count) * 100);
  const top = xs(Math.max(from, 1));
  const bottom = xs(to);
  const paths = bottom.map((bx, i) => {
    const tx = top.length === bottom.length ? top[i] : top[Math.floor((i / bottom.length) * top.length)];
    return `M${tx} 0 V 45 H ${bx} V 100`;
  });

  return (
    <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="h-9 w-full sm:h-11" focusable="false">
      <g fill="none" stroke="var(--line-2)" strokeWidth="1" vectorEffect="non-scaling-stroke" pathLength={1}>
        {paths.map((d, i) => (
          <path key={d} className="draw" style={{ ["--delay" as string]: `${i * 90}ms` }} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      <g fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" pathLength={1} opacity="0.9">
        {paths.map((d, i) => (
          <path
            key={d}
            className="flow"
            vectorEffect="non-scaling-stroke"
            style={{ ["--flow-duration" as string]: "3200ms", animationDelay: `${i * 260}ms` }}
            d={d}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Version textuelle complète, rendue en dur. Elle garantit que
 * l'information reste accessible sans JavaScript : le schéma n'est qu'une
 * façon de la parcourir.
 */
export function LabFallbackList() {
  return (
    <details className="mt-14 border-t border-line pt-6">
      <summary className="cursor-pointer text-label text-ink-2 hover:text-ink">
        Lire le détail de chaque composant sous forme de texte
      </summary>
      <ul className="mt-8 grid gap-10 md:grid-cols-2">
        {labNodes.map((n) => (
          <li key={n.id}>
            <h4 className="text-h3 text-ink">{n.label}</h4>
            <p className="mt-1 text-body text-ink-2">{n.role}</p>
            <p className="mt-1 font-mono text-tech uppercase text-ink-3">{n.tech.join(" · ")}</p>
            <ul className="mt-3 space-y-1.5">
              {n.built.map((b) => (
                <li key={b} className="bracket text-body text-ink-2">
                  {b}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </details>
  );
}
