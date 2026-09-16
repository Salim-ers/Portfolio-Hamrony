import { education } from "@/data/education";
import { homelab } from "@/data/homelab";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { InView } from "@/components/ui/InView";
import { ADMultiSite, ThreeBuildings, IpsecTunnel } from "@/components/diagrams/Infra";

const CASES = [
  {
    id: "active-directory",
    index: "01",
    title: "Active Directory multi-site",
    line: "Un domaine unique réparti sur deux sites : annuaire, résolution de noms, adressage et stratégies de groupe administrés depuis une même forêt.",
    concepts: ["Windows Server", "AD DS", "RODC", "DNS", "DHCP", "GPO"],
    Diagram: ADMultiSite,
  },
  {
    id: "trois-batiments",
    index: "02",
    title: "Réseau sur trois bâtiments",
    line: "Un cœur de réseau et trois bâtiments : segmentation par VLAN, routage OSPF, filtrage par ACL et agrégation de liens.",
    concepts: ["VLAN", "OSPF", "ACL", "STP", "LACP"],
    Diagram: ThreeBuildings,
  },
  {
    id: "pfsense-ipsec",
    index: "03",
    title: "Interconnexion pfSense / IPsec",
    line: "Deux réseaux distants reliés par un tunnel chiffré, chaque site protégé par un pare-feu qui porte le VPN et le routage.",
    concepts: ["pfSense", "Firewall", "VPN", "IPsec", "Routing"],
    Diagram: IpsecTunnel,
  },
];

function HomeLabRail() {
  return (
    <ol className="relative mt-14 grid gap-0 md:mt-16 md:grid-cols-5">
      {/* Rail horizontal (desktop) / vertical (mobile) */}
      <span aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-line md:left-0 md:top-[7px] md:h-px md:w-full" />
      {homelab.tiers.map((t, i) => (
        <li key={t.id} className="relative pb-8 pl-8 last:pb-0 md:pb-0 md:pl-0 md:pr-6 md:pt-8">
          <span
            aria-hidden
            className="absolute left-0 top-1.5 size-[15px] rounded-full border border-accent bg-paper md:top-0"
            style={{ background: "var(--color-navy)" }}
          />
          <p className="font-mono text-tech uppercase tracking-[0.16em] text-accent">{String(i + 1).padStart(2, "0")}</p>
          <p className="mt-2.5 text-h3 text-ink">{t.label}</p>
          <p className="mt-1.5 text-small text-ink-2">{t.detail}</p>
        </li>
      ))}
    </ol>
  );
}

export function Engineering() {
  const formation = education[0];

  return (
    <section id="expertises" data-nav="expertises" className="bg-paper py-24 md:py-32 lg:py-40">
      <Container>
        <SectionHead
          index="04"
          title={
            <>
              Systèmes.
              <br />
              Réseaux.
              <br />
              Infrastructure.
            </>
          }
          lede="Concevoir un environnement, le segmenter, le sécuriser et le documenter. Trois travaux représentatifs."
          align="split"
        />

        {formation && (
          <Reveal className="mt-14 border-t border-line pt-6 md:mt-16">
            <p className="flex flex-wrap items-baseline gap-x-4 gap-y-1 text-small">
              <span className="font-mono text-tech uppercase tracking-[0.16em] text-ink-3">Formation</span>
              <span className="text-ink">{formation.program}</span>
              <span className="text-ink-2">
                {formation.school} — {formation.level}
              </span>
            </p>
          </Reveal>
        )}

        <div className="mt-20 space-y-20 md:mt-28 md:space-y-28">
          {CASES.map(({ id, index, title, line, concepts, Diagram }) => (
            <article key={id} id={id}>
              <Reveal>
                <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
                  <div className="lg:col-span-7">
                    <p className="font-mono text-tech uppercase tracking-[0.18em] text-accent">{index}</p>
                    <h3 className="mt-4 text-h2 text-ink">{title}</h3>
                  </div>
                  <p className="max-w-[46ch] text-body text-ink-2 lg:col-span-5">{line}</p>
                </div>
              </Reveal>

              <InView className="mt-10">
                <div className="scrollbar-none overflow-x-auto border border-line bg-paper-2 p-6 sm:p-10">
                  <Diagram className="h-auto w-full min-w-[640px]" />
                </div>
              </InView>

              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                {concepts.map((c) => (
                  <li key={c} className="font-mono text-tech text-ink-3">
                    {c}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>

      {/* MON LABORATOIRE — rupture marine */}
      <div className="on-navy mt-24 py-20 md:mt-32 md:py-28">
        <Container>
          <Reveal>
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <p className="mb-6 flex items-center gap-4 font-mono text-tech uppercase tracking-[0.18em] text-ink-3">
                  <span className="text-accent">04.4</span>
                  <span aria-hidden className="h-px w-12 bg-line-2" />
                </p>
                <h3 className="text-h1">Mon laboratoire</h3>
              </div>
              <p className="max-w-[44ch] text-body-lg text-ink-2 lg:col-span-5">{homelab.intro}</p>
            </div>

            <HomeLabRail />

            {homelab.networks.length > 0 && (
              <ul className="mt-14 grid gap-x-10 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-3">
                {homelab.networks.map((n) => (
                  <li key={n.name} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                    <span className="text-small text-ink">{n.name}</span>
                    <span className="font-mono text-tech text-ink-2">{n.cidr}</span>
                  </li>
                ))}
              </ul>
            )}

            {homelab.machines.length > 0 && (
              <ul className="mt-10 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
                {homelab.machines.map((m) => (
                  <li key={m.name} className="border-b border-line py-3">
                    <p className="text-small text-ink">{m.name}</p>
                    <p className="font-mono text-tech text-ink-2">{m.specs}</p>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </Container>
      </div>
    </section>
  );
}
