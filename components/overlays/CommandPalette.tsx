"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CornerDownLeft, Search } from "lucide-react";
import { useOverlay } from "./OverlayProvider";
import { socials } from "@/data/socials";
import { projects } from "@/data/projects";
import { navigation } from "@/data/navigation";
import { cn, isPlaceholder } from "@/lib/utils";

type Action = { id: string; label: string; group: string; hint?: string; run: () => void };

export function CommandPalette({ open }: { open: boolean }) {
  const { close } = useOverlay();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const actions = useMemo<Action[]>(() => {
    const goTo = (id: string) => () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
        history.replaceState(null, "", `#${id}`);
      } else {
        router.push(`/#${id}`);
      }
    };
    return [
      ...navigation.map<Action>((n) => ({ id: `go-${n.id}`, label: n.label, group: "Navigation", run: goTo(n.id) })),
      { id: "go-projets", label: "Tous les produits", group: "Navigation", run: () => router.push("/projets") },
      ...projects.map<Action>((p) => ({
        id: `projet-${p.slug}`,
        label: p.name,
        group: "Projets",
        hint: p.category ?? undefined,
        run: () => router.push(`/projets/${p.slug}`),
      })),
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
      ...(isPlaceholder(socials.linkedin)
        ? []
        : [{ id: "linkedin", label: "LinkedIn", group: "Contact", run: () => window.open(socials.linkedin, "_blank", "noopener,noreferrer") }]),
    ];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter((a) => `${a.label} ${a.group} ${a.hint ?? ""}`.toLowerCase().includes(q));
  }, [actions, query]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setCopied(false);
      return;
    }
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(false), 1800);
    return () => window.clearTimeout(t);
  }, [copied]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") return close();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % Math.max(filtered.length, 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + filtered.length) % Math.max(filtered.length, 1));
    }
    if (e.key === "Enter" && filtered[active]) {
      e.preventDefault();
      const run = filtered[active].run;
      if (filtered[active].id !== "copy-email") close();
      run();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[var(--z-index-modal)] flex items-start justify-center bg-[rgba(17,19,24,0.32)] px-4 pt-[12vh] backdrop-blur-sm"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Recherche"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        className="fade-up w-full max-w-[560px] overflow-hidden rounded-md border border-line-2 bg-paper-3 shadow-[0_40px_90px_-40px_rgba(17,19,24,0.5)]"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search aria-hidden className="size-4 shrink-0 text-ink-3" strokeWidth={1.75} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une section, un projet…"
            aria-label="Rechercher"
            className="h-14 w-full bg-transparent text-body text-ink outline-none placeholder:text-ink-3"
          />
          <kbd className="hidden shrink-0 font-mono text-tech text-ink-3 sm:block">ESC</kbd>
        </div>

        <ul className="max-h-[52vh] overflow-y-auto py-2">
          {filtered.length === 0 && <li className="px-4 py-6 text-small text-ink-3">Aucun résultat pour « {query} ».</li>}
          {filtered.map((a, i) => (
            <li key={a.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => {
                  if (a.id !== "copy-email") close();
                  a.run();
                }}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-2.5 text-left text-small transition-colors",
                  i === active ? "bg-paper-2 text-ink" : "text-ink-2"
                )}
              >
                <span className="w-24 shrink-0 font-mono text-tech text-ink-3">{a.group}</span>
                <span className="flex-1 truncate">{a.id === "copy-email" && copied ? "Adresse copiée" : a.label}</span>
                {a.hint && <span className="hidden truncate font-mono text-tech text-ink-3 sm:block">{a.hint}</span>}
                {i === active && <CornerDownLeft aria-hidden className="size-3.5 shrink-0 text-ink-3" strokeWidth={1.75} />}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
