import Image from "next/image";
import type { Shot as ShotData } from "@/lib/shots";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Affichage d'une capture réelle.
 *
 * Aucune interface n'est dessinée : si la capture n'existe pas sur le
 * disque, `shot` vaut null et le composant ne rend rien. La mise en page
 * appelante bascule alors sur une composition purement éditoriale.
 *
 * Les dimensions viennent du fichier lui-même : la place est réservée
 * avant le chargement, il n'y a pas de saut de mise en page.
 */
export function Shot({
  shot,
  className,
  frame = "plain",
  address,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1100px",
  viewTransitionName,
  crop,
}: {
  shot: ShotData | null;
  className?: string;
  /** plain : image nue — browser : cadre navigateur sobre — device : cadre mobile */
  frame?: "plain" | "browser" | "device";
  address?: string | null;
  priority?: boolean;
  sizes?: string;
  viewTransitionName?: string;
  /** Recadre la capture sur sa partie haute, utile pour les pages longues */
  crop?: "top" | "none";
}) {
  if (!shot) return null;

  const img = (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      quality={82}
      className={cn("h-full w-full", crop === "top" ? "object-cover object-top" : "object-cover")}
    />
  );

  if (frame === "device") {
    return (
      <div
        className={cn("overflow-hidden rounded-[1.6rem] border-[6px] border-ink/85 bg-ink shadow-[var(--shadow-soft)]", className)}
        style={viewTransitionName ? { viewTransitionName } : undefined}
      >
        <div className="overflow-hidden rounded-[1.1rem]">{img}</div>
      </div>
    );
  }

  if (frame === "browser") {
    return (
      <div
        className={cn("overflow-hidden rounded-md border border-line bg-surface shadow-[var(--shadow-soft)]", className)}
        style={viewTransitionName ? { viewTransitionName } : undefined}
      >
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
        <div className="overflow-hidden">{img}</div>
      </div>
    );
  }

  return (
    <div
      className={cn("overflow-hidden bg-paper-2", className)}
      style={viewTransitionName ? { viewTransitionName } : undefined}
    >
      {img}
    </div>
  );
}

/** Capture révélée par un masque vertical au défilement. */
export function RevealedShot({
  shot,
  caption,
  className,
  figureClassName,
  ...rest
}: React.ComponentProps<typeof Shot> & { caption?: string; figureClassName?: string }) {
  if (!shot) return null;
  return (
    <figure className={figureClassName}>
      <Reveal effect="mask" className={cn("overflow-hidden", className)}>
        <Shot shot={shot} {...rest} />
      </Reveal>
      {(caption ?? shot.caption) && (
        <figcaption className="mt-3 max-w-[60ch] text-small text-ink-3">{caption ?? shot.caption}</figcaption>
      )}
    </figure>
  );
}
