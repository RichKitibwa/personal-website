// Site-wide settings. NEXT_PUBLIC_SITE_URL must be set in production so
// canonical URLs, the sitemap and Open Graph images use the real domain.

// On Vercel, VERCEL_PROJECT_PRODUCTION_URL is set automatically, so links work even before the variable is added.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000").replace(/\/$/, "");

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/experience", label: "Experience" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
