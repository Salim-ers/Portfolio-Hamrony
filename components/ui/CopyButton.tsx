"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({ value, label = "Copier l'email", copiedLabel = "Email copié", className }: { value: string; label?: string; copiedLabel?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(t);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${value}`;
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={cn("press inline-flex h-11 items-center gap-2 rounded-sm border border-line-strong px-4 text-label text-fg-2 hover:border-fg-3 hover:text-fg", className)}
    >
      {copied ? <Check aria-hidden className="size-4 text-brass" strokeWidth={2} /> : <Copy aria-hidden className="size-4" strokeWidth={1.75} />}
      <span>{copied ? copiedLabel : label}</span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Adresse copiée dans le presse-papiers" : ""}
      </span>
    </button>
  );
}
