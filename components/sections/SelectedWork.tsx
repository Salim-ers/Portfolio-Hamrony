import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featured, type Featured } from "@/data/featured";
import { getProject, type Project } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Shot } from "@/components/ui/Shot";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { hostname, realValue } from "@/lib/utils";

function Eyebrow({ type, stack }: { type: string; stack: string[] }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-tech uppercase tracking-[0.16em] text-ink-3">
      <li className="text-accent">{type}</li>
      {stack.map((s) => (
        <li key={s} className="before:mr-4 before:text-line-2 before:content-['/']">
          {s}
        </li>
      ))}
    </ul>
  );
}

function Discover({ p }: { p: Project }) {
  return (
    <Link
      href={`/projets/${p.slug}`}
      className="group inline-flex items-center gap-2.5 text-label text-accent transition-colors hover:text-accent-hi"
    >
      Découvrir {p.name}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.75} />
    </Link>
  );
}

/* 01 — Composition pleine largeur, nom en très grand, capture réelle. */
function FullBleed({ f, p }: { f: Featured; p: Project }) {
  const url = realValue(p.url);
  return (
    <Reveal as="article" className="border-t border-line-2 pt-12 md:pt-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow type={f.type} stack={f.stack} />
            <h3 className="mt-6 text-mega text-ink">{p.name}</h3>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p className="max-w-[40ch] text-body-lg text-ink-2">{f.line}</p>
            <div className="mt-7">
              <Discover p={p} />
            </div>
          </div>
        </div>
      </Container>
      <div className="mt-12 md:mt-16">
        <Container>
          <BrowserFrame address={url ? hostname(url) : null}>
            <Shot
              base={`/projects/${p.slug}/home`}
              alt={`Interface de ${p.name}`}
              name={p.name}
              meta={f.type}
              accent={p.accent}
              className="aspect-[16/10] max-sm:aspect-[4/5]"
              sizes="(min-width: 1320px) 1230px, 100vw"
            />
          </BrowserFrame>
        </Container>
      </div>
    </Reveal>
  );
}

/* 02 — Split 50/50, texte à gauche, deux plans superposés à droite. */
function Split({ f, p }: { f: Featured; p: Project }) {
  const steps = p.workflow ?? [];
  return (
    <Reveal as="article" className="border-t border-line-2 pt-12 md:pt-16">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow type={f.type} stack={f.stack} />
            <h3 className="mt-6 text-h1 text-ink">{p.name}</h3>
            <p className="mt-6 max-w-[42ch] text-body-lg text-ink-2">{f.line}</p>
            <div className="mt-8">
              <Discover p={p} />
            </div>
          </div>

          <div className="relative pb-10 pr-6 sm:pb-14 sm:pr-14">
            <Shot
              base={`/projects/${p.slug}/home`}
              alt={`Interface de ${p.name}`}
              name={p.name}
              meta={f.type}
              accent={p.accent}
              align="start"
              className="aspect-[4/3] border border-line shadow-[0_30px_70px_-40px_rgba(17,19,24,0.45)]"
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            {steps.length > 0 && (
              <div className="absolute bottom-0 right-0 w-[58%] max-w-[300px] border border-line bg-paper-3 p-5 shadow-[0_20px_50px_-30px_rgba(17,19,24,0.5)]">
                <p className="font-mono text-tech uppercase tracking-[0.16em] text-ink-3">Le parcours d&apos;une séance</p>
                <ol className="mt-4 space-y-2">
                  {steps.slice(0, 5).map((s, i) => (
                    <li key={s} className="flex items-baseline gap-3 text-small text-ink">
                      <span className="font-mono text-tech text-accent">{String(i + 1).padStart(2, "0")}</span>
                      {s}
                    </li>
                  ))}
                  {steps.length > 5 && <li className="pl-8 text-small text-ink-3">+ {steps.length - 5} étapes</li>}
                </ol>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Reveal>
  );
}

/* 03 — Rupture : bande marine. */
function Navy({ f, p }: { f: Featured; p: Project }) {
  return (
    <article className="on-navy my-16 py-20 md:my-24 md:py-28">
      <Container>
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <Eyebrow type={f.type} stack={f.stack} />
              <h3 className="mt-6 text-h1">{p.name}</h3>
              <p className="mt-6 max-w-[42ch] text-body-lg text-ink-2">{f.line}</p>
              <div className="mt-8">
                <Discover p={p} />
              </div>
            </div>
            {f.points && (
              <ul className="lg:col-span-5 lg:col-start-8">
                {f.points.map((pt, i) => (
                  <li key={pt} className="flex items-baseline gap-5 border-b border-line py-5 first:border-t">
                    <span className="font-mono text-tech text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-body-lg text-ink">{pt}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Reveal>
      </Container>
    </article>
  );
}

/* 04 — Très lumineux : la capture respire au centre. */
function Immersive({ f, p }: { f: Featured; p: Project }) {
  const url = realValue(p.url);
  return (
    <Reveal as="article" className="border-t border-line-2 pt-12 md:pt-16">
      <Container>
        <div className="max-w-[52rem]">
          <Eyebrow type={f.type} stack={f.stack} />
          <h3 className="mt-6 text-h1 text-ink">{p.name}</h3>
          <p className="mt-6 max-w-[48ch] text-body-lg text-ink-2">{f.line}</p>
        </div>
        <div className="mt-12 md:mt-16">
          <BrowserFrame address={url ? hostname(url) : null}>
            <Shot
              base={`/projects/${p.slug}/home`}
              alt={`Interface de ${p.name}`}
              name={p.name}
              meta={f.type}
              accent={p.accent}
              className="aspect-[16/9] max-sm:aspect-[4/5]"
              sizes="(min-width: 1320px) 1230px, 100vw"
            />
          </BrowserFrame>
        </div>
        <div className="mt-8">
          <Discover p={p} />
        </div>
      </Container>
    </Reveal>
  );
}

export function SelectedWork() {
  const items = featured
    .map((f) => ({ f, p: getProject(f.slug) }))
    .filter((x): x is { f: Featured; p: Project } => Boolean(x.p));

  return (
    <section id="projets" data-nav="projets" className="bg-paper py-24 md:py-32 lg:py-40">
      <Container>
        <SectionHead
          index="03"
          title="Projets sélectionnés"
          lede="Produits, plateformes et expériences numériques que j'ai imaginés ou développés."
          align="split"
        />
      </Container>

      <div className="mt-20 space-y-16 md:mt-28 md:space-y-24">
        {items.map(({ f, p }) => {
          if (f.layout === "full") return <FullBleed key={f.slug} f={f} p={p} />;
          if (f.layout === "split") return <Split key={f.slug} f={f} p={p} />;
          if (f.layout === "navy") return <Navy key={f.slug} f={f} p={p} />;
          return <Immersive key={f.slug} f={f} p={p} />;
        })}
      </div>

      <Container className="mt-20 md:mt-28">
        <Link
          href="/projets"
          className="group flex items-baseline justify-between gap-6 border-t border-ink py-8 transition-colors hover:text-accent"
        >
          <span className="text-h2 text-ink transition-colors group-hover:text-accent">Voir tous mes produits</span>
          <ArrowRight
            aria-hidden
            className="size-7 shrink-0 self-center text-ink transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent"
            strokeWidth={1.5}
          />
        </Link>
      </Container>
    </section>
  );
}
