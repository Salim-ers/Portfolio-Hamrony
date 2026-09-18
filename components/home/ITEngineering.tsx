"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { pillars, flagships, trainingProjects } from "@/data/it";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CornerRule } from "@/components/brand/Marks";

/**
 * Ingénierie IT — section marine, l'un des deux moments techniques du site.
 *
 * Trois piliers dépliables : on ne déverse pas cinquante technologies, on
 * en montre trois familles et le visiteur ouvre celle qui l'intéresse. Le
 * pilier ouvert reste un vrai bouton, donc atteignable au clavier, et les
 * listes sont rendues côté serveur : sans JavaScript, tout est lisible.
 */
export function ITEngineering() {
  const [open, setOpen] = useState<string>(pillars[0].id);

  return (
    <section id="ingenierie" data-surface="dark" className="relative overflow-hidden bg-paper py-28 md:py-36">
      <Container>
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-6 flex items-center gap-4 font-mono text-tech uppercase text-ink-3">
              <span className="text-accent">06</span>
              <span>Ingénierie IT</span>
            </p>
            <CornerRule className="mb-5" />
            <h2 className="text-display text-ink">
              Je ne fais pas que des sites.
              <br />
              Je conçois des infrastructures.
            </h2>
          </div>
          <p className="text-lede text-ink-2 lg:col-span-4 lg:col-start-9 lg:pt-16">
            Trois familles de compétences, pratiquées en formation et dans mon laboratoire.
          </p>
        </div>

        {/* ---------- Trois piliers dépliables ---------- */}
        <div className="mt-20 border-t border-line">
          {pillars.map((p, i) => {
            const active = open === p.id;
            return (
              <Reveal key={p.id} effect="rise" delay={i * 90} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(p.id)}
                    aria-expanded={active}
                    aria-controls={`pilier-${p.id}`}
                    className="press group/p flex w-full items-baseline gap-5 py-7 text-left md:gap-8"
                  >
                    <span className={cn("font-mono text-tech transition-colors", active ? "text-accent" : "text-ink-3")}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={cn("text-h1 transition-colors", active ? "text-ink" : "text-ink-3 group-hover/p:text-ink")}>
                      {p.name}
                    </span>
                    <span className="ml-auto hidden max-w-[32ch] text-right text-body text-ink-3 lg:block">{p.line}</span>
                  </button>
                </h3>

                <div id={`pilier-${p.id}`} hidden={!active} className="pb-9">
                  <ul className="flex flex-wrap gap-x-3 gap-y-3">
                    {p.items.map((item, k) => (
                      <li
                        key={item}
                        className="fade-up border border-line-2 px-3.5 py-2 font-mono text-tech uppercase text-ink-2"
                        style={{ ["--delay" as string]: `${k * 45}ms` }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-body text-ink-3 lg:hidden">{p.line}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* ---------- Formation : le chiffre, puis trois études ---------- */}
        <div className="mt-28 grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-colossal leading-none text-accent">{trainingProjects.length}</p>
            <p className="mt-4 text-h2 text-ink">projets professionnalisants</p>
            <p className="mt-4 max-w-[34ch] text-body-lg text-ink-2">
              Formation OpenClassrooms, titre RNCP de niveau 6. Trois d&apos;entre eux, en résumé.
            </p>
            <ButtonLink href="/formation" variant="accent" className="mt-8">
              Voir mes 13 projets de formation
              <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
            </ButtonLink>
          </div>

          <ul className="lg:col-span-7 lg:col-start-6">
            {flagships.map((f, i) => (
              <Reveal
                key={f.id}
                as="li"
                effect="slide"
                from="24px"
                delay={i * 100}
                className="border-t border-line py-7 last:border-b last:border-line"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-tech text-accent">{f.n}</span>
                  <h3 className="text-h2 text-ink">{f.title}</h3>
                </div>
                <p className="mt-3 max-w-[52ch] text-body-lg text-ink-2">{f.objective}</p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                  {f.tech.map((t) => (
                    <li key={t} className="font-mono text-tech uppercase text-ink-3">
                      {t}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
