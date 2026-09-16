import { ArrowRight } from "lucide-react";
import { universes } from "@/data/universes";
import { Section, SectionHead } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Trois compositions différentes plutôt que trois cartes identiques. */
const LAYOUT = [
  { num: "lg:col-span-2", body: "lg:col-span-5 lg:col-start-3", tags: "lg:col-span-4 lg:col-start-9" },
  { num: "lg:col-span-2 lg:col-start-3", body: "lg:col-span-5 lg:col-start-5", tags: "lg:col-span-3 lg:col-start-10" },
  { num: "lg:col-span-2", body: "lg:col-span-6 lg:col-start-4", tags: "lg:col-span-3 lg:col-start-10" },
];

export function Universes() {
  return (
    <Section id="profil" tone="paper-2">
      <SectionHead
        index="02"
        title={
          <>
            Un profil.
            <br />
            Trois univers.
          </>
        }
        lede="Les mêmes réflexes — méthode, structure, documentation — appliqués à trois terrains complémentaires."
        align="split"
      />

      <div className="mt-20 md:mt-28">
        {universes.map((u, i) => {
          const l = LAYOUT[i] ?? LAYOUT[0];
          return (
            <Reveal key={u.id} delay={i * 90}>
              <a
                href={u.href}
                className="group grid items-start gap-6 border-t border-line-2 py-12 transition-colors duration-300 hover:border-accent md:py-16 lg:grid-cols-12 lg:gap-8"
              >
                <p
                  className={cn(
                    "font-serif text-[clamp(3rem,7vw,6.5rem)] leading-[0.8] text-ink-3/55 transition-colors duration-300 group-hover:text-accent",
                    l.num
                  )}
                >
                  {u.index}
                </p>

                <div className={cn("max-w-[42ch]", l.body)}>
                  <h3 className="text-h2 text-ink">{u.title}</h3>
                  <p className="mt-5 text-body-lg text-ink-2">{u.line}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-label text-accent">
                    {u.cta}
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={1.75}
                    />
                  </span>
                </div>

                <ul className={cn("flex flex-wrap gap-x-5 gap-y-2 lg:pt-3", l.tags)}>
                  {u.keywords.map((k) => (
                    <li key={k} className="font-mono text-tech text-ink-3">
                      {k}
                    </li>
                  ))}
                </ul>
              </a>
            </Reveal>
          );
        })}
        <div className="border-t border-line-2" />
      </div>
    </Section>
  );
}
