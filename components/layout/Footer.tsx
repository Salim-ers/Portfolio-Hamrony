import Link from "next/link";
import { profile, company } from "@/data/profile";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper py-10">
      <Container className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-4 text-small text-ink-3">
        <p>
          <span className="text-ink-2">{profile.name}</span> — {company.name}, SIREN {company.siren}
        </p>
        <p className="flex items-baseline gap-6">
          <Link href="/projets" className="link-underline pb-0.5 hover:text-ink">
            Projets
          </Link>
          <span suppressHydrationWarning>© {new Date().getFullYear()}</span>
        </p>
      </Container>
    </footer>
  );
}
