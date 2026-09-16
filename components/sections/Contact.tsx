import { socials } from "@/data/socials";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { realValue } from "@/lib/utils";

export function Contact() {
  const links = [
    { label: "LinkedIn", href: realValue(socials.linkedin) },
    { label: "GitHub", href: realValue(socials.github) },
  ].filter((l) => l.href);

  return (
    <section id="contact" data-nav="contact" className="bg-paper-2 py-28 md:py-40">
      <Container>
        <Reveal>
          <p className="flex items-center gap-4 font-mono text-tech uppercase tracking-[0.2em] text-ink-3">
            <span className="text-accent">07</span>
            <span aria-hidden className="h-px w-12 bg-line-2" />
            Contact
          </p>

          <h2 className="mt-10 text-display text-ink">Travaillons ensemble.</h2>

          <p className="mt-8 max-w-[46ch] text-lede text-ink-2">
            Recrutement, projet web, application ou besoin informatique : échangeons.
          </p>

          <div className="mt-14 grid gap-10 border-t border-line-2 pt-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <a
                href={`mailto:${socials.email}`}
                className="link-underline inline-block pb-1 text-h2 text-ink hover:text-accent"
              >
                {socials.email}
              </a>
              <p className="mt-4">
                <a href={socials.phoneHref} className="link-underline pb-0.5 text-h3 text-ink-2 hover:text-accent">
                  {socials.phoneDisplay}
                </a>
              </p>
            </div>

            <div className="flex flex-col items-start gap-8 lg:col-span-4 lg:col-start-9 lg:items-end">
              <ButtonLink href={`mailto:${socials.email}`} variant="primary">
                Me contacter
              </ButtonLink>
              {links.length > 0 && (
                <ul className="flex gap-6">
                  {links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline pb-0.5 text-label text-ink-2 hover:text-accent"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
