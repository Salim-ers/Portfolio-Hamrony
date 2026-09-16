"use client";

import { useEffect, useRef, useState } from "react";
import { useOverlay } from "./OverlayProvider";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { skills } from "@/data/skills";
import { homelab } from "@/data/homelab";
import { socials } from "@/data/socials";
import { isPlaceholder } from "@/lib/utils";

type Line = { kind: "in" | "out"; text: string };

const PROMPT = "salim@harmony:~$";

function run(cmd: string): string[] | "clear" | "exit" {
  switch (cmd.trim().toLowerCase()) {
    case "":
      return [];
    case "help":
      return ["whoami    qui suis-je", "projects  liste des projets", "skills    compétences par domaine", "homelab   état de la documentation du lab", "contact   coordonnées", "clear     effacer l'écran", "exit      fermer le terminal"];
    case "whoami":
      return [profile.name, "Systems • Networks • Digital Products"];
    case "projects":
      return projects.map((p) => `${p.name.padEnd(14)} ${p.status ?? "statut à préciser"}`);
    case "skills":
      return skills.map((g) => `${g.name.padEnd(20)} ${g.items.slice(0, 5).join(", ")}${g.items.length > 5 ? ", …" : ""}`);
    case "homelab":
      return homelab.documented
        ? homelab.nodes.map((n) => `${n.hostname.padEnd(16)} ${n.role}`)
        : [`${homelab.nodes.length} nœuds déclarés`, "documentation en cours de rédaction"];
    case "contact":
      return [socials.email, socials.phoneDisplay, ...(isPlaceholder(socials.linkedin) ? [] : [socials.linkedin]), ...(isPlaceholder(socials.github) ? [] : [socials.github])];
    case "clear":
      return "clear";
    case "exit":
      return "exit";
    default:
      return [`commande introuvable : ${cmd.trim()}. Tapez help.`];
  }
}

export function Terminal({ open }: { open: boolean }) {
  const { close } = useOverlay();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([{ kind: "out", text: "Tapez help pour la liste des commandes." }]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [cursor, setCursor] = useState(-1);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => endRef.current?.scrollIntoView({ block: "end" }), [lines]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const result = run(value);
    if (result === "exit") {
      setValue("");
      close();
      return;
    }
    if (result === "clear") setLines([]);
    else setLines((l) => [...l, { kind: "in", text: value }, ...result.map((text) => ({ kind: "out" as const, text }))]);
    if (value.trim()) setHistory((h) => [value, ...h]);
    setCursor(-1);
    setValue("");
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowUp" && history.length) {
      e.preventDefault();
      const next = Math.min(cursor + 1, history.length - 1);
      setCursor(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = cursor - 1;
      setCursor(next);
      setValue(next >= 0 ? history[next] : "");
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-label="Terminal"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
      className="fixed inset-x-0 top-[14vh] m-auto h-[min(420px,70vh)] w-[min(640px,calc(100vw-2rem))] overflow-hidden rounded-md border border-line-strong bg-ink-0 p-0 text-fg shadow-[0_24px_80px_-12px_rgba(0,0,0,0.7)] backdrop:bg-ink-0/70"
    >
      <div className="flex h-9 items-center justify-between border-b border-line px-3 font-mono text-tech text-fg-3">
        <span>terminal</span>
        <button type="button" onClick={close} className="rounded-sm px-2 py-1 hover:text-fg">
          fermer
        </button>
      </div>
      <div className="h-[calc(100%-2.25rem)] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed" onClick={() => inputRef.current?.focus()}>
        {lines.map((l, i) => (
          <div key={i} className={l.kind === "in" ? "text-fg" : "whitespace-pre text-fg-2"}>
            {l.kind === "in" && <span className="mr-2 text-brass">{PROMPT}</span>}
            {l.text}
          </div>
        ))}
        <form onSubmit={submit} className="flex items-center">
          <label htmlFor="term-input" className="mr-2 text-brass">
            {PROMPT}
          </label>
          <input
            id="term-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            className="flex-1 bg-transparent text-fg caret-brass outline-none"
          />
        </form>
        <div ref={endRef} />
      </div>
    </dialog>
  );
}
