/**
 * Monogramme Harmony Solutions.
 *
 * Tracé d'après le logo réel (public/brand/harmony-logo-source.png) : un
 * « H » architectural construit en traits parallèles, montants doublés et
 * traverses débordantes. C'est cette construction — des lignes appariées
 * plutôt que des pleins — qui sert de grammaire graphique à tout le site :
 * filets doubles, équerres, colonnes de fond.
 *
 * Le tracé prend la couleur du texte courant, donc le laiton sur marine et
 * l'encre sur ivoire, sans variante à maintenir.
 */

/** Les dix segments du monogramme, dans l'ordre où ils se dessinent. */
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

export function HarmonyMark({
  className,
  title = "Harmony Solutions",
  strokeWidth = 22,
  draw = false,
  decorative = false,
}: {
  className?: string;
  title?: string;
  strokeWidth?: number;
  /** Trace les segments à l'entrée dans l'écran (nécessite un parent InView) */
  draw?: boolean;
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox="30 48 485 418"
      className={className}
      fill="none"
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": title })}
    >
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="square" strokeLinejoin="miter">
        {PATHS.map((d, i) => (
          <path
            key={d}
            d={d}
            pathLength={1}
            className={draw ? "draw" : undefined}
            style={draw ? { ["--delay" as string]: `${i * 65}ms` } : undefined}
          />
        ))}
      </g>
    </svg>
  );
}

/**
 * Monogramme « SER » du portfolio : les initiales posées dans la même
 * construction que le logo — un cadre ouvert, des traits appariés.
 * Utilisé dans la navigation, où le nom complet ne tient pas.
 */
export function SerMark({ className, title = "Salim El Rhalmani" }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 64 28" className={className} fill="none" role="img" aria-label={title}>
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
        {/* cadre ouvert, repris du monogramme Harmony */}
        <path d="M2 4h10M2 4v20M2 24h10" />
        <path d="M62 4H52M62 4v20M62 24H52" />
      </g>
      <text
        x="32"
        y="19"
        textAnchor="middle"
        fill="currentColor"
        fontSize="13"
        fontWeight="600"
        letterSpacing="0.14em"
        fontFamily="var(--font-sans)"
      >
        SER
      </text>
    </svg>
  );
}
