import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { getProject, projects, type Project } from "@/data/projects";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Shot } from "@/components/ui/Shot";
import { Reveal } from "@/components/ui/Reveal";
import { hostname, realValue, siteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const description = p.description ?? p.tagline ?? `${p.name}, un projet de ${profile.name}.`;
  return {
    title: p.name,
    description,
    alternates: { canonical: `/projets/${p.slug}` },
    openGraph: { type: "article", title: `${p.name} | ${profile.name}`, description, url: `/projets/${p.slug}` },
  };
}

function Block({ title, children, id }: { title: string; children: React.ReactNode; id: string }) {
  return (
    <Reveal as="section" className="grid gap-6 border-t border-line py-14 md:py-20 lg:grid-cols-12 lg:gap-10">
      <h2 id={id} className="text-h3 text-ink-2 lg:col-span-3">
        {title}
      </h2>
      <div className="lg:col-span-8">{children}</div>
    </Reveal>
  );
}

const STATE_LABEL: Record<string, string | null> = {
  working: "Fonctionnel",
  "in-progress": "En cours",
  planned: "Prévu",
  scope: null,
};

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p: Project | undefined = getProject(slug);
  if (!p) notFound();

  const url = realValue(p.url);
  const repoUrl = realValue(p.repositoryUrl ?? p.github);
  const index = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(index + 1) % projects.length];
  const allScope = p.features.length > 0 && p.features.every((f) => f.state === "scope");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    description: p.description ?? p.tagline ?? undefined,
    url: `${siteUrl()}/projets/${p.slug}`,
    creator: { "@type": "Person", name: profile.name },
  };

  return (
    <article className="pt-[68px]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container>
        <nav aria-label="Fil d'Ariane" className="pt-10 text-small text-ink-3">
          <Link href="/projets" className="link-underline pb-0.5 hover:text-ink">
            Projets
          </Link>
          <span aria-hidden className="mx-2">
            /
          </span>
          <span className="text-ink-2">{p.name}</span>
        </nav>

        <header className="grid gap-10 pb-14 pt-10 md:pb-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            {p.category && (
              <p className="flex items-center gap-3 font-mono text-tech uppercase tracking-[0.16em] text-accent">
                <span aria-hidden className="size-2" style={{ background: p.accent }} />
                {p.category}
              </p>
            )}
            <h1 className="mt-6 text-display text-ink">{p.name}</h1>
            {p.tagline && <p className="mt-7 max-w-[34ch] text-lede text-ink-2">{p.tagline}</p>}
          </div>

          <dl className="grid content-end gap-x-8 gap-y-5 self-end text-small lg:col-span-4 lg:col-start-9">
            {p.status && (
              <div>
                <dt className="text-ink-3">Statut</dt>
                <dd className="mt-1.5 text-ink">{p.status}</dd>
              </div>
            )}
            {p.year && (
              <div>
                <dt className="text-ink-3">Année</dt>
                <dd className="mt-1.5 text-ink">{p.year}</dd>
              </div>
            )}
            {p.role && (
              <div>
                <dt className="text-ink-3">Rôle</dt>
                <dd className="mt-1.5 text-ink">{p.role}</dd>
              </div>
            )}
            {p.repositoryVisibility === "private" && (
              <div>
                <dt className="text-ink-3">Code source</dt>
                <dd className="mt-1.5 inline-flex items-center gap-1.5 text-ink-2">
                  <Lock aria-hidden className="size-3.5" strokeWidth={1.75} /> Dépôt privé
                </dd>
              </div>
            )}
            {(url || (repoUrl && p.repositoryVisibility === "public")) && (
              <div className="flex flex-wrap gap-3">
                {url && (
                  <ButtonLink href={url} external variant="primary">
                    Voir le site
                  </ButtonLink>
                )}
                {repoUrl && p.repositoryVisibility === "public" && (
                  <ButtonLink href={repoUrl} external>
                    Voir le code
                  </ButtonLink>
                )}
              </div>
            )}
          </dl>
        </header>

        <div className="pb-14 md:pb-20">
          <BrowserFrame address={url ? hostname(url) : null}>
            <Shot
              base={`/projects/${p.slug}/home`}
              src={p.screenshots[0]?.src ?? null}
              alt={p.screenshots[0]?.alt ?? `Interface de ${p.name}`}
              name={p.name}
              meta={p.category}
              accent={p.accent}
              className="aspect-[16/10] max-sm:aspect-[4/5]"
              sizes="(min-width: 1320px) 1230px, 100vw"
              priority
            />
          </BrowserFrame>
        </div>

        {p.description && (
          <Block title="Le produit" id="s-produit">
            <p className="max-w-[62ch] text-body-lg text-ink">{p.description}</p>
          </Block>
        )}

        {p.problem && (
          <Block title="Le besoin" id="s-besoin">
            <p className="max-w-[62ch] text-body-lg text-ink-2">{p.problem}</p>
          </Block>
        )}

        {p.approach && (
          <Block title="L'approche" id="s-approche">
            <p className="max-w-[62ch] text-body-lg text-ink-2">{p.approach}</p>
          </Block>
        )}

        {p.workflow && p.workflow.length > 0 && (
          <Block title="Le parcours" id="s-parcours">
            <ol className="grid gap-x-10 sm:grid-cols-2">
              {p.workflow.map((s, i) => (
                <li key={s} className="flex items-baseline gap-4 border-b border-line py-3">
                  <span className="font-mono text-tech text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-body text-ink">{s}</span>
                </li>
              ))}
            </ol>
          </Block>
        )}

        {p.features.length > 0 && (
          <Block title={allScope ? "Périmètre" : "Fonctionnalités"} id="s-perimetre">
            <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {p.features.map((f) => (
                <li key={f.label} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                  <span className="text-body text-ink">{f.label}</span>
                  {STATE_LABEL[f.state] && <span className="font-mono text-tech text-ink-3">{STATE_LABEL[f.state]}</span>}
                </li>
              ))}
            </ul>
          </Block>
        )}

        {p.architecture && p.architecture.layers.length > 0 && (
          <Block title="Architecture" id="s-architecture">
            {p.architecture.summary && <p className="mb-8 max-w-[62ch] text-body-lg text-ink-2">{p.architecture.summary}</p>}
            <ol className="border-t border-line">
              {p.architecture.layers.map((l) => (
                <li key={l.name} className="grid grid-cols-[1fr_auto] items-baseline gap-6 border-b border-line py-4 sm:grid-cols-[12rem_1fr]">
                  <span className="text-small text-ink-3">{l.name}</span>
                  <span className="font-mono text-small text-ink">{l.items.join(", ")}</span>
                </li>
              ))}
            </ol>
            {p.stackNote && <p className="mt-4 text-small text-ink-3">{p.stackNote}</p>}
          </Block>
        )}

        {p.stack.length > 0 && !p.architecture && (
          <Block title="Environnement technique" id="s-stack">
            {p.stackNote && <p className="mb-4 text-small text-ink-3">{p.stackNote}</p>}
            <ul className="flex flex-wrap gap-3">
              {p.stack.map((s) => (
                <li key={s} className="border border-line bg-paper-3 px-4 py-2 text-small text-ink">
                  {s}
                </li>
              ))}
            </ul>
          </Block>
        )}

        {p.lessons.length > 0 && (
          <Block title="Ce que j'en retiens" id="s-lecons">
            <ul className="space-y-4">
              {p.lessons.map((l) => (
                <li key={l} className="max-w-[62ch] text-body-lg text-ink-2">
                  {l}
                </li>
              ))}
            </ul>
          </Block>
        )}

        {!p.description && !p.tagline && (
          <p className="border-t border-line py-14 text-body-lg text-ink-2">
            La présentation de {p.name} est en cours de rédaction.
          </p>
        )}

        <nav aria-label="Projet suivant" className="border-t border-line py-14 md:py-20">
          <Link href={`/projets/${next.slug}`} className="group inline-flex flex-col">
            <span className="font-mono text-tech uppercase tracking-[0.16em] text-ink-3">Projet suivant</span>
            <span className="mt-3 text-h1 text-ink transition-colors group-hover:text-accent">{next.name}</span>
          </Link>
        </nav>
      </Container>
    </article>
  );
}
