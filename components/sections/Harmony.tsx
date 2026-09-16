import { company } from "@/data/profile";
import { socials } from "@/data/socials";
import { clientProjects } from "@/data/clientProjects";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { HarmonyMark } from "@/components/ui/HarmonyMark";
import { ButtonLink } from "@/components/ui/Button";
import { ClientGallery, type GalleryItem } from "@/components/sections/ClientGallery";
import { resolveShot } from "@/lib/media";
import { realValue } from "@/lib/utils";

const SERVICES = [
  { name: "Sites internet", text: "Sites vitrines pensés pour être trouvés, lus et contactés." },
  { name: "Applications web", text: "Outils sur mesure, accessibles depuis un navigateur." },
  { name: "SaaS & outils métier", text: "Plateformes complètes : comptes, données, facturation." },
  { name: "Support informatique", text: "Assistance, dépannage et suivi du parc." },
  { name: "Systèmes & réseaux", text: "Installation, sécurisation et documentation de l'infrastructure." },
];

export function Harmony() {
  const items: GalleryItem[] = clientProjects
    .map((c) => {
      const url = realValue(c.url);
      const src = resolveShot(c.screenshot.src, `/clients/${c.slug}/home`);
      if (!url || !src) return null;
      return {
        name: c.name,
        slug: c.slug,
        sector: c.sector,
        location: c.location ?? null,
        url,
        src,
        alt: c.screenshot.alt,
      };
    })
    .filter((x): x is GalleryItem => Boolean(x));

  return (
    <section id="harmony" data-nav="harmony" className="bg-paper-3">
      {/* Plaque de marque */}
      <div className="on-navy py-20 md:py-28">
        <Container>
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <HarmonyMark className="h-16 w-auto text-brass md:h-20" />
              <h2 className="mt-9 text-h1">Harmony Solutions</h2>
            </div>
            <p className="max-w-[40ch] text-lede text-ink-2 lg:col-span-5 lg:pb-3">
              Des solutions numériques conçues pour les professionnels.
            </p>
          </Reveal>
        </Container>
      </div>

      {/* Présentation éditoriale */}
      <Container className="py-24 md:py-32">
        <Reveal className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-lede text-ink">
              Harmony Solutions est mon activité dédiée à la création de solutions web et informatiques pour les
              entreprises, les indépendants et les commerces.
            </p>
            <p className="mt-6 font-mono text-tech uppercase tracking-[0.16em] text-ink-3">
              {company.activity} — {company.address.city}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href={`mailto:${socials.email}`} variant="primary">
                Échanger
              </ButtonLink>
              {realValue(socials.harmonyUrl) && (
                <ButtonLink href={socials.harmonyUrl} external>
                  Le site Harmony
                </ButtonLink>
              )}
            </div>
          </div>

          <ol className="lg:col-span-6 lg:col-start-7">
            {SERVICES.map((s, i) => (
              <li key={s.name} className="flex items-baseline gap-6 border-b border-line py-5 first:border-t">
                <span className="font-mono text-tech text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1">
                  <span className="block text-h3 text-ink">{s.name}</span>
                  <span className="mt-1 block text-small text-ink-2">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>

      {/* Réalisations */}
      {items.length > 0 && (
        <div className="bg-paper pb-24 pt-20 md:pb-32 md:pt-24">
          <Container>
            <Reveal>
              <ClientGallery items={items} />
            </Reveal>
          </Container>
        </div>
      )}
    </section>
  );
}
