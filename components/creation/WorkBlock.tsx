import { ArrowRight } from "lucide-react";
import { engagementLabel, type Work } from "@/data/works";
import { projectScreens, type Screen } from "@/lib/shots";
import { cn, hostname } from "@/lib/utils";
import { Shot } from "@/components/ui/Shot";
import { Reveal } from "@/components/ui/Reveal";
import { OpeningLink } from "@/components/creation/OpeningLink";

/**
 * Une réalisation dans la galerie.
 *
 * Chaque projet montre plusieurs écrans réels — page d'accueil, pages
 * internes, version mobile — et pas seulement son pli supérieur : c'est
 * le travail sur l'ensemble du site qui se voit.
 *
 * Cinq arrangements se relaient pour éviter l'effet catalogue. Aucune
 * interface n'est dessinée : si une capture manque, sa tuile disparaît et
 * la composition se resserre.
 */
export function WorkBlock({ work, index }: { work: Work; index: number }) {
  const href = `/creation/${work.slug}`;
  const screens = projectScreens(work.slug, work.name, work.screenLabels);

  const hero = screens.find((s) => s.kind === "home") ?? screens[0] ?? null;
  const phone = screens.find((s) => s.kind === "mobile") ?? null;
  const others = screens.filter((s) => s !== hero && s.kind !== "mobile");

  const address = work.url ? hostname(work.url) : null;
  const n = String(index + 1).padStart(2, "0");

  /* ---------------- blocs de texte ---------------- */

  const meta = (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-tech uppercase tracking-[0.16em] text-ink-3">
      <span className="text-accent-ink">{n}</span>
      <span aria-hidden className="h-px w-8 bg-line-2" />
      <span>{work.kind}</span>
      <span aria-hidden>·</span>
      <span>{work.sector}</span>
      {work.location && (
        <>
          <span aria-hidden>·</span>
          <span>{work.location}</span>
        </>
      )}
      <span aria-hidden>·</span>
      <span className="text-ink-2">{engagementLabel[work.engagement]}</span>
    </p>
  );

  const title = (
    <h3 className="mt-5 text-h1 text-ink">
      <OpeningLink href={href} ariaLabel={`${work.name} — voir l'étude de cas`}>
        {work.name}
      </OpeningLink>
    </h3>
  );

  const lead = <p className="mt-4 max-w-[46ch] text-lede text-ink-2">{work.lead}</p>;

  const cta = (
    <span className="mt-6 inline-flex items-center gap-2 text-label font-medium text-accent-ink">
      Voir l&apos;étude de cas
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-300 [transition-timing-function:var(--ease-out)] group-hover/work:translate-x-1"
        strokeWidth={1.75}
      />
    </span>
  );

  const heading = (
    <>
      {meta}
      {title}
      {lead}
      {cta}
    </>
  );

  // Les classes Tailwind doivent être écrites en toutes lettres : une
  // classe construite dynamiquement ne serait pas générée.
  const Big = ({ wide = false, delay = 0 }: { wide?: boolean; delay?: number }) =>
    hero ? (
      <Reveal effect="mask" delay={delay} className="overflow-hidden">
        <Shot
          shot={hero}
          frame="browser"
          address={address}
          crop="top"
          sizes="(max-width: 768px) 100vw, 1100px"
          className={wide ? "[&_img]:aspect-[16/9]" : "[&_img]:aspect-[16/10]"}
        />
      </Reveal>
    ) : null;

  const wrapper = (children: React.ReactNode) => (
    <article data-work-card={href} className="group/work focus-item relative border-t border-line pt-12 md:pt-16">
      {children}
    </article>
  );

  /* ---------------- 1. ouverture pleine largeur ---------------- */
  if (work.layout === "opening") {
    return wrapper(
      <>
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">{meta}{title}</div>
          <div className="md:col-span-5">{lead}{cta}</div>
        </div>
        <div className="mt-10">
          <Big wide />
        </div>
        <ScreenRow screens={others.slice(0, 3)} phone={phone} address={address} columns={3} className="mt-4" />
      </>
    );
  }

  /* ---------------- 2. colonne de texte, écrans à droite ---------------- */
  if (work.layout === "wide") {
    return wrapper(
      <div className="grid gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">{heading}</div>
        </div>
        <div className="md:col-span-8">
          <Big />
          <ScreenRow screens={others.slice(0, 2)} phone={phone} address={address} columns={2} className="mt-4" />
        </div>
      </div>
    );
  }

  /* ---------------- 3. bureau + mobile, puis pages internes ---------------- */
  if (work.layout === "duo") {
    return wrapper(
      <>
        <div className="max-w-[52rem]">{heading}</div>
        <div className="mt-10 grid items-end gap-4 md:grid-cols-12">
          <div className="md:col-span-9">
            <Big />
          </div>
          {phone && (
            <div className="md:col-span-3">
              <Reveal effect="mask" delay={140}>
                <Shot shot={phone} frame="device" crop="top" sizes="(max-width: 768px) 55vw, 260px" className="[&_img]:aspect-[9/16]" />
              </Reveal>
            </div>
          )}
        </div>
        <ScreenRow screens={others.slice(0, 3)} address={address} columns={3} className="mt-4" />
      </>
    );
  }

  /* ---------------- 4. mosaïque à gauche, texte à droite ---------------- */
  if (work.layout === "column") {
    return wrapper(
      <div className="grid gap-10 md:grid-cols-12 md:gap-10">
        <div className="md:order-2 md:col-span-4">
          <div className="md:sticky md:top-28">{heading}</div>
        </div>
        <div className="md:order-1 md:col-span-8">
          <Big />
          <ScreenRow screens={others.slice(0, 2)} phone={phone} address={address} columns={2} className="mt-4" />
        </div>
      </div>
    );
  }

  /* ---------------- 5. format court ---------------- */
  return wrapper(
    <>
      <div className="grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">{heading}</div>
        <div className="md:col-span-7">
          <Big />
        </div>
      </div>
      <ScreenRow screens={others.slice(0, 2)} phone={phone} address={address} columns={3} className="mt-4" />
    </>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Rangée d'écrans secondaires : pages internes, sections, et la version
 * mobile quand elle n'est pas déjà montrée ailleurs.
 */
function ScreenRow({
  screens,
  phone,
  address,
  columns,
  className,
}: {
  screens: Screen[];
  phone?: Screen | null;
  address: string | null;
  columns: 2 | 3;
  className?: string;
}) {
  const items = [...screens];
  if (!items.length && !phone) return null;

  return (
    <ul
      className={cn(
        "grid gap-4",
        columns === 3 ? "grid-cols-2 md:grid-cols-3" : "grid-cols-2",
        className
      )}
    >
      {items.map((s, i) => (
        <Reveal key={s.name} as="li" effect="mask" delay={i * 90} className="overflow-hidden">
          <Shot
            shot={s}
            frame="browser"
            address={address}
            crop="top"
            sizes="(max-width: 768px) 46vw, 360px"
            className="[&_img]:aspect-[4/3]"
          />
        </Reveal>
      ))}
      {phone && (
        <Reveal as="li" effect="mask" delay={items.length * 90} className="flex items-end justify-center">
          <Shot shot={phone} frame="device" crop="top" sizes="(max-width: 768px) 40vw, 180px" className="w-[62%] max-w-[180px] [&_img]:aspect-[9/16]" />
        </Reveal>
      )}
    </ul>
  );
}
