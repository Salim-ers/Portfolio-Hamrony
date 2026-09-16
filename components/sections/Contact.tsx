import { socials } from "@/data/socials";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { CopyButton } from "@/components/ui/CopyButton";
import { realValue } from "@/lib/utils";

export function Contact() {
  const links = [
    { label: "LinkedIn", url: realValue(socials.linkedin) },
    { label: "GitHub", url: realValue(socials.github) },
    { label: "CV", url: realValue(socials.cv) },
  ].filter((l): l is { label: string; url: string } => Boolean(l.url));

  return (
    <section id="contact" data-nav="contact" aria-labelledby="contact-title" className="border-t border-line pb-20 pt-24 md:pb-28 md:pt-40">
      <Container>
        <h2 id="contact-title" className="max-w-[12ch] text-display text-fg">
          Let&apos;s build something useful.
        </h2>
        <p className="mt-8 max-w-[48ch] text-body-lg text-fg-2">
          Recrutement, site, application ou infrastructure : écrivez-moi.
        </p>

        <div className="mt-14 border-t border-line pt-8">
          <p className="text-label text-fg-3">Harmony Solutions</p>
          <a href={`mailto:${socials.email}`} className="link-underline mt-2 inline-block pb-1 text-[clamp(1.2rem,5.6vw,2.25rem)] font-medium leading-tight tracking-[-0.01em] text-fg transition-colors hover:text-brass-hi focus-visible:text-brass-hi">
            {socials.email.split("@")[0]}@<wbr />
            {socials.email.split("@")[1]}
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={`mailto:${socials.email}?subject=${encodeURIComponent("Prise de contact")}`} variant="primary">
              Start a conversation
            </ButtonLink>
            <CopyButton value={socials.email} />
            <a href={socials.phoneHref} className="press inline-flex h-11 items-center px-3 font-mono text-tech text-fg-2 transition-colors hover:text-fg focus-visible:text-fg max-sm:basis-full max-sm:px-0">
              {socials.phoneDisplay}
            </a>
          </div>
          {links.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.url} target="_blank" rel="noopener noreferrer" className="link-underline pb-0.5 text-body text-fg-2 hover:text-fg">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}
