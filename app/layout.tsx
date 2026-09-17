import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { profile, company, contact, seo } from "@/data/profile";
import { UniverseNav } from "@/components/layout/UniverseNav";
import { realValue, siteUrl } from "@/lib/utils";

const grotesk = localFont({
  src: "./fonts/schibsted-grotesk.woff2",
  variable: "--font-grotesk",
  weight: "400 900",
  display: "swap",
});
const plexMono = localFont({
  src: [
    { path: "./fonts/plex-mono-400.woff2", weight: "400" },
    { path: "./fonts/plex-mono-500.woff2", weight: "500" },
  ],
  variable: "--font-plex-mono",
  display: "swap",
});
const cormorant = localFont({
  src: "./fonts/cormorant-600.woff2",
  variable: "--font-cormorant",
  weight: "600",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: seo.title, template: `%s | ${profile.name}` },
  description: seo.description,
  keywords: [...seo.keywords],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: profile.name,
    title: seo.title,
    description: seo.description,
  },
  twitter: { card: "summary_large_image", title: seo.title, description: seo.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f2ea" },
    { media: "(prefers-color-scheme: dark)", color: "#121419" },
  ],
};

function StructuredData() {
  const url = siteUrl();
  const sameAs = [realValue(contact.linkedin), realValue(contact.github)].filter(Boolean);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${url}/#person`,
        name: profile.name,
        url,
        jobTitle: "Administrateur systèmes, réseaux et sécurité",
        email: `mailto:${contact.jobEmail}`,
        knowsAbout: [
          "Administration systèmes",
          "Administration réseaux",
          "Active Directory",
          "Windows Server",
          "Support informatique N1 N2",
          "Développement web",
          "SaaS",
        ],
        worksFor: { "@id": `${url}/#organization` },
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: company.name,
        description: company.activity,
        email: contact.projectEmail,
        telephone: "+33651080833",
        founder: { "@id": `${url}/#person` },
        identifier: { "@type": "PropertyValue", propertyID: "SIREN", value: company.siren.replace(/\s/g, "") },
        address: {
          "@type": "PostalAddress",
          streetAddress: company.address.street,
          postalCode: company.address.postalCode,
          addressLocality: company.address.city,
          addressCountry: company.address.country,
        },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${grotesk.variable} ${plexMono.variable} ${cormorant.variable}`}>
      <head>
        {/*
          Active les états d'animation avant le premier rendu, et seulement
          si le JavaScript s'exécute et que l'utilisateur n'a pas demandé
          moins d'animations. Sans cet attribut, aucun contenu n'est masqué :
          une erreur de script ne peut donc pas rendre une section invisible.
          Inline et synchrone : pas de clignotement au chargement.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.motion="on"}}catch(e){}`,
          }}
        />
      </head>
      <body>
        <StructuredData />
        <UniverseNav />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
