import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Analytics } from "@/components/layout/Analytics";
import { TabTitle } from "@/components/layout/TabTitle";
import { JsonLd } from "@/components/shared/JsonLd";
import { personJsonLd, websiteJsonLd } from "@/lib/structured-data";
import { siteUrl } from "@/lib/site";
import { profile } from "@/content/profile";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const description =
  "Rich Kitibwa is a software engineer in Kampala, Uganda, who builds whole products across many domains, such as healthcare, AI, sport, enterprise and media.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — Software & Product Engineer · Applied AI · Health Tech`,
    template: `%s — ${profile.name}`,
  },
  description,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  keywords: [
    "Rich Kitibwa",
    "Software Engineer",
    "Product Engineer",
    "Applied AI",
    "Full-Stack Engineer",
    "Healthcare Technology",
    "Clinical Decision Support",
    "RAG",
    "Enterprise Software",
    "Kampala",
    "Uganda",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: profile.name,
    locale: "en_GB",
    url: "/",
    title: `${profile.name} — Software & Product Engineer`,
    description,
  },
  twitter: { card: "summary_large_image", title: `${profile.name} — Software & Product Engineer`, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1220" },
  ],
};

// Runs before paint: applies the saved/system theme and enables reveal animations.
const bootScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark')}catch(e){console.warn(e)}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable} ${display.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <Analytics />
        <TabTitle />
      </body>
    </html>
  );
}
