import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { profile, company } from "@/data/profile";
import { socials } from "@/data/socials";
import { OverlayProvider } from "@/components/overlays/OverlayProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
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
  title: { default: profile.seo.title, template: `%s | ${profile.name}` },
  description: profile.seo.description,
  keywords: [...profile.seo.keywords],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: `${profile.name}, ${company.name}`,
    title: profile.seo.title,
    description: profile.seo.description,
  },
  twitter: { card: "summary_large_image", title: profile.seo.title, description: profile.seo.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f7f7f4",
  colorScheme: "light",
};

function StructuredData() {
  const url = siteUrl();
  const sameAs = [realValue(socials.linkedin), realValue(socials.github)].filter(Boolean);
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${url}/#person`,
        name: profile.name,
        url,
        jobTitle: "Administrateur systèmes et réseaux",
        email: `mailto:${socials.email}`,
        worksFor: { "@id": `${url}/#organization` },
        knowsAbout: ["Administration systèmes", "Administration réseaux", "Active Directory", "Infrastructure réseau", "SaaS", "Développement web"],
        ...(sameAs.length ? { sameAs } : {}),
      },
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: company.name,
        description: company.activity,
        email: socials.email,
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
        ...(realValue(socials.harmonyUrl) ? { url: socials.harmonyUrl } : {}),
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${grotesk.variable} ${plexMono.variable} ${cormorant.variable}`}>
      <body>
        <StructuredData />
        <OverlayProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </OverlayProvider>
      </body>
    </html>
  );
}
