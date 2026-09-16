import { getProject, type Project } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { ScreenshotSlot } from "@/components/ui/ScreenshotSlot";
import { ProjectMeta } from "@/components/projects/ProjectMeta";
import { ModuleFlow } from "@/components/projects/ModuleFlow";
import { Workflow } from "@/components/projects/Workflow";
import { ScoreDemo } from "@/components/projects/ScoreDemo";
import { SiteVisual } from "@/components/projects/SiteVisual";
import { resolveShot } from "@/lib/media";
import { realValue, hostname } from "@/lib/utils";

function address(p: Project) {
  const url = realValue(p.url);
  return url ? hostname(url) : null;
}

export function SelectedWork() {
  const centrium = getProject("centrium")!;
  const lumely = getProject("lumely")!;
  const aequitas = getProject("aequitas")!;
  const skillora = getProject("skillora")!;
  const odyssea = getProject("odyssea")!;

  const [cDash, cDetailA, cDetailB] = centrium.screenshots;
  const [aDash, aDetail] = aequitas.screenshots;
  const lumelyMobile = resolveShot(lumely.screenshots[1]?.src ?? null, "/projects/lumely/mobile");
  const aequitasDetail = resolveShot(aDetail?.src ?? null, "/projects/aequitas/detail-1");
  const cDetails = [cDetailA, cDetailB]
    .map((d, i) => ({ ...d, src: resolveShot(d.src, `/projects/centrium/detail-${i + 1}`) }))
    .filter((d) => d.src);

  return (
    <section id="projects" data-nav="projects" aria-labelledby="work-title" className="border-t border-line py-24 md:py-36">
      <Container>
        <h2 id="work-title" className="max-w-[14ch] text-h1 text-fg">
          Built, not just imagined.
        </h2>
        <p className="mt-6 max-w-[52ch] text-body-lg text-fg-2">
          Des produits pensés de l&apos;interface jusqu&apos;aux données. Chaque fiche distingue ce qui existe de ce qui reste à construire.
        </p>
      </Container>

      {/* Centrium : pleine largeur, dashboard + zooms */}
      <article aria-label="Centrium" className="mt-20 md:mt-28">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4 lg:pt-6">
            <ProjectMeta project={centrium} />
          </div>
          <div className="relative lg:col-span-8">
            <BrowserFrame address={address(centrium)}>
              <SiteVisual
                src={cDash.src}
                alt={cDash.alt}
                localBase="/projects/centrium/home"
                url={centrium.url}
                live={centrium.livePreview}
                title={centrium.name}
                accent={centrium.accent}
              />
            </BrowserFrame>
            {cDetails.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4 lg:absolute lg:-bottom-16 lg:-left-16 lg:mt-0 lg:w-[58%]">
                {cDetails.map((d) => (
                  <ScreenshotSlot key={d.alt} shot={d} accent={centrium.accent} compact className="aspect-[4/3] rounded-md border border-line-strong" />
                ))}
              </div>
            )}
          </div>
        </Container>
        <Container className={cDetails.length > 0 ? "mt-12 lg:mt-32" : "mt-12 lg:mt-16"}>
          <ModuleFlow sequence={centrium.features.slice(0, 6)} transversal={centrium.features.slice(6)} accent={centrium.accent} />
        </Container>
      </article>

      {/* Lumely : 70 / 30 */}
      <article aria-label="Lumely" className="mt-28 md:mt-40">
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:order-2 lg:col-span-4 lg:col-start-9">
            <ProjectMeta project={lumely} size="md" />
          </div>
          <div className="lg:order-1 lg:col-span-8">
            <Workflow steps={lumely.workflow ?? []} accent={lumely.accent} />
            <div className={lumelyMobile ? "mt-4 grid grid-cols-[1fr_auto] gap-4" : "mt-4"}>
              <ScreenshotSlot shot={lumely.screenshots[0]} accent={lumely.accent} className="aspect-[16/9] rounded-md border border-line" localBase="/projects/lumely/home" />
              {lumelyMobile && (
                <div className="w-[clamp(84px,18vw,150px)] rounded-[18px] border border-line-strong p-1.5">
                  <ScreenshotSlot shot={{ src: lumelyMobile, alt: lumely.screenshots[1].alt }} compact className="aspect-[9/19.5] h-full rounded-[13px]" />
                </div>
              )}
            </div>
          </div>
        </Container>
      </article>

      {/* Aequitas : 50 / 50, fenêtres empilées */}
      <article aria-label="Aequitas" className="mt-28 md:mt-40">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <ProjectMeta project={aequitas} size="md" />
            <dl className="mt-10 grid grid-cols-2 gap-x-8 border-t border-line pt-6 sm:grid-cols-3">
              {aequitas.features.map((f) => (
                <div key={f.label} className="py-2">
                  <dt className="text-small text-fg">{f.label}</dt>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-small text-fg-3">Périmètre du produit, état d&apos;avancement à préciser.</p>
          </div>
          <div className={aequitasDetail ? "relative pb-10 lg:pb-16" : "relative"}>
            <BrowserFrame address={address(aequitas)}>
              <ScreenshotSlot shot={aDash} accent={aequitas.accent} className="aspect-[4/3]" localBase="/projects/aequitas/home" />
            </BrowserFrame>
            {aequitasDetail && (
              <div className="absolute -bottom-2 right-0 w-[46%] rounded-md border border-line-strong bg-ink-0 p-1.5 lg:-right-6">
                <ScreenshotSlot shot={{ src: aequitasDetail, alt: aDetail.alt }} compact className="aspect-[3/4] rounded-sm" />
              </div>
            )}
          </div>
        </Container>
      </article>

      {/* Odyssea : en-tête sur deux colonnes, site réel en large */}
      <article aria-label="Odyssea" className="mt-28 md:mt-40">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <ProjectMeta project={odyssea} size="md" />
            </div>
            <ul className="grid grid-cols-2 gap-x-8 border-t border-line pt-5 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
              {odyssea.features.slice(0, 6).map((f) => (
                <li key={f.label} className="py-2 text-small text-fg-2">
                  {f.label}
                </li>
              ))}
            </ul>
          </div>
          <BrowserFrame address={address(odyssea)} className="mt-12">
            <SiteVisual
              src={odyssea.screenshots[0]?.src ?? null}
              alt={odyssea.screenshots[0]?.alt ?? "Odyssea"}
              localBase="/projects/odyssea/home"
              url={odyssea.url}
              live={odyssea.livePreview}
              title={odyssea.name}
              accent={odyssea.accent}
              className="aspect-[16/10] lg:aspect-[2/1]"
              sizes="(min-width: 1024px) 1200px, 100vw"
            />
          </BrowserFrame>
        </Container>
      </article>

      {/* Skillora : bande horizontale avec démonstration */}
      <article aria-label="Skillora" className="mt-28 md:mt-40">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <ProjectMeta project={skillora} size="md" />
            </div>
          </div>
          <div className="mt-10">
            <ScoreDemo accent={skillora.accent} />
          </div>
        </Container>
      </article>
    </section>
  );
}
