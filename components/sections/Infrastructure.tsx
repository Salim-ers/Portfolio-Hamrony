import { adMultiSite, ipsecVpn, threeBuildings, ledgerCases } from "@/data/infrastructure";
import { education } from "@/data/education";
import { Container } from "@/components/ui/Container";
import { ActiveDirectoryDiagram } from "@/components/diagrams/ActiveDirectoryDiagram";
import { IpsecTunnel } from "@/components/diagrams/IpsecTunnel";
import { ThreeBuildings } from "@/components/diagrams/ThreeBuildings";

function Concepts({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-tech text-fg-2" aria-label="Technologies">
      {items.map((c) => (
        <li key={c}>{c}</li>
      ))}
    </ul>
  );
}

export function Infrastructure() {
  const program = education[0];
  return (
    <section id="infrastructure" data-nav="infrastructure" aria-labelledby="infra-title" className="border-t border-line bg-ink-1/30 py-24 md:py-36">
      <Container>
        <h2 id="infra-title" className="max-w-[16ch] text-h1 text-fg">
          From theory to infrastructure.
        </h2>
        <p className="mt-6 max-w-[56ch] text-body-lg text-fg-2">
          Des études de cas en systèmes, réseaux et sécurité : ce qui a été conçu, configuré et documenté.
        </p>

        <dl className="mt-12 grid max-w-3xl gap-6 border-t border-line pt-6 sm:grid-cols-3">
          <div>
            <dt className="text-label text-fg-3">Formation</dt>
            <dd className="mt-1 text-body text-fg">{program.school}</dd>
          </div>
          <div>
            <dt className="text-label text-fg-3">Parcours</dt>
            <dd className="mt-1 text-body text-fg">{program.program}</dd>
          </div>
          <div>
            <dt className="text-label text-fg-3">Niveau</dt>
            <dd className="mt-1 text-body text-fg">
              {program.level}
              {program.status && <span className="text-fg-2"> ({program.status})</span>}
            </dd>
          </div>
        </dl>

        {/* Active Directory */}
        <article id={`case-${adMultiSite.id}`} aria-labelledby="t-ad" className="mt-24 md:mt-32">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <h3 id="t-ad" className="text-h2 text-fg">
                {adMultiSite.title}
              </h3>
            </div>
            <div className="lg:col-span-7">
              <p className="max-w-[56ch] text-body text-fg-2">{adMultiSite.summary}</p>
              <Concepts items={adMultiSite.concepts} />
            </div>
          </div>
          <div className="mt-10">
            <ActiveDirectoryDiagram />
          </div>
        </article>

        {/* IPsec */}
        <article id={`case-${ipsecVpn.id}`} aria-labelledby="t-ipsec" className="mt-24 grid gap-10 md:mt-32 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-4">
            <h3 id="t-ipsec" className="text-h2 text-fg">
              {ipsecVpn.title}
            </h3>
            <p className="mt-4 max-w-[46ch] text-body text-fg-2">{ipsecVpn.summary}</p>
            <Concepts items={ipsecVpn.concepts} />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <IpsecTunnel />
          </div>
        </article>

        {/* Trois bâtiments */}
        <article id={`case-${threeBuildings.id}`} aria-labelledby="t-3b" className="mt-24 md:mt-32">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <h3 id="t-3b" className="text-h2 text-fg lg:col-span-5">
              {threeBuildings.title}
            </h3>
            <div className="lg:col-span-7">
              <p className="max-w-[56ch] text-body text-fg-2">{threeBuildings.summary}</p>
              <Concepts items={threeBuildings.concepts} />
            </div>
          </div>
          <div className="mt-10">
            <ThreeBuildings />
          </div>
        </article>

        {/* Registre des autres cas */}
        <div className="mt-24 md:mt-32">
          <h3 className="text-h2 text-fg">Administration, cloud et sécurité</h3>
          <ol className="mt-10">
            {ledgerCases.map((c) => (
              <li key={c.id} id={`case-${c.id}`} className="grid gap-4 border-t border-line py-8 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-3">
                  <h4 className="text-h3 text-fg">{c.title}</h4>
                  {c.context && <p className="mt-2 text-label text-fg-3">{c.context}</p>}
                </div>
                <div className="lg:col-span-4">
                  <p className="max-w-[44ch] text-body text-fg-2">{c.summary}</p>
                  {c.note && <p className="mt-3 max-w-[44ch] text-small text-brass">{c.note}</p>}
                  <Concepts items={c.concepts} />
                </div>
                <div className="lg:col-span-5">
                  <ol className="flex flex-wrap items-center gap-y-2 font-mono text-tech" aria-label="Déroulé">
                    {c.flow.map((step, i) => (
                      <li key={step} className="flex items-center">
                        <span className="rounded-sm border border-line-strong px-2 py-1 text-fg">{step}</span>
                        {i < c.flow.length - 1 && <span aria-hidden className="mx-1.5 h-px w-4 bg-line-strong" />}
                      </li>
                    ))}
                  </ol>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
