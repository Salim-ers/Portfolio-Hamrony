import { profile } from "@/data/profile";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SystemTopology, SystemTree } from "@/components/diagrams/SystemTopology";

export function Hero() {
  return (
    <section id="overview" data-nav="overview" aria-labelledby="hero-title" className="relative pt-16">
      <Container className="grid gap-12 pb-20 pt-14 md:pt-20 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-12 lg:items-center lg:gap-8 lg:pb-16 lg:pt-10">
        <div className="lg:col-span-5">
          <h1 id="hero-title" className="text-display text-fg">
            {profile.headline}
          </h1>
          <p className="mt-5 max-w-[22ch] text-h3 font-normal text-fg-2">{profile.subheadline}</p>

          <div className="mt-10 border-t border-line pt-6">
            <p className="text-body-lg text-fg">{profile.name}</p>
            <ul className="mt-2 space-y-0.5 text-small text-fg-2">
              {profile.roles.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <p className="mt-5 max-w-[46ch] text-body text-fg-2">{profile.intro}</p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#projects" variant="primary">
              Explore my work
            </ButtonLink>
            <ButtonLink href="#infrastructure">Infrastructure</ButtonLink>
            <ButtonLink href="#harmony" variant="quiet" className="h-11 px-2 link-underline">
              Harmony Solutions
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pl-6">
          <div className="hidden md:block">
            <SystemTopology />
          </div>
          <div className="rounded-md border border-line p-5 md:hidden">
            <SystemTree />
          </div>
        </div>
      </Container>
    </section>
  );
}
