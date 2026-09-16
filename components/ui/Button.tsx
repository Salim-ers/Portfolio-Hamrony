import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "quiet";

const base =
  "press inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-sm px-5 text-label select-none disabled:pointer-events-none disabled:opacity-40";
const variants: Record<Variant, string> = {
  primary: "bg-brass text-brass-ink hover:bg-brass-hi",
  secondary: "border border-line-strong text-fg hover:border-fg-3 hover:bg-ink-2",
  quiet: "px-0 h-auto text-fg-2 hover:text-fg",
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
