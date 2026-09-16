import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { realValue } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Tous les produits et plateformes conçus par Salim El Rhalmani : SaaS, applications métier et expériences numériques.",
  alternates: { canonical: "/projets" },
  openGraph: { title: `Projets | ${profile.name}`, url: "/projets" },
};

export default function ProjetsPage() {
  return (
    <div className="pt-[68px]">
      <Container>
        <header className="grid gap-8 py-20 md:py-28 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-4 font-mono text-tech uppercase tracking-[0.2em] text-ink-3">
              <span aria-hidden className="h-px w-10 bg-accent" />
              Index
            </p>
            <h1 className="mt-8 text-display text-ink">Mes produits</h1>
          </div>
          <p className="max-w-[44ch] text-lede text-ink-2 lg:col-span-5 lg:pb-3">
            Chaque produit part d&apos;un besoin métier précis : le structurer, puis le rendre utilisable.
          </p>
        </header>

        <ul className="pb-24 md:pb-32">
          {projects.map((p, i) => {
            const hasPage = Boolean(p.tagline || p.description || p.features.length || p.stack.length);
            const url = realValue(p.url);
            const row = (
              <span className="grid w-full items-baseline gap-x-8 gap-y-3 py-8 md:grid-cols-12 md:py-10">
                <span className="flex items-baseline gap-5 md:col-span-5">
                  <span className="font-mono text-tech text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-h2 text-ink transition-colors duration-300 group-hover:text-accent">{p.name}</span>
                </span>
                <span className="text-body text-ink-2 md:col-span-4">{p.tagline ?? "Présentation à venir."}</span>
                <span className="flex items-center justify-between gap-4 md:col-span-3">
                  <span className="font-mono text-tech uppercase tracking-[0.14em] text-ink-3">
                    {p.category ?? (url ? "En ligne" : "")}
                  </span>
                  {hasPage && (
                    <ArrowRight
                      aria-hidden
                      className="size-5 shrink-0 text-ink-3 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-accent"
                      strokeWidth={1.5}
                    />
                  )}
                </span>
              </span>
            );

            return (
              <Reveal as="li" key={p.slug} delay={Math.min(i * 50, 300)} className="border-b border-line first:border-t">
                {hasPage ? (
                  <Link href={`/projets/${p.slug}`} className="group flex">
                    {row}
                  </Link>
                ) : (
                  <span className="group flex opacity-70">{row}</span>
                )}
              </Reveal>
            );
          })}
        </ul>

        <div className="pb-24 md:pb-32">
          <Link href="/#projets" className="link-underline pb-0.5 text-label text-ink-2 hover:text-accent">
            ← Retour aux projets sélectionnés
          </Link>
        </div>
      </Container>
    </div>
  );
}
