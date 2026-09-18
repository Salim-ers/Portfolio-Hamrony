import Link from "next/link";
import { profile, company, contact } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { realValue } from "@/lib/utils";
import { HarmonyMark } from "@/components/brand/HarmonyMark";

const LINKS = [
  { href: "/creation", label: "Réalisations" },
  { href: "/systemes", label: "Parcours IT" },
  { href: "/formation", label: "Projets de formation" },
  { href: "/systemes#homelab", label: "Home lab" },
];

export function Footer() {
  const github = realValue(contact.github);
  const linkedin = realValue(contact.linkedin);
  const cv = realValue(contact.cv);

  return (
    <footer data-surface="dark" className="bg-paper py-16">
      <Container>
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <HarmonyMark decorative strokeWidth={22} className="h-10 w-auto text-accent" />
            <p className="mt-6 text-h3 text-ink">{profile.name}</p>
            <p className="mt-1.5 max-w-[34ch] text-body text-ink-2">
              {profile.role} · {profile.secondRole}
            </p>
          </div>

          <nav aria-label="Pied de page" className="md:col-span-3">
            <p className="font-mono text-tech uppercase text-ink-3">Explorer</p>
            <ul className="mt-4 space-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline text-body text-ink-2 hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="font-mono text-tech uppercase text-ink-3">Contact</p>
            <ul className="mt-4 space-y-2 text-body text-ink-2">
              <li>
                <a className="link-underline hover:text-ink" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </li>
              <li>
                <a className="link-underline hover:text-ink" href={contact.phoneHref}>
                  {contact.phoneDisplay}
                </a>
              </li>
              {cv && (
                <li>
                  <a className="link-underline hover:text-ink" href={cv} target="_blank" rel="noopener noreferrer">
                    Consulter mon CV
                  </a>
                </li>
              )}
            </ul>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-body text-ink-2">
              {linkedin && (
                <li>
                  <a className="link-underline hover:text-ink" href={linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
              )}
              {github && (
                <li>
                  <a className="link-underline hover:text-ink" href={github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 font-mono text-tech uppercase text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>
            {company.name} · SIREN {company.siren}
          </p>
        </div>
      </Container>
    </footer>
  );
}
