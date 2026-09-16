"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Wire, WireCanvas } from "@/components/diagrams/Wires";

type BranchId = "systems" | "network" | "products";

const BRANCHES: { id: BranchId; label: string; x: number; href: string; leaves: string[]; target: string }[] = [
  { id: "systems", label: "Systems", x: 16, href: "#case-active-directory", leaves: ["Windows", "Linux", "Cloud"], target: "Infrastructure" },
  { id: "network", label: "Network", x: 50, href: "#case-three-buildings", leaves: ["Routing", "Security", "VPN"], target: "Réseau" },
  { id: "products", label: "Products", x: 84, href: "#projects", leaves: ["SaaS", "Web", "Apps"], target: "Projets" },
];

const Y = { root: 7, core: 30, branch: 55, leaf0: 71, leafStep: 11 };
const SPINE_OFFSET = 0; // les feuilles sont alignées sur l'épine
const LEAF_X = 4.5; // décalage horizontal de l'étiquette par rapport à l'épine

export function SystemTopology() {
  const [active, setActive] = useState<BranchId | null>(null);
  const [pinned, setPinned] = useState<BranchId | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const current = pinned ?? active;

  function onPointerMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    setActive(x < 0.34 ? "systems" : x < 0.66 ? "network" : "products");
  }

  const lit = (b?: BranchId) => (b ? current === b : current !== null);

  // Tracés en coordonnées relatives 0..100, convertis en pixels par WireCanvas
  const trunk = `M50 ${Y.root + 4} V${Y.core - 4}`;
  const bus = (b: (typeof BRANCHES)[number]) => `M50 ${Y.core + 4} V${(Y.core + Y.branch) / 2} H${b.x} V${Y.branch - 4}`;
  const spine = (b: (typeof BRANCHES)[number]) => `M${b.x + SPINE_OFFSET} ${Y.branch + 4} V${Y.leaf0 + Y.leafStep * 2}`;
  const tick = (b: (typeof BRANCHES)[number], i: number) => `M${b.x} ${Y.leaf0 + Y.leafStep * i} H${b.x + LEAF_X - 1}`;

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={() => setActive(null)}
      className="relative aspect-[10/8.2] w-full select-none"
    >
      <WireCanvas units={[100, 100]} className="absolute inset-0 size-full overflow-visible">
        <g strokeWidth={1}>
          <Wire d={trunk} className="draw" style={{ ["--delay" as string]: "150ms" }} stroke={lit() ? "var(--color-brass)" : "var(--color-line-strong)"} />
          {BRANCHES.map((b, bi) => (
            <g key={b.id}>
              <Wire d={bus(b)} className="draw" style={{ ["--delay" as string]: `${420 + bi * 90}ms`, transition: "stroke 220ms var(--ease-out)" }} stroke={lit(b.id) ? "var(--color-brass)" : "var(--color-line-strong)"} />
              <Wire d={spine(b)} className="draw" style={{ ["--delay" as string]: `${900 + bi * 90}ms`, transition: "stroke 220ms var(--ease-out)" }} stroke={lit(b.id) ? "var(--color-brass)" : "var(--color-line)"} />
              {b.leaves.map((_, i) => (
                <Wire key={i} d={tick(b, i)} className="draw" style={{ ["--delay" as string]: `${1150 + bi * 90 + i * 60}ms` }} stroke={lit(b.id) ? "var(--color-brass)" : "var(--color-line)"} />
              ))}
              {lit(b.id) && (
                <>
                  <Wire d={trunk} className="flow" stroke="var(--color-brass-hi)" strokeWidth={2.5} style={{ ["--flow-duration" as string]: "1600ms" }} />
                  <Wire d={bus(b)} className="flow" stroke="var(--color-brass-hi)" strokeWidth={2.5} style={{ ["--flow-duration" as string]: "1900ms" }} />
                </>
              )}
            </g>
          ))}
        </g>
      </WireCanvas>

      {/* Racine */}
      <a
        href="#journey"
        className="appear group absolute -translate-x-1/2 -translate-y-1/2 rounded-sm border border-line-strong bg-ink-0 px-3 py-1.5 font-mono text-tech tracking-[0.06em] text-fg-2 transition-colors hover:border-fg-3 hover:text-fg"
        style={{ left: "50%", top: `${Y.root}%`, ["--delay" as string]: "0ms" }}
      >
        SALIM
        <span className="sr-only"> : voir le parcours</span>
      </a>

      {/* Noyau */}
      <a
        href="#harmony"
        className={cn(
          "appear absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm border bg-ink-0 px-4 py-2 font-mono text-tech tracking-[0.06em] transition-colors duration-200",
          lit() ? "border-brass text-brass" : "border-line-strong text-fg"
        )}
        style={{ left: "50%", top: `${Y.core}%`, ["--delay" as string]: "300ms" }}
      >
        HARMONY SYSTEM
        <span className="sr-only"> : voir Harmony Solutions</span>
      </a>

      {BRANCHES.map((b, bi) => (
        <div key={b.id}>
          <a
            href={b.href}
            onFocus={() => setActive(b.id)}
            onBlur={() => setActive(null)}
            onClick={(e) => {
              // Sur écran tactile : premier tap = mise en évidence, second tap = navigation
              if (window.matchMedia("(hover: none)").matches && pinned !== b.id) {
                e.preventDefault();
                setPinned(b.id);
              }
            }}
            className={cn(
              "appear absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-sm border bg-ink-0 px-3.5 py-2 text-label transition-colors duration-200",
              current === b.id ? "border-brass text-fg" : "border-line-strong text-fg-2"
            )}
            style={{ left: `${b.x}%`, top: `${Y.branch}%`, ["--delay" as string]: `${700 + bi * 90}ms` }}
          >
            {b.label}
            <span className="sr-only"> : voir {b.target}</span>
          </a>
          {b.leaves.map((leaf, i) => (
            <span
              key={leaf}
              className={cn("appear absolute -translate-y-1/2 font-mono text-tech transition-colors duration-200", current === b.id ? "text-fg" : "text-fg-3")}
              style={{ left: `${b.x + LEAF_X}%`, top: `${Y.leaf0 + Y.leafStep * i}%`, ["--delay" as string]: `${1250 + bi * 90 + i * 60}ms` }}
            >
              {leaf.toUpperCase()}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

/** Version mobile : arbre typographique, lisible sans survol. */
export function SystemTree() {
  return (
    <div className="font-mono text-tech">
      <div className="text-fg-2">SALIM</div>
      <div className="ml-[3px] border-l border-line-strong pl-4 pt-3">
        <div className="text-brass">HARMONY SYSTEM</div>
        <ul className="ml-[3px] mt-3 border-l border-line-strong">
          {BRANCHES.map((b) => (
            <li key={b.id} className="relative py-2.5 pl-5">
              <span aria-hidden className="absolute left-0 top-[1.15rem] h-px w-3 bg-line-strong" />
              <a href={b.href} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-2">
                <span className="font-sans text-label text-fg">{b.label}</span>
                <span className="text-fg-3">{b.leaves.map((l) => l.toUpperCase()).join("  /  ")}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
