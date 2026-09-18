import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Universes } from "@/components/home/Universes";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { Journey } from "@/components/home/Journey";
import { ITEngineering } from "@/components/home/ITEngineering";
import { HarmonySection } from "@/components/home/HarmonySection";
import { HomeLab } from "@/components/home/HomeLab";
import { Stack } from "@/components/home/Stack";
import { Contact } from "@/components/home/Contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * La page d'accueil raconte une histoire, dans cet ordre :
 * qui je suis, d'où je viens, ce que je construis, ce que je sais faire
 * en infrastructure, ce qu'est Harmony Solutions, mon laboratoire, mes
 * technologies, comment me joindre.
 *
 * Chaque section tient en un titre, deux ou trois phrases et un visuel.
 * Le détail vit dans les pages internes : /creation, /systemes,
 * /formation.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Universes />
      <FeaturedWork />
      <Journey />
      <ITEngineering />
      <HarmonySection />
      <HomeLab />
      <Stack />
      <Contact />
    </>
  );
}
