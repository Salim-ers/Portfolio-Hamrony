import { Hero } from "@/components/sections/Hero";
import { Universes } from "@/components/sections/Universes";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Engineering } from "@/components/sections/Engineering";
import { Parcours } from "@/components/sections/Parcours";
import { Harmony } from "@/components/sections/Harmony";
import { Contact } from "@/components/sections/Contact";

/**
 * Une seule narration :
 * 01 hero — 02 trois univers — 03 projets sélectionnés — 04 ingénierie IT & laboratoire
 * — 05 parcours & environnement technique — 06 Harmony Solutions — 07 contact.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Universes />
      <SelectedWork />
      <Engineering />
      <Parcours />
      <Harmony />
      <Contact />
    </>
  );
}
