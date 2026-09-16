import { cn } from "@/lib/utils";

/** Cadre navigateur sobre. La barre d'adresse n'apparaît qu'avec une adresse réelle. */
export function BrowserFrame({ address, children, className }: { address?: string | null; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-md border border-line bg-paper-3 shadow-[0_24px_60px_-32px_rgba(17,19,24,0.35)]", className)}>
      <div className="flex h-9 items-center gap-3 border-b border-line px-3.5">
        <div aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full bg-line-2" />
          <span className="size-2 rounded-full bg-line-2" />
          <span className="size-2 rounded-full bg-line-2" />
        </div>
        {address && (
          <div className="mx-auto flex h-5 min-w-0 max-w-[60%] flex-1 items-center justify-center rounded-sm bg-paper-2 px-3">
            <span className="truncate font-mono text-[11px] text-ink-3">{address}</span>
          </div>
        )}
        <span aria-hidden className="w-10" />
      </div>
      {children}
    </div>
  );
}
