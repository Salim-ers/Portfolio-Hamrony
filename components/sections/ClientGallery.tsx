"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  name: string;
  slug: string;
  sector: string;
  location: string | null;
  url: string;
  src: string;
  alt: string;
};

/** Galerie horizontale des réalisations. Défilement au doigt, à la molette ou aux flèches. */
export function ClientGallery({ items }: { items: GalleryItem[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft < 8,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
    });
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 560), behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <h3 className="text-h2 text-ink">Réalisations</h3>
        <div className="hidden gap-2 md:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => scrollBy(dir)}
              disabled={dir === -1 ? edges.start : edges.end}
              aria-label={dir === -1 ? "Réalisation précédente" : "Réalisation suivante"}
              className="press flex size-11 items-center justify-center rounded-full border border-line-2 text-ink transition-colors hover:border-ink disabled:opacity-30"
            >
              {dir === -1 ? (
                <ArrowLeft aria-hidden className="size-4" strokeWidth={1.75} />
              ) : (
                <ArrowRight aria-hidden className="size-4" strokeWidth={1.75} />
              )}
            </button>
          ))}
        </div>
      </div>

      <ul
        ref={track}
        className="scrollbar-none mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
        style={{ scrollPaddingLeft: "0px" }}
      >
        {items.map((it) => (
          <li key={it.slug} className="w-[82vw] shrink-0 snap-start sm:w-[62vw] lg:w-[520px]">
            <a
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block focus-visible:outline-offset-4"
            >
              <div className="relative aspect-[16/11] overflow-hidden border border-line bg-paper-2">
                <Image
                  src={it.src}
                  alt={it.alt}
                  fill
                  sizes="(min-width: 1024px) 520px, 82vw"
                  className="object-cover object-top transition-transform duration-[900ms] ease-[var(--ease-out)] group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-0 flex items-end bg-[linear-gradient(to_top,rgba(17,19,24,0.82),rgba(17,19,24,0)_58%)]",
                    "opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
                  )}
                >
                  <span className="flex w-full items-center justify-between gap-4 p-6 text-white">
                    <span className="font-mono text-tech uppercase tracking-[0.16em]">
                      {it.sector}
                      {it.location ? ` · ${it.location}` : ""}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-label">
                      Voir le site
                      <ArrowUpRight aria-hidden className="size-4" strokeWidth={1.75} />
                    </span>
                  </span>
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4 border-t border-line pt-4">
                <span className="text-h3 text-ink transition-colors group-hover:text-accent">{it.name}</span>
                <span className="font-mono text-tech uppercase tracking-[0.16em] text-ink-3 md:hidden">
                  {it.sector}
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
