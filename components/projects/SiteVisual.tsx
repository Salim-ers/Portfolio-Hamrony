import Image from "next/image";
import { LivePreview } from "@/components/projects/LivePreview";
import { ScreenshotSlot } from "@/components/ui/ScreenshotSlot";
import { resolveShot } from "@/lib/media";
import { cn, realValue } from "@/lib/utils";

/**
 * Visuel d'un site réel, par ordre de priorité :
 * capture renseignée, capture déposée dans /public, aperçu live, emplacement explicite.
 */
export function SiteVisual({
  src,
  alt,
  localBase,
  url,
  live,
  title,
  accent,
  className = "aspect-[16/10]",
  sizes = "(min-width: 1024px) 66vw, 100vw",
  priority,
}: {
  src: string | null;
  alt: string;
  localBase: string;
  url: string | null;
  live?: boolean;
  title: string;
  accent?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  const shot = resolveShot(src, localBase);
  if (shot)
    return (
      <div className={cn("relative overflow-hidden bg-ink-1", className)}>
        <Image src={shot} alt={alt} fill sizes={sizes} priority={priority} className="object-cover object-top" />
      </div>
    );
  const liveUrl = realValue(url);
  if (liveUrl && live) return <LivePreview url={liveUrl} title={title} className={className} />;
  return <ScreenshotSlot shot={{ src: null, alt }} accent={accent} className={className} expectedPath={`/public${localBase}.png`} />;
}
