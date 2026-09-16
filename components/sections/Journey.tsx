import { experience, transition } from "@/data/experience";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";
import { isPlaceholder } from "@/lib/utils";

export function Journey() {
  const job = experience[0];
  const rows = job.transferable.length;
  const ROW = 64; // hauteur d'une ligne (px) sur desktop

  return (
    <section id="journey" data-nav="journey" aria-labelledby="journey-title" className="border-t border-line bg-ink-1/30 py-24 md:py-36">
      <Container>
        <h2 id="journey-title" className="max-w-[18ch] text-h1 text-fg">
          Same discipline, new systems.
        </h2>
        <p className="mt-6 max-w-[52ch] text-body-lg text-fg-2">
          Six années dans un environnement opérationnel exigeant, puis le passage vers l&apos;informatique. Ce qui a été appris là-bas sert encore aujourd&apos;hui.
        </p>

        <InView className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_120px_minmax(0,0.9fr)] lg:gap-0">
          {/* Avant */}
          <div className="lg:pr-10">
            <p className="font-mono text-tech text-fg-3">
              {job.start} → {job.end}
            </p>
            <p className="mt-3 text-h1 text-fg">{job.company}</p>
            {!isPlaceholder(job.role) && <p className="mt-2 text-body text-fg-2">{job.role}</p>}
            <p className="mt-5 max-w-[36ch] text-body text-fg-2">{job.summary}</p>
          </div>

          {/* Acquis transférables */}
          <div>
            <p className="mb-3 text-label text-fg-3">Ce qui se transfère</p>
            <ul className="border-t border-line">
              {job.transferable.map((t) => (
                <li key={t.label} className="flex flex-col justify-center border-b border-line py-3 lg:h-16 lg:py-0">
                  <span className="text-body text-fg">{t.label}</span>
                  <span className="text-small text-fg-3">{t.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Convergence */}
          <div aria-hidden className="relative hidden lg:block" style={{ height: rows * ROW + 1, marginTop: 30 }}>
            <svg viewBox={`0 0 120 ${rows * ROW}`} className="absolute inset-0 size-full" fill="none" preserveAspectRatio="none">
              {job.transferable.map((t, i) => {
                const y = ROW / 2 + i * ROW;
                const cy = (rows * ROW) / 2;
                return <path key={t.label} d={`M0 ${y} C60 ${y}, 60 ${cy}, 120 ${cy}`} stroke="var(--color-line-strong)" pathLength={1} className="draw-when-visible" style={{ ["--delay" as string]: `${i * 80}ms` }} />;
              })}
              <path d={`M0 ${ROW / 2 + 2 * ROW} C60 ${ROW / 2 + 2 * ROW}, 60 ${(rows * ROW) / 2}, 120 ${(rows * ROW) / 2}`} stroke="var(--color-brass)" pathLength={1} className="flow" style={{ ["--flow-duration" as string]: "2600ms" }} />
            </svg>
          </div>

          {/* Après */}
          <div className="flex flex-col justify-center lg:pl-8">
            <p className="mb-3 text-label text-fg-3">Aujourd&apos;hui</p>
            <ul className="space-y-1">
              {transition.map((t, i) => (
                <li key={t} className="text-h2 text-fg" style={{ opacity: 1 - i * 0.12 }}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </InView>
      </Container>
    </section>
  );
}
