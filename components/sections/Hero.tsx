import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { InView } from "@/components/ui/InView";
import { HeroComposition } from "@/components/hero/HeroComposition";

export function Hero() {
  return (
    <section id="accueil" data-nav="accueil" className="relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40 lg:pb-32 lg:pt-44">
      {/* Filets de grille, très en retrait */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex justify-center">
        <div className="grid-rule h-full w-full max-w-[1320px] opacity-45" />
      </div>

      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <p className="flex items-center gap-4 font-mono text-tech uppercase tracking-[0.2em] text-ink-3">
              <span aria-hidden className="h-px w-10 bg-accent" />
              Portfolio — {profile.country}
            </p>

            <h1 className="mt-8 text-display text-ink">
              Salim
              <br />
              El Rhalmani
            </h1>

            <div className="mt-8 space-y-1.5 text-h3 font-normal text-ink">
              <p>Administrateur systèmes &amp; réseaux</p>
              <p className="text-ink-2">Créateur de produits numériques</p>
            </div>

            <p className="mt-8 max-w-[46ch] text-body-lg text-ink-2">
              À travers <span className="text-ink">Harmony Solutions</span>, je conçois également des sites web,
              applications et produits SaaS.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-3">
              <ButtonLink href="#projets" variant="primary">
                Découvrir mes projets
              </ButtonLink>
              <ButtonLink href="#expertises">Mon parcours IT</ButtonLink>
            </div>

            <p className="mt-8">
              <a href="#harmony" className="link-underline pb-0.5 text-label text-ink-2 hover:text-accent">
                Harmony&nbsp;Solutions
              </a>
            </p>
          </div>

          <InView className="lg:col-span-5 lg:col-start-8">
            <HeroComposition className="h-auto w-full max-w-[520px] max-lg:mx-auto" />
          </InView>
        </div>
      </Container>

      <Container className="relative mt-20 md:mt-24">
        <a
          href="#profil"
          className="group inline-flex items-center gap-3 font-mono text-tech uppercase tracking-[0.18em] text-ink-3 transition-colors hover:text-ink"
        >
          <ArrowDown aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={1.75} />
          Un profil, trois univers
        </a>
      </Container>
    </section>
  );
}
