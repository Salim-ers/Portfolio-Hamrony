import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[80dvh] flex-col justify-center pt-[68px]">
      <p className="font-mono text-tech uppercase tracking-[0.18em] text-ink-3">404</p>
      <h1 className="mt-4 text-h1 text-ink">Cette page n&apos;existe pas.</h1>
      <p className="mt-5 max-w-[44ch] text-body-lg text-ink-2">
        L&apos;adresse est peut-être incorrecte, ou le projet a changé de nom.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="primary">
          Retour à l&apos;accueil
        </ButtonLink>
        <ButtonLink href="/projets">Voir mes produits</ButtonLink>
      </div>
    </Container>
  );
}
