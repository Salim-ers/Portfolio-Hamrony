import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { contact, profile } from "@/data/profile";
import { positioning, training, skillGroups, lab, m365, flagships, career } from "@/data/it";
import { realValue } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CornerRule, RuledBackground } from "@/components/brand/Marks";
import { LabArchitecture, LabFallbackList } from "@/components/systems/LabArchitecture";

export const metadata: Metadata = {
  title: "Parcours IT",
  description:
    "Administrateur systèmes, réseaux et sécurité junior : compétences, projets de formation, laboratoire Proxmox et laboratoire Microsoft 365.",
  alternates: { canonical: "/systemes" },
};

/**
 * Parcours IT — version resserrée.
 *
 * Intro, compétences, trois projets phares, laboratoire, laboratoire
 * Microsoft 365, parcours, contact. Le détail des treize projets vit sur
 * /formation, et le support sur la page d'accueil.
 */
export default function SystemesPage() {
  const cv = realValue(contact.cv);

  return (
    <>
      {/* ---------------- Intro ---------------- */}
      <header className="relative overflow-hidden bg-paper pt-16">
        <RuledBackground className="opacity-40" />
        <Container className="relative py-16 md:py-24">
          <p className="lift-in font-mono text-tech uppercase text-ink-3" style={{ ["--delay" as string]: "40ms" }}>
            Parcours IT
          </p>
          <CornerRule className="mt-6" />
          <h1 className="mt-5 max-w-[16ch] text-mega text-ink">
            <span className="word-mask" style={{ ["--delay" as string]: "120ms" }}>
              <span>Administrer, diagnostiquer,</span>
            </span>{" "}
            <span className="word-mask text-accent-ink" style={{ ["--delay" as string]: "260ms" }}>
              <span>documenter.</span>
            </span>
          </h1>

          <div className="mt-12 grid gap-x-12 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="lift-in text-lede text-ink-2" style={{ ["--delay" as string]: "520ms" }}>
                {positioning.lead}
              </p>
              <div className="lift-in mt-9 flex flex-wrap gap-3" style={{ ["--delay" as string]: "620ms" }}>
                <ButtonLink href="#contact" variant="primary">
                  Échanger sur une opportunité
                </ButtonLink>
                {cv && (
                  <ButtonLink href={cv} external>
                    Consulter mon CV
                  </ButtonLink>
                )}
              </div>
            </div>

            <dl className="lift-in lg:col-span-4 lg:col-start-9" style={{ ["--delay" as string]: "700ms" }}>
              <Row label="Poste visé" value={positioning.title} />
              <Row label="Également" value="Technicien support N1 / N2" />
              <Row label="Localisation" value={positioning.location} />
              <Row label="Langues" value={positioning.languages} />
              {positioning.availability && <Row label="Disponibilité" value={positioning.availability} />}
            </dl>
          </div>
        </Container>
      </header>

      {/* ---------------- Compétences ---------------- */}
      <Section id="competences" tone="paper-2">
        <SectionHead
          index="01"
          eyebrow="Compétences"
          title="Les environnements que je pratique."
          lede={<p>Installés, configurés ou administrés — en formation et en laboratoire.</p>}
        />
        <div className="mt-16 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.id} effect="rise" delay={i * 45} className="border-t border-line pt-5">
              <h3 className="font-mono text-tech uppercase text-accent-ink">{g.name}</h3>
              <ul className="mt-3 flex flex-wrap gap-x-2.5 gap-y-1">
                {g.items.map((item) => (
                  <li key={item} className="text-body text-ink-2">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- Trois projets phares ---------------- */}
      <Section id="projets">
        <SectionHead
          index="02"
          eyebrow="Formation"
          title="Trois projets phares."
          lede={
            <p>
              Issus des {training.credential.toLowerCase()} — {training.school}, {training.start} — {training.end}.
            </p>
          }
        />
        <div className="mt-16 grid gap-x-10 gap-y-12 lg:grid-cols-3">
          {flagships.map((f, i) => (
            <Reveal key={f.id} effect="rise" delay={i * 110} className="border-t-2 border-accent pt-6">
              <p className="font-mono text-tech uppercase text-ink-3">{f.n}</p>
              <h3 className="mt-3 text-h1 text-ink">{f.title}</h3>
              <p className="mt-4 text-body-lg text-ink-2">{f.objective}</p>
              <ul className="mt-5 space-y-2">
                {f.work.map((w) => (
                  <li key={w} className="bracket text-body text-ink-2">
                    {w}
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
                {f.tech.map((t) => (
                  <li key={t} className="font-mono text-tech uppercase text-ink-3">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-l-2 border-line-2 pl-4 text-small text-ink-3">{f.learned}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-14">
          <ButtonLink href="/formation" variant="primary">
            Voir mes 13 projets de formation
            <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
          </ButtonLink>
        </div>
      </Section>

      {/* ---------------- Laboratoire ---------------- */}
      <section id="homelab" data-surface="dark" className="relative overflow-hidden bg-paper py-28 md:py-36">
        <RuledBackground className="opacity-30" />
        <Container className="relative">
          <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="mb-6 flex items-center gap-4 font-mono text-tech uppercase text-ink-3">
                <span className="text-accent">03</span>
                <span>Laboratoire</span>
              </p>
              <CornerRule className="mb-5" />
              <h2 className="text-display text-ink">{lab.title}</h2>
            </div>
            <p className="text-lede text-ink-2 lg:col-span-4 lg:col-start-9 lg:pt-16">{lab.lead}</p>
          </div>

          <p className="mt-10 max-w-[74ch] border-l-2 border-accent pl-5 text-small text-ink-3">{lab.disclosure}</p>

          <div className="mt-16">
            <LabArchitecture />
          </div>
          <LabFallbackList />
        </Container>
      </section>

      {/* ---------------- Laboratoire Microsoft 365 ---------------- */}
      <Section id="m365" tone="paper-2">
        <SectionHead index="04" eyebrow="Laboratoire" title={m365.title} lede={<p>{m365.lead}</p>} />
        <div className="mt-16 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {m365.areas.map((a, i) => (
            <Reveal
              key={a.id}
              effect="slide"
              from={i % 2 === 0 ? "-24px" : "24px"}
              delay={i * 80}
              className="border-t border-line-2 pt-6"
            >
              <h3 className="text-h1 text-ink">{a.name}</h3>
              <p className="mt-2 font-mono text-tech uppercase text-accent-ink">{a.role}</p>
              <ul className="mt-5 space-y-2.5">
                {a.items.map((item) => (
                  <li key={item} className="bracket text-body text-ink-2">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- Parcours ---------------- */}
      <Section id="parcours">
        <SectionHead
          index="05"
          eyebrow="Parcours"
          title="Formation, expériences et diplôme."
          lede={
            <p>
              Trois catégories distinctes : formation IT, expérience professionnelle antérieure, diplôme initial.
            </p>
          }
        />
        <ol className="mt-16">
          {career.map((c, i) => (
            <Reveal
              key={c.id}
              as="li"
              effect="slide"
              from="-24px"
              delay={i * 80}
              className="grid gap-x-10 gap-y-4 border-t border-line py-10 md:grid-cols-12"
            >
              <div className="md:col-span-3">
                <p className="font-mono text-tech uppercase text-accent-ink">
                  {c.start ? `${c.start} — ${c.end}` : c.end}
                </p>
                <p className="mt-2 font-mono text-tech uppercase text-ink-3">{c.kind}</p>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-h1 text-ink">{c.organisation}</h3>
                <p className="mt-1.5 text-body-lg text-ink-2">{c.role}</p>
                {c.location && <p className="mt-1 text-small text-ink-3">{c.location}</p>}
                <p className="mt-4 max-w-[64ch] text-body text-ink-2">{c.summary}</p>
                {c.points.length > 0 && (
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {c.points.map((p) => (
                      <li key={p} className="bracket text-body text-ink-2">
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
                {c.note && <p className="mt-5 max-w-[64ch] border-l-2 border-line-2 pl-5 text-small text-ink-3">{c.note}</p>}
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ---------------- Contact ---------------- */}
      <Section id="contact" tone="paper-2" size="tight">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <CornerRule className="mb-5" />
            <h2 className="text-display text-ink">Échangeons sur une opportunité.</h2>
            <p className="mt-5 max-w-[46ch] text-lede text-ink-2">
              {positioning.title}. {positioning.openTo}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:col-start-9 lg:justify-end">
            <ButtonLink href={`mailto:${contact.email}`} variant="primary">
              {contact.email}
            </ButtonLink>
            {cv && (
              <ButtonLink href={cv} external>
                Mon CV
              </ButtonLink>
            )}
          </div>
        </div>
        <p className="mt-8 text-small text-ink-3">
          Vous cherchiez plutôt mes créations numériques ?{" "}
          <a href="/creation" className="link-underline text-ink">
            Voir mes réalisations
          </a>
          .
        </p>
        <p className="sr-only">{profile.name}</p>
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
