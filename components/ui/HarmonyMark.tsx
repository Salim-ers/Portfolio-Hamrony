/** Monogramme Harmony redessiné en traits (d'après le logo). Prend la couleur du texte courant. */
const PATHS = [
  "M45 62H250",
  "M295 62H500",
  "M45 452H250",
  "M295 452H500",
  "M95 62V452",
  "M450 62V452",
  "M148 62V232H397V62",
  "M397 452V282H148V452",
  "M198 62V182H347V62",
  "M347 452V332H198V452",
];

export function HarmonyMark({ className, title = "Harmony Solutions", strokeWidth = 22, draw = false, decorative = false }: { className?: string; title?: string; strokeWidth?: number; draw?: boolean; decorative?: boolean }) {
  return (
    <svg viewBox="30 48 485 418" className={className} fill="none" {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": title })}>
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter">
        {PATHS.map((d, i) => (
          <path key={d} d={d} pathLength={1} className={draw ? "draw-when-visible" : undefined} style={draw ? { ["--delay" as string]: `${i * 70}ms` } : undefined} />
        ))}
      </g>
    </svg>
  );
}
