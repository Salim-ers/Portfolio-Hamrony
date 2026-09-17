"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";
import { Shot } from "@/components/ui/Shot";
import type { Shot as ShotData } from "@/lib/shots";
import { LabSchematic } from "@/components/gateway/LabSchematic";

/**
 * PORTE D'ENTRÉE
 * ==================================================================
 * Deux panneaux autonomes. Sur ordinateur, le panneau visé — au survol
 * comme au clavier — prend un peu plus de place et révèle son aperçu :
 * une interface réelle côté création, un schéma technique côté systèmes.
 * L'expansion est en CSS pur (flex + :hover/:focus-within) : elle
 * fonctionne même si le JavaScript n'a pas encore pris la main.
 *
 * Au clic, le panneau choisi s'ouvre sur toute la largeur puis la page
 * de l'univers prend le relais. La transition est courte (380 ms) et
 * sautée intégralement si l'utilisateur a demandé moins d'animations.
 *
 * Ce n'est pas un écran obligatoire : la navigation persistante permet
 * d'atteindre /creation et /systemes depuis n'importe où, ces URLs sont
 * accessibles directement, et le bouton retour du navigateur fonctionne.
 */

const TRANSITION_MS = 380;

type PanelId = "creation" | "systems";

export function Gateway({ creationShot }: { creationShot: ShotData | null }) {
  const router = useRouter();
  const [leaving, setLeaving] = useState<PanelId | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    router.prefetch("/creation");
    router.prefetch("/systemes");
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [router]);

  const go = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: PanelId, href: string) => {
      // On laisse le navigateur gérer clic milieu, Ctrl/Cmd + clic, nouvel onglet.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const reduced =
        typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return; // navigation immédiate, sans animation

      e.preventDefault();
      setLeaving(id);
      timer.current = setTimeout(() => router.push(href), TRANSITION_MS);
    },
    [router]
  );

  return (
    <div className="flex min-h-[100dvh] flex-col pt-16">
      {/* ---------- Bandeau d'identité ---------- */}
      <div className="border-b border-line bg-paper px-5 py-10 sm:px-8 md:py-14 lg:px-12">
        <div className="mx-auto w-full max-w-[1320px]">
          <h1 className="text-mega text-ink">
            <span className="word-mask" style={{ ["--delay" as string]: "80ms" }}>
              <span>Deux pratiques,</span>
            </span>{" "}
            <span className="word-mask text-accent-ink" style={{ ["--delay" as string]: "200ms" }}>
              <span>une même signature.</span>
            </span>
          </h1>
          <div className="mt-6 flex flex-col gap-3 md:mt-8 md:flex-row md:items-baseline md:justify-between md:gap-10">
            <p className="lift-in max-w-[62ch] text-lede text-ink-2" style={{ ["--delay" as string]: "460ms" }}>
              Je suis <strong className="font-medium text-ink">Salim El Rhalmani</strong>. Je conçois des sites, des
              applications et des produits numériques — et j&apos;administre des infrastructures systèmes et réseaux.
              Deux métiers, deux parcours à consulter.
            </p>
            <p
              className="lift-in shrink-0 font-mono text-tech uppercase tracking-[0.18em] text-ink-3"
              style={{ ["--delay" as string]: "620ms" }}
            >
              Choisissez une entrée
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Les deux panneaux ---------- */}
      <div
        className={cn(
          "group/panels flex flex-1 flex-col lg:flex-row",
          leaving && "pointer-events-none"
        )}
      >
        <Panel
          id="creation"
          index="01"
          universe="creation"
          href={profile.universes.creation.href}
          title={profile.universes.creation.title}
          line={profile.universes.creation.line}
          cta={profile.universes.creation.cta}
          detail="Centrium · Horse Ledger · Aequitas · Odyssea · sites vitrines"
          leaving={leaving}
          onNavigate={go}
        >
          <CreationPreview shot={creationShot} />
        </Panel>

        <Panel
          id="systems"
          index="02"
          universe="systems"
          href={profile.universes.systems.href}
          title={profile.universes.systems.title}
          line={profile.universes.systems.line}
          cta={profile.universes.systems.cta}
          detail="Windows Server · Active Directory · VLAN · pfSense · support N1/N2"
          leaving={leaving}
          onNavigate={go}
        >
          <LabSchematic />
        </Panel>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Panel({
  id,
  index,
  universe,
  href,
  title,
  line,
  cta,
  detail,
  children,
  leaving,
  onNavigate,
}: {
  id: PanelId;
  index: string;
  universe: "creation" | "systems";
  href: string;
  title: string;
  line: string;
  cta: string;
  detail: string;
  children: React.ReactNode;
  leaving: PanelId | null;
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, id: PanelId, href: string) => void;
}) {
  const isLeaving = leaving === id;
  const isDismissed = leaving !== null && leaving !== id;

  return (
    <section
      data-universe={universe}
      aria-labelledby={`panel-${id}`}
      className={cn(
        // Expansion au survol et au clavier, en CSS pur.
        "group/panel relative isolate flex min-h-[62svh] flex-col overflow-hidden bg-paper px-5 py-10 sm:px-8 lg:min-h-0 lg:px-12 lg:py-14",
        "border-b border-line last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0",
        "transition-[flex-grow,opacity,transform] duration-[520ms] [transition-timing-function:var(--ease-in-out)]",
        "lg:flex-1 lg:basis-0 lg:hover:flex-[1.32] lg:focus-within:flex-[1.32]",
        isLeaving && "lg:flex-[14]",
        isDismissed && "opacity-0 lg:flex-[0.001]"
      )}
    >
      {/* Colonnes de repère, très discrètes */}
      <div aria-hidden className="grid-rule pointer-events-none absolute inset-0 -z-10 opacity-40" />

      <div className="flex items-baseline gap-4">
        <span className="font-mono text-tech uppercase tracking-[0.18em] text-accent-ink">{index}</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>

      <div className="mt-8 lg:mt-10">
        <h2 id={`panel-${id}`} className="text-display text-ink">
          <Link
            href={href}
            onClick={(e) => onNavigate(e, id, href)}
            /* Le contour de focus reste porté par le lien lui-même : un
               contour posé sur un pseudo-élément n'est pas détecté comme
               indicateur visible et disparaît au moindre recadrage. */
            className="after:absolute after:inset-0 after:z-10 after:content-['']"
          >
            {title}
            <span className="sr-only"> — {cta}</span>
          </Link>
        </h2>
        <p className="mt-4 max-w-[36ch] text-lede text-ink-2">{line}</p>
      </div>

      {/* Aperçu : visible en permanence sur mobile, révélé au survol ou au
          clavier sur grand écran. Il reste dans le flux : aucun saut. */}
      <div
        aria-hidden
        className={cn(
          // overflow-hidden : l'aperçu déborde volontairement vers le bas
          // du panneau et y est coupé, au lieu de recouvrir le titre.
          "relative mt-10 min-h-[220px] flex-1 overflow-hidden",
          "opacity-100 translate-y-0",
          "lg:opacity-55 lg:translate-y-3",
          "lg:transition-[opacity,transform] lg:duration-500 lg:[transition-timing-function:var(--ease-out)]",
          "lg:group-hover/panel:opacity-100 lg:group-hover/panel:translate-y-0",
          "lg:group-focus-within/panel:opacity-100 lg:group-focus-within/panel:translate-y-0"
        )}
      >
        {children}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <span className="inline-flex items-center gap-2 text-label font-medium text-ink">
          {cta}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 [transition-timing-function:var(--ease-out)] group-hover/panel:translate-x-1"
            strokeWidth={1.75}
          />
        </span>
        <span className="font-mono text-tech text-ink-3">{detail}</span>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/** Aperçu côté création : une interface réellement en ligne, pas une maquette. */
function CreationPreview({ shot }: { shot: ShotData | null }) {
  if (!shot) {
    return (
      <div className="flex h-full items-end">
        <p className="max-w-[40ch] font-mono text-tech text-ink-3">
          Aperçu indisponible — capture à régénérer avec `npm run captures`.
        </p>
      </div>
    );
  }
  return (
    <div className="absolute inset-x-0 top-0">
      <Shot
        shot={shot}
        frame="browser"
        address="centrium-platform.com"
        crop="top"
        priority
        sizes="(max-width: 1024px) 92vw, 44vw"
        className="w-full [&_img]:aspect-[16/10]"
      />
    </div>
  );
}
