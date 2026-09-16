import Image from "next/image";
import { cn } from "@/lib/utils";
import { resolveShot } from "@/lib/media";

/**
 * Visuel d'un projet.
 * 1. capture réelle (renseignée dans /data ou déposée dans /public à `base`)
 * 2. à défaut, composition typographique autour du nom du projet.
 * Jamais d'emplacement vide, jamais de mention « capture à venir ».
 */
export function Shot({
  src,
  base,
  alt,
  name,
  meta,
  accent,
  className,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  priority,
  position = "object-top",
  tone = "light",
  align = "center",
}: {
  src?: string | null;
  base?: string;
  alt: string;
  name: string;
  meta?: string | null;
  accent?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  position?: string;
  tone?: "light" | "dark";
  /** Placement de la composition typographique de repli */
  align?: "center" | "start";
}) {
  const resolved = base ? resolveShot(src ?? null, base) : (src ?? null);

  if (resolved) {
    return (
      <div className={cn("relative overflow-hidden bg-paper-2", className)}>
        <Image src={resolved} alt={alt} fill sizes={sizes} priority={priority} className={cn("object-cover", position)} />
      </div>
    );
  }

  const ink = tone === "dark" ? "#eef1f6" : "#111318";
  const sub = tone === "dark" ? "#8394ae" : "#7c828d";
  const bg = tone === "dark" ? "#1d3053" : "#ffffff";

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn("relative flex overflow-hidden", align === "start" ? "items-start justify-start" : "items-center justify-center", className)}
      style={{ background: bg }}
    >
      <span
        aria-hidden
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage: `linear-gradient(to right, ${tone === "dark" ? "#2d4165" : "#e4e3db"} 1px, transparent 1px)`,
          backgroundSize: "12.5% 100%",
        }}
      />
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{ background: `linear-gradient(to top, ${accent ?? "#1b3f8b"}14, transparent)` }}
      />
      <div className={cn("relative flex flex-col", align === "start" ? "items-start p-8 text-left sm:p-10" : "items-center px-8 text-center")}>
        <span aria-hidden className="mb-6 h-8 w-px" style={{ background: accent ?? "#1b3f8b" }} />
        <span
          className="text-[clamp(1.75rem,4.2vw,3rem)] font-[600] leading-none tracking-[-0.035em]"
          style={{ color: ink }}
        >
          {name}
        </span>
        {meta && (
          <span className="mt-4 font-mono text-tech uppercase tracking-[0.18em]" style={{ color: sub }}>
            {meta}
          </span>
        )}
      </div>
    </div>
  );
}
