import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[80dvh] flex-col justify-center pt-16">
      <p className="font-mono text-tech uppercase tracking-[0.18em] text-ink-3">404</p>
      <h1 className="mt-4 text-h1 text-ink">Cette page n&apos;existe pas.</h1>
      <p className="mt-5 max-w-[46ch] text-body-lg text-ink-2">
        L&apos;adresse est peut-être incorrecte, ou le projet ne figure plus dans la sélection. Les deux parcours du
        site restent accessibles ci-dessous.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href="/creation" variant="primary">
          Web & applications
        </ButtonLink>
        <ButtonLink href="/systemes">Systèmes & réseaux</ButtonLink>
        <ButtonLink href="/" variant="quiet">
          Entrée du site
        </ButtonLink>
      </div>
    </Container>
  );
}
