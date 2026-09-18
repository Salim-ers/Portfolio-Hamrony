"use client";

import { InView } from "@/components/ui/Reveal";

/**
 * Aperçu côté systèmes : schéma de principe du laboratoire.
 *
 * Il montre l'ordre des rôles — accès, filtrage, commutation,
 * virtualisation, puis services — et rien d'autre. Aucun nombre de
 * machines, aucun sous-réseau, aucune mesure : ce serait inventé. Les
 * traits se tracent à l'entrée dans l'écran et un point circule pour
 * indiquer le sens de lecture. Ce n'est pas une supervision.
 *
 * Deux orientations, parce qu'un SVG garde son rapport de forme : une
 * version large et basse pour les panneaux d'ordinateur, qui sont larges
 * et peu hauts, et une version verticale pour le mobile. Rendre la seule
 * version verticale sur grand écran la réduirait à un timbre-poste.
 */

type Node = { id: string; label: string; sub: string };

const CHAIN: Node[] = [
  { id: "wan", label: "Accès opérateur", sub: "WAN" },
  { id: "pfsense", label: "Pare-feu", sub: "pfSense · VPN · ACL" },
  { id: "switch", label: "Commutation", sub: "VLAN · Alcatel" },
  { id: "proxmox", label: "Virtualisation", sub: "Proxmox" },
];

const SERVICES: Node[] = [
  { id: "windows", label: "Windows Server", sub: "AD · DNS · DHCP" },
  { id: "linux", label: "Linux", sub: "Web · SQL" },
  { id: "supervision", label: "Supervision", sub: "Zabbix · Rsyslog" },
];

type Box = Node & { x: number; y: number; w: number; h: number };
type Plan = { viewBox: string; boxes: Box[]; paths: string[] };

/** Chaîne horizontale puis services empilés à droite. */
function horizontal(): Plan {
  const W = 160;
  const H = 54;
  const GAP = 24;
  const SW = 172;
  const SGAP = 8;

  const servicesHeight = SERVICES.length * H + (SERVICES.length - 1) * SGAP;
  const chainY = (servicesHeight - H) / 2;
  const chainX = (i: number) => i * (W + GAP);
  const lastRight = chainX(CHAIN.length - 1) + W;
  const serviceX = lastRight + 30;

  const boxes: Box[] = [
    ...CHAIN.map((n, i) => ({ ...n, x: chainX(i), y: chainY, w: W, h: H })),
    ...SERVICES.map((n, i) => ({ ...n, x: serviceX, y: i * (H + SGAP), w: SW, h: H })),
  ];

  const midY = chainY + H / 2;
  const elbow = lastRight + 15;
  const paths = [
    ...CHAIN.slice(0, -1).map((_, i) => `M${chainX(i) + W} ${midY} H ${chainX(i + 1)}`),
    ...SERVICES.map((_, i) => `M${lastRight} ${midY} H ${elbow} V ${i * (H + SGAP) + H / 2} H ${serviceX}`),
  ];

  return { viewBox: `0 0 ${serviceX + SW} ${servicesHeight}`, boxes, paths };
}

/** Chaîne verticale puis services empilés à droite. */
function vertical(): Plan {
  const W = 176;
  const H = 48;
  const GAP = 20;
  const SX = 260;
  const SW = 176;
  const SGAP = 20;

  const chainY = (i: number) => i * (H + GAP);
  const serviceY = (i: number) => i * (H + SGAP) + 102;
  const lastBottom = chainY(CHAIN.length - 1) + H;

  const boxes: Box[] = [
    ...CHAIN.map((n, i) => ({ ...n, x: 0, y: chainY(i), w: W, h: H })),
    ...SERVICES.map((n, i) => ({ ...n, x: SX, y: serviceY(i), w: SW, h: H })),
  ];

  const midX = W / 2;
  const branchY = chainY(CHAIN.length - 1) + H / 2;
  const paths = [
    ...CHAIN.slice(0, -1).map((_, i) => `M${midX} ${chainY(i) + H} V ${chainY(i + 1)}`),
    ...SERVICES.map((_, i) => `M${W} ${branchY} H ${SX - 36} V ${serviceY(i) + H / 2} H ${SX}`),
  ];

  const height = Math.max(lastBottom, serviceY(SERVICES.length - 1) + H);
  return { viewBox: `0 0 ${SX + SW} ${height}`, boxes, paths };
}

function Diagram({ plan, className }: { plan: Plan; className?: string }) {
  return (
    <svg
      viewBox={plan.viewBox}
      className={className}
      role="img"
      aria-label="Schéma de principe du laboratoire : accès opérateur, pare-feu, commutation, virtualisation, puis serveurs Windows, Linux et supervision."
      preserveAspectRatio="xMidYMid meet"
    >
      <g fill="none" stroke="var(--line-2)" strokeWidth="1" pathLength={1}>
        {plan.paths.map((d, i) => (
          <path key={d} className="draw" style={{ ["--delay" as string]: `${i * 110}ms` }} d={d} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      {/* Circulation : un sens de lecture, jamais une mesure. */}
      <g fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" pathLength={1} opacity="0.9">
        {plan.paths.map((d, i) => (
          <path
            key={d}
            className="flow"
            vectorEffect="non-scaling-stroke"
            style={{ ["--flow-duration" as string]: "3400ms", animationDelay: `${i * 240}ms` }}
            d={d}
          />
        ))}
      </g>

      {plan.boxes.map((b, i) => (
        <g key={b.id} className="rise-in" style={{ ["--delay" as string]: `${i * 70}ms` }}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="3" fill="var(--surface)" stroke="var(--line-2)" strokeWidth="1" />
          <text x={b.x + 14} y={b.y + 22} fill="var(--ink)" fontSize="13" fontWeight="540">
            {b.label}
          </text>
          <text x={b.x + 14} y={b.y + 38} fill="var(--ink-3)" fontSize="10.5" fontFamily="var(--font-mono)" letterSpacing="0.03em">
            {b.sub}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function LabSchematic() {
  return (
    <InView className="flex h-full w-full items-center justify-center" rootMargin="0px">
      <Diagram plan={vertical()} className="h-full w-full lg:hidden" />
      <Diagram plan={horizontal()} className="hidden h-full w-full lg:block" />
    </InView>
  );
}
