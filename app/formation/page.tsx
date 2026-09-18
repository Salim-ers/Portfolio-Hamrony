import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { training, flagships, support } from "@/data/it";
import { Container } from "@/components/ui/Container";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CornerRule, RuledBackground } from "@/components/brand/Marks";
import { TrainingProjects } from "@/components/systems/TrainingProjects";

export const metadata: Metadata = {
  title: "Projets de formation",
  description:
    "Les treize projets professionnalisants de la formation OpenClassrooms Administrateur systèmes, réseaux et sécurité : Windows Server, Active Directory, réseaux Cisco, Linux, sécurité, supervision et cloud.",
  alternates: { canonical: "/formation" },
};

/**
 * Page dédiée aux treize projets professionnalisants.
 *
 * C'est le seul endroit où la liste complète est affichée : la page
 * d'accueil n'en montre que le nombre et trois regroupements. Les projets
 * sont filtrables par domaine et restent tous rendus côté serveur.
 */
export default function FormationPage() {
  return (
    <>
      <header className="relative overflow-hidden bg-paper pt-16">
        <RuledBackground className="opacity-40" />
        <Container className="relative py-14 md:py-20">
          <Link
            href="/systemes"
            className="press inline-flex items-center gap-2 font-mono text-tech uppercase text-ink-3 hover:text-ink"
          >
            <ArrowLeft aria-hidden className="size-3.5" strokeWidth={1.75} />
            Parcours IT
          </Link>

          <CornerRule className="mt-10" />
          <h1 className="mt-5 max-w-[18ch] text-mega text-ink">
            <span className="word-mask" style={{ ["--delay" as string]: "80ms" }}>
              <span>Treize projets</span>
            </span>{" "}
            <span className="word-mask text-accent-ink" style={{ ["--delay" as string]: "200ms" }}>
              <span>professionnalisants.</span>
            </span>
          </h1>

          <div className="mt-10 grid gap-x-12 gap-y-6 lg:grid-cols-12">
            <p className="lift-in text-lede text-ink-2 lg:col-span-6" style={{ ["--delay" as string]: "460ms" }}>
              {training.summary}
            </p>
            <dl className="lift-in lg:col-span-4 lg:col-start-9" style={{ ["--delay" as string]: "560ms" }}>
              <Row label="Formation" value={training.school} />
              <Row label="Diplôme" value={training.credential} />
              <Row label="Période" value={`${training.start} — ${training.end}`} />
            </dl>
          </div>
        </Container>
      </header>

      {/* ---------------- Trois regroupements ---------------- */}
      <Section tone="paper-2">
        <SectionHead
          index="01"
          eyebrow="En résumé"
          title="Trois ensembles, treize projets."
          lede={<p>Chaque regroupement recouvre plusieurs projets de la liste complète, ci-dessous.</p>}
        />
        <div className="mt-16 grid gap-x-10 gap-y-12 lg:grid-cols-3">
          {flagships.map((f, i) => (
            <Reveal key={f.id} effect="rise" delay={i * 110} className="border-t-2 border-accent pt-6">
              <div className="flex items-baseline gap-3">
                <p className="font-mono text-tech uppercase text-ink-3">{f.n}</p>
                <p className="font-mono text-tech uppercase text-ink-3">
                  projets {f.covers.join(" · ")}
                </p>
              </div>
              <h3 className="mt-3 text-h1 text-ink">{f.title}</h3>
              <p className="mt-4 text-body-lg text-ink-2">{f.objective}</p>

              <p className="mt-6 font-mono text-tech uppercase text-ink-3">Travail réalisé</p>
              <ul className="mt-3 space-y-2">
                {f.work.map((w) => (
                  <li key={w} className="bracket text-body text-ink-2">
                    {w}
                  </li>
                ))}
              </ul>

              <p className="mt-6 font-mono text-tech uppercase text-ink-3">Technologies</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {f.tech.map((t) => (
                  <li key={t} className="border border-line-2 px-2.5 py-1 font-mono text-tech uppercase text-ink-2">
                    {t}
                  </li>
                ))}
              </ul>

              <p className="mt-6 font-mono text-tech uppercase text-ink-3">Ce que j&apos;en ai retenu</p>
              <p className="mt-3 border-l-2 border-line-2 pl-4 text-body text-ink-2">{f.learned}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- Liste complète, filtrable ---------------- */}
      <Section id="liste">
        <SectionHead
          index="02"
          eyebrow="Liste complète"
          title="Les treize projets."
          lede={<p>Filtrables par domaine. La liste complète reste affichée par défaut.</p>}
        />
        <div className="mt-14">
          <TrainingProjects />
        </div>
      </Section>

      {/* ---------------- Support, issu du projet 01 ---------------- */}
      <Section tone="paper-2">
        <SectionHead
          index="03"
          eyebrow="Support utilisateurs"
          title={support.title}
          lede={<p>{support.lead}</p>}
        />
        <ol className="focus-group mt-14 grid gap-x-10 gap-y-9 md:grid-cols-2 lg:grid-cols-3">
          {support.steps.map((s, i) => (
            <Reveal key={s.n} as="li" effect="rise" delay={i * 70} className="focus-item border-t border-line pt-5">
              <p className="font-mono text-tech uppercase text-accent-ink">{s.n}</p>
              <h3 className="mt-2 text-h3 text-ink">{s.label}</h3>
              <p className="mt-2.5 text-body text-ink-2">{s.detail}</p>
            </Reveal>
          ))}
        </ol>

        <p className="mt-12 font-mono text-tech uppercase text-ink-3">
          Outils pratiqués — {support.tools.join(" · ")}
        </p>

        {/* Exemple explicitement identifié comme pédagogique */}
        <Reveal effect="rise" className="mt-14 border border-line bg-surface p-6 sm:p-10">
          <p className="inline-flex border border-accent px-2.5 py-1 font-mono text-tech uppercase text-accent-ink">
            Exemple pédagogique
          </p>
          <h3 className="mt-5 text-h1 text-ink">{support.example.title}</h3>
          <p className="mt-3 max-w-[62ch] text-body text-ink-3">{support.example.context}</p>
          <ol className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-5">
            {support.example.steps.map((s, i) => (
              <li key={s.label} className="border-t border-line pt-4">
                <p className="font-mono text-tech text-ink-3">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-1.5 text-h3 text-ink">{s.label}</p>
                <p className="mt-2 text-small text-ink-2">{s.detail}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-3">
      <dt className="font-mono text-tech uppercase text-ink-3">{label}</dt>
      <dd className="text-body text-ink">{value}</dd>
    </div>
  );
}
