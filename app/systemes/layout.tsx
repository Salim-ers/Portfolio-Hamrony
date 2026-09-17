import { Footer } from "@/components/layout/Footer";

/** Tout l'univers systèmes partage l'ambiance graphite et l'accent bleu. */
export default function SystemesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-universe="systems" className="min-h-[100dvh] bg-paper">
      {children}
      <Footer universe="systems" />
    </div>
  );
}
