/**
 * Composition du hero : trois modules architecturaux — infrastructure, produits, web —
 * reliés par une même colonne. Tracé fin, aucune donnée chiffrée, aucun texte superflu.
 */
const FRAMES = [
  { id: "infra", label: "Infrastructure", y: 40 },
  { id: "produits", label: "Produits", y: 212 },
  { id: "web", label: "Web", y: 384 },
];

const H = 132;
const X = 132;
const W = 336;
const SPINE = 84;

export function HeroComposition({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 560"
      className={className}
      fill="none"
      role="img"
      aria-label="Trois modules — infrastructure, produits et web — reliés par une même colonne."
    >
      {/* Grille de fond */}
      <g stroke="var(--color-line)" strokeWidth="1">
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={`v${i}`} x1={X + (i * W) / 4} y1="16" x2={X + (i * W) / 4} y2="544" opacity="0.5" />
        ))}
      </g>

      {/* Colonne vertébrale */}
      <line x1={SPINE} y1="40" x2={SPINE} y2="516" stroke="var(--color-line-2)" strokeWidth="1" pathLength={1} className="draw-when-visible" />
      <line
        x1={SPINE}
        y1="40"
        x2={SPINE}
        y2="516"
        stroke="var(--color-accent)"
        strokeWidth="1.5"
        pathLength={1}
        className="flow"
        style={{ ["--flow-duration" as string]: "6000ms" }}
      />

      {FRAMES.map((f, i) => {
        const cy = f.y + H / 2;
        return (
          <g key={f.id} className="reveal" style={{ ["--delay" as string]: `${200 + i * 220}ms` }}>
            {/* liaison colonne → module */}
            <line x1={SPINE} y1={cy} x2={X} y2={cy} stroke="var(--color-line-2)" strokeWidth="1" />
            <circle cx={SPINE} cy={cy} r="3.5" fill="var(--color-paper)" stroke="var(--color-accent)" strokeWidth="1.5" />
            {/* module */}
            <rect x={X} y={f.y} width={W} height={H} stroke="var(--color-line-2)" strokeWidth="1" fill="var(--color-paper-3)" />
            <text
              x={X + 18}
              y={f.y + 26}
              fill="var(--color-ink-3)"
              fontFamily="var(--font-mono)"
              fontSize="10.5"
              letterSpacing="1.6"
            >
              {String(i + 1).padStart(2, "0")} — {f.label.toUpperCase()}
            </text>
            <line x1={X} y1={f.y + 40} x2={X + W} y2={f.y + 40} stroke="var(--color-line)" strokeWidth="1" />
          </g>
        );
      })}

      {/* 01 — Infrastructure : trois hôtes sur un même segment */}
      <g className="reveal" style={{ ["--delay" as string]: "700ms" }}>
        <line x1={X + 28} y1={FRAMES[0].y + 96} x2={X + W - 28} y2={FRAMES[0].y + 96} stroke="var(--color-line-2)" strokeWidth="1" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <line x1={X + 66 + i * 102} y1={FRAMES[0].y + 96} x2={X + 66 + i * 102} y2={FRAMES[0].y + 72} stroke="var(--color-line-2)" strokeWidth="1" />
            <rect x={X + 48 + i * 102} y={FRAMES[0].y + 56} width="36" height="16" stroke="var(--color-ink)" strokeWidth="1.25" fill="var(--color-paper)" />
          </g>
        ))}
      </g>

      {/* 02 — Produits : interfaces empilées */}
      <g className="reveal" style={{ ["--delay" as string]: "900ms" }}>
        <rect x={X + 44} y={FRAMES[1].y + 60} width="150" height="52" stroke="var(--color-line-2)" strokeWidth="1" fill="var(--color-paper)" />
        <rect x={X + 66} y={FRAMES[1].y + 52} width="150" height="52" stroke="var(--color-line-2)" strokeWidth="1" fill="var(--color-paper)" />
        <rect x={X + 88} y={FRAMES[1].y + 44} width="150" height="52" stroke="var(--color-ink)" strokeWidth="1.25" fill="var(--color-paper-3)" />
        <line x1={X + 100} y1={FRAMES[1].y + 60} x2={X + 168} y2={FRAMES[1].y + 60} stroke="var(--color-accent)" strokeWidth="2" />
        <line x1={X + 100} y1={FRAMES[1].y + 74} x2={X + 208} y2={FRAMES[1].y + 74} stroke="var(--color-line-2)" strokeWidth="1" />
        <line x1={X + 100} y1={FRAMES[1].y + 84} x2={X + 190} y2={FRAMES[1].y + 84} stroke="var(--color-line-2)" strokeWidth="1" />
      </g>

      {/* 03 — Web : mise en page */}
      <g className="reveal" style={{ ["--delay" as string]: "1100ms" }}>
        <rect x={X + 44} y={FRAMES[2].y + 56} width="248" height="56" stroke="var(--color-line-2)" strokeWidth="1" fill="var(--color-paper)" />
        <line x1={X + 44} y1={FRAMES[2].y + 70} x2={X + 292} y2={FRAMES[2].y + 70} stroke="var(--color-line-2)" strokeWidth="1" />
        <rect x={X + 56} y={FRAMES[2].y + 80} width="72" height="22" fill="var(--color-accent)" opacity="0.18" />
        <rect x={X + 140} y={FRAMES[2].y + 80} width="72" height="22" stroke="var(--color-line-2)" strokeWidth="1" />
        <rect x={X + 224} y={FRAMES[2].y + 80} width="56" height="22" stroke="var(--color-line-2)" strokeWidth="1" />
      </g>
    </svg>
  );
}
