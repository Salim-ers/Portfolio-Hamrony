import { experience, progression } from "@/data/experience";
import { education } from "@/data/education";
import { Container } from "@/components/ui/Container";
import { SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { StackTabs } from "@/components/sections/StackTabs";

function Step({
  index,
  kicker,
  title,
  meta,
  children,
}: {
  index: string;
  kicker: string;
  title: string;
  meta?: string | null;
  children?: React.ReactNode;
}) {
  return (
    <Reveal as="article" className="grid gap-6 border-t border-line-2 py-12 md:py-16 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="font-serif text-[clamp(2.5rem,5vw,4.5rem)] leading-none text-ink-3/50">{index}</p>
        <p className="mt-5 font-mono text-tech uppercase tracking-[0.18em] text-accent">{kicker}</p>
      </div>
      <div className="lg:col-span-8">
        <h3 className="text-h2 text-ink">{title}</h3>
        {meta && <p className="mt-3 font-mono text-tech uppercase tracking-[0.16em] text-ink-3">{meta}</p>}
        {children}
      </div>
    </Reveal>
  );
}

/** Progression graphique : chaque étape se pose un cran plus haut. */
function Progression() {
  return (
    <Reveal className="mt-4">
      <p className="font-mono text-tech uppercase tracking-[0.18em] text-ink-3">Ce que j&apos;en fais aujourd&apos;hui</p>
      <ol className="scrollbar-none mt-10 flex items-end gap-0 overflow-x-auto pb-2">
        {progression.map((step, i) => (
          <li
            key={step}
            className="relative flex min-w-[9rem] flex-1 flex-col items-start"
            style={{ paddingBottom: `${(progression.length - 1 - i) * 18}px` }}
          >
            <span className="text-h3 text-ink">{step}</span>
            <span aria-hidden className="relative mt-4 h-px w-full bg-line-2">
              <span className="absolute -top-[3px] left-0 size-[7px] rounded-full bg-accent" />
            </span>
          </li>
        ))}
      </ol>
    </Reveal>
  );
}

export function Parcours() {
  const fedex = experience[0];
  const formation = education[0];

  return (
    <section id="parcours" data-nav="parcours" className="bg-paper-2 py-24 md:py-32 lg:py-40">
      <Container>
        <SectionHead
          index="05"
          title="Mon parcours"
          lede="Six ans dans un environnement opérationnel exigeant, puis une reconversion complète vers l'administration des systèmes et des réseaux."
          align="split"
        />

        <div className="mt-20 md:mt-28">
          {fedex && (
            <Step
              index="01"
              kicker="Expérience professionnelle"
              title={fedex.company}
              meta={`${fedex.start} — ${fedex.end}${fedex.role ? ` · ${fedex.role}` : ""}`}
            >
              <p className="mt-6 max-w-[54ch] text-body-lg text-ink-2">{fedex.summary}</p>
              <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
                {fedex.transferable.map((t) => (
                  <li key={t.label} className="border-b border-line py-3.5">
                    <p className="text-body text-ink">{t.label}</p>
                    <p className="mt-0.5 text-small text-ink-2">{t.text}</p>
                  </li>
                ))}
              </ul>
            </Step>
          )}

          {formation && (
            <Step index="02" kicker="Reconversion IT" title={formation.program} meta={formation.school}>
              <p className="mt-6 max-w-[54ch] text-body-lg text-ink-2">
                {formation.level}. Systèmes, réseaux, sécurité et infrastructure, travaillés en projets et en laboratoire.
              </p>
              <Progression />
            </Step>
          )}
          <div className="border-t border-line-2" />
        </div>

        <StackTabs />
      </Container>
    </section>
  );
}
