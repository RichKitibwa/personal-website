import { profile } from "@/content/profile";
import { absoluteUrl, siteUrl } from "./site";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: profile.name,
  url: siteUrl,
  image: absoluteUrl(profile.portrait.src),
  jobTitle: profile.role,
  description: profile.positioning,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Kampala", addressCountry: "UG" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Makerere University" },
  worksFor: { "@type": "Organization", name: "MamaOpe Medicals", url: "https://www.mamaope.com/" },
  sameAs: [profile.links.linkedin, profile.links.github, profile.links.devto],
  knowsAbout: [
    "Software engineering",
    "Applied artificial intelligence",
    "Retrieval-augmented generation",
    "Clinical decision support",
    "Biomedical signal processing",
    "Enterprise software",
    "Product development",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: `${profile.name} — ${profile.role}`,
  author: { "@id": `${siteUrl}/#person` },
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

// Escapes "<" so JSON can't close the surrounding <script> tag.
export function JsonLdString(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
