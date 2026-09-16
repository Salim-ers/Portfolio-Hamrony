import { cn } from "@/lib/utils";

/** Affiche le statut réel. Si le statut n'est pas renseigné : rien, ou une mention neutre. */
export function StatusTag({ status, fallback, className }: { status: string | null; fallback?: string; className?: string }) {
  if (!status) {
    if (!fallback) return null;
    return <span className={cn("font-mono text-tech text-fg-3", className)}>{fallback}</span>;
  }
  const live = status === "Live" || status === "Shipping";
  return (
    <span className={cn("inline-flex items-center gap-2 rounded-sm border border-line-strong px-2 py-1 font-mono text-tech text-fg-2", className)}>
      {live && <span aria-hidden className="size-1.5 rounded-full bg-ok" />}
      {status}
    </span>
  );
}
