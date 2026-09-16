"use client";

import { profile, company } from "@/data/profile";
import { useOverlay } from "@/components/overlays/OverlayProvider";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const { open } = useOverlay();
  return (
    <footer className="border-t border-line py-10">
      <Container className="grid gap-6 text-small text-fg-3 md:grid-cols-[1fr_auto] md:items-end">
        <div className="space-y-1">
          <p className="text-fg-2">{profile.name}</p>
          <p>
            {company.name}, SIREN {company.siren}
          </p>
          <p>{profile.country}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:justify-end">
          <p>Built with curiosity.</p>
          <button type="button" onClick={() => open("terminal")} className="font-mono text-tech text-fg-3 hover:text-brass">
            ~/terminal
          </button>
          <p suppressHydrationWarning>© {new Date().getFullYear()}</p>
        </div>
      </Container>
    </footer>
  );
}
