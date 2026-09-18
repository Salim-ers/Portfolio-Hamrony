import { cn } from "@/lib/utils";

/** Gouttière unique du site. Toutes les sections s'y alignent. */
export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}
