"use client";

import { useEffect, useRef, useState } from "react";

/** Marque data-visible="true" à la première entrée dans le viewport (déclenche les tracés CSS). */
export function InView({ children, className, rootMargin = "0px 0px -15% 0px", id }: { children: React.ReactNode; className?: string; rootMargin?: string; id?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return (
    <div ref={ref} data-visible={visible} className={className} id={id}>
      {children}
    </div>
  );
}

export function useInView<T extends Element>(rootMargin = "0px 0px -10% 0px", once = true) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting && once) io.disconnect();
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, once]);
  return [ref, visible] as const;
}
