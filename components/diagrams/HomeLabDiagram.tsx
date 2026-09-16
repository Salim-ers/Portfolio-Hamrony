"use client";

import { useState } from "react";
import { homelab, type HomelabNode } from "@/data/homelab";
import { InView } from "@/components/ui/InView";
import { cn, isPlaceholder } from "@/lib/utils";
import { Wire, WireCanvas } from "@/components/diagrams/Wires";

const STATUS_LABEL = { online: "En ligne", offline: "Hors ligne", maintenance: "Maintenance" } as const;

function Value({ v }: { v: string }) {
  return isPlaceholder(v) ? <span className="text-fg-3">à renseigner</span> : <span className="text-fg">{v}</span>;
}

function NodeSheet({ node }: { node: HomelabNode }) {
  const rows: [string, string][] = [
    ["hostname", node.hostname],
    ["role", node.role],
    ["os", node.os],
    ["ip", node.ip],
    ["network", node.network],
  ];
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="text-label text-fg">{node.label}</p>
        <span className="font-mono text-tech text-fg-3">
          {node.status ? (
            <span className="inline-flex items-center gap-1.5">
              {node.status === "online" && <span aria-hidden className="size-1.5 rounded-full bg-ok" />}
              {STATUS_LABEL[node.status]}
            </span>
          ) : (
            "statut à renseigner"
          )}
        </span>
      </div>
      <dl className="mt-3 font-mono text-tech">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[5.5rem_1fr] gap-2 py-1">
            <dt className="text-fg-3">{k}</dt>
            <dd>
              <Value v={v} />
            </dd>
          </div>
        ))}
        <div className="grid grid-cols-[5.5rem_1fr] gap-2 py-1">
          <dt className="text-fg-3">services</dt>
          <dd>{node.services.length && !node.services.every(isPlaceholder) ? <span className="text-fg">{node.services.filter((s) => !isPlaceholder(s)).join(", ")}</span> : <span className="text-fg-3">à renseigner</span>}</dd>
        </div>
      </dl>
    </div>
  );
}

export function HomeLabDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<string>(homelab.nodes[0]?.id);
  const focusId = hovered ?? selected;
  const byId = Object.fromEntries(homelab.nodes.map((n) => [n.id, n]));
  const focusNode = byId[focusId];

  const connected = (linkFrom: string, linkTo: string) => linkFrom === focusId || linkTo === focusId;

  return (
    <InView className="overflow-hidden rounded-md border border-line bg-ink-1/40">
      <div className="grid lg:grid-cols-[1fr_320px]">
        {/* Diagramme (tablette et desktop) */}
        <div className="relative hidden p-8 md:block lg:p-12">
          <div className="relative aspect-[16/8]">
            <WireCanvas units={[100, 100]} className="absolute inset-0 size-full">
              {homelab.links.map((l, i) => {
                const a = byId[l.from];
                const b = byId[l.to];
                const mid = (a.x + b.x) / 2;
                const d = a.y === b.y ? `M${a.x} ${a.y} H${b.x}` : `M${a.x} ${a.y} H${mid} V${b.y} H${b.x}`;
                const on = connected(l.from, l.to);
                return (
                  <g key={`${l.from}-${l.to}`}>
                    <Wire d={d} className="draw-when-visible" style={{ ["--delay" as string]: `${i * 150}ms`, transition: "stroke 200ms" }} stroke={on ? "var(--color-brass)" : "var(--color-line-strong)"} />
                    {on && <Wire d={d} className="flow" stroke="var(--color-brass-hi)" strokeWidth={2.5} style={{ ["--flow-duration" as string]: "2000ms" }} />}
                  </g>
                );
              })}
            </WireCanvas>
            {homelab.nodes.map((n) => {
              const isFocus = n.id === focusId;
              return (
                <button
                  key={n.id}
                  type="button"
                  onMouseEnter={() => setHovered(n.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(n.id)}
                  onBlur={() => setHovered(null)}
                  onClick={() => setSelected(n.id)}
                  aria-pressed={selected === n.id}
                  className={cn(
                    "press absolute min-w-[8.5rem] -translate-x-1/2 -translate-y-1/2 rounded-sm border bg-ink-0 px-3 py-2.5 text-left transition-colors",
                    isFocus ? "border-brass" : "border-line-strong hover:border-fg-3"
                  )}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <span className="block text-label text-fg">{n.label}</span>
                  <span className="mt-0.5 block font-mono text-[11px] text-fg-3">{isPlaceholder(n.hostname) ? n.kind : n.hostname}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mobile : liste des nœuds */}
        <ul className="divide-y divide-line md:hidden">
          {homelab.nodes.map((n) => (
            <li key={n.id}>
              <button type="button" onClick={() => setSelected(n.id)} aria-expanded={selected === n.id} className="flex h-14 w-full items-center justify-between px-5 text-left">
                <span className="text-label text-fg">{n.label}</span>
                <span className="font-mono text-tech text-fg-3">{n.kind}</span>
              </button>
              {selected === n.id && (
                <div className="px-5 pb-5">
                  <NodeSheet node={n} />
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Fiche technique */}
        <aside className="hidden border-line p-6 md:block md:border-t lg:border-l lg:border-t-0" aria-live="polite">
          <p className="mb-4 font-mono text-tech text-fg-3">Fiche du nœud</p>
          {focusNode && <NodeSheet node={focusNode} />}
        </aside>
      </div>
    </InView>
  );
}
