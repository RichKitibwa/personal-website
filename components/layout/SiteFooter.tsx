import Link from "next/link";
import { nav } from "@/lib/site";
import { profile } from "@/content/profile";

async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="no-print border-t border-ink-line bg-ink text-ink-fg">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl">Rich Kitibwa</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-muted">
            {profile.positioning} Based in {profile.location}.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted">Site</p>
          <ul className="mt-4 grid gap-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-fg/85 hover:text-ink-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-ink-muted">Elsewhere</p>
          <ul className="mt-4 grid gap-2 text-sm">
            <li>
              <a href={`mailto:${profile.email}`} className="text-ink-fg/85 hover:text-ink-accent">
                {profile.email}
              </a>
            </li>
            <li>
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink-fg/85 hover:text-ink-accent">
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-ink-fg/85 hover:text-ink-accent">
                GitHub ↗
              </a>
            </li>
            <li>
              <a href={profile.resumePath} target="_blank" rel="noopener noreferrer" className="text-ink-fg/85 hover:text-ink-accent">
                Resume (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-10 text-xs text-ink-muted sm:px-8">
        © {year} Rich Kitibwa.{" "}
        <a href="/llms.txt" className="underline decoration-ink-line underline-offset-4 hover:text-ink-accent">
          Are you an AI agent?
        </a>
      </div>
    </footer>
  );
}
