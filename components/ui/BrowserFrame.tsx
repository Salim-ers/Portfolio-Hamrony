import { cn } from "@/lib/utils";

export function BrowserFrame({ address, children, className }: { address?: string | null; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-md border border-line bg-ink-1", className)}>
      <div className="flex h-9 items-center gap-3 border-b border-line px-3">
        <div aria-hidden className="flex gap-1.5">
          <span className="size-2 rounded-full border border-line-strong" />
          <span className="size-2 rounded-full border border-line-strong" />
          <span className="size-2 rounded-full border border-line-strong" />
        </div>
        <div className="mx-auto flex h-5 min-w-0 max-w-[60%] flex-1 items-center justify-center rounded-sm bg-ink-2 px-3">
          <span className="truncate font-mono text-[11px] text-fg-3">{address ?? "adresse à venir"}</span>
        </div>
        <span aria-hidden className="w-10" />
      </div>
      {children}
    </div>
  );
}
