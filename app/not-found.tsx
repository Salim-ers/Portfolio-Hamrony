import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[80dvh] flex-col justify-center pt-16">
      <p className="font-mono text-tech text-fg-3">404</p>
      <h1 className="mt-3 text-h1 text-fg">Cette page n&apos;existe pas.</h1>
      <p className="mt-4 max-w-[44ch] text-body-lg text-fg-2">L&apos;adresse est peut-être incorrecte, ou le projet a changé de nom.</p>
      <div className="mt-8 flex gap-3">
        <ButtonLink href="/" variant="primary">
          Retour à l&apos;accueil
        </ButtonLink>
        <ButtonLink href="/#products">Index des produits</ButtonLink>
      </div>
    </Container>
  );
}
