import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Rythme vertical commun aux deux univers. */
export function Section({
  id,
  className,
  children,
  tone = "paper",
  full,
  size = "default",
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  tone?: "paper" | "paper-2" | "surface";
  full?: boolean;
  size?: "default" | "tight" | "loose";
}) {
  const tones = { paper: "bg-paper", "paper-2": "bg-paper-2", surface: "bg-surface" } as const;
  const sizes = {
    tight: "py-16 md:py-20",
    default: "py-24 md:py-32",
    loose: "py-28 md:py-40 lg:py-48",
  } as const;
  return (
    <section id={id} className={cn("relative", tones[tone], sizes[size], className)}>
      {full ? children : <Container>{children}</Container>}
    </section>
  );
}

/**
 * Intertitre éditorial : numéro, filet qui se trace, titre, chapô.
 * Le filet est le seul élément animé — le texte reste stable.
 */
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
  lede?: React.ReactNode;
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
            <span className="text-accent-ink">{index}</span>
            <Reveal effect="rule" as="span" className="block h-px w-16 bg-line-2">
              <span aria-hidden />
            </Reveal>
          </p>
        )}
        <As id={id} className="text-h1 text-ink">
          {title}
        </As>
      </div>
      {lede && (
        <div className={cn("text-lede text-ink-2", align === "split" ? "lg:col-span-5 lg:pb-2" : "mt-6 max-w-[54ch]")}>
          {lede}
        </div>
      )}
    </header>
  );
}

/** Étiquette technique discrète, utilisée dans les deux univers. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-tech uppercase tracking-[0.18em] text-ink-3", className)}>{children}</p>
  );
}
