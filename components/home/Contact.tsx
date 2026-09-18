import { contact, profile } from "@/data/profile";
import { positioning } from "@/data/it";
import { realValue } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CornerRule } from "@/components/brand/Marks";
import { HarmonyMark } from "@/components/brand/HarmonyMark";

/**
 * Contact — sobre et direct.
 *
 * Pas de formulaire : le message arrive dans ma boîte, sans intermédiaire
 * et sans fausse confirmation d'envoi. Pas de discours commercial non
 * plus : ce portfolio s'adresse d'abord à des recruteurs et des
 * interlocuteurs techniques.
 */
export function Contact() {
  const cv = realValue(contact.cv);
  const github = realValue(contact.github);
  const linkedin = realValue(contact.linkedin);

  return (
    <Section id="contact" size="loose" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[18%] -right-[8%] hidden w-[34%] select-none text-accent opacity-[0.06] lg:block"
      >
        <HarmonyMark decorative strokeWidth={14} className="h-auto w-full" />
      </div>

      <div className="relative grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal effect="slide" from="-24px">
            <p className="mb-6 flex items-center gap-4 font-mono text-tech uppercase text-ink-3">
              <span className="text-accent-ink">10</span>
              <span>Contact</span>
            </p>
            <CornerRule className="mb-5" />
            <h2 className="text-mega text-ink">
              Parlons-en.
            </h2>
            <p className="mt-6 max-w-[46ch] text-lede text-ink-2">
              Poste d&apos;administrateur systèmes et réseaux, technicien support N1/N2, ou simple échange
              technique : écrivez-moi directement.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${contact.email}`} variant="primary">
                {contact.email}
              </ButtonLink>
              <ButtonLink href={contact.phoneHref}>{contact.phoneDisplay}</ButtonLink>
              {cv && (
                <ButtonLink href={cv} external>
                  Consulter mon CV
                </ButtonLink>
              )}
            </div>

            <p className="mt-6 max-w-[50ch] text-small text-ink-3">
              Pas de formulaire : votre message arrive dans ma boîte, sans intermédiaire et sans fausse confirmation
              d&apos;envoi.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <Reveal effect="rise" delay={140}>
            <dl className="border-t border-line">
              <Row label="Poste visé" value={profile.role} />
              <Row label="Également" value="Technicien support N1 / N2" />
              <Row label="Localisation" value={positioning.location} />
              <Row label="Mobilité" value={positioning.mobility} />
              {positioning.availability && <Row label="Disponibilité" value={positioning.availability} />}
            </dl>

            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {linkedin && (
                <li>
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="link-underline text-body text-ink-2 hover:text-ink">
                    LinkedIn
                  </a>
                </li>
              )}
              {github && (
                <li>
                  <a href={github} target="_blank" rel="noopener noreferrer" className="link-underline text-body text-ink-2 hover:text-ink">
                    GitHub
                  </a>
                </li>
              )}
            </ul>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-3.5">
      <dt className="font-mono text-tech uppercase text-ink-3">{label}</dt>
      <dd className="text-body text-ink">{value}</dd>
    </div>
  );
}
