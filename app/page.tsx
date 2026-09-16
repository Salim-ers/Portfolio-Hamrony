import { Hero } from "@/components/sections/Hero";
import { Layers } from "@/components/sections/Layers";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { HomeLab } from "@/components/sections/HomeLab";
import { Journey } from "@/components/sections/Journey";
import { Stack } from "@/components/sections/Stack";
import { ProductIndex } from "@/components/sections/ProductIndex";
import { ClientWork } from "@/components/sections/ClientWork";
import { Harmony } from "@/components/sections/Harmony";
import { CurrentlyBuilding } from "@/components/sections/CurrentlyBuilding";
import { Contact } from "@/components/sections/Contact";

/**
 * Narration : systèmes → réseaux → infrastructure → home lab → parcours
 * → interfaces et produits → Harmony Solutions → contact.
 * Les projets phares arrivent tôt ; l'index complet suit la stack.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Layers />
      <SelectedWork />
      <Infrastructure />
      <HomeLab />
      <Journey />
      <Stack />
      <ProductIndex />
      <ClientWork />
      <Harmony />
      <CurrentlyBuilding />
      <Contact />
    </>
  );
}
