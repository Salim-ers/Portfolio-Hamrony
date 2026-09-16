"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUpRight, CornerDownLeft, Search } from "lucide-react";
import { useOverlay } from "./OverlayProvider";
import { socials } from "@/data/socials";
import { projects } from "@/data/projects";
import { isPlaceholder, cn } from "@/lib/utils";

type Action = { id: string; label: string; group: string; hint?: string; disabled?: boolean; run: () => void };

function goTo(id: string, router: ReturnType<typeof useRouter>) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
  } else {
    router.push(`/#${id}`);
  }
}

export function CommandPalette({ open }: { open: boolean }) {
  const { close, open: openOverlay } = useOverlay();
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const actions = useMemo<Action[]>(() => {
    const nav = (id: string, label: string): Action => ({ id: `go-${id}`, label, group: "Navigation", run: () => goTo(id, router) });
    const external = (id: string, label: string, url: string): Action => ({
      id,
      label,
      group: "Liens",
      hint: isPlaceholder(url) ? "Lien à venir" : undefined,
      disabled: isPlaceholder(url),
      run: () => window.open(url, "_blank", "noopener,noreferrer"),
    });
    return [
      nav("projects", "Go to Projects"),
      nav("infrastructure", "Go to Infrastructure"),
      nav("homelab", "Go to Home Lab"),
      nav("journey", "Go to Journey"),
      nav("stack", "Go to Skills"),
      nav("harmony", "Go to Harmony"),
      nav("contact", "Contact"),
      {
        id: "copy-email",
        label: "Copier l'adresse email",
        group: "Contact",
        hint: socials.email,
        run: async () => {
          try {
            await navigator.clipboard.writeText(socials.email);
            setCopied(true);
          } catch {
            window.location.href = `mailto:${socials.email}`;
          }
        },
      },
      external("linkedin", "Open LinkedIn", socials.linkedin),
      external("github", "Open GitHub", socials.github),
      ...projects.map<Action>((p) => ({ id: `project-${p.slug}`, label: p.name, group: "Projets", hint: p.category ?? undefined, run: () => router.push(`/projects/${p.slug}`) })),
      { id: "terminal", label: "Ouvrir le terminal", group: "Divers", hint: "whoami, projects, homelab…", run: () => openOverlay("terminal") },
    ];
  }, [router, openOverlay]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => `${a.label} ${a.group} ${a.hint ?? ""}`.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      setQuery("");
      setActive(0);
      setCopied(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  function execute(a: Action | undefined) {
    if (!a || a.disabled) return;
    a.run();
    if (a.id !== "copy-email" && a.id !== "terminal") close();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      execute(filtered[active]);
    }
  }

  useEffect(() => {
    document.getElementById(`cmd-${filtered[active]?.id}`)?.scrollIntoView({ block: "nearest" });
  }, [active, filtered]);

  let lastGroup = "";

  return (
    <dialog
      ref={dialogRef}
      aria-label="Command palette"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      className="fixed inset-x-0 top-[12vh] m-auto h-fit max-h-[70vh] w-[min(600px,calc(100vw-2rem))] overflow-hidden rounded-md border border-line-strong bg-ink-1 p-0 text-fg shadow-[0_24px_80px_-12px_rgba(0,0,0,0.7)] backdrop:bg-ink-0/70"
    >
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search aria-hidden className="size-4 text-fg-3" strokeWidth={1.75} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Rechercher une section, un projet, une action"
          aria-label="Rechercher"
          role="combobox"
          aria-expanded="true"
          aria-controls="cmd-list"
          aria-activedescendant={filtered[active] ? `cmd-${filtered[active].id}` : undefined}
          className="h-14 w-full bg-transparent text-body text-fg outline-none placeholder:text-fg-3"
        />
        <kbd className="hidden rounded-sm border border-line-strong px-1.5 py-0.5 font-mono text-[11px] text-fg-3 sm:block">Esc</kbd>
      </div>
      <ul id="cmd-list" role="listbox" className="max-h-[calc(70vh-3.5rem)] overflow-y-auto p-2">
        {filtered.length === 0 && <li className="px-3 py-6 text-small text-fg-3">Aucun résultat pour « {query} ». Essayez « projects » ou « contact ».</li>}
        {filtered.map((a, i) => {
          const header = a.group !== lastGroup ? a.group : null;
          lastGroup = a.group;
          const isActive = i === active;
          return (
            <li key={a.id} role="presentation">
              {header && <div className="px-3 pb-1 pt-3 text-tech text-fg-3">{header}</div>}
              <div
                id={`cmd-${a.id}`}
                role="option"
                aria-selected={isActive}
                aria-disabled={a.disabled}
                onMouseMove={() => setActive(i)}
                onClick={() => execute(a)}
                className={cn(
                  "flex h-11 cursor-pointer items-center justify-between gap-4 rounded-sm px-3 text-small",
                  isActive ? "bg-ink-2 text-fg" : "text-fg-2",
                  a.disabled && "cursor-not-allowed opacity-50"
                )}
              >
                <span className="flex items-center gap-2 truncate">
                  {a.label}
                  {a.group === "Liens" && !a.disabled && <ArrowUpRight aria-hidden className="size-3.5 text-fg-3" />}
                </span>
                <span className="flex shrink-0 items-center gap-2 font-mono text-tech text-fg-3">
                  {a.id === "copy-email" && copied ? <span className="text-brass">Copié</span> : a.hint}
                  {isActive && !a.disabled && <CornerDownLeft aria-hidden className="size-3.5" />}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </dialog>
  );
}
