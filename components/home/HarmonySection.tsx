import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { company } from "@/data/profile";
import { works } from "@/data/works";
import { firstShot } from "@/lib/shots";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Shot } from "@/components/ui/Shot";
import { ButtonLink } from "@/components/ui/Button";
import { CornerRule } from "@/components/brand/Marks";

/**
 * Harmony Solutions dans le portfolio : la dimension entrepreneuriale,
 * pas une vitrine commerciale. Pas de devis, pas d'offre, pas de process
 * client — cela appartiendra au futur site Harmony.
 *
 * Le logo réel est affiché sur sa plaque marine d'origine, comme un objet
 * de marque posé dans la page.
 */
const SHOWCASE = [
  { slug: "centrium", alt: "Centrium, plateforme de pilotage pour sociétés de conseil" },
  { slug: "aequitas", alt: "Aequitas, plateforme de facturation électronique" },
  { slug: "odyssea", alt: "Odyssea, composition de voyages sur mesure" },
];

export function HarmonySection() {
  const shots = SHOWCASE.map((s) => firstShot(s.slug, ["home"], s.alt)).filter((s) => s !== null);
  const entrepreneurial = works.filter((w) => w.engagement === "propre").length;

  return (
    <Section id="harmony">
      <div className="grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal effect="slide" from="-24px">
            {/* Le logo, sur son fond marine d'origine. */}
            <div className="w-fit bg-[#172a4a] p-7">
              <Image
                src="/brand/harmony-logo-source.png"
                alt="Logo Harmony Solutions"
                width={449}
                height={377}
                sizes="220px"
                className="h-auto w-[180px]"
              />
            </div>

            <CornerRule className="mt-10" />
            <h2 className="mt-5 text-display text-ink">
              Entreprendre.
              <br />
              Construire.
              <br />
              <span className="text-accent-ink">Expérimenter.</span>
            </h2>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal effect="rise" delay={120}>
            <p className="mb-6 flex items-center gap-4 font-mono text-tech uppercase text-ink-3">
              <span className="text-accent-ink">07</span>
              <span>{company.name}</span>
            </p>
            <p className="max-w-[48ch] text-lede text-ink-2">{company.line}</p>

            <ul className="mt-9 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {company.fields.map((f) => (
                <li key={f} className="bracket border-t border-line pt-3 text-h3 text-ink">
                  {f}
                </li>
              ))}
            </ul>

            <p className="mt-9 font-mono text-tech uppercase text-ink-3">
              {entrepreneurial} produits et vitrines conçus pour mon compte · SIREN {company.siren}
            </p>

            <ButtonLink href="/creation" className="mt-9">
              Voir mes créations
              <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
            </ButtonLink>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 grid gap-4 md:grid-cols-3">
        {shots.map((s, i) => (
          <Reveal key={s.src} effect="mask" delay={i * 110} className="overflow-hidden">
            <Shot shot={s} frame="browser" crop="top" sizes="(max-width: 768px) 100vw, 440px" className="[&_img]:aspect-[4/3]" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
