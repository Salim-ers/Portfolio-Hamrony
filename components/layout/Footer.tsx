import Link from "next/link";
import { profile, company, contact } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { realValue } from "@/lib/utils";

/**
 * Pied de page commun. Le bloc « société » n'apparaît que côté création :
 * il n'a rien à faire dans un parcours de recrutement.
 */
export function Footer({ universe }: { universe: "creation" | "systems" }) {
  const github = realValue(contact.github);
  const linkedin = realValue(contact.linkedin);
  const other =
    universe === "creation"
      ? { href: "/systemes", label: "Systèmes & réseaux" }
      : { href: "/creation", label: "Web & applications" };

  return (
    <footer className="border-t border-line bg-paper py-14">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-h3 text-ink">{profile.name}</p>
            <p className="mt-2 max-w-[34ch] text-body text-ink-2">
              {universe === "creation"
                ? "Conception de sites, d'applications et de produits numériques."
                : "Administration systèmes, réseaux et support utilisateurs."}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="font-mono text-tech uppercase tracking-[0.18em] text-ink-3">Contact</p>
            <ul className="mt-4 space-y-2 text-body text-ink-2">
              <li>
                <a
                  className="link-underline hover:text-ink"
                  href={`mailto:${universe === "creation" ? contact.projectEmail : contact.jobEmail}`}
                >
                  {universe === "creation" ? contact.projectEmail : contact.jobEmail}
                </a>
              </li>
              <li>
                <a className="link-underline hover:text-ink" href={contact.phoneHref}>
                  {contact.phoneDisplay}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-tech uppercase tracking-[0.18em] text-ink-3">Ailleurs</p>
            <ul className="mt-4 space-y-2 text-body text-ink-2">
              {github && (
                <li>
                  <a className="link-underline hover:text-ink" href={github} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </li>
              )}
              {linkedin && (
                <li>
                  <a className="link-underline hover:text-ink" href={linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="font-mono text-tech uppercase tracking-[0.18em] text-ink-3">L&apos;autre pratique</p>
            <ul className="mt-4 space-y-2 text-body text-ink-2">
              <li>
                <Link className="link-underline hover:text-ink" href={other.href}>
                  {other.label}
                </Link>
              </li>
              <li>
                <Link className="link-underline hover:text-ink" href="/">
                  Entrée du site
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 font-mono text-tech text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          {universe === "creation" && (
            <p>
              {company.name} · SIREN {company.siren} · {company.address.postalCode} {company.address.city}
            </p>
          )}
        </div>
      </Container>
    </footer>
  );
}
