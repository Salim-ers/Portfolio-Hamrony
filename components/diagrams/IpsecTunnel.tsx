import { ipsecVpn } from "@/data/infrastructure";
import { InView } from "@/components/ui/InView";
import { Wire, WireCanvas } from "@/components/diagrams/Wires";

export function IpsecTunnel() {
  const [a, b] = ipsecVpn.sites;
  const Node = ({ title, sub }: { title: string; sub: string }) => (
    <div className="relative z-10 rounded-sm border border-line-strong bg-ink-0 px-3 py-2 text-center">
      <p className="font-mono text-tech text-fg">{title}</p>
      <p className="text-[11px] text-fg-3">{sub}</p>
    </div>
  );
  return (
    <InView className="rounded-md border border-line p-6 md:p-8">
      <figure>
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
          <div className="space-y-3">
            <p className="text-label text-fg-2">{a}</p>
            <Node title="LAN" sub="réseau local" />
            <Node title="pfSense" sub="firewall" />
          </div>
          <div className="relative h-24">
            <WireCanvas units={[100, 40]} className="absolute inset-0 size-full">
              <Wire d="M0 14 H100" stroke="var(--color-line-strong)" className="draw-when-visible" />
              <Wire d="M0 26 H100" stroke="var(--color-line-strong)" className="draw-when-visible" style={{ ["--delay" as string]: "120ms" }} />
              <Wire d="M0 20 H100" stroke="var(--color-brass)" strokeWidth={2} className="flow" style={{ ["--flow-duration" as string]: "2600ms" }} />
              <Wire d="M0 20 H100" stroke="var(--color-brass)" strokeWidth={2} className="flow-reverse" style={{ ["--flow-duration" as string]: "3400ms" }} />
            </WireCanvas>
            <p className="absolute inset-x-0 top-full -mt-5 text-center font-mono text-tech text-brass">IPsec</p>
          </div>
          <div className="space-y-3 text-right">
            <p className="text-label text-fg-2">{b}</p>
            <Node title="LAN" sub="réseau local" />
            <Node title="pfSense" sub="firewall" />
          </div>
        </div>
        <figcaption className="sr-only">Deux réseaux locaux reliés par un tunnel IPsec établi entre deux pare-feu pfSense.</figcaption>
      </figure>
    </InView>
  );
}
