import type { Metadata } from "next";
import Link from "next/link";
import { works, sideWorks } from "@/data/works";
import { contact } from "@/data/profile";
import { shot } from "@/lib/shots";
import { Container } from "@/components/ui/Container";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Shot } from "@/components/ui/Shot";
import { ButtonLink } from "@/components/ui/Button";
import { WorkBlock } from "@/components/creation/WorkBlock";

export const metadata: Metadata = {
  title: "Web & applications",
  description:
    "Sites vitrines, applications et produits SaaS conçus et mis en ligne : Centrium, Horse Ledger, Aequitas, Odyssea, et des sites pour des établissements.",
  alternates: { canonical: "/creation" },
};

const SERVICES = [
  {
    n: "01",
    label: "Sites vitrines",
    line: "Un site court et juste pour un établissement : ce qu'on y fait, où c'est, comment venir ou vous joindre.",
    examples: "Royale Auto-école · Noa Café · Poulet Station · Essalam",
  },
  {
    n: "02",
    label: "Applications et produits SaaS",
    line: "Un métier traduit en produit : modèle de données, parcours, écrans, mise en production.",
    examples: "Centrium · Horse Ledger · Aequitas · Odyssea",
  },
  {
    n: "03",
    label: "Conception et mise en ligne",
    line: "Direction artistique, développement, hébergement, nom de domaine et déploiement continu.",
    examples: "Next.js · Vercel · Supabase · GitHub",
  },
];

export default function CreationPage() {
  const opener = shot("horse-ledger", "home", "Horse Ledger, plateforme de gestion pour les professionnels du cheval");

  return (
    <>
      {/* ---------------- Hero court ---------------- */}
      <header className="pt-16">
        <Container className="pb-12 pt-16 md:pb-16 md:pt-24">
          <p className="lift-in font-mono text-tech uppercase tracking-[0.18em] text-ink-3" style={{ ["--delay" as string]: "60ms" }}>
            Univers 01 — Création numérique
          </p>
          <h1 className="mt-7 text-mega text-ink">
            <span className="word-mask" style={{ ["--delay" as string]: "140ms" }}>
              <span>Je conçois</span>
            </span>{" "}
            <span className="word-mask" style={{ ["--delay" as string]: "250ms" }}>
              <span>des produits</span>
            </span>{" "}
            <span className="word-mask text-accent-ink" style={{ ["--delay" as string]: "360ms" }}>
              <span>qui existent.</span>
            </span>
          </h1>
          <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
            <p className="lift-in text-lede text-ink-2 md:col-span-6" style={{ ["--delay" as string]: "560ms" }}>
              Des sites vitrines, des applications et des plateformes SaaS. Tous les projets présentés ici sont en ligne
              et consultables : vous pouvez ouvrir chaque lien et juger par vous-même.
            </p>
            <div className="lift-in flex flex-wrap gap-3 md:col-span-6 md:justify-end" style={{ ["--delay" as string]: "680ms" }}>
              <ButtonLink href="#realisations" variant="primary">
                Voir les réalisations
              </ButtonLink>
              <ButtonLink href="#contact">Parlons de votre projet</ButtonLink>
            </div>
          </div>
        </Container>

        {/* Grande ouverture visuelle : une capture réelle, pleine largeur. */}
        {opener && (
          <Reveal effect="mask" className="overflow-hidden border-y border-line">
            <Shot
              shot={opener}
              crop="top"
              priority
              sizes="100vw"
              className="[&_img]:aspect-[21/9] [&_img]:w-full"
            />
          </Reveal>
        )}
      </header>

      {/* ---------------- Réalisations ---------------- */}
      <Section id="realisations" size="loose">
        <SectionHead
          index="Réalisations"
          title="Neuf projets en ligne."
          lede={
            <p>
              Produits SaaS et sites d&apos;établissement. Pour chacun : le besoin, mon rôle exact, les choix de
              conception et le lien vers le site réel.
            </p>
          }
          align="split"
        />
        <div className="focus-group mt-16 flex flex-col gap-24 md:gap-32">
          {works.map((work, i) => (
            <WorkBlock key={work.slug} work={work} index={i} />
          ))}
        </div>
      </Section>

      {/* ---------------- Également en ligne ---------------- */}
      <Section tone="paper-2" size="tight">
        <div className="grid gap-8 md:grid-cols-12">
          <h2 className="text-h3 text-ink md:col-span-4">Également en ligne</h2>
          <ul className="md:col-span-8">
            {sideWorks.map((s) => (
              <Reveal key={s.name} as="li" effect="rise" className="border-t border-line py-5 first:border-t-0 first:pt-0">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-h3 text-ink hover:text-accent-ink"
                >
                  {s.name}
                </a>
                <p className="mt-1.5 max-w-[60ch] text-body text-ink-2">{s.description}</p>
                {s.note && <p className="mt-1 font-mono text-tech text-ink-3">{s.note}</p>}
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------------- Services ---------------- */}
      <Section id="services">
        <SectionHead index="Services" title="Ce que je prends en charge." />
        <ul className="focus-group mt-14">
          {SERVICES.map((s, i) => (
            <Reveal
              key={s.n}
              as="li"
              effect="slide"
              from="-24px"
              delay={i * 90}
              className="focus-item grid gap-4 border-t border-line py-9 md:grid-cols-12 md:gap-8"
            >
              <p className="font-mono text-tech uppercase tracking-[0.18em] text-accent-ink md:col-span-1">{s.n}</p>
              <h3 className="text-h2 text-ink md:col-span-4">{s.label}</h3>
              <p className="text-body-lg text-ink-2 md:col-span-5">{s.line}</p>
              <p className="font-mono text-tech text-ink-3 md:col-span-2">{s.examples}</p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* ---------------- Contact projet ---------------- */}
      <Section id="contact" tone="paper-2" size="loose">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-display text-ink">
              Parlons de<span className="text-accent-ink"> votre projet.</span>
            </h2>
            <p className="mt-6 max-w-[48ch] text-lede text-ink-2">
              Dites-moi ce que vous voulez faire, pour qui, et sous quel délai. Je réponds avec une proposition de
              périmètre, pas avec un devis générique.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${contact.projectEmail}?subject=Projet%20—%20prise%20de%20contact`} variant="accent">
                Écrire à {contact.projectEmail}
              </ButtonLink>
              <ButtonLink href={contact.phoneHref}>{contact.phoneDisplay}</ButtonLink>
            </div>
            <p className="mt-6 max-w-[52ch] text-small text-ink-3">
              Pas de formulaire : votre message arrive directement dans ma boîte, sans intermédiaire et sans fausse
              confirmation d&apos;envoi.
            </p>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <p className="font-mono text-tech uppercase tracking-[0.18em] text-ink-3">Utile dans votre message</p>
            <ul className="mt-5 space-y-3 text-body text-ink-2">
              <li className="border-t border-line pt-3">La nature du projet : site, application, refonte.</li>
              <li className="border-t border-line pt-3">Le public visé.</li>
              <li className="border-t border-line pt-3">Ce qui existe déjà, s&apos;il y a quelque chose.</li>
              <li className="border-t border-line pt-3">Votre échéance.</li>
            </ul>
            <p className="mt-8 text-small text-ink-3">
              Vous cherchiez plutôt un profil systèmes et réseaux ?{" "}
              <Link href="/systemes" className="link-underline text-ink">
                Voir mon parcours IT
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
