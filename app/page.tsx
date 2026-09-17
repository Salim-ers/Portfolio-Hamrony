import type { Metadata } from "next";
import { Gateway } from "@/components/gateway/Gateway";
import { firstShot } from "@/lib/shots";
import { works } from "@/data/works";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Porte d'entrée du site.
 * Elle n'est jamais imposée : /creation et /systemes sont accessibles
 * directement, depuis la navigation persistante comme depuis l'extérieur.
 */
export default function HomePage() {
  return (
    <Gateway
      workCount={works.length}
      shots={{
        primary: firstShot(
          "centrium",
          ["home"],
          "Centrium, plateforme de pilotage pour sociétés de conseil, conçue et mise en ligne"
        ),
        secondary: firstShot(
          "horse-ledger",
          ["home"],
          "Horse Ledger, plateforme de gestion pour la filière équine, conçue et mise en ligne"
        ),
        mobile: firstShot(
          "royale-auto-ecole",
          ["mobile"],
          "Site de Royale Auto-école en version mobile"
        ),
      }}
    />
  );
}
