import type { Metadata } from "next";
import Link from "next/link";
import { contact } from "@/data/profile";
import { positioning, training, skillGroups, lab, m365, support, career } from "@/data/it";
import { realValue } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { LabArchitecture, LabFallbackList } from "@/components/systems/LabArchitecture";
import { TrainingProjects } from "@/components/systems/TrainingProjects";

export const metadata: Metadata = {
  title: "Systèmes & réseaux",
  description:
    "Administrateur systèmes, réseaux et sécurité junior, également ouvert au support N1/N2 : Windows Server, Active Directory, Linux, réseaux Cisco, home lab Proxmox et laboratoire Microsoft 365.",
  alternates: { canonical: "/systemes" },
};

export default function SystemesPage() {
  const cv = realValue(contact.cv);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <header className="pt-16">
        <Container className="py-16 md:py-24">
          <p className="lift-in font-mono text-tech uppercase tracking-[0.18em] text-ink-3" style={{ ["--delay" as string]: "60ms" }}>
            Univers 02 — Systèmes, réseaux & support IT
          </p>

          <h1 className="mt-7 text-mega text-ink">
            <span className="word-mask" style={{ ["--delay" as string]: "140ms" }}>
              <span>Administrer,</span>
            </span>{" "}
            <span className="word-mask" style={{ ["--delay" as string]: "250ms" }}>
              <span>diagnostiquer,</span>
            </span>{" "}
            <span className="word-mask text-accent-ink" style={{ ["--delay" as string]: "360ms" }}>
              <span>documenter.</span>
            </span>
          </h1>

          <div className="mt-9 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="lift-in text-lede text-ink-2" style={{ ["--delay" as string]: "560ms" }}>
                {positioning.lead}
              </p>
              <p className="lift-in mt-4 text-body-lg text-ink-3" style={{ ["--delay" as string]: "640ms" }}>
                {positioning.title}. {positioning.openTo}
              </p>
              <div className="lift-in mt-9 flex flex-wrap gap-3" style={{ ["--delay" as string]: "720ms" }}>
                <ButtonLink
                  href={`mailto:${contact.jobEmail}?subject=Opportunit%C3%A9%20—%20administrateur%20syst%C3%A8mes%20et%20r%C3%A9seaux`}
                  variant="accent"
                >
                  Échanger sur une opportunité
                </ButtonLink>
                {cv ? (
                  <ButtonLink href={cv} external>
                    Consulter mon CV
                  </ButtonLink>
                ) : (
                  <ButtonLink href={`mailto:${contact.jobEmail}?subject=Demande%20de%20CV`}>
                    Demander mon CV
                  </ButtonLink>
                )}
              </div>
            </div>

            <dl className="lift-in md:col-span-4 md:col-start-9" style={{ ["--delay" as string]: "800ms" }}>
              <Info label="Localisation" value={positioning.location} />
              <Info label="Langues" value={positioning.languages} />
              <Info label="Mobilité" value={positioning.mobility} />
              {positioning.availability && <Info label="Disponibilité" value={positioning.availability} />}
            </dl>
          </div>
        </Container>
      </header>

      {/* ---------------- Compétences ---------------- */}
      <Section id="competences" tone="paper-2">
        <SectionHead
          index="Compétences"
          title="Les technologies que je pratique."
          lede={
            <p>
              Pas de jauge, pas de pourcentage : une jauge de compétence ne veut rien dire. Voici les environnements que
              j&apos;ai réellement installés, configurés ou administrés, en formation ou en laboratoire.
            </p>
          }
          align="split"
        />
        <div className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => (
            <Reveal key={g.id} effect="rise" delay={i * 50} className="border-t border-line pt-5">
              <h3 className="font-mono text-tech uppercase tracking-[0.16em] text-accent-ink">{g.name}</h3>
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

      {/* ---------------- Formation ---------------- */}
      <Section id="formation">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal effect="slide" from="-24px">
              <p className="font-mono text-tech uppercase tracking-[0.18em] text-ink-3">Formation</p>
              <h2 className="mt-5 text-h1 text-ink">{training.credential}</h2>
              <p className="mt-4 text-body-lg text-ink-2">
                {training.program} — {training.school}
              </p>
              <p className="mt-2 font-mono text-tech uppercase tracking-[0.14em] text-ink-3">
                {training.start} — {training.end}
              </p>
              <p className="mt-6 max-w-[40ch] text-body text-ink-2">{training.summary}</p>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <TrainingProjects />
          </div>
        </div>
      </Section>

      {/* ---------------- Home lab ---------------- */}
      <Section id="homelab" tone="paper-2" size="loose">
        <SectionHead
          index="Laboratoire"
          title={lab.title}
          lede={<p>{lab.lead}</p>}
          align="split"
        />
        <p className="mt-6 max-w-[70ch] border-l-2 border-accent pl-5 text-small text-ink-3">{lab.disclosure}</p>

        <div className="mt-14">
          <LabArchitecture />
        </div>

        <LabFallbackList />
      </Section>

      {/* ---------------- Laboratoire Microsoft 365 ---------------- */}
      <Section id="m365">
        <SectionHead
          index="Laboratoire"
          title={m365.title}
          lede={<p>{m365.lead}</p>}
          align="split"
        />
        <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
          {m365.areas.map((a, i) => (
            <Reveal key={a.id} effect="slide" from={i % 2 === 0 ? "-24px" : "24px"} delay={i * 80} className="border-t border-line-2 pt-6">
              <h3 className="text-h2 text-ink">{a.name}</h3>
              <p className="mt-2 font-mono text-tech uppercase tracking-[0.14em] text-accent-ink">{a.role}</p>
              <ul className="mt-5 space-y-2.5">
                {a.items.map((item) => (
                  <li key={item} className="flex gap-3 text-body text-ink-2">
                    <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-line-2" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- Support N1/N2 ---------------- */}
      <Section id="support" tone="paper-2">
        <SectionHead index="Support" title={support.title} lede={<p>{support.lead}</p>} align="split" />

        <ol className="focus-group mt-14 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {support.steps.map((s, i) => (
            <Reveal key={s.n} as="li" effect="rise" delay={i * 70} className="focus-item border-t border-line pt-5">
              <p className="font-mono text-tech text-accent-ink">{s.n}</p>
              <h3 className="mt-2 text-h3 text-ink">{s.label}</h3>
              <p className="mt-2.5 text-body text-ink-2">{s.detail}</p>
            </Reveal>
          ))}
        </ol>

        <p className="mt-12 font-mono text-tech uppercase tracking-[0.16em] text-ink-3">
          Outils pratiqués — {support.tools.join(" · ")}
        </p>

        {/* Exemple explicitement identifié comme pédagogique */}
        <Reveal effect="rise" className="mt-14 rounded-md border border-line bg-surface p-6 sm:p-9">
          <p className="inline-flex rounded-sm border border-accent px-2.5 py-1 font-mono text-tech uppercase tracking-[0.14em] text-accent-ink">
            Exemple pédagogique
          </p>
          <h3 className="mt-5 text-h2 text-ink">{support.example.title}</h3>
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

      {/* ---------------- Parcours ---------------- */}
      <Section id="parcours">
        <SectionHead
          index="Parcours"
          title="Formation, expériences et diplôme."
          lede={
            <p>
              Trois catégories distinctes, jamais confondues : ce qui relève de ma formation IT, ce qui relève de mon
              expérience professionnelle antérieure, et mon diplôme initial.
            </p>
          }
          align="split"
        />

        <ol className="mt-14">
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
                <p className="font-mono text-tech uppercase tracking-[0.14em] text-accent-ink">
                  {c.start ? `${c.start} — ${c.end}` : c.end}
                </p>
                <p className="mt-2 font-mono text-tech uppercase tracking-[0.14em] text-ink-3">{c.kind}</p>
              </div>
              <div className="md:col-span-9">
                <h3 className="text-h2 text-ink">{c.organisation}</h3>
                <p className="mt-1.5 text-body-lg text-ink-2">{c.role}</p>
                {c.location && <p className="mt-1 text-small text-ink-3">{c.location}</p>}
                <p className="mt-4 max-w-[64ch] text-body text-ink-2">{c.summary}</p>
                {c.points.length > 0 && (
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {c.points.map((p) => (
                      <li key={p} className="flex gap-3 text-body text-ink-2">
                        <span aria-hidden className="mt-2.5 h-px w-4 shrink-0 bg-line-2" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {c.note && (
                  <p className="mt-5 max-w-[64ch] border-l-2 border-line-2 pl-5 text-small text-ink-3">{c.note}</p>
                )}
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ---------------- Contact recrutement ---------------- */}
      <Section id="contact" tone="paper-2" size="loose">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 className="text-display text-ink">
              Échangeons sur<span className="text-accent-ink"> une opportunité.</span>
            </h2>
            <p className="mt-6 max-w-[50ch] text-lede text-ink-2">
              Poste d&apos;administrateur systèmes et réseaux junior, ou de technicien support N1/N2. Alternance,
              stage de fin de formation ou premier poste : dites-moi le contexte, je vous réponds précisément.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink
                href={`mailto:${contact.jobEmail}?subject=Opportunit%C3%A9%20—%20administrateur%20syst%C3%A8mes%20et%20r%C3%A9seaux`}
                variant="accent"
              >
                {contact.jobEmail}
              </ButtonLink>
              <ButtonLink href={contact.phoneHref}>{contact.phoneDisplay}</ButtonLink>
              {cv && (
                <ButtonLink href={cv} external>
                  Consulter mon CV
                </ButtonLink>
              )}
            </div>
            <p className="mt-6 max-w-[52ch] text-small text-ink-3">
              Pas de formulaire : votre message arrive directement dans ma boîte, sans intermédiaire et sans fausse
              confirmation d&apos;envoi.
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <p className="font-mono text-tech uppercase tracking-[0.18em] text-ink-3">En résumé</p>
            <ul className="mt-5 space-y-3 text-body text-ink-2">
              <li className="border-t border-line pt-3">{positioning.title}</li>
              <li className="border-t border-line pt-3">{positioning.openTo}</li>
              <li className="border-t border-line pt-3">
                {training.credential}, {training.school}, {training.start} — {training.end}
              </li>
              <li className="border-t border-line pt-3">{positioning.location} · {positioning.mobility}</li>
            </ul>
            <p className="mt-8 text-small text-ink-3">
              Vous cherchiez plutôt un site ou une application ?{" "}
              <Link href="/creation" className="link-underline text-ink">
                Voir mes créations
              </Link>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-line py-3 first:border-t-0 first:pt-0">
      <dt className="font-mono text-tech uppercase tracking-[0.16em] text-ink-3">{label}</dt>
      <dd className="mt-1 text-body text-ink-2">{value}</dd>
    </div>
  );
}
