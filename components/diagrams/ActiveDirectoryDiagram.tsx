import { adMultiSite } from "@/data/infrastructure";
import { InView } from "@/components/ui/InView";
import { Wire, WireCanvas } from "@/components/diagrams/Wires";

/** Deux sites, un domaine. Les rôles par site ne sont affichés que s'ils sont renseignés. */
export function ActiveDirectoryDiagram() {
  const [paris, nantes] = adMultiSite.sites;
  const Site = ({ name, roles, side }: { name: string; roles: string[] | null; side: "left" | "right" }) => (
    <div className={side === "left" ? "md:text-left" : "md:text-right"}>
      <p className="font-mono text-tech text-fg-3">SITE</p>
      <p className="mt-1 text-h2 text-fg">{name}</p>
      {roles && roles.length > 0 && (
        <ul className="mt-3 space-y-1 font-mono text-tech text-fg-2">
          {roles.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <InView className="rounded-md border border-line bg-ink-1/40">
      <figure>
        <div className="grid items-center gap-6 p-6 md:grid-cols-[1fr_2.2fr_1fr] md:gap-0 md:p-10">
          <Site name={paris.name} roles={paris.roles} side="left" />

          <div className="relative order-first md:order-none">
            {/* Liaisons inter-sites */}
            <WireCanvas units={[100, 100]} className="absolute inset-0 hidden size-full md:block">
              <Wire d="M0 50 H14" stroke="var(--color-brass)" className="draw-when-visible" />
              <Wire d="M86 50 H100" stroke="var(--color-brass)" className="draw-when-visible" style={{ ["--delay" as string]: "200ms" }} />
            </WireCanvas>
            <div className="relative mx-auto rounded-md border border-line-strong bg-ink-0 md:w-[72%]">
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
                <span className="font-mono text-tech text-brass">DOMAINE ACTIVE DIRECTORY</span>
                <span className="font-mono text-tech text-fg-3">réplication</span>
              </div>
              <ul className="grid grid-cols-2 gap-px bg-line">
                {adMultiSite.domainServices.map((s) => (
                  <li key={s.name} className="bg-ink-0 px-4 py-3">
                    <p className="font-mono text-tech text-fg">{s.name}</p>
                    <p className="mt-0.5 text-small text-fg-3">{s.text}</p>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-x-5 gap-y-1 border-t border-line px-4 py-3 font-mono text-tech text-fg-2">
                {adMultiSite.directory.map((d) => (
                  <span key={d}>{d}</span>
                ))}
              </div>
            </div>
          </div>

          <Site name={nantes.name} roles={nantes.roles} side="right" />
        </div>
        <figcaption className="border-t border-line px-6 py-3 text-small text-fg-3 md:px-10">Paris et Nantes rattachés au même domaine, services d&apos;annuaire répliqués entre les sites.</figcaption>
      </figure>
    </InView>
  );
}
