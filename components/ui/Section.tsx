import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { CornerRule } from "@/components/brand/Marks";

/**
 * Rythme vertical du site.
 *
 * `tone="dark"` bascule tout le sous-arbre sur le marine du logo : c'est
 * ce qui marque les moments techniques. Le reste respire en ivoire.
 */
export function Section({
  id,
  className,
  children,
  tone = "paper",
  size = "default",
  full,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  tone?: "paper" | "paper-2" | "dark";
  size?: "tight" | "default" | "loose";
  full?: boolean;
}) {
  const sizes = {
    tight: "py-20 md:py-24",
    default: "py-24 md:py-32",
    loose: "py-28 md:py-40 lg:py-48",
  } as const;

  return (
    <section
      id={id}
      {...(tone === "dark" ? { "data-surface": "dark" } : {})}
      className={cn(
        "relative",
        tone === "paper-2" ? "bg-paper-2" : "bg-paper",
        sizes[size],
        className
      )}
    >
      {full ? children : <Container>{children}</Container>}
    </section>
  );
}

/**
 * Intertitre : équerre tirée du logo, numéro, titre, puis chapô court.
 * Le chapô est volontairement limité — le détail vit dans les sous-pages.
 */
export function SectionHead({
  index,
  eyebrow,
  title,
  lede,
  className,
  align = "split",
  as: As = "h2",
  id,
}: {
  index?: string;
  eyebrow?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  className?: string;
  align?: "left" | "split";
  as?: "h2" | "h3";
  id?: string;
}) {
  return (
    <header className={cn(align === "split" ? "grid gap-x-12 gap-y-6 lg:grid-cols-12" : "max-w-[48rem]", className)}>
      <div className={cn(align === "split" && "lg:col-span-7")}>
        {(index || eyebrow) && (
          <p className="mb-6 flex items-center gap-4 font-mono text-tech uppercase text-ink-3">
            {index && <span className="text-accent-ink">{index}</span>}
            {eyebrow && <span>{eyebrow}</span>}
          </p>
        )}
        <CornerRule className="mb-5" />
        <As id={id} className="text-display text-ink">
          {title}
        </As>
      </div>
      {lede && (
        <div className={cn("text-lede text-ink-2", align === "split" ? "lg:col-span-4 lg:col-start-9 lg:pt-16" : "mt-6 max-w-[54ch]")}>
          {lede}
        </div>
      )}
    </header>
  );
}

/** Étiquette technique discrète. */
export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("font-mono text-tech uppercase text-ink-3", className)}>{children}</p>;
}
