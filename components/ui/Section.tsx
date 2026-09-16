import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

/** Rythme vertical commun à toutes les grandes parties. */
export function Section({
  id,
  nav,
  navId,
  className,
  children,
  tone = "paper",
  full,
}: {
  id?: string;
  nav?: boolean;
  navId?: string;
  className?: string;
  children: React.ReactNode;
  tone?: "paper" | "paper-2" | "navy";
  full?: boolean;
}) {
  const tones = { paper: "bg-paper", "paper-2": "bg-paper-2", navy: "on-navy" } as const;
  return (
    <section
      id={id}
      {...(nav ? { "data-nav": navId ?? id } : {})}
      className={cn("relative py-24 md:py-32 lg:py-40", tones[tone], className)}
    >
      {full ? children : <Container>{children}</Container>}
    </section>
  );
}

/** Intertitre éditorial : numéro, titre, chapô. */
export function SectionHead({
  index,
  title,
  lede,
  className,
  align = "left",
  as: As = "h2",
  id,
}: {
  index?: string;
  title: React.ReactNode;
  lede?: string;
  className?: string;
  align?: "left" | "split";
  as?: "h2" | "h3";
  id?: string;
}) {
  return (
    <header className={cn(align === "split" ? "grid gap-8 lg:grid-cols-12 lg:items-end" : "max-w-[46rem]", className)}>
      <div className={cn(align === "split" && "lg:col-span-7")}>
        {index && (
          <p className="mb-6 flex items-center gap-4 font-mono text-tech uppercase tracking-[0.18em] text-ink-3">
            <span className="text-accent">{index}</span>
            <span aria-hidden className="h-px w-12 bg-line-2" />
          </p>
        )}
        <As id={id} className="text-h1 text-ink">
          {title}
        </As>
      </div>
      {lede && (
        <p className={cn("text-lede text-ink-2", align === "split" ? "lg:col-span-5 lg:pb-2" : "mt-6 max-w-[52ch]")}>{lede}</p>
      )}
    </header>
  );
}
