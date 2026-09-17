import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { works, getWork, capturedOn, engagementLabel } from "@/data/works";
import { contact } from "@/data/profile";
import { shot, shots } from "@/lib/shots";
import { hostname } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Shot, RevealedShot } from "@/components/ui/Shot";
import { ButtonLink } from "@/components/ui/Button";

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return {};
  return {
    title: work.name,
    description: work.lead,
    alternates: { canonical: `/creation/${work.slug}` },
    openGraph: { title: `${work.name} — ${work.kind}`, description: work.lead, type: "article" },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const hero = shot(work.slug, work.cover.name, work.cover.alt);
  const gallery = shots(work.slug, work.case.gallery);
  // La capture de tête est déjà affichée : on ne la répète pas plus bas.
  const rest = gallery.filter((g) => g.src !== hero?.src);

  const i = works.findIndex((w) => w.slug === work.slug);
  const next = works[(i + 1) % works.length];

  return (
    <article>
      {/* ---------------- En-tête ---------------- */}
      <header className="pt-16">
        <Container className="py-12 md:py-16">
          <Link
            href="/creation#realisations"
            className="press inline-flex items-center gap-2 font-mono text-tech uppercase tracking-[0.16em] text-ink-3 hover:text-ink"
          >
            <ArrowLeft aria-hidden className="size-3.5" strokeWidth={1.75} />
            Toutes les réalisations
          </Link>

          <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-tech uppercase tracking-[0.16em] text-ink-3">
            <span>{work.kind}</span>
            <span aria-hidden>·</span>
            <span>{work.sector}</span>
            {work.location && (
              <>
                <span aria-hidden>·</span>
                <span>{work.location}</span>
              </>
            )}
            <span aria-hidden>·</span>
            <span>{work.status}</span>
            <span aria-hidden>·</span>
            <span className="text-accent-ink">{engagementLabel[work.engagement]}</span>
          </p>

          <h1 className="mt-5 text-mega text-ink">
            <span className="word-mask" style={{ ["--delay" as string]: "60ms" }}>
              <span>{work.name}</span>
            </span>
          </h1>

          <div className="mt-8 grid gap-6 md:grid-cols-12 md:items-end">
            <p className="lift-in text-lede text-ink-2 md:col-span-7" style={{ ["--delay" as string]: "320ms" }}>
              {work.lead}
            </p>
            <div
              className="lift-in flex flex-wrap gap-3 md:col-span-4 md:col-start-9 md:justify-end"
              style={{ ["--delay" as string]: "440ms" }}
            >
              {work.url && (
                <ButtonLink href={work.url} external variant="primary">
                  Ouvrir {hostname(work.url)}
                </ButtonLink>
              )}
              {work.repo && (
                <ButtonLink href={work.repo} external>
                  Code source
                </ButtonLink>
              )}
            </div>
          </div>
        </Container>

        {hero && (
          <Reveal effect="mask" className="overflow-hidden border-y border-line">
            <Shot shot={hero} crop="top" priority sizes="100vw" className="[&_img]:aspect-[21/9]" />
          </Reveal>
        )}
      </header>

      {/* ---------------- Contexte, public, rôle ---------------- */}
      <Section>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal effect="slide" from="-24px">
              <h2 className="text-h2 text-ink">Le contexte</h2>
              <p className="mt-6 max-w-[62ch] text-body-lg text-ink-2">{work.case.context}</p>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <Reveal effect="rise" delay={120}>
              <Field label="Nature du projet" value={engagementLabel[work.engagement]} />
              <Field label="Public concerné" value={work.case.audience} className="mt-8" />
              <Field label="Mon rôle" value={work.case.role} className="mt-8" />
              {work.case.stack.length > 0 && (
                <div className="mt-8">
                  <p className="font-mono text-tech uppercase tracking-[0.18em] text-ink-3">
                    {work.case.stackNote ?? "Technologies"}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
                    {work.case.stack.map((t) => (
                      <li key={t} className="text-body text-ink-2">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------- Travail réalisé ---------------- */}
      <Section tone="paper-2" size="tight">
        <div className="grid gap-10 md:grid-cols-12">
          <h2 className="text-h2 text-ink md:col-span-4">Le travail réalisé</h2>
          <ol className="md:col-span-8">
            {work.case.work.map((w, idx) => (
              <Reveal
                key={w}
                as="li"
                effect="slide"
                from="-20px"
                delay={idx * 80}
                className="flex gap-6 border-t border-line py-5 first:border-t-0 first:pt-0"
              >
                <span className="shrink-0 pt-1 font-mono text-tech text-accent-ink">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-body-lg text-ink-2">{w}</span>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      {/* ---------------- Choix de conception ---------------- */}
      <Section>
        <h2 className="text-h2 text-ink">Les choix de conception</h2>
        <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-3">
          {work.case.design.map((d, idx) => (
            <Reveal key={d.label} effect="rise" delay={idx * 110} className="border-t border-line-2 pt-6">
              <h3 className="text-h3 text-ink">{d.label}</h3>
              <p className="mt-3 text-body text-ink-2">{d.detail}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---------------- Captures ---------------- */}
      {rest.length > 0 && (
        <Section tone="paper-2" size="tight">
          <h2 className="text-h2 text-ink">Détails d&apos;interface</h2>
          <p className="mt-3 max-w-[54ch] text-small text-ink-3">
            Captures du site réellement en ligne, prises le {capturedOn}.
          </p>
          <div className="mt-12 flex flex-col gap-16">
            {rest.map((g, idx) => {
              const isMobile = g.src.endsWith("/mobile.jpg");
              return (
                <RevealedShot
                  key={g.src}
                  shot={g}
                  frame={isMobile ? "device" : "browser"}
                  address={!isMobile && work.url ? hostname(work.url) : null}
                  crop="top"
                  sizes={isMobile ? "(max-width: 768px) 60vw, 300px" : "(max-width: 768px) 100vw, 1100px"}
                  figureClassName={isMobile ? "max-w-[300px]" : undefined}
                  className={idx % 2 === 1 && !isMobile ? "md:ml-[6%]" : undefined}
                />
              );
            })}
          </div>
        </Section>
      )}

      {/* ---------------- Périmètre fonctionnel ---------------- */}
      {work.case.features.length > 0 && (
        <Section>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <h2 className="text-h2 text-ink">Périmètre fonctionnel</h2>
              <p className="mt-4 max-w-[36ch] text-small text-ink-3">
                Relevé sur la version publiquement accessible du site.
              </p>
            </div>
            <dl className="md:col-span-8">
              {work.case.features.map((f, idx) => (
                <Reveal
                  key={f.label}
                  effect="rise"
                  delay={idx * 60}
                  className="grid gap-1 border-t border-line py-5 first:border-t-0 first:pt-0 sm:grid-cols-5 sm:gap-6"
                >
                  <dt className="text-h3 text-ink sm:col-span-2">{f.label}</dt>
                  <dd className="text-body text-ink-2 sm:col-span-3">{f.detail}</dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </Section>
      )}

      {/* ---------------- Résultats : affichés seulement s'ils existent ---------------- */}
      {work.case.results.length > 0 && (
        <Section tone="paper-2" size="tight">
          <h2 className="text-h2 text-ink">Résultats</h2>
          <ul className="mt-8 space-y-3">
            {work.case.results.map((r) => (
              <li key={r} className="border-t border-line pt-3 text-body-lg text-ink-2">
                {r}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {/* ---------------- Transparence ---------------- */}
      {work.case.disclosure && (
        <Section size="tight">
          <Reveal effect="rise" className="max-w-[62ch] border-l-2 border-accent pl-6">
            <p className="font-mono text-tech uppercase tracking-[0.18em] text-ink-3">Précision</p>
            <p className="mt-3 text-body text-ink-2">{work.case.disclosure}</p>
          </Reveal>
        </Section>
      )}

      {/* ---------------- Suite ---------------- */}
      <Section tone="paper-2" size="tight">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="font-mono text-tech uppercase tracking-[0.18em] text-ink-3">Réalisation suivante</p>
            <h2 className="mt-4 text-h1 text-ink">
              <Link href={`/creation/${next.slug}`} className="link-underline hover:text-accent-ink">
                {next.name}
              </Link>
            </h2>
            <p className="mt-3 max-w-[46ch] text-body text-ink-2">{next.lead}</p>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <ButtonLink href={`mailto:${contact.projectEmail}?subject=Projet%20—%20prise%20de%20contact`} variant="accent">
              Parlons de votre projet
            </ButtonLink>
            <ButtonLink href="/creation#realisations">
              Toutes les réalisations
              <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
            </ButtonLink>
          </div>
        </div>
      </Section>
    </article>
  );
}

function Field({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <p className="font-mono text-tech uppercase tracking-[0.18em] text-ink-3">{label}</p>
      <p className="mt-3 text-body text-ink-2">{value}</p>
    </div>
  );
}
