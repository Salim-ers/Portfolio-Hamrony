import { lab } from "@/data/it";
import { Container } from "@/components/ui/Container";
import { CornerRule, RuledBackground } from "@/components/brand/Marks";
import { LabArchitecture } from "@/components/systems/LabArchitecture";

/**
 * Le laboratoire — seconde section marine, et le point technique le plus
 * fort du portfolio. Une phrase, puis le schéma interactif : la
 * documentation détaillée reste sur /systemes.
 */
export function HomeLab() {
  return (
    <section id="homelab" data-surface="dark" className="relative overflow-hidden bg-paper py-28 md:py-36">
      <RuledBackground className="opacity-30" />

      <Container className="relative">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="mb-6 flex items-center gap-4 font-mono text-tech uppercase text-ink-3">
              <span className="text-accent">08</span>
              <span>Laboratoire</span>
            </p>
            <CornerRule className="mb-5" />
            <h2 className="text-display text-ink">Mon laboratoire.</h2>
          </div>
          <p className="text-lede text-ink-2 lg:col-span-4 lg:col-start-9 lg:pt-16">
            Un environnement personnel pour expérimenter, casser, comprendre et reconstruire des infrastructures.
          </p>
        </div>

        <p className="mt-10 max-w-[74ch] border-l-2 border-accent pl-5 text-small text-ink-3">{lab.disclosure}</p>

        <div className="mt-16">
          <LabArchitecture />
        </div>
      </Container>
    </section>
  );
}
