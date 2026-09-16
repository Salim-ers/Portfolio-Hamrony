import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { getProject, projects, type Project } from "@/data/projects";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { StatusTag } from "@/components/ui/StatusTag";
import { ButtonLink } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ScreenshotSlot } from "@/components/ui/ScreenshotSlot";
import { SiteVisual } from "@/components/projects/SiteVisual";
import { resolveShot } from "@/lib/media";
import { Workflow } from "@/components/projects/Workflow";
import { ScoreDemo } from "@/components/projects/ScoreDemo";
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
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { type: "article", title: `${p.name} | ${profile.name}`, description, url: `/projects/${p.slug}` },
    twitter: { card: "summary_large_image", title: `${p.name} | ${profile.name}`, description },
  };
}

function Block({ title, children, id }: { title: string; children: React.ReactNode; id: string }) {
  return (
    <section aria-labelledby={id} className="grid gap-6 border-t border-line py-14 lg:grid-cols-12 lg:gap-8 md:py-20">
      <h2 id={id} className="text-h3 text-fg lg:col-span-3">
        {title}
      </h2>
      <div className="lg:col-span-9">{children}</div>
    </section>
  );
}

const STATE_LABEL = { working: "Fonctionnel", "in-progress": "En cours", planned: "Prévu", scope: null } as const;

function Screens({ p }: { p: Project }) {
  const url = realValue(p.url);
  const [first, ...rest] = p.screenshots;
  // Les vues secondaires n'apparaissent qu'avec une vraie capture : pas de mur d'emplacements vides.
  const others = rest
    .map((s, i) => ({ ...s, src: resolveShot(s.src, `/projects/${p.slug}/detail-${i + 1}`) }))
    .filter((s) => s.src);
  return (
    <div className="space-y-4">
      {first && (first.frame === "mobile" ? (
        <div className="mx-auto w-[240px] rounded-[22px] border border-line-strong p-2">
          <ScreenshotSlot shot={first} accent={p.accent} compact className="aspect-[9/19.5] rounded-[15px]" localBase={`/projects/${p.slug}/mobile`} />
        </div>
      ) : (
        <BrowserFrame address={url ? hostname(url) : null}>
          <SiteVisual
            src={first.src}
            alt={first.alt}
            localBase={`/projects/${p.slug}/home`}
            url={p.url}
            live={p.livePreview}
            title={p.name}
            accent={p.accent}
            priority
          />
        </BrowserFrame>
      ))}
      {others.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {others.map((s, i) =>
            s.frame === "mobile" ? (
              <div key={i} className="mx-auto w-[200px] rounded-[20px] border border-line-strong p-2">
                <ScreenshotSlot shot={s} accent={p.accent} compact className="aspect-[9/19.5] rounded-[13px]" />
              </div>
            ) : (
              <ScreenshotSlot key={i} shot={s} accent={p.accent} compact className="aspect-[4/3] rounded-md border border-line" />
            )
          )}
        </div>
      )}
    </div>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const url = realValue(p.url);
  const repoUrl = realValue(p.repositoryUrl ?? p.github);
  const index = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(index + 1) % projects.length];
  const hasFeatures = p.features.length > 0;
  const allScope = hasFeatures && p.features.every((f) => f.state === "scope");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: p.name,
    description: p.description ?? p.tagline ?? undefined,
    url: `${siteUrl()}/projects/${p.slug}`,
    creator: { "@type": "Person", name: profile.name },
  };

  return (
    <article className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container>
        <nav aria-label="Fil d'Ariane" className="pt-10 text-small text-fg-3">
          <Link href="/#products" className="link-underline pb-0.5 hover:text-fg">
            Projets
          </Link>
          <span aria-hidden className="mx-2">/</span>
          <span className="text-fg-2">{p.name}</span>
        </nav>

        {/* OVERVIEW */}
        <header className="grid gap-10 pb-16 pt-12 md:pb-24 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span aria-hidden className="size-2.5 rounded-[2px]" style={{ background: p.accent }} />
              {p.category && <span className="text-label text-fg-3">{p.category}</span>}
            </div>
            <h1 className="mt-4 text-display text-fg">{p.name}</h1>
            {p.tagline && <p className="mt-6 max-w-[30ch] text-h3 font-normal text-fg-2">{p.tagline}</p>}
          </div>
          <dl className="grid content-end gap-x-8 gap-y-5 self-end text-small sm:grid-cols-2 lg:col-span-4 lg:col-start-9">
            <div>
              <dt className="text-fg-3">Statut</dt>
              <dd className="mt-1.5">
                <StatusTag status={p.status} fallback="À préciser" />
              </dd>
            </div>
            {p.year && (
              <div>
                <dt className="text-fg-3">Année</dt>
                <dd className="mt-1.5 text-fg">{p.year}</dd>
              </div>
            )}
            {p.role && (
              <div>
                <dt className="text-fg-3">Rôle</dt>
                <dd className="mt-1.5 text-fg">{p.role}</dd>
              </div>
            )}
            {p.repositoryVisibility === "private" && (
              <div>
                <dt className="text-fg-3">Code source</dt>
                <dd className="mt-1.5 inline-flex items-center gap-1.5 text-fg-2">
                  <Lock aria-hidden className="size-3.5" strokeWidth={1.75} /> Private repository
                </dd>
              </div>
            )}
            {(url || (repoUrl && p.repositoryVisibility === "public")) && (
              <div className="flex flex-wrap gap-3 sm:col-span-2">
                {url && (
                  <ButtonLink href={url} external variant="primary">
                    Visit site
                  </ButtonLink>
                )}
                {repoUrl && p.repositoryVisibility === "public" && (
                  <ButtonLink href={repoUrl} external>
                    View source
                  </ButtonLink>
                )}
              </div>
            )}
          </dl>
        </header>

        {p.screenshots.length > 0 && (
          <div className="pb-16 md:pb-24">
            <Screens p={p} />
          </div>
        )}

        {p.description && (
          <Block title="Overview" id="s-overview">
            <p className="max-w-[62ch] text-body-lg text-fg">{p.description}</p>
          </Block>
        )}

        {p.problem && (
          <Block title="Idea / problem" id="s-problem">
            <p className="max-w-[62ch] text-body-lg text-fg-2">{p.problem}</p>
          </Block>
        )}

        {p.approach && (
          <Block title="Approach" id="s-approach">
            <p className="max-w-[62ch] text-body-lg text-fg-2">{p.approach}</p>
          </Block>
        )}

        {p.workflow && p.workflow.length > 0 && (
          <Block title="Workflow" id="s-workflow">
            <Workflow steps={p.workflow} accent={p.accent} />
          </Block>
        )}

        {p.slug === "skillora" && (
          <Block title="Scoring" id="s-scoring">
            <ScoreDemo accent={p.accent} />
          </Block>
        )}

        {hasFeatures && (
          <Block title={allScope ? "Périmètre" : "Features"} id="s-features">
            <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
              {p.features.map((f) => (
                <li key={f.label} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
                  <span className="text-body text-fg">{f.label}</span>
                  {STATE_LABEL[f.state] && <span className="font-mono text-tech text-fg-3">{STATE_LABEL[f.state]}</span>}
                </li>
              ))}
            </ul>
            {allScope && <p className="mt-4 text-small text-fg-3">Modules du produit. L&apos;état d&apos;avancement de chacun sera précisé.</p>}
          </Block>
        )}

        {p.architecture && (p.architecture.summary || p.architecture.layers.length > 0) && (
          <Block title="Architecture" id="s-architecture">
            {p.architecture.summary && <p className="mb-8 max-w-[62ch] text-body-lg text-fg-2">{p.architecture.summary}</p>}
            {p.architecture.layers.length > 0 && (
              <ol className="overflow-hidden rounded-md border border-line">
                {p.architecture.layers.map((l, i) => (
                  <li key={l.name} className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line px-5 py-4 last:border-b-0 sm:grid-cols-[14rem_1fr]">
                    <span className="text-small text-fg-3">{l.name}</span>
                    <span className="font-mono text-tech text-fg sm:text-small">
                      {l.items.join(", ")}
                    </span>
                  </li>
                ))}
              </ol>
            )}
            {p.stackNote && <p className="mt-3 text-small text-fg-3">{p.stackNote}</p>}
          </Block>
        )}

        {p.stack.length > 0 && !p.architecture && (
          <Block title="Tech stack" id="s-stack">
            {p.stackNote && <p className="mb-3 text-small text-fg-3">{p.stackNote}</p>}
            <ul className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-small text-fg">
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Block>
        )}

        {p.metadata && Object.values(p.metadata).some(Boolean) && (
          <Block title="Repository" id="s-meta">
            <dl className="grid gap-4 sm:grid-cols-3">
              {Object.entries(p.metadata).map(([k, v]) =>
                v ? (
                  <div key={k}>
                    <dt className="text-small text-fg-3">{k}</dt>
                    <dd className="mt-1 font-mono text-small text-fg">{v}</dd>
                  </div>
                ) : null
              )}
            </dl>
          </Block>
        )}

        {p.lessons.length > 0 && (
          <Block title="What I learned" id="s-lessons">
            <ul className="space-y-4">
              {p.lessons.map((l) => (
                <li key={l} className="max-w-[62ch] text-body-lg text-fg-2">
                  {l}
                </li>
              ))}
            </ul>
          </Block>
        )}

        {url && (
          <Block title="Live project" id="s-live">
            <ButtonLink href={url} external variant="primary">
              Open {hostname(url)}
            </ButtonLink>
          </Block>
        )}

        {!p.description && !p.tagline && (
          <p className="border-t border-line py-14 text-body-lg text-fg-2">Présentation de {p.name} en cours de rédaction.</p>
        )}

        <nav aria-label="Projet suivant" className="border-t border-line py-14 md:py-20">
          <Link href={`/projects/${next.slug}`} className="group inline-flex flex-col">
            <span className="text-small text-fg-3">Projet suivant</span>
            <span className="mt-2 text-h1 text-fg transition-colors group-hover:text-brass-hi">{next.name}</span>
          </Link>
        </nav>
      </Container>
    </article>
  );
}
