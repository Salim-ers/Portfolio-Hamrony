import type { Feature } from "@/data/projects";

/** Périmètre d'un produit : modules métier en séquence + modules transverses. */
export function ModuleFlow({ sequence, transversal, accent }: { sequence: Feature[]; transversal: Feature[]; accent: string }) {
  return (
    <figure className="rounded-md border border-line p-5 md:p-7">
      <figcaption className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-label text-fg">Périmètre fonctionnel</span>
        <span className="text-small text-fg-3">État d&apos;avancement par module à préciser</span>
      </figcaption>
      <ol className="relative grid gap-0 md:grid-cols-6">
        <span aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-line-strong md:left-0 md:top-[7px] md:h-px md:w-full" />
        {sequence.map((f, i) => (
          <li key={f.label} className="relative flex items-center gap-4 py-2.5 md:flex-col md:items-start md:gap-3 md:py-0 md:pr-3">
            <span aria-hidden className="relative z-10 size-[15px] shrink-0 rounded-full border bg-ink-0" style={{ borderColor: i === 0 ? accent : "var(--color-line-strong)" }}>
              <span className="absolute inset-[4px] rounded-full" style={{ background: accent, opacity: i === 0 ? 1 : 0.35 }} />
            </span>
            <span className="text-small text-fg">{f.label}</span>
          </li>
        ))}
      </ol>
      {transversal.length > 0 && (
        <div className="mt-6 grid gap-3 border-t border-dashed border-line-strong pt-4 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-6">
          <span className="text-label text-fg-3">Transverse</span>
          <ul className="flex flex-wrap gap-x-6 gap-y-1 text-small text-fg-2">
            {transversal.map((f) => (
              <li key={f.label}>{f.label}</li>
            ))}
          </ul>
        </div>
      )}
    </figure>
  );
}
