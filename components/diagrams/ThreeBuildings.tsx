"use client";

import { useState } from "react";
import { threeBuildings, type Building } from "@/data/infrastructure";
import { InView } from "@/components/ui/InView";
import { cn } from "@/lib/utils";
import { Wire, WireCanvas } from "@/components/diagrams/Wires";

type LayerId = (typeof threeBuildings.layers)[number]["id"];

function Field({ label, value }: { label: string; value: string | string[] | null }) {
  const text = Array.isArray(value) ? value.join(", ") : value;
  return (
    <div className="grid grid-cols-[6rem_1fr] gap-3 py-1.5">
      <dt className="font-mono text-tech text-fg-3">{label}</dt>
      <dd className={cn("text-small", text ? "text-fg" : "text-fg-3")}>{text || "à documenter"}</dd>
    </div>
  );
}

export function ThreeBuildings() {
  const [layer, setLayer] = useState<LayerId>("switching");
  const [selected, setSelected] = useState<Building["id"]>("b01");
  const current = threeBuildings.layers.find((l) => l.id === layer)!;
  const building = threeBuildings.buildings.find((b) => b.id === selected)!;
  const xs = [18, 50, 82];

  return (
    <InView className="rounded-md border border-line">
      <div className="flex flex-wrap gap-1 border-b border-line p-2" role="tablist" aria-label="Couches du réseau">
        {threeBuildings.layers.map((l) => (
          <button
            key={l.id}
            role="tab"
            type="button"
            aria-selected={layer === l.id}
            onClick={() => setLayer(l.id)}
            className={cn("press h-9 rounded-sm px-3 text-label", layer === l.id ? "bg-ink-2 text-fg" : "text-fg-3 hover:text-fg")}
          >
            {l.name}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr]">
        <div className="relative p-6 md:p-8">
          <div className="relative mx-auto aspect-[16/10] max-w-[560px]">
            <WireCanvas units={[100, 100]} className="absolute inset-0 size-full">
              {xs.map((x, i) => {
                const d = `M50 22 V44 H${x} V66`;
                const isSel = threeBuildings.buildings[i].id === selected;
                const highlight = layer === "links" || layer === "routing";
                return (
                  <g key={x}>
                    <Wire d={d} className="draw-when-visible" style={{ ["--delay" as string]: `${i * 120}ms`, transition: "stroke 200ms" }} stroke={highlight || isSel ? "var(--color-brass)" : "var(--color-line-strong)"} />
                    {layer === "links" && <Wire d={`M${x === 50 ? 51.2 : x + (x < 50 ? -1.2 : 1.2)} 44 V66`} stroke="var(--color-brass)" />}
                    {layer === "routing" && <Wire d={d} className="flow" stroke="var(--color-brass-hi)" strokeWidth={2.5} style={{ ["--flow-duration" as string]: `${1800 + i * 300}ms` }} />}
                  </g>
                );
              })}
            </WireCanvas>

            <div
              className={cn(
                "absolute left-1/2 top-[14%] -translate-x-1/2 rounded-sm border bg-ink-0 px-4 py-2 text-center transition-colors",
                layer === "filtering" ? "border-brass" : "border-line-strong"
              )}
            >
              <p className="font-mono text-tech text-fg">CORE</p>
              {layer === "filtering" && <p className="font-mono text-[10px] text-brass">ACL</p>}
            </div>

            {threeBuildings.buildings.map((b, i) => {
              const isSel = b.id === selected;
              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setSelected(b.id)}
                  aria-pressed={isSel}
                  className={cn(
                    "press absolute top-[66%] w-[26%] -translate-x-1/2 rounded-sm border bg-ink-0 px-2 pb-2 pt-2.5 text-left transition-colors",
                    isSel ? "border-brass" : "border-line-strong hover:border-fg-3"
                  )}
                  style={{ left: `${xs[i]}%` }}
                >
                  <span className="block font-mono text-tech text-fg">{b.name}</span>
                  <span aria-hidden className="mt-2 grid grid-cols-4 gap-0.5">
                    {Array.from({ length: 4 }).map((_, k) => (
                      <span
                        key={k}
                        className="h-1.5 rounded-[1px] transition-colors duration-200"
                        style={{ background: layer === "switching" ? (k % 2 ? "var(--color-brass)" : "var(--color-fg-3)") : "var(--color-line-strong)", opacity: layer === "switching" ? 0.35 + k * 0.15 : 1 }}
                      />
                    ))}
                  </span>
                  <span className="sr-only">Afficher les détails du bâtiment {b.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-line p-6 md:p-8 lg:border-l lg:border-t-0" aria-live="polite">
          <p className="font-mono text-tech text-brass">{current.tech.join(" / ")}</p>
          <p className="mt-2 text-body text-fg">{current.text}</p>
          <div className="mt-6 border-t border-line pt-5">
            <p className="text-label text-fg">Bâtiment {building.name}</p>
            <dl className="mt-3">
              <Field label="VLAN" value={building.vlans} />
              <Field label="Liens" value={building.links} />
              <Field label="Routage" value={building.routing} />
              <Field label="Services" value={building.services} />
            </dl>
          </div>
        </div>
      </div>
    </InView>
  );
}
