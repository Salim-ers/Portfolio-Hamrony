import Image from "next/image";
import type { Screenshot } from "@/data/projects";
import { cn, isDev } from "@/lib/utils";
import { resolveShot } from "@/lib/media";

/**
 * Capture réelle si disponible (renseignée dans /data ou déposée dans /public à `localBase`),
 * sinon emplacement explicite "Project screenshot, to be added". Jamais de fausse interface.
 * Composant serveur : la présence du fichier est vérifiée au build.
 */
export function ScreenshotSlot({
  shot,
  accent,
  className,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  priority,
  expectedPath,
  compact,
  localBase,
}: {
  shot: Pick<Screenshot, "src" | "alt">;
  accent?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  expectedPath?: string;
  compact?: boolean;
  /** Emplacement conventionnel sans extension, ex. "/projects/centrium/home" */
  localBase?: string;
}) {
  const src = localBase ? resolveShot(shot.src, localBase) : shot.src;
  if (src) {
    return (
      <div className={cn("relative overflow-hidden bg-ink-1", className)}>
        <Image src={src} alt={shot.alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`${shot.alt} : capture à venir`}
      className={cn("relative flex items-center justify-center overflow-hidden bg-ink-1", className)}
    >
      <span aria-hidden className="absolute inset-2 rounded-sm border border-dashed border-line" />
      <div className={cn("relative flex flex-col items-center gap-1.5 bg-ink-1 text-center", compact ? "px-3 py-2" : "px-5 py-3")}>
        <span aria-hidden className="mb-1 h-px w-8" style={{ background: accent ?? "var(--color-brass)" }} />
        <span className="font-mono text-tech tracking-[0.08em] text-fg-2">PROJECT SCREENSHOT</span>
        <span className="font-mono text-tech tracking-[0.08em] text-fg-3">TO BE ADDED</span>
        {isDev && (expectedPath || localBase) && <span className="mt-1 font-mono text-[10px] text-brass/70">{expectedPath ?? `/public${localBase}.png`}</span>}
      </div>
    </div>
  );
}
