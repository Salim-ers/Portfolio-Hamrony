import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/profile";
import { firstShot } from "@/lib/shots";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Shot } from "@/components/ui/Shot";
import { CornerRule } from "@/components/brand/Marks";
import { LabSchematic } from "@/components/systems/LabSchematic";

/**
 * Les deux pratiques — présentées seulement après la présentation
 * personnelle, et jamais comme deux petites cartes : deux blocs pleine
 * largeur, l'un en ivoire, l'autre en marine, qui portent chacun leur
 * propre preuve visuelle.
 */
const STRIP = [
  { slug: "centrium", alt: "Centrium, plateforme de pilotage pour sociétés de conseil" },
  { slug: "horse-ledger", alt: "Horse Ledger, gestion pour la filière équine" },
  { slug: "royale-auto-ecole", alt: "Site de Royale Auto-école" },
];

export function Universes() {
  const creation = profile.universes.creation;
  const systems = profile.universes.systems;
  const strip = STRIP.map((s) => firstShot(s.slug, ["home"], s.alt)).filter((s) => s !== null);

  return (
    <>
      <Section tone="paper" size="tight">
        <Reveal effect="rise" className="max-w-[24ch]">
          <CornerRule className="mb-5" />
          <h2 className="text-mega text-ink">
            Deux pratiques.
            <br />
            Une même logique :<br />
            <span className="text-accent-ink">construire.</span>
          </h2>
        </Reveal>
      </Section>

      {/* ---------- 01 · Création numérique ---------- */}
      <UniverseBlock
        index={creation.index}
        title={creation.title}
        line={creation.line}
        keywords={[...creation.keywords]}
        href={creation.href}
        cta={creation.cta}
      >
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {strip.map((s, i) => (
            <Reveal
              key={s.src}
              effect="mask"
              delay={i * 110}
              className={cn("overflow-hidden", i === 2 && "col-span-2 md:col-span-1")}
            >
              <Shot shot={s} frame="browser" crop="top" sizes="(max-width: 768px) 46vw, 30vw" className="[&_img]:aspect-[4/3]" />
            </Reveal>
          ))}
        </div>
      </UniverseBlock>

      {/* ---------- 02 · Systèmes & réseaux ---------- */}
      <UniverseBlock
        dark
        index={systems.index}
        title={systems.title}
        line={systems.line}
        keywords={[...systems.keywords]}
        href={systems.href}
        cta={systems.cta}
      >
        <div className="h-[260px] md:h-[340px]">
          <LabSchematic />
        </div>
      </UniverseBlock>
    </>
  );
}

function UniverseBlock({
  index,
  title,
  line,
  keywords,
  href,
  cta,
  children,
  dark,
}: {
  index: string;
  title: string;
  line: string;
  keywords: string[];
  href: string;
  cta: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      {...(dark ? { "data-surface": "dark" } : {})}
      className={cn("group/uni relative overflow-hidden py-20 md:py-28", dark ? "bg-paper" : "bg-paper-2")}
    >
      <Container>
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-tech uppercase text-accent-ink">{index}</p>
            <h3 className="mt-5 text-mega text-ink">
              <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                {title}
              </Link>
            </h3>
            <p className="mt-5 max-w-[38ch] text-lede text-ink-2">{line}</p>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {keywords.map((k) => (
                <li key={k} className="bracket font-mono text-tech uppercase text-ink-3">
                  {k}
                </li>
              ))}
            </ul>

            <span className="mt-10 inline-flex items-center gap-2 text-label font-medium text-accent-ink">
              {cta}
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 [transition-timing-function:var(--ease-out)] group-hover/uni:translate-x-1.5"
                strokeWidth={1.75}
              />
            </span>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">{children}</div>
        </div>
      </Container>
    </section>
  );
}
