import { ArrowRight } from "lucide-react";
import { works } from "@/data/works";
import { projectScreens } from "@/lib/shots";
import { cn, hostname } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Shot } from "@/components/ui/Shot";
import { ButtonLink } from "@/components/ui/Button";
import { OpeningLink } from "@/components/creation/OpeningLink";

/**
 * Quatre projets, quatre compositions différentes.
 *
 * Chacun est présenté à sa manière — pleine largeur, colonne partagée,
 * cadre incliné, écrans multiples — pour que la page se lise comme une
 * sélection éditoriale et non comme une grille de cartes.
 *
 * Toutes les vues sont de vraies captures des sites en ligne.
 */
const SELECTION = ["centrium", "horse-ledger", "royale-auto-ecole", "aequitas"] as const;

export function FeaturedWork() {
  const selected = SELECTION.map((slug) => works.find((w) => w.slug === slug)).filter((w) => w !== undefined);

  return (
    <Section id="realisations" size="loose">
      <SectionHead
        index="04"
        eyebrow="Réalisations"
        title="Ce que je construis."
        lede={<p>Des produits et des sites en ligne. Chaque lien est ouvrable, chaque capture est réelle.</p>}
      />

      <div className="focus-group mt-20 flex flex-col gap-28 md:gap-36">
        {selected.map((work, i) => {
          const screens = projectScreens(work.slug, work.name, work.screenLabels);
          const hero = screens.find((s) => s.kind === "home") ?? screens[0] ?? null;
          const others = screens.filter((s) => s !== hero && s.kind !== "mobile").slice(0, 2);
          const phone = screens.find((s) => s.kind === "mobile") ?? null;
          const address = work.url ? hostname(work.url) : null;
          const href = `/creation/${work.slug}`;

          const head = (
            <>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-tech uppercase text-ink-3">
                <span className="text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                <span aria-hidden className="h-px w-8 bg-line-2" />
                <span>{work.kind}</span>
                <span aria-hidden>·</span>
                <span>{work.sector}</span>
              </p>
              <h3 className="mt-5 text-mega text-ink">
                <OpeningLink href={href} ariaLabel={`${work.name} — voir l'étude de cas`}>
                  {work.name}
                </OpeningLink>
              </h3>
              <p className="mt-5 max-w-[42ch] text-lede text-ink-2">{work.lead}</p>
              <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5">
                {work.case.stack.slice(0, 4).map((t) => (
                  <li key={t} className="font-mono text-tech uppercase text-ink-3">
                    {t}
                  </li>
                ))}
              </ul>
              <span className="mt-8 inline-flex items-center gap-2 text-label font-medium text-accent-ink">
                Voir l&apos;étude de cas
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 [transition-timing-function:var(--ease-out)] group-hover/work:translate-x-1.5"
                  strokeWidth={1.75}
                />
              </span>
            </>
          );

          return (
            <article
              key={work.slug}
              data-work-card={href}
              className="group/work focus-item relative"
            >
              {/* --- 01 — grande image, presque pleine largeur --- */}
              {i === 0 && (
                <>
                  <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12 lg:items-end">
                    <div className="lg:col-span-7">{head}</div>
                  </div>
                  {hero && (
                    <Reveal effect="mask" className="mt-12 overflow-hidden">
                      <Shot
                        shot={hero}
                        frame="browser"
                        address={address}
                        crop="top"
                        sizes="(max-width: 768px) 100vw, 1300px"
                        className="zoom-out [&_img]:aspect-[16/9]"
                      />
                    </Reveal>
                  )}
                </>
              )}

              {/* --- 02 — composition partagée --- */}
              {i === 1 && (
                <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-4">{head}</div>
                  <div className="lg:col-span-7 lg:col-start-6">
                    {hero && (
                      <Reveal effect="mask" className="overflow-hidden">
                        <Shot
                          shot={hero}
                          frame="browser"
                          address={address}
                          crop="top"
                          sizes="(max-width: 768px) 100vw, 820px"
                          className="[&_img]:aspect-[16/10]"
                        />
                      </Reveal>
                    )}
                    {others.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        {others.map((s, k) => (
                          <Reveal key={s.name} effect="mask" delay={k * 100} className="overflow-hidden">
                            <Shot shot={s} frame="browser" address={address} crop="top" sizes="400px" className="[&_img]:aspect-[4/3]" />
                          </Reveal>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* --- 03 — cadre légèrement incliné, bureau et mobile --- */}
              {i === 2 && (
                <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-7">
                    <div className="relative">
                      {hero && (
                        <Reveal
                          effect="mask"
                          className="overflow-hidden transition-transform duration-[700ms] [transform:perspective(1600px)_rotateY(3.5deg)_rotateX(1.5deg)] [transition-timing-function:var(--ease-out)] group-hover/work:[transform:perspective(1600px)_rotateY(0deg)_rotateX(0deg)]"
                        >
                          <Shot
                            shot={hero}
                            frame="browser"
                            address={address}
                            crop="top"
                            sizes="(max-width: 768px) 100vw, 820px"
                            className="[&_img]:aspect-[16/10]"
                          />
                        </Reveal>
                      )}
                      {phone && (
                        <Reveal effect="mask" delay={160} className="absolute -bottom-8 -right-4 w-[22%] max-w-[140px] lg:-right-10">
                          <Shot shot={phone} frame="device" crop="top" sizes="140px" className="[&_img]:aspect-[9/16]" />
                        </Reveal>
                      )}
                    </div>
                  </div>
                  <div className="lg:col-span-4 lg:col-start-9">{head}</div>
                </div>
              )}

              {/* --- 04 — écrans multiples --- */}
              {i === 3 && (
                <>
                  <div className="max-w-[52rem]">{head}</div>
                  <div className="mt-12 grid gap-4 md:grid-cols-12">
                    {hero && (
                      <Reveal effect="mask" className="overflow-hidden md:col-span-8">
                        <Shot
                          shot={hero}
                          frame="browser"
                          address={address}
                          crop="top"
                          sizes="(max-width: 768px) 100vw, 900px"
                          className="[&_img]:aspect-[16/10]"
                        />
                      </Reveal>
                    )}
                    {phone && (
                      <Reveal effect="mask" delay={120} className="md:col-span-3 md:col-start-10 md:self-end">
                        <Shot shot={phone} frame="device" crop="top" sizes="220px" className="[&_img]:aspect-[9/16]" />
                      </Reveal>
                    )}
                    {others.map((s, k) => (
                      <Reveal key={s.name} effect="mask" delay={200 + k * 100} className="overflow-hidden md:col-span-4">
                        <Shot shot={s} frame="browser" address={address} crop="top" sizes="420px" className="[&_img]:aspect-[4/3]" />
                      </Reveal>
                    ))}
                  </div>
                </>
              )}
            </article>
          );
        })}
      </div>

      <Container className="mt-24 px-0">
        <div className="rule-double mb-8" />
        <div className={cn("flex flex-wrap items-center justify-between gap-6")}>
          <p className="text-lede text-ink-2">{works.length} projets en ligne, tous consultables.</p>
          <ButtonLink href="/creation" variant="primary">
            Voir toutes mes réalisations
            <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
