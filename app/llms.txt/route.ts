import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { experience, publications } from "@/content/experience";

// Plain-text summary for AI agents and LLM-based recruiters (https://llmstxt.org).
// Built from the same content files as the site, so it never drifts. Links are built from the
// URL this file was requested on, so they always point at the live site, never at localhost.
export function GET(request: Request) {
  const absoluteUrl = (path: string) => new URL(path, request.url).href;
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.role}, ${profile.location}. ${profile.positioning}`,
    "",
    profile.intro,
    "",
    `Availability: ${profile.availability}`,
    `Contact: ${absoluteUrl("/contact")} · ${profile.email}`,
    `Resume (PDF): ${absoluteUrl(profile.resumePath)}`,
    `LinkedIn: ${profile.links.linkedin}`,
    `GitHub: ${profile.links.github}`,
    "",
    "## Case studies",
    "",
    ...projects.map((p) => `- [${p.name}](${absoluteUrl(`/work/${p.slug}`)}): ${p.headline} Status: ${p.status}. Role: ${p.engagement}.`),
    "",
    "## Experience",
    "",
    ...experience.map((r) => `- ${r.title}, ${r.org} (${r.period})`),
    "",
    "## Publications",
    "",
    ...publications.map((p) => `- ${p.title}. ${p.authors}. ${p.venue}, ${p.date}. ${p.href}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
