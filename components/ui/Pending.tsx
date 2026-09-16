import { isDev } from "@/lib/utils";

/** Repère visible uniquement en développement pour signaler une donnée à renseigner. */
export function Pending({ children }: { children: React.ReactNode }) {
  if (!isDev) return null;
  return (
    <span className="inline-flex items-center rounded-sm border border-dashed border-brass/50 px-2 py-0.5 font-mono text-tech text-brass/80">
      {children}
    </span>
  );
}
