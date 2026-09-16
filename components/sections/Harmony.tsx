import { company } from "@/data/profile";
import { socials } from "@/data/socials";
import { Container } from "@/components/ui/Container";
import { HarmonyMark } from "@/components/ui/HarmonyMark";
import { InView } from "@/components/ui/InView";
import { ButtonLink } from "@/components/ui/Button";
import { realValue } from "@/lib/utils";

const services = [
  { name: "Websites", text: "Sites vitrines et expériences web pour les commerces et les professionnels." },
  { name: "Web applications", text: "Applications métier, de l'interface à la base de données." },
  { name: "SaaS", text: "Conception de produits en abonnement, du périmètre à la mise en ligne." },
  { name: "IT support", text: "Assistance informatique, postes de travail, comptes et accès." },
  { name: "Systems", text: "Administration de serveurs Windows et Linux, annuaire, sauvegardes." },
  { name: "Networks", text: "Réseaux locaux, segmentation, pare-feu et interconnexion de sites." },
];

const principles = [
  { title: "Comprendre la couche du dessous", text: "Une interface fiable repose sur un réseau, un serveur et des données correctement administrés." },
  { title: "Documenter ce qui est construit", text: "Un schéma, une procédure, un inventaire. Ce qui n'est pas documenté ne se maintient pas." },
  { title: "Dire où en est un projet", text: "Un prototype reste un prototype. Ce qui fonctionne est séparé de ce qui est prévu." },
  { title: "Garder peu de pièces mobiles", text: "Moins de dépendances, moins de configuration, moins de pannes à diagnostiquer." },
];

export function Harmony() {
  const harmonyUrl = realValue(socials.harmonyUrl);
  return (
    <section id="harmony" data-nav="harmony" aria-labelledby="harmony-title" className="border-t border-line bg-ink-1/30 py-24 md:py-36">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <InView>
              <HarmonyMark draw className="h-auto w-28 md:w-40" strokeWidth={16} />
            </InView>
            <p className="mt-10 font-serif text-[2rem] leading-none tracking-[0.18em] text-fg">HARMONY</p>
            <p className="mt-3 text-body text-fg-2">{company.name}</p>
            <p className="text-small text-fg-3">{company.activity}</p>
            <dl className="mt-8 space-y-1 font-mono text-tech">
              <div className="flex gap-3">
                <dt className="text-fg-3">SIREN</dt>
                <dd className="text-fg-2">{company.siren}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="text-fg-3">Siège</dt>
                <dd className="text-fg-2">
                  {company.address.city} ({company.address.postalCode.slice(0, 2)})
                </dd>
              </div>
            </dl>
            {harmonyUrl && (
              <ButtonLink href={harmonyUrl} external className="mt-8">
                Harmony Solutions
              </ButtonLink>
            )}
          </div>

          <div className="lg:col-span-8">
            <h2 id="harmony-title" className="max-w-[16ch] text-h1 text-fg">
              Technology turned into solutions.
            </h2>
            <p className="mt-6 max-w-[54ch] text-body-lg text-fg-2">
              Harmony Solutions est la structure qui porte mon activité : les compétences systèmes, réseaux et web appliquées aux besoins de professionnels.
            </p>

            <dl className="mt-14 grid gap-x-10 sm:grid-cols-2">
              {services.map((s) => (
                <div key={s.name} className="border-t border-line py-5">
                  <dt className="text-h3 text-fg">{s.name}</dt>
                  <dd className="mt-1.5 max-w-[40ch] text-small text-fg-2">{s.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-24 md:mt-32">
          <h2 className="text-h2 text-fg">Principles I build by.</h2>
          <ul className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {principles.map((p) => (
              <li key={p.title}>
                <p className="text-body-lg text-fg">{p.title}</p>
                <p className="mt-2 text-small text-fg-2">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
