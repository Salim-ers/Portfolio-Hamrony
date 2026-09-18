import { journey } from "@/data/it";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Le parcours en trois temps : robotique, opérations, reconversion IT.
 *
 * Narration visuelle plutôt que texte : un grand numéro, une période, un
 * titre, une ligne. Les dates exactes et le détail restent sur /systemes.
 */
export function Journey() {
  return (
    <Section id="parcours" tone="paper-2">
      <SectionHead
        index="05"
        eyebrow="Parcours"
        title="Trois étapes, une même façon de travailler."
        lede={<p>De la robotique à l&apos;infrastructure, en passant par cinq ans d&apos;opérations sous contrainte.</p>}
      />

      <ol className="focus-group mt-20">
        {journey.map((step, i) => (
          <Reveal
            key={step.id}
            as="li"
            effect="slide"
            from="-28px"
            delay={i * 110}
            className="focus-item grid gap-x-12 gap-y-4 border-t border-line py-10 md:grid-cols-12 md:py-14"
          >
            <div className="md:col-span-2">
              <p className="text-display leading-none text-line-2">{step.n}</p>
            </div>

            <div className="md:col-span-3">
              <p className="font-mono text-tech uppercase text-accent-ink">{step.period}</p>
              <h3 className="mt-3 text-h1 text-ink">{step.title}</h3>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <p className="text-h3 text-ink-2">{step.org}</p>
              <p className="mt-3 max-w-[54ch] text-body-lg text-ink-2">{step.line}</p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1.5">
                {step.tags.map((t) => (
                  <li key={t} className="bracket font-mono text-tech uppercase text-ink-3">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
