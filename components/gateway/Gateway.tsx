"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { profile, company } from "@/data/profile";
import { Shot } from "@/components/ui/Shot";
import type { Shot as ShotData } from "@/lib/shots";
import { LabSchematic } from "@/components/gateway/LabSchematic";

/**
 * PORTE D'ENTRÉE
 * ==================================================================
 * Règle de composition : sur ordinateur, tout ce qui permet de choisir —
 * les deux titres, les deux descriptions, les deux appels à l'action —
 * tient dans le premier écran, quelle que soit la hauteur de la fenêtre.
 * Le texte est donc placé EN HAUT de chaque panneau, et ce sont les
 * images qui occupent la hauteur restante et se coupent en bas.
 *
 * L'ensemble fait exactement 100dvh sur grand écran : la page ne défile
 * pas, il n'y a rien d'autre à y lire. Sur mobile, les deux panneaux
 * s'empilent dans le flux normal.
 *
 * Le panneau visé — au survol comme au clavier — prend un peu plus de
 * place. Au clic il s'ouvre en grand puis la page de l'univers prend le
 * relais (380 ms, sauté si les animations sont réduites). Ce n'est jamais
 * un passage obligé : /creation et /systemes ont une URL directe.
 */

const TRANSITION_MS = 380;

type PanelId = "creation" | "systems";

export type GatewayShots = {
  primary: ShotData | null;
  secondary: ShotData | null;
  mobile: ShotData | null;
};

export function Gateway({ shots, workCount }: { shots: GatewayShots; workCount: number }) {
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
      // Clic milieu, Ctrl/Cmd + clic et nouvel onglet restent au navigateur.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault();
      setLeaving(id);
      timer.current = setTimeout(() => router.push(href), TRANSITION_MS);
    },
    [router]
  );

  return (
    <div className="flex flex-col pt-16 lg:h-[100dvh]">
      {/* ---------- Qui je suis ----------
          Aligné sur la même gouttière que les panneaux : sans cela le texte
          flotterait au centre pendant que les panneaux vont bord à bord, et
          la page paraîtrait décousue sur grand écran. */}
      <div className="shrink-0 border-b border-line bg-paper px-5 py-6 sm:px-8 lg:px-10 lg:py-7">
        <p
          className="lift-in font-mono text-tech uppercase tracking-[0.18em] text-ink-3"
          style={{ ["--delay" as string]: "40ms" }}
        >
          {profile.name} — {company.name}
        </p>
        <h1 className="mt-3 max-w-[34ch] text-h1 text-ink">
          <span className="word-mask" style={{ ["--delay" as string]: "120ms" }}>
            <span>Je crée des sites et des applications.</span>
          </span>{" "}
          <span className="word-mask text-ink-3" style={{ ["--delay" as string]: "240ms" }}>
            <span>J&apos;administre des infrastructures.</span>
          </span>
        </h1>
      </div>

      {/* ---------- Les deux portes ---------- */}
      <div className={cn("flex min-h-0 flex-1 flex-col lg:flex-row", leaving && "pointer-events-none")}>
        <Panel
          id="creation"
          index="01"
          universe="creation"
          href={profile.universes.creation.href}
          title={profile.universes.creation.title}
          line="Sites vitrines, applications et produits SaaS."
          cta={profile.universes.creation.cta}
          footnote={`${workCount} projets en ligne`}
          leaving={leaving}
          onNavigate={go}
        >
          <WorkDeck shots={shots} />
        </Panel>

        <Panel
          id="systems"
          index="02"
          universe="systems"
          href={profile.universes.systems.href}
          title={profile.universes.systems.title}
          line="Infrastructure, sécurité et support utilisateurs."
          cta={profile.universes.systems.cta}
          footnote="Administrateur systèmes, réseaux et sécurité"
          leaving={leaving}
          onNavigate={go}
        >
          <SystemsPreview />
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
  footnote,
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
  footnote: string;
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
        "group/panel relative isolate flex min-h-0 flex-col overflow-hidden bg-paper",
        "border-b border-line last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0",
        "transition-[flex-grow,opacity] duration-[520ms] [transition-timing-function:var(--ease-in-out)]",
        "lg:flex-1 lg:basis-0 lg:hover:flex-[1.22] lg:focus-within:flex-[1.22]",
        isLeaving && "lg:flex-[14]",
        isDismissed && "opacity-0 lg:flex-[0.001]"
      )}
    >
      {/* Bloc de choix : toujours visible, jamais repoussé par les images. */}
      <div className="shrink-0 px-5 pt-7 sm:px-8 lg:px-10 lg:pt-8">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-tech text-accent-ink">{index}</span>
          <span aria-hidden className="h-px flex-1 bg-line" />
          <span className="hidden font-mono text-tech text-ink-3 sm:block">{footnote}</span>
        </div>

        <h2 id={`panel-${id}`} className="mt-4 text-h1 text-ink">
          <Link
            href={href}
            onClick={(e) => onNavigate(e, id, href)}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {title}
            <span className="sr-only"> — {cta}</span>
          </Link>
        </h2>

        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5">
          <p className="text-body-lg text-ink-2">{line}</p>
          <span className="inline-flex items-center gap-2 text-label font-medium text-accent-ink">
            {cta}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform duration-300 [transition-timing-function:var(--ease-out)] group-hover/panel:translate-x-1"
              strokeWidth={1.75}
            />
          </span>
        </div>
      </div>

      {/* Zone visuelle. Sur grand écran elle prend la hauteur restante et se
          coupe en bas : c'est elle qui absorbe les variations de hauteur de
          fenêtre. Sur mobile, au contraire, elle suit son contenu — couper
          n'y aurait aucun intérêt, et on veut voir tous les écrans. */}
      <div className="relative mt-6 px-5 pb-8 sm:px-8 lg:mt-7 lg:min-h-0 lg:flex-1 lg:overflow-hidden lg:px-10 lg:pb-0">
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * Côté création : trois écrans réels, ancrés en haut. Ils débordent vers le
 * bas du panneau, où ils sont coupés : la composition reste juste quelle
 * que soit la hauteur disponible.
 */
function WorkDeck({ shots }: { shots: GatewayShots }) {
  const { primary, secondary, mobile } = shots;

  return (
    <div
      aria-hidden
      className={cn(
        // Dans le flux sur mobile, ancré en haut du panneau sur grand écran.
        "flex flex-col gap-3 lg:absolute lg:inset-x-10 lg:top-0",
        "transition-transform duration-[600ms] [transition-timing-function:var(--ease-out)]",
        "lg:translate-y-3 lg:group-hover/panel:translate-y-0 lg:group-focus-within/panel:translate-y-0"
      )}
    >
      {primary && (
        <Shot
          shot={primary}
          frame="browser"
          address="centrium-platform.com"
          crop="top"
          priority
          sizes="(max-width: 1024px) 92vw, 46vw"
          className="[&_img]:aspect-[16/9]"
        />
      )}

      <div className="grid grid-cols-[1fr_auto] items-start gap-3">
        {secondary && (
          <Shot
            shot={secondary}
            frame="browser"
            address="horse-ledger.com"
            crop="top"
            sizes="(max-width: 1024px) 68vw, 34vw"
            className="[&_img]:aspect-[16/10]"
          />
        )}
        {mobile && (
          <Shot
            shot={mobile}
            frame="device"
            crop="top"
            sizes="130px"
            className="w-[88px] sm:w-[112px] [&_img]:aspect-[9/16]"
          />
        )}
      </div>
    </div>
  );
}

/**
 * Côté systèmes : le schéma de principe du laboratoire, qui occupe la
 * hauteur disponible, puis trois faits vérifiables. Pas de fausse console,
 * pas de mesure inventée.
 */
function SystemsPreview() {
  return (
    <div className="flex min-h-[300px] flex-col lg:h-full lg:min-h-0">
      <div className="min-h-0 flex-1">
        <LabSchematic />
      </div>
      {/* Sous 640px les trois colonnes seraient trop étroites et les libellés
          se chevaucheraient : on repasse à une seule colonne. */}
      <ul
        aria-hidden
        className="mt-4 flex shrink-0 flex-col gap-2 border-t border-line pb-6 pt-4 sm:grid sm:grid-cols-3 sm:gap-3 lg:pb-8"
      >
        {[
          ["13", "projets professionnalisants"],
          ["RNCP 6", "administrateur systèmes & réseaux"],
          ["Home lab", "Proxmox · pfSense · Zabbix"],
        ].map(([head, tail]) => (
          <li key={head} className="flex items-baseline gap-2 sm:block">
            <p className="shrink-0 text-label font-medium text-ink">{head}</p>
            <p className="font-mono text-tech leading-snug text-ink-3 sm:mt-0.5">{tail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
