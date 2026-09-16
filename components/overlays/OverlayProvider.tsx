"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

const CommandPalette = dynamic(() => import("./CommandPalette").then((m) => m.CommandPalette), { ssr: false });
const Terminal = dynamic(() => import("./Terminal").then((m) => m.Terminal), { ssr: false });

type Overlay = "palette" | "terminal" | null;
type Ctx = { open: (o: Exclude<Overlay, null>) => void; close: () => void; current: Overlay };

const OverlayContext = createContext<Ctx | null>(null);

export function useOverlay() {
  const ctx = useContext(OverlayContext);
  if (!ctx) throw new Error("useOverlay must be used inside OverlayProvider");
  return ctx;
}

export function OverlayProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<Overlay>(null);
  const [loaded, setLoaded] = useState(false);

  const open = useCallback((o: Exclude<Overlay, null>) => {
    setLoaded(true);
    setCurrent(o);
  }, []);
  const close = useCallback(() => setCurrent(null), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setLoaded(true);
        setCurrent((c) => (c === "palette" ? null : "palette"));
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo(() => ({ open, close, current }), [open, close, current]);

  return (
    <OverlayContext.Provider value={value}>
      {children}
      {loaded && <CommandPalette open={current === "palette"} />}
      {loaded && <Terminal open={current === "terminal"} />}
    </OverlayContext.Provider>
  );
}
