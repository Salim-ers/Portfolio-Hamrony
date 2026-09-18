import type { Metadata } from "next";
import { works, sideWorks, engagementLabel } from "@/data/works";
import { company, contact } from "@/data/profile";
import { firstShot } from "@/lib/shots";
import { Container } from "@/components/ui/Container";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Shot } from "@/components/ui/Shot";
import { ButtonLink } from "@/components/ui/Button";
import { CornerRule, RuledBackground } from "@/components/brand/Marks";
import { WorkBlock } from "@/components/creation/WorkBlock";

export const metadata: Metadata = {
  title: "Mes créations numériques",
  description:
    "Produits SaaS, applications et sites conçus et mis en ligne : Centrium, Horse Ledger, Aequitas, Odyssea, et des sites pour des établissements.",
  alternates: { canonical: "/creation" },
};

/**
 * Mes créations numériques.
 *
 * C'est une galerie personnelle, pas une page commerciale : pas de devis,
 * pas d'offre, pas de process client. Ce discours appartiendra au futur
 * site Harmony Solutions.
 */
const STRIP = [
  { slug: "centrium", alt: "Centrium, plateforme de pilotage pour sociétés de conseil" },
  { slug: "horse-ledger", alt: "Horse Ledger, gestion pour la filière équine" },
  { slug: "royale-auto-ecole", alt: "Site de Royale Auto-école" },
  { slug: "odyssea", alt: "Odyssea, composition de voyages sur mesure" },
];

export default function CreationPage() {
  const strip = STRIP.map((s) => firstShot(s.slug, ["home"], s.alt)).filter((s) => s !== null);
  const counts = works.reduce<Record<string, number>>((acc, w) => {
    acc[w.engagement] = (acc[w.engagement] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <>
      {/* ---------------- Intro ---------------- */}
      <header className="relative overflow-hidden bg-paper pt-16">
        <RuledBackground className="opacity-40" />
        <Container className="relative py-14 md:py-20">
          <p className="lift-in font-mono text-tech uppercase text-ink-3" style={{ ["--delay" as string]: "40ms" }}>
            Créations numériques · {company.name}
          </p>
          <CornerRule className="mt-6" />
          <h1 className="mt-5 max-w-[16ch] text-mega text-ink">
            <span className="word-mask" style={{ ["--delay" as string]: "120ms" }}>
              <span>Des projets</span>
            </span>{" "}
            <span className="word-mask text-accent-ink" style={{ ["--delay" as string]: "240ms" }}>
              <span>que vous pouvez ouvrir.</span>
            </span>
          </h1>

          <div className="mt-9 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="lift-in max-w-[50ch] text-lede text-ink-2" style={{ ["--delay" as string]: "500ms" }}>
              Produits SaaS, applications et sites d&apos;établissement. Tous sont en ligne : le lien figure sur
              chaque étude de cas.
            </p>
            <ul className="lift-in flex flex-wrap gap-x-8 gap-y-2" style={{ ["--delay" as string]: "600ms" }}>
              {(["propre", "client", "demo"] as const)
                .filter((k) => counts[k])
                .map((k) => (
                  <li key={k}>
                    <p className="text-h2 text-ink">{counts[k]}</p>
                    <p className="font-mono text-tech uppercase text-ink-3">{engagementLabel[k]}</p>
                  </li>
                ))}
            </ul>
          </div>
        </Container>

        {strip.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-px border-y border-line bg-line md:grid-cols-4">
            {strip.map((s, i) => (
              <Reveal key={s.src} effect="mask" delay={i * 110} className="overflow-hidden bg-paper">
                <Shot shot={s} crop="top" priority={i < 2} sizes="(max-width: 768px) 50vw, 25vw" className="[&_img]:aspect-[4/3]" />
              </Reveal>
            ))}
          </div>
        )}
      </header>

      {/* ---------------- Réalisations ---------------- */}
      <Section id="realisations" size="loose">
        <SectionHead
          index="01"
          eyebrow="Réalisations"
          title={`${works.length} projets en ligne.`}
          lede={<p>Pour chacun : plusieurs écrans du site réel, le besoin, mon rôle exact et les choix de conception.</p>}
        />
        <div className="focus-group mt-20 flex flex-col gap-28 md:gap-36">
          {works.map((work, i) => (
            <WorkBlock key={work.slug} work={work} index={i} />
          ))}
        </div>
      </Section>

      {/* ---------------- Également en ligne ---------------- */}
      <Section tone="paper-2" size="tight">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <CornerRule className="mb-5" />
            <h2 className="text-h1 text-ink">Également en ligne</h2>
          </div>
          <ul className="lg:col-span-7 lg:col-start-6">
            {sideWorks.map((s) => (
              <Reveal key={s.name} as="li" effect="rise" className="border-t border-line py-6 first:border-t-0 first:pt-0">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="link-underline text-h2 text-ink hover:text-accent-ink">
                  {s.name}
                </a>
                <p className="mt-2 max-w-[60ch] text-body text-ink-2">{s.description}</p>
                {s.note && <p className="mt-1 font-mono text-tech uppercase text-ink-3">{s.note}</p>}
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------------- Contact, sobre ---------------- */}
      <Section size="tight">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <CornerRule className="mb-5" />
            <h2 className="text-display text-ink">Une question sur un projet ?</h2>
            <p className="mt-5 max-w-[46ch] text-lede text-ink-2">
              Écrivez-moi : je réponds directement, sans intermédiaire.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
            <ButtonLink href={`mailto:${contact.email}`} variant="primary">
              {contact.email}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
