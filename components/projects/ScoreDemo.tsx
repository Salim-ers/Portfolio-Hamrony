"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Démonstration du principe de scoring CV / offre.
 * Données fictives et calcul volontairement simple : ce n'est pas l'algorithme de Skillora.
 */
const REQUIREMENTS = [
  { label: "Active Directory", weight: 3 },
  { label: "PowerShell", weight: 2 },
  { label: "VLAN et routage", weight: 3 },
  { label: "Microsoft 365", weight: 2 },
  { label: "Support utilisateurs", weight: 1 },
  { label: "Anglais technique", weight: 1 },
];
const CV = ["Active Directory", "VLAN et routage", "Support utilisateurs", "PowerShell", "Microsoft 365", "Anglais technique", "Ansible", "Next.js"];
const INITIAL = ["Active Directory", "VLAN et routage", "Support utilisateurs", "Ansible"];

export function ScoreDemo({ accent }: { accent: string }) {
  const [selected, setSelected] = useState<string[]>(INITIAL);
  const total = REQUIREMENTS.reduce((s, r) => s + r.weight, 0);
  const matched = REQUIREMENTS.filter((r) => selected.includes(r.label));
  const score = Math.round((matched.reduce((s, r) => s + r.weight, 0) / total) * 100);
  const missing = REQUIREMENTS.filter((r) => !selected.includes(r.label)).sort((a, b) => b.weight - a.weight);

  const R = 52;
  const C = 2 * Math.PI * R;
  const toggle = (label: string) => setSelected((s) => (s.includes(label) ? s.filter((x) => x !== label) : [...s, label]));
  const verdict = useMemo(() => (score >= 75 ? "Profil aligné" : score >= 45 ? "Alignement partiel" : "Écart important"), [score]);

  return (
    <div className="rounded-md border border-line">
      <div className="grid md:grid-cols-[1fr_auto_1fr]">
        <fieldset className="p-5 md:p-7">
          <legend className="float-left mb-4 w-full text-label text-fg">Compétences du CV</legend>
          <div className="clear-both flex flex-wrap gap-2">
            {CV.map((c) => {
              const on = selected.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(c)}
                  className={cn("press min-h-9 rounded-sm border px-3 text-small", on ? "border-fg-3 bg-ink-2 text-fg" : "border-line text-fg-3 hover:border-line-strong hover:text-fg-2")}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </fieldset>

        <div className="flex flex-col items-center justify-center border-y border-line px-10 py-8 md:border-x md:border-y-0">
          <div className="relative size-40">
            <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden>
              <circle cx="60" cy="60" r={R} fill="none" stroke="var(--color-line)" strokeWidth="1" />
              <circle
                cx="60"
                cy="60"
                r={R}
                fill="none"
                stroke={accent}
                strokeWidth="3"
                strokeDasharray={C}
                strokeDashoffset={C * (1 - score / 100)}
                style={{ transition: "stroke-dashoffset 500ms var(--ease-out)" }}
              />
              {REQUIREMENTS.map((r, i) => {
                const a = (i / REQUIREMENTS.length) * 2 * Math.PI;
                return <circle key={r.label} cx={60 + R * Math.cos(a)} cy={60 + R * Math.sin(a)} r="2" fill={selected.includes(r.label) ? accent : "var(--color-line-strong)"} />;
              })}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-h1 tabular-nums text-fg" aria-live="polite">
                {score}
              </span>
              <span className="font-mono text-tech text-fg-3">/ 100</span>
            </div>
          </div>
          <p className="mt-4 text-label text-fg-2">{verdict}</p>
        </div>

        <div className="p-5 md:p-7">
          <p className="mb-4 text-label text-fg">Exigences de l&apos;offre</p>
          <ul className="space-y-2.5">
            {REQUIREMENTS.map((r) => {
              const ok = selected.includes(r.label);
              return (
                <li key={r.label} className="flex items-center justify-between gap-4 text-small">
                  <span className={cn("flex items-center gap-2.5", ok ? "text-fg" : "text-fg-3")}>
                    <span aria-hidden className="h-px w-3" style={{ background: ok ? accent : "var(--color-line-strong)" }} />
                    {r.label}
                    <span className="sr-only">{ok ? " : présent dans le CV" : " : absent du CV"}</span>
                  </span>
                  <span className="font-mono text-tech text-fg-3">×{r.weight}</span>
                </li>
              );
            })}
          </ul>
          {missing.length > 0 && (
            <p className="mt-5 border-t border-line pt-4 text-small text-fg-2">
              Piste d&apos;optimisation : mettre en avant <span className="text-fg">{missing[0].label}</span>.
            </p>
          )}
        </div>
      </div>
      <p className="border-t border-line px-5 py-3 text-small text-fg-3 md:px-7">Démonstration du principe avec un exemple fictif. Ce calcul n&apos;est pas celui de Skillora.</p>
    </div>
  );
}
