"use client";

import { InView } from "@/components/ui/Reveal";

/**
 * Aperçu côté systèmes : schéma de principe du laboratoire.
 *
 * Il montre l'ordre des rôles — accès, filtrage, commutation,
 * virtualisation, services — et rien d'autre. Aucun nombre de machines,
 * aucun sous-réseau, aucune mesure : ce serait inventé.
 * Les traits se tracent à l'entrée dans l'écran, un point circule pour
 * indiquer le sens de circulation. Ce n'est pas une supervision.
 */

const LEFT = [
  { y: 8, label: "Accès opérateur", sub: "WAN" },
  { y: 76, label: "Pare-feu", sub: "pfSense · VPN · ACL" },
  { y: 144, label: "Commutation", sub: "VLAN · Alcatel" },
  { y: 212, label: "Virtualisation", sub: "Proxmox" },
];

const RIGHT = [
  { y: 110, label: "Windows Server", sub: "AD · DNS · DHCP" },
  { y: 178, label: "Linux", sub: "Web · SQL" },
  { y: 246, label: "Supervision", sub: "Zabbix · Rsyslog" },
];

const BOX_W = 176;
const BOX_H = 48;
const LX = 4;
const RX = 260;

export function LabSchematic() {
  return (
    <InView className="flex h-full w-full items-start justify-center" rootMargin="0px">
      <svg
        viewBox="0 0 440 310"
        className="h-full max-h-[440px] w-full"
        role="img"
        aria-label="Schéma de principe du laboratoire : accès opérateur, pare-feu, commutation, virtualisation, puis serveurs Windows, Linux et supervision."
        preserveAspectRatio="xMidYMid meet"
      >
        <g fill="none" stroke="var(--line-2)" strokeWidth="1" pathLength={1}>
          {/* chaîne verticale */}
          <path className="draw" style={{ ["--delay" as string]: "0ms" }} d={`M${LX + BOX_W / 2} 56 V 76`} />
          <path className="draw" style={{ ["--delay" as string]: "120ms" }} d={`M${LX + BOX_W / 2} 124 V 144`} />
          <path className="draw" style={{ ["--delay" as string]: "240ms" }} d={`M${LX + BOX_W / 2} 192 V 212`} />
          {/* dérivations vers les services */}
          {RIGHT.map((r, i) => (
            <path
              key={r.label}
              className="draw"
              style={{ ["--delay" as string]: `${380 + i * 110}ms` }}
              d={`M${LX + BOX_W} 236 H 224 V ${r.y + BOX_H / 2} H ${RX}`}
            />
          ))}
        </g>

        {/* Circulation : illustre un sens de lecture, pas une mesure. */}
        <g fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" pathLength={1} opacity="0.9">
          <path className="flow" style={{ ["--flow-duration" as string]: "3200ms" }} d={`M${LX + BOX_W / 2} 56 V 76`} />
          <path className="flow" style={{ ["--flow-duration" as string]: "3200ms", animationDelay: "300ms" }} d={`M${LX + BOX_W / 2} 124 V 144`} />
          <path className="flow" style={{ ["--flow-duration" as string]: "3200ms", animationDelay: "600ms" }} d={`M${LX + BOX_W / 2} 192 V 212`} />
          {RIGHT.map((r, i) => (
            <path
              key={r.label}
              className="flow"
              style={{ ["--flow-duration" as string]: "3600ms", animationDelay: `${900 + i * 240}ms` }}
              d={`M${LX + BOX_W} 236 H 224 V ${r.y + BOX_H / 2} H ${RX}`}
            />
          ))}
        </g>

        {[...LEFT.map((n) => ({ ...n, x: LX })), ...RIGHT.map((n) => ({ ...n, x: RX }))].map((n, i) => (
          <g key={n.label} className="rise-in" style={{ ["--delay" as string]: `${i * 70}ms` }}>
            <rect
              x={n.x}
              y={n.y}
              width={BOX_W}
              height={BOX_H}
              rx="3"
              fill="var(--surface)"
              stroke="var(--line-2)"
              strokeWidth="1"
            />
            <text x={n.x + 14} y={n.y + 20} fill="var(--ink)" fontSize="12.5" fontWeight="540">
              {n.label}
            </text>
            <text
              x={n.x + 14}
              y={n.y + 36}
              fill="var(--ink-3)"
              fontSize="10"
              fontFamily="var(--font-mono)"
              letterSpacing="0.03em"
            >
              {n.sub}
            </text>
          </g>
        ))}
      </svg>
    </InView>
  );
}
