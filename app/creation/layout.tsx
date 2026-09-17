import { Footer } from "@/components/layout/Footer";

/** Tout l'univers création partage l'ambiance ivoire et l'accent vermillon. */
export default function CreationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-universe="creation" className="min-h-[100dvh] bg-paper">
      {children}
      <Footer universe="creation" />
    </div>
  );
}
