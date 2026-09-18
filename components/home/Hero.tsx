import { ArrowDown, ArrowRight } from "lucide-react";
import { profile, contact } from "@/data/profile";
import { positioning } from "@/data/it";
import { realValue } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { HarmonyMark } from "@/components/brand/HarmonyMark";
import { RuledBackground } from "@/components/brand/Marks";

/**
 * Premier écran.
 *
 * Le nom devient l'élément graphique principal : posé en très grand, il
 * tient lieu de composition. Le monogramme Harmony l'accompagne en
 * filigrane à droite, recadré par le bord de l'écran comme un élément
 * d'architecture — c'est la géométrie du logo qui structure la page, pas
 * une image d'illustration.
 */
export function Hero() {
  const cv = realValue(contact.cv);

  return (
    <header className="relative overflow-hidden bg-paper pt-16">
      <RuledBackground className="opacity-40" />

      {/* Monogramme en filigrane, ancré à droite et volontairement recadré. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[12%] top-[8%] hidden w-[46%] select-none text-accent opacity-[0.07] lg:block"
      >
        <HarmonyMark decorative strokeWidth={14} className="h-auto w-full" />
      </div>

      <Container className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-14 md:py-20">
        {positioning.availability && (
          <p
            className="lift-in mb-8 inline-flex w-fit items-center gap-2.5 border border-line-2 px-3.5 py-1.5 font-mono text-tech uppercase text-ink-2"
            style={{ ["--delay" as string]: "40ms" }}
          >
            <span aria-hidden className="size-1.5 bg-accent" />
            {positioning.availability}
          </p>
        )}

        <h1 className="text-colossal text-ink">
          <span className="block">
            <span className="word-mask" style={{ ["--delay" as string]: "120ms" }}>
              <span>{profile.firstName}</span>
            </span>
          </span>
          <span className="block">
            <span className="word-mask" style={{ ["--delay" as string]: "240ms" }}>
              <span>{profile.lastName}</span>
            </span>
          </span>
        </h1>

        {/* Filet double : la construction du monogramme, à l'échelle de la page. */}
        <div
          className="lift-in mt-8 grid gap-x-12 gap-y-8 md:mt-10 lg:grid-cols-12"
          style={{ ["--delay" as string]: "520ms" }}
        >
          <div className="lg:col-span-5">
            <div className="rule-double mb-5" />
            <p className="text-h2 text-ink">{profile.role}</p>
            <p className="mt-1 text-h2 text-ink-3">{profile.secondRole}</p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div className="rule-double mb-5 opacity-0 lg:opacity-100" />
            <p className="max-w-[46ch] text-lede text-ink-2">{profile.lede}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3 md:mt-9">
              <ButtonLink href="#parcours" variant="primary">
                Découvrir mon parcours
                <ArrowDown aria-hidden className="size-4" strokeWidth={1.75} />
              </ButtonLink>
              <ButtonLink href="/creation">
                Voir mes réalisations
                <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
              </ButtonLink>
              {cv && (
                <ButtonLink href={cv} external variant="quiet" className="ml-1">
                  Consulter mon CV
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}
