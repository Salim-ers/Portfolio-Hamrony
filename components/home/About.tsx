import { profile } from "@/data/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CornerRule } from "@/components/brand/Marks";

/**
 * Qui je suis — deux paragraphes courts, puis quatre repères.
 * Pas de cartes : de simples colonnes séparées par des filets, dans la
 * même construction que le monogramme.
 */
export function About() {
  return (
    <Section id="apropos" tone="paper-2">
      <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal effect="slide" from="-24px">
            <CornerRule className="mb-5" />
            <h2 className="text-display text-ink">
              À la croisée
              <br />
              de deux univers.
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal effect="rise" delay={120}>
            <p className="max-w-[52ch] text-lede text-ink-2">
              Je viens de la robotique et de l&apos;opérationnel. Je me suis formé à l&apos;administration systèmes,
              réseaux et sécurité, parce que c&apos;est l&apos;infrastructure qui m&apos;intéresse : ce qui tient
              debout, ce qui se répare, ce qui se documente.
            </p>
            <p className="mt-5 max-w-[52ch] text-lede text-ink-2">
              En parallèle, je conçois des produits numériques. J&apos;ai créé Harmony Solutions pour en faire des
              projets réels, mis en ligne, et pas seulement des idées.
            </p>
          </Reveal>
        </div>
      </div>

      <dl className="mt-16 grid gap-px border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {profile.facts.map((f, i) => (
          <Reveal key={f.label} effect="rise" delay={i * 80} className="border-b border-line pt-6 sm:border-b-0 sm:pb-6">
            <dt className="font-mono text-tech uppercase text-ink-3">{f.label}</dt>
            <dd className="mt-2.5 pb-6 text-h3 text-ink sm:pb-0">{f.value}</dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
