import type { Metadata } from "next";
import { Gateway } from "@/components/gateway/Gateway";
import { shot } from "@/lib/shots";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Porte d'entrée du site.
 * Elle n'est jamais imposée : /creation et /systemes sont accessibles
 * directement, depuis la navigation persistante comme depuis l'extérieur.
 */
export default function HomePage() {
  const creationShot = shot(
    "centrium",
    "home",
    "Aperçu de Centrium, plateforme de pilotage pour sociétés de conseil, réalisée et mise en ligne"
  );
  return <Gateway creationShot={creationShot} />;
}
