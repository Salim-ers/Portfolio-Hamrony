import { ArrowRight } from "lucide-react";
import { engagementLabel, type Work } from "@/data/works";
import { shot, firstShot } from "@/lib/shots";
import { cn, hostname } from "@/lib/utils";
import { Shot } from "@/components/ui/Shot";
import { Reveal } from "@/components/ui/Reveal";
import { OpeningLink } from "@/components/creation/OpeningLink";

/**
 * Une réalisation dans la galerie.
 *
 * Cinq compositions différentes se relaient pour éviter l'effet
 * catalogue : chaque projet occupe la page à sa manière. Quand aucune
 * capture n'existe, la composition bascule sur sa variante éditoriale
 * plutôt que d'afficher une fausse interface.
 */
export function WorkBlock({ work, index }: { work: Work; index: number }) {
  const href = `/creation/${work.slug}`;
  const cover = shot(work.slug, work.cover.name, work.cover.alt);
  const long = shot(work.slug, "full", `${work.name}, page complète`);
  const mobile = shot(work.slug, "mobile", `${work.name}, version mobile`);
  const n = String(index + 1).padStart(2, "0");

  const meta = (
    <Meta work={work} n={n} />
  );

  const title = (
    <h3 className="text-h1 text-ink">
      <OpeningLink href={href} ariaLabel={`${work.name} — voir l'étude de cas`}>
        {work.name}
      </OpeningLink>
    </h3>
  );

  const lead = <p className="mt-5 max-w-[46ch] text-lede text-ink-2">{work.lead}</p>;

  const more = (
    <span className="mt-7 inline-flex items-center gap-2 text-label font-medium text-accent-ink">
      Voir l&apos;étude de cas
      <ArrowRight
        aria-hidden
        className="size-4 transition-transform duration-300 [transition-timing-function:var(--ease-out)] group-hover/work:translate-x-1"
        strokeWidth={1.75}
      />
    </span>
  );

  const wrapper = (children: React.ReactNode) => (
    <article
      data-work-card={href}
      className="group/work focus-item relative border-t border-line pt-12 md:pt-16"
    >
      {children}
    </article>
  );

  /* ---------------- composition 1 — ouverture pleine largeur ---------------- */
  if (work.layout === "opening") {
    return wrapper(
      <>
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            {meta}
            <div className="mt-6">{title}</div>
          </div>
          <div className="md:col-span-5">{lead}{more}</div>
        </div>
        {cover ? (
          <Reveal effect="mask" className="mt-12 overflow-hidden">
            <Shot
              shot={cover}
              frame="browser"
              address={work.url ? hostname(work.url) : null}
              crop="top"
              sizes="(max-width: 768px) 100vw, 1220px"
              className="[&_img]:aspect-[16/9]"
            />
          </Reveal>
        ) : (
          <EditorialFallback work={work} />
        )}
      </>
    );
  }

  /* ---------------- composition 2 — colonne de texte + page longue ---------------- */
  if (work.layout === "wide") {
    const tall = long ?? cover;
    return wrapper(
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            {meta}
            <div className="mt-6">{title}</div>
            {lead}
            {more}
          </div>
        </div>
        <div className="md:col-span-8">
          {tall ? (
            <Reveal effect="mask" className="overflow-hidden rounded-md border border-line">
              <Shot shot={tall} crop="top" sizes="(max-width: 768px) 100vw, 780px" className="[&_img]:aspect-[4/5]" />
            </Reveal>
          ) : (
            <EditorialFallback work={work} />
          )}
        </div>
      </div>
    );
  }

  /* ---------------- composition 3 — bureau + mobile ---------------- */
  if (work.layout === "duo") {
    return wrapper(
      <>
        <div className="max-w-[52rem]">
          {meta}
          <div className="mt-6">{title}</div>
          {lead}
          {more}
        </div>
        <div className="mt-12 grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-8">
            {cover ? (
              <Reveal effect="mask" className="overflow-hidden">
                <Shot
                  shot={cover}
                  frame="browser"
                  address={work.url ? hostname(work.url) : null}
                  crop="top"
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="[&_img]:aspect-[16/10]"
                />
              </Reveal>
            ) : (
              <EditorialFallback work={work} />
            )}
          </div>
          {mobile && (
            <div className="md:col-span-3 md:col-start-10">
              <Reveal effect="mask" delay={140}>
                <Shot shot={mobile} frame="device" crop="top" sizes="(max-width: 768px) 55vw, 260px" className="[&_img]:aspect-[9/17]" />
              </Reveal>
            </div>
          )}
        </div>
      </>
    );
  }

  /* ---------------- composition 4 — texte étroit, visuel haut ---------------- */
  if (work.layout === "column") {
    const tall = long ?? cover;
    return wrapper(
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-8 md:order-2">
          {tall ? (
            <Reveal effect="mask" className="overflow-hidden rounded-md border border-line">
              <Shot shot={tall} crop="top" sizes="(max-width: 768px) 100vw, 780px" className="[&_img]:aspect-[16/11]" />
            </Reveal>
          ) : (
            <EditorialFallback work={work} />
          )}
        </div>
        <div className="md:col-span-4 md:order-1">
          {meta}
          <div className="mt-6">{title}</div>
          {lead}
          {more}
        </div>
      </div>
    );
  }

  /* ---------------- composition 5 — format court ---------------- */
  return wrapper(
    <div className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <div className="md:col-span-5">
        {meta}
        <div className="mt-6">
          <h3 className="text-h2 text-ink">
            <OpeningLink href={href} ariaLabel={`${work.name} — voir l'étude de cas`}>
              {work.name}
            </OpeningLink>
          </h3>
        </div>
        {lead}
        {more}
      </div>
      <div className="md:col-span-7">
        {cover ? (
          <Reveal effect="mask" className="overflow-hidden">
            <Shot
              shot={cover}
              frame="browser"
              address={work.url ? hostname(work.url) : null}
              crop="top"
              sizes="(max-width: 768px) 100vw, 640px"
              className="[&_img]:aspect-[16/10]"
            />
          </Reveal>
        ) : (
          <EditorialFallback work={work} />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Meta({ work, n }: { work: Work; n: string }) {
  return (
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
      <span className="text-ink-2">{work.status}</span>
      <span aria-hidden>·</span>
      <span className="text-accent-ink">{engagementLabel[work.engagement]}</span>
    </p>
  );
}

/**
 * Aucune capture disponible : on ne dessine pas d'interface.
 * Le bloc devient une colonne éditoriale qui décrit le périmètre réel.
 */
function EditorialFallback({ work }: { work: Work }) {
  const items = work.case.features.slice(0, 5);
  if (!items.length) return null;
  return (
    <div className="border-l border-line-2 pl-6">
      <p className="font-mono text-tech uppercase tracking-[0.16em] text-ink-3">Périmètre</p>
      <ul className="mt-4 space-y-2">
        {items.map((f) => (
          <li key={f.label} className="text-body-lg text-ink-2">
            {f.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Utilisé pour détecter une capture de couverture disponible côté page. */
export function coverFor(work: Work) {
  return firstShot(work.slug, [work.cover.name, "home", "full"], work.cover.alt);
}
