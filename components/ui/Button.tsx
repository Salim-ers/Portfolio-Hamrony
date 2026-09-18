import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Les boutons ne connaissent aucune couleur : ils lisent les jetons du
 * thème courant. Le même composant est donc juste sur ivoire comme sur
 * marine, et les contrastes sont vérifiés dans les deux.
 *
 *   primary   — encre pleine, action principale
 *   accent    — laiton, réservé à une seule action par page
 *   secondary — filet
 *   quiet     — lien souligné à l'arrivée du curseur
 */
type Variant = "primary" | "accent" | "secondary" | "quiet";

const base =
  "press inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap rounded-sm px-6 text-label font-medium select-none disabled:pointer-events-none disabled:opacity-40";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:opacity-88",
  accent: "bg-accent text-on-accent hover:opacity-90",
  secondary: "border border-line-2 text-ink hover:border-ink hover:bg-surface",
  quiet: "h-auto px-0 text-ink-2 hover:text-accent-ink link-underline",
};

export function ButtonLink({
  href,
  children,
  variant = "secondary",
  external,
  className,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const cls = cn(base, variants[variant], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
        <span className="sr-only">(nouvel onglet)</span>
      </a>
    );
  }
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export const buttonClass = (variant: Variant = "secondary", className?: string) => cn(base, variants[variant], className);
