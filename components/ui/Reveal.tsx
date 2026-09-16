"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Apparition à l'entrée dans le viewport. Une seule fois, jamais en boucle. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: As = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <As
      ref={ref as never}
      data-visible={visible}
      className={cn("reveal", className)}
      style={{ ["--delay" as string]: `${delay}ms` }}
    >
      {children}
    </As>
  );
}
