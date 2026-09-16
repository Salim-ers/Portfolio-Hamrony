import { homelab } from "@/data/homelab";
import { Container } from "@/components/ui/Container";
import { HomeLabDiagram } from "@/components/diagrams/HomeLabDiagram";
import { isPlaceholder } from "@/lib/utils";

export function HomeLab() {
  const net = homelab.networks;
  return (
    <section id="homelab" data-nav="homelab" aria-labelledby="homelab-title" className="border-t border-line py-24 md:py-36">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <h2 id="homelab-title" className="text-h1 text-fg">
              My Home Lab.
            </h2>
            <p className="mt-6 max-w-[48ch] text-body-lg text-fg-2">
              Un environnement personnel pour tester, casser et documenter : réseau, machines, services.
            </p>
          </div>
          {!homelab.documented && (
            <div className="self-end lg:col-span-5 lg:col-start-8">
              <p className="max-w-[44ch] border-t border-line pt-4 text-small text-fg-3">
                Documentation en cours de rédaction. Le schéma présente la structure qui accueillera l&apos;inventaire réel : chaque valeur non renseignée est signalée comme telle.
              </p>
            </div>
          )}
        </div>

        <div className="mt-14">
          <HomeLabDiagram />
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-label text-fg">Réseaux</p>
            <ul className="mt-3 space-y-1.5 font-mono text-tech">
              {net.map((n) => (
                <li key={n.id} className="flex flex-wrap gap-x-3 text-fg-2">
                  <span>{isPlaceholder(n.name) ? "nom à renseigner" : n.name}</span>
                  <span className="text-fg-3">{isPlaceholder(n.cidr) ? "plan d'adressage à renseigner" : n.cidr}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-label text-fg">VLAN</p>
            <p className="mt-3 font-mono text-tech text-fg-3">{homelab.vlans.length ? homelab.vlans.map((v) => `${v.id} ${v.name}`).join(", ") : "à renseigner"}</p>
          </div>
          <div>
            <p className="text-label text-fg">Machines</p>
            <p className="mt-3 font-mono text-tech text-fg-3">{homelab.machines.length ? homelab.machines.map((m) => m.name).join(", ") : "à renseigner"}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
