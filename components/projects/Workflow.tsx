"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/components/ui/InView";
import { cn } from "@/lib/utils";

/** Flux métier en planche contact : chaque étape est une vignette, la progression circule d'une étape à l'autre. */
export function Workflow({ steps, accent }: { steps: string[]; accent: string }) {
  const [ref, visible] = useInView<HTMLOListElement>("0px 0px -20% 0px", false);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (!visible || hovered !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % steps.length), 1100);
    return () => clearInterval(t);
  }, [visible, hovered, steps.length]);

  const current = hovered ?? active;

  return (
    <ol ref={ref} className="grid grid-cols-2 gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-5" onMouseLeave={() => setHovered(null)}>
      {steps.map((step, i) => {
        const done = i < current;
        const isCurrent = i === current;
        return (
          <li
            key={step}
            onMouseEnter={() => setHovered(i)}
            className="relative flex aspect-[4/3] flex-col justify-between bg-ink-0 p-3 sm:p-4"
          >
            <span aria-hidden className="absolute inset-0 transition-opacity duration-300" style={{ background: accent, opacity: isCurrent ? 0.1 : 0 }} />
            <span aria-hidden className="absolute inset-x-0 top-0 h-px transition-opacity duration-300" style={{ background: accent, opacity: isCurrent ? 1 : 0 }} />
            <span className={cn("relative font-mono text-tech transition-colors duration-300", isCurrent ? "text-fg" : done ? "text-fg-3" : "text-fg-3/70")}>{String(i + 1).padStart(2, "0")}</span>
            <span className={cn("relative text-small transition-colors duration-300 sm:text-body", isCurrent ? "text-fg" : "text-fg-2")}>{step}</span>
          </li>
        );
      })}
    </ol>
  );
}
