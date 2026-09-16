"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { useInView } from "@/components/ui/InView";
import { cn, hostname } from "@/lib/utils";

const DESKTOP_W = 1280;
const MOBILE_W = 414;

/**
 * Aperçu réel d'un site dans un cadre navigateur.
 * Chargé à l'approche, non interactif tant que le visiteur ne l'active pas.
 * Si le site refuse l'intégration ou ne répond pas, un lien direct remplace l'aperçu.
 */
export function LivePreview({ url, title, className = "aspect-[16/10]" }: { url: string; title: string; className?: string }) {
  const [ref, near] = useInView<HTMLDivElement>("400px 0px 400px 0px");
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ scale: 0.5, w: DESKTOP_W, h: 800 });
  const [interactive, setInteractive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      // Sur petit écran, le site est affiché dans sa version mobile plutôt que réduit à 30 %.
      const vw = entry.contentRect.width < 560 ? MOBILE_W : DESKTOP_W;
      const scale = entry.contentRect.width / vw;
      setSize({ scale, w: vw, h: Math.ceil(entry.contentRect.height / scale) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!near || loaded) return;
    const t = window.setTimeout(() => setSlow(true), 9000);
    return () => window.clearTimeout(t);
  }, [near, loaded]);

  return (
    <div ref={ref}>
      <div ref={box} className={cn("relative w-full overflow-hidden bg-ink-1", className, "max-sm:aspect-[4/5]")}>
        {near && (
          <iframe
            src={url}
            title={`Aperçu du site ${title}`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            sandbox="allow-scripts allow-same-origin allow-forms"
            referrerPolicy="no-referrer"
            className={cn("absolute left-0 top-0 origin-top-left border-0 bg-ink-1 transition-opacity duration-500", loaded ? "opacity-100" : "opacity-0", !interactive && "pointer-events-none")}
            style={{ width: size.w, height: size.h, transform: `scale(${size.scale})` }}
            tabIndex={interactive ? 0 : -1}
          />
        )}
        {!loaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="font-mono text-tech text-fg-3">{slow ? hostname(url) : "Chargement de l'aperçu"}</span>
            {slow && (
              <a href={url} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1 pb-0.5 text-label text-brass">
                Ouvrir le site<ArrowUpRight aria-hidden className="size-3.5" />
              </a>
            )}
          </div>
        )}
        {loaded && (
          <div className="absolute bottom-3 right-3 hidden md:block">
            <button
              type="button"
              onClick={() => setInteractive((v) => !v)}
              aria-pressed={interactive}
              className="press inline-flex h-9 items-center rounded-sm border border-line-strong bg-ink-0/90 px-3 text-label text-fg-2 transition-colors hover:text-fg focus-visible:text-fg"
            >
              {interactive ? "Figer l'aperçu" : "Parcourir l'aperçu"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
