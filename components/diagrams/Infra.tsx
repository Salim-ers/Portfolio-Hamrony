/**
 * Diagrammes d'infrastructure, thème clair.
 * Langage commun : filets 1px, blocs rectangulaires, libellés en mono,
 * tracé à l'entrée dans le viewport, un seul flux animé par schéma.
 */

const L = {
  line: "var(--color-line-2)",
  faint: "var(--color-line)",
  ink: "var(--color-ink)",
  mute: "var(--color-ink-3)",
  accent: "var(--color-accent)",
  surface: "var(--color-paper-3)",
};

function Label({ x, y, children, anchor = "start", tone = "mute" }: { x: number | string; y: number | string; children: string; anchor?: "start" | "middle" | "end"; tone?: "mute" | "ink" | "accent" }) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fill={tone === "ink" ? L.ink : tone === "accent" ? L.accent : L.mute}
      fontFamily="var(--font-mono)"
      fontSize="11"
      letterSpacing="0.6"
    >
      {children}
    </text>
  );
}

function Box({ x, y, w, h, title, items }: { x: number; y: number; w: number; h: number; title: string; items?: string[] }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={L.surface} stroke={L.line} strokeWidth="1" />
      <line x1={x} y1={y + 30} x2={x + w} y2={y + 30} stroke={L.faint} strokeWidth="1" />
      <Label x={x + 14} y={y + 19} tone="ink">
        {title}
      </Label>
      {items?.map((it, i) => (
        <Label key={it} x={x + 14} y={y + 52 + i * 20}>
          {it}
        </Label>
      ))}
    </g>
  );
}

/* ---------------- Active Directory multi-site ---------------- */
export function ADMultiSite({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 880 352" className={className} fill="none" role="img" aria-label="Un domaine Active Directory réparti sur deux sites, reliés par une réplication d'annuaire.">
      <Label x={0} y={14} tone="accent">
        FORÊT — DOMAINE UNIQUE
      </Label>
      <rect x="0" y="28" width="880" height="320" stroke={L.faint} strokeWidth="1" strokeDasharray="3 5" />

      <Box x={44} y={70} w={280} h={172} title="SITE — PARIS" items={["Contrôleur de domaine", "AD DS · DNS · DHCP", "Stratégies de groupe"]} />
      <Box x={556} y={70} w={280} h={172} title="SITE — NANTES" items={["Contrôleur en lecture seule", "DNS local", "Stratégies appliquées"]} />

      {/* Réplication */}
      <line x1="324" y1="156" x2="556" y2="156" stroke={L.line} strokeWidth="1" pathLength={1} className="draw-when-visible" />
      <line x1="324" y1="156" x2="556" y2="156" stroke={L.accent} strokeWidth="2" pathLength={1} className="flow" style={{ ["--flow-duration" as string]: "4200ms" }} />
      <rect x="392" y="140" width="96" height="30" fill="var(--color-paper)" />
      <Label x={440} y={160} anchor="middle" tone="accent">
        RÉPLICATION
      </Label>

      {/* Annuaire */}
      <g className="reveal" style={{ ["--delay" as string]: "500ms" }}>
        <line x1="184" y1="242" x2="184" y2="284" stroke={L.line} strokeWidth="1" />
        <line x1="696" y1="242" x2="696" y2="284" stroke={L.line} strokeWidth="1" />
        <line x1="184" y1="284" x2="696" y2="284" stroke={L.line} strokeWidth="1" />
        <line x1="440" y1="284" x2="440" y2="300" stroke={L.line} strokeWidth="1" />
        <rect x="300" y="300" width="280" height="40" fill={L.surface} stroke={L.ink} strokeWidth="1.25" />
        <Label x={440} y={325} anchor="middle" tone="ink">
          Utilisateurs · Groupes · Sécurité
        </Label>
      </g>
    </svg>
  );
}

/* ---------------- Réseau sur trois bâtiments ---------------- */
const BUILDINGS = [
  { name: "B01", vlans: "VLAN · STP" },
  { name: "B02", vlans: "VLAN · STP" },
  { name: "B03", vlans: "VLAN · STP" },
];

export function ThreeBuildings({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 880 352" className={className} fill="none" role="img" aria-label="Un cœur de réseau relié à trois bâtiments par des liens agrégés, avec routage OSPF et filtrage par ACL.">
      {/* Cœur */}
      <rect x="320" y="24" width="240" height="72" fill={L.surface} stroke={L.ink} strokeWidth="1.25" />
      <Label x={440} y={52} anchor="middle" tone="ink">
        CŒUR DE RÉSEAU
      </Label>
      <Label x={440} y={74} anchor="middle" tone="accent">
        OSPF · ACL
      </Label>

      {/* Liaisons agrégées */}
      {BUILDINGS.map((b, i) => {
        const x = 146 + i * 294;
        return (
          <g key={b.name}>
            <path d={`M440 96 V 150 H ${x} V 208`} stroke={L.line} strokeWidth="1" fill="none" pathLength={1} className="draw-when-visible" style={{ ["--delay" as string]: `${i * 160}ms` }} />
            <path d={`M440 96 V 150 H ${x} V 208`} stroke={L.accent} strokeWidth="2" fill="none" pathLength={1} className="flow" style={{ ["--flow-duration" as string]: `${4000 + i * 600}ms` }} />
            <rect x={x - 30} y="162" width="60" height="22" fill="var(--color-paper)" />
            <Label x={x} y={178} anchor="middle">
              LACP
            </Label>
          </g>
        );
      })}

      {/* Bâtiments */}
      {BUILDINGS.map((b, i) => {
        const x = 146 + i * 294;
        return (
          <g key={b.name} className="reveal" style={{ ["--delay" as string]: `${300 + i * 140}ms` }}>
            <rect x={x - 116} y="208" width="232" height="132" fill={L.surface} stroke={L.line} strokeWidth="1" />
            <line x1={x - 116} y1="240" x2={x + 116} y2="240" stroke={L.faint} strokeWidth="1" />
            <Label x={x - 100} y="230" tone="ink">
              {`BÂTIMENT ${b.name}`}
            </Label>
            <Label x={x - 100} y="264">
              {b.vlans}
            </Label>
            {[0, 1, 2, 3].map((j) => (
              <rect key={j} x={x - 100 + j * 52} y="286" width="36" height="34" stroke={L.line} strokeWidth="1" fill="var(--color-paper)" />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/* ---------------- pfSense / IPsec ---------------- */
export function IpsecTunnel({ className }: { className?: string }) {
  return (
    <svg viewBox="0 76 880 148" className={className} fill="none" role="img" aria-label="Deux réseaux distants reliés par un tunnel IPsec chiffré entre deux pare-feu pfSense.">
      {[0, 1].map((side) => {
        const x = side === 0 ? 24 : 636;
        return (
          <g key={side}>
            <rect x={x} y="88" width="220" height="124" fill={L.surface} stroke={L.line} strokeWidth="1" />
            <line x1={x} y1="118" x2={x + 220} y2="118" stroke={L.faint} strokeWidth="1" />
            <Label x={x + 14} y="108" tone="ink">
              {side === 0 ? "SITE A — LAN" : "SITE B — LAN"}
            </Label>
            {[0, 1, 2].map((j) => (
              <rect key={j} x={x + 16 + j * 66} y="140" width="50" height="46" stroke={L.line} strokeWidth="1" fill="var(--color-paper)" />
            ))}
            {/* pare-feu */}
            <line x1={side === 0 ? x + 220 : x} y1="150" x2={side === 0 ? 300 : 580} y2="150" stroke={L.line} strokeWidth="1" />
            <rect x={side === 0 ? 300 : 508} y="120" width="72" height="60" fill={L.surface} stroke={L.ink} strokeWidth="1.25" />
            <Label x={(side === 0 ? 300 : 508) + 36} y="146" anchor="middle" tone="ink">
              pfSense
            </Label>
            <Label x={(side === 0 ? 300 : 508) + 36} y="166" anchor="middle">
              Firewall
            </Label>
          </g>
        );
      })}

      {/* Tunnel */}
      <rect x="372" y="120" width="136" height="60" stroke={L.faint} strokeWidth="1" strokeDasharray="3 5" />
      <line x1="372" y1="150" x2="508" y2="150" stroke={L.line} strokeWidth="1" pathLength={1} className="draw-when-visible" />
      <line x1="372" y1="150" x2="508" y2="150" stroke={L.accent} strokeWidth="2" pathLength={1} className="flow" style={{ ["--flow-duration" as string]: "3000ms" }} />
      <Label x={440} y="112" anchor="middle" tone="accent">
        TUNNEL IPSEC
      </Label>
      <Label x={440} y="204" anchor="middle">
        Trafic chiffré
      </Label>
    </svg>
  );
}
