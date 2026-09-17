"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { labNodes, lab, type LabNode } from "@/data/it";
import { InView } from "@/components/ui/Reveal";

/**
 * Représentation interactive du home lab.
 *
 * Ce qu'elle montre : l'ordre des rôles et le sens de circulation.
 * Ce qu'elle ne montre pas, parce que ce serait inventé : le nombre de
 * machines, le plan d'adressage, un taux de disponibilité. Le schéma est
 * annoncé comme un schéma de principe, et les flux animés comme une
 * illustration, pas comme une supervision en temps réel.
 *
 * Accessibilité : chaque composant est un vrai bouton, donc atteignable
 * au clavier et annonçable par un lecteur d'écran. Le panneau de détail
 * est une région `aria-live` : la sélection est annoncée sans déplacer
 * le focus. Sans JavaScript, tout le contenu reste présent sous forme de
 * liste (voir `LabFallbackList` plus bas, rendue côté serveur).
 */

/**
 * Une rangée par maillon de la chaîne, dans l'ordre réel des flux :
 * l'accès opérateur n'est relié qu'au pare-feu, jamais directement au
 * commutateur.
 */
const TIERS: { tier: LabNode["tier"]; label: string }[] = [
  { tier: 0, label: "Accès" },
  { tier: 1, label: "Filtrage" },
  { tier: 2, label: "Commutation" },
  { tier: 3, label: "Virtualisation" },
  { tier: 4, label: "Services" },
];

export function LabArchitecture() {
  const [selectedId, setSelectedId] = useState<string>(labNodes[1].id);
  const selected = labNodes.find((n) => n.id === selectedId) ?? labNodes[0];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      {/* ---------------- Schéma ---------------- */}
      <InView className="lg:col-span-7" rootMargin="0px 0px -10% 0px">
        <div className="rounded-md border border-line bg-paper-2 p-5 sm:p-7">
          <p className="font-mono text-tech uppercase tracking-[0.16em] text-ink-3">Schéma de principe</p>

          <div className="mt-6 flex flex-col">
            {TIERS.map((t, ti) => {
              const nodes = labNodes.filter((n) => n.tier === t.tier);
              return (
                <div key={t.tier}>
                  {ti > 0 && <Connector from={labNodes.filter((n) => n.tier === TIERS[ti - 1].tier).length} to={nodes.length} />}
                  <div
                    className={cn(
                      "grid gap-2 sm:gap-3",
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
                        delay={ti * 120 + i * 60}
                        onSelect={() => setSelectedId(n.id)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="mt-6 border-t border-line pt-4 text-small text-ink-3">{lab.flowNote}</p>
        </div>
      </InView>

      {/* ---------------- Détail du composant sélectionné ---------------- */}
      <div className="lg:col-span-5">
        <div
          className="lg:sticky lg:top-28"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="font-mono text-tech uppercase tracking-[0.16em] text-accent-ink">Composant sélectionné</p>
          <h3 className="mt-3 text-h2 text-ink">{selected.label}</h3>
          <p className="mt-3 text-body-lg text-ink-2">{selected.role}</p>

          <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-1.5">
            {selected.tech.map((t) => (
              <li key={t} className="rounded-sm border border-line px-2 py-1 font-mono text-tech text-ink-2">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <p className="font-mono text-tech uppercase tracking-[0.16em] text-ink-3">Ce que j&apos;ai mis en place</p>
            <ul className="mt-3 space-y-2.5">
              {selected.built.map((b) => (
                <li key={b} className="flex gap-3 text-body text-ink-2">
                  <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-accent" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-l-2 border-accent pl-5">
            <p className="font-mono text-tech uppercase tracking-[0.16em] text-ink-3">Ce que j&apos;en ai retenu</p>
            <p className="mt-3 text-body text-ink-2">{selected.learned}</p>
          </div>
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
        "rise-in press group/node rounded-sm border px-3 py-3 text-left transition-colors duration-200 sm:px-4",
        active
          ? "border-accent bg-accent-soft"
          : "border-line bg-surface hover:border-line-2"
      )}
    >
      <span className={cn("block text-label font-medium", active ? "text-ink" : "text-ink")}>{node.label}</span>
      <span className="mt-1 block font-mono text-tech text-ink-3">{node.tech.slice(0, 2).join(" · ")}</span>
    </button>
  );
}

/**
 * Liaisons entre deux rangées. Les coordonnées sont en pourcentage :
 * le tracé suit la grille quelle que soit la largeur disponible.
 */
function Connector({ from, to }: { from: number; to: number }) {
  const xs = (count: number) => Array.from({ length: count }, (_, i) => ((i + 0.5) / count) * 100);
  const top = xs(from);
  const bottom = xs(to);
  const paths = bottom.map((bx, i) => {
    const tx = top.length === bottom.length ? top[i] : top[Math.floor((i / bottom.length) * top.length)];
    return `M${tx} 0 V 45 H ${bx} V 100`;
  });

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="h-8 w-full sm:h-10"
      focusable="false"
    >
      <g fill="none" stroke="var(--line-2)" strokeWidth="1" vectorEffect="non-scaling-stroke" pathLength={1}>
        {paths.map((d, i) => (
          <path key={d} className="draw" style={{ ["--delay" as string]: `${i * 90}ms` }} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      <g fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" pathLength={1} opacity="0.85">
        {paths.map((d, i) => (
          <path
            key={d}
            className="flow"
            vectorEffect="non-scaling-stroke"
            style={{ ["--flow-duration" as string]: "3400ms", animationDelay: `${i * 260}ms` }}
            d={d}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Version textuelle complète, rendue en dur dans la page.
 * Elle garantit que l'information reste accessible sans JavaScript et
 * sans animation : le schéma n'est qu'une façon de la parcourir.
 */
export function LabFallbackList() {
  return (
    <details className="mt-10 border-t border-line pt-6">
      <summary className="cursor-pointer text-label text-ink-2 hover:text-ink">
        Lire le détail de chaque composant sous forme de texte
      </summary>
      <ul className="mt-6 space-y-8">
        {labNodes.map((n) => (
          <li key={n.id}>
            <h4 className="text-h3 text-ink">{n.label}</h4>
            <p className="mt-1 text-body text-ink-2">{n.role}</p>
            <p className="mt-1 font-mono text-tech text-ink-3">{n.tech.join(" · ")}</p>
            <ul className="mt-3 space-y-1.5">
              {n.built.map((b) => (
                <li key={b} className="text-body text-ink-2">
                  — {b}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-body text-ink-3">{n.learned}</p>
          </li>
        ))}
      </ul>
    </details>
  );
}
