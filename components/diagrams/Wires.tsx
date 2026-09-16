"use client";

import { createContext, useContext, useLayoutEffect, useMemo, useRef, useState, type SVGProps } from "react";

/**
 * Les diagrammes sont décrits en coordonnées relatives (0..100) pour rester lisibles.
 * WireCanvas mesure sa taille réelle et convertit ces coordonnées en pixels :
 * le trait reste net (1px aligné), sans preserveAspectRatio="none" ni vector-effect,
 * dont la combinaison avec pathLength casse les tirets dans Chromium.
 */
type Scale = { sx: number; sy: number };
const ScaleCtx = createContext<Scale | null>(null);

export function WireCanvas({
  units = [100, 100],
  className,
  children,
}: {
  units?: [number, number];
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      setSize((prev) => (prev && Math.abs(prev.w - r.width) < 0.5 && Math.abs(prev.h - r.height) < 0.5 ? prev : { w: r.width, h: r.height }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = useMemo(() => (size ? { sx: size.w / units[0], sy: size.h / units[1] } : null), [size, units[0], units[1]]);

  return (
    <svg ref={ref} aria-hidden fill="none" className={className} viewBox={size ? `0 0 ${size.w} ${size.h}` : undefined}>
      {scale && size && size.w > 0 && <ScaleCtx.Provider value={scale}>{children}</ScaleCtx.Provider>}
    </svg>
  );
}

const snap = (v: number) => Math.round(v) + 0.5;

function scalePath(d: string, { sx, sy }: Scale) {
  return d.replace(/([MLHV])\s*([-\d.\s,]+)/g, (_, cmd: string, args: string) => {
    const n = args.trim().split(/[\s,]+/).map(Number);
    if (cmd === "H") return `H${snap(n[0] * sx)} `;
    if (cmd === "V") return `V${snap(n[0] * sy)} `;
    const out: string[] = [];
    for (let i = 0; i < n.length; i += 2) out.push(`${snap(n[i] * sx)} ${snap(n[i + 1] * sy)}`);
    return `${cmd}${out.join(" ")} `;
  });
}

export function Wire({ d, ...props }: Omit<SVGProps<SVGPathElement>, "d"> & { d: string }) {
  const scale = useContext(ScaleCtx);
  if (!scale) return null;
  return <path pathLength={1} {...props} d={scalePath(d, scale)} />;
}
