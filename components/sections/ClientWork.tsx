import { clientProjects, type ClientProject } from "@/data/clientProjects";
import { Container } from "@/components/ui/Container";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ButtonLink } from "@/components/ui/Button";
import { SiteVisual } from "@/components/projects/SiteVisual";
import { resolveShot } from "@/lib/media";
import { cn, hostname, realValue } from "@/lib/utils";

const base = (c: ClientProject) => `/clients/${c.slug}/home`;
const isShowable = (c: ClientProject) => Boolean(resolveShot(c.screenshot.src, base(c)) || (realValue(c.url) && c.livePreview));

function Site({ c, large, className }: { c: ClientProject; large?: boolean; className?: string }) {
  const url = realValue(c.url);
  return (
    <article className={className}>
      <BrowserFrame address={url ? hostname(url) : null}>
        <SiteVisual
          src={c.screenshot.src}
          alt={c.screenshot.alt}
          localBase={base(c)}
          url={c.url}
          live={c.livePreview}
          title={c.name}
          className={large ? "aspect-[16/10] lg:aspect-[16/9]" : "aspect-[16/10]"}
          sizes={large ? "(min-width: 1024px) 1200px, 100vw" : "(min-width: 768px) 50vw, 100vw"}
        />
      </BrowserFrame>
      <div className={cn("mt-5 flex flex-wrap justify-between gap-x-8 gap-y-4", large ? "items-start" : "items-end")}>
        <div className="min-w-0">
          <h3 className={large ? "text-h2 text-fg" : "text-h3 text-fg"}>{c.name}</h3>
          <p className="mt-1 text-small text-fg-3">
            {[c.sector, c.location].filter(Boolean).join(", ")}
            {c.type && <span className="text-fg-2">. {c.type}</span>}
          </p>
          {large && c.scope && c.scope.length > 0 && (
            <ul className="mt-4 flex max-w-[64ch] flex-wrap gap-x-5 gap-y-1 text-small text-fg-2">
              {c.scope.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          )}
        </div>
        {url && (
          <ButtonLink href={url} external>
            View project
          </ButtonLink>
        )}
      </div>
    </article>
  );
}

export function ClientWork() {
  const shown = clientProjects.filter(isShowable);
  const pending = clientProjects.filter((c) => !isShowable(c));
  const [feature, ...rest] = shown;

  return (
    <section id="client-work" data-nav="harmony" aria-labelledby="client-title" className="border-t border-line py-24 md:py-36">
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 id="client-title" className="max-w-[18ch] text-h1 text-fg lg:col-span-7">
            Client work by Harmony Solutions.
          </h2>
          <p className="max-w-[46ch] text-body-lg text-fg-2 lg:col-span-5">
            Des sites pour des commerces et services de proximité, conçus et développés par Harmony Solutions. Les aperçus ci-dessous sont les sites réels, en ligne.
          </p>
        </div>

        {feature && <Site c={feature} large className="mt-16" />}

        {rest.length > 0 && (
          <div className="mt-20 grid gap-16 md:grid-cols-12 md:gap-8">
            {rest.map((c, i) => (
              <Site key={c.slug} c={c} className={i % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-24"} />
            ))}
          </div>
        )}

        {pending.length > 0 && (
          <div className="mt-20 border-t border-line pt-8 md:mt-28">
            <h3 className="text-h3 text-fg">Mise en ligne à venir</h3>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {pending.map((c) => (
                <li key={c.slug} className="grid gap-1 py-4 sm:grid-cols-12 sm:items-baseline sm:gap-6">
                  <span className="text-body text-fg sm:col-span-5">{c.name}</span>
                  <span className="text-small text-fg-3 sm:col-span-7">{[c.sector, c.location].filter(Boolean).join(", ")}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
