import type { Metadata } from "next";
import Link from "next/link";
import { experience, education, certifications, publications } from "@/content/experience";
import { capabilities, technologies, type Level } from "@/content/skills";
import { getProject } from "@/content/projects";
import { profile } from "@/content/profile";
import { Container, Eyebrow, SectionHeading } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/shared/Button";
import { ContactCta } from "@/components/home/ContactCta";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Rich Kitibwa's professional experience, skills and education: MamaOpe Medicals, Ascension Services, Bench Sports Media and earlier roles.",
  alternates: { canonical: "/experience" },
};

const levels: { level: Level; note: string }[] = [
  { level: "Daily driver", note: "I use it at work every day" },
  { level: "Working knowledge", note: "I've shipped real work with it" },
  { level: "Familiar", note: "I've used it and can pick it up quickly" },
];

export default function ExperiencePage() {
  const groups = [...new Set(technologies.map((t) => t.group))];

  return (
    <>
      <section className="pb-16 pt-16 sm:pt-24">
        <Container>
          <Eyebrow>Experience</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl">
            Where I&apos;ve worked, and what I did there.
          </h1>
          <div className="mt-10">
            <Button href={profile.resumePath} newTab>
              View resume (PDF)
            </Button>
          </div>
        </Container>
      </section>

      <section aria-label="Timeline" className="border-t border-line">
        <Container>
          <ol className="relative">
            {experience.map((role) => (
              <Reveal
                as="li"
                key={role.org}
                className="grid gap-4 border-b border-line py-12 last:border-b-0 lg:grid-cols-[14rem_1fr] lg:gap-16"
              >
                <div>
                  <p className="font-mono text-xs text-muted">{role.period}</p>
                  <p className="mt-2 inline-block rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                    {role.type}
                  </p>
                </div>
                <div className="max-w-3xl">
                  <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                    {role.href ? (
                      <a href={role.href} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                        {role.org} <span aria-hidden className="text-xl">↗</span>
                      </a>
                    ) : (
                      role.org
                    )}
                  </h2>
                  <p className="mt-1 font-medium">{role.title}</p>
                  <p className="mt-3 text-muted">
                    {role.summary}
                    {role.location ? ` ${role.location}.` : ""}
                  </p>
                  <ul className="mt-5 grid gap-2.5 leading-relaxed">
                    {role.highlights.map((h) => (
                      <li key={h} className="relative pl-5 before:absolute before:left-0 before:text-accent before:content-['—']">
                        {h}
                      </li>
                    ))}
                  </ul>
                  {role.projects?.length ? (
                    <p className="mt-5 text-sm text-muted">
                      Case studies:{" "}
                      {role.projects.map((slug, i) => (
                        <span key={slug}>
                          {i > 0 ? " · " : ""}
                          <Link href={`/work/${slug}`} className="text-fg underline decoration-line underline-offset-4 hover:decoration-accent">
                            {getProject(slug)?.name}
                          </Link>
                        </span>
                      ))}
                    </p>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-t border-line bg-raised py-20 sm:py-28" aria-labelledby="skills">
        <Container>
          <SectionHeading
            id="skills"
            eyebrow="Skills"
            title="What I can do, and the tools I use."
            intro="First the kinds of work I do, then the tools. The dots show how well I know each one."
          />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <li key={c.id} className="bg-raised p-6">
                <h3 className="font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
              </li>
            ))}
          </ul>

          <div className="mt-20">
            <h3 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">Tools</h3>
            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {levels.map((l, i) => (
                <div key={l.level} className="flex items-center gap-2">
                  <dt className="flex items-center gap-2 font-medium">
                    <LevelDots level={i} />
                    {l.level}
                  </dt>
                  <dd className="text-muted">{l.note}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((g) => (
                <div key={g}>
                  <h4 className="border-b border-line pb-2 text-sm font-semibold">{g}</h4>
                  <ul className="mt-3 grid gap-2 text-sm">
                    {technologies
                      .filter((t) => t.group === g)
                      .map((t) => (
                        <li key={t.name} className="flex items-center justify-between gap-4">
                          <span>{t.name}</span>
                          <span className="flex items-center" title={t.level}>
                            <LevelDots level={levels.findIndex((l) => l.level === t.level)} />
                            <span className="sr-only">{t.level}</span>
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="education">
        <Container className="grid gap-12 lg:grid-cols-3">
          <div>
            <h2 id="education" className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">
              Education
            </h2>
            {education.map((e) => (
              <div key={e.award} className="mt-6">
                <p className="font-display text-2xl leading-tight">{e.award}</p>
                <p className="mt-1 text-sm text-muted">
                  {e.institution} · {e.period}
                </p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">Certifications</h2>
            <ul className="mt-6 grid gap-5">
              {certifications.map((c) => (
                <li key={c.name}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="font-medium leading-snug hover:text-accent">
                    {c.name} ↗
                  </a>
                  <p className="mt-1 text-sm text-muted">
                    {c.issuer} · {c.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">Publications</h2>
            <ul className="mt-6 grid gap-5">
              {publications.map((p) => (
                <li key={p.href}>
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="font-medium leading-snug hover:text-accent">
                    {p.title} ↗
                  </a>
                  <p className="mt-1 text-sm text-muted">
                    {p.authors}. {p.venue}, {p.date}.
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <ContactCta />
    </>
  );
}

function LevelDots({ level }: { level: number }) {
  return (
    <span aria-hidden className="flex gap-0.5">
      {[0, 1, 2].map((i) => (
        <span key={i} className={`size-1.5 rounded-full ${i < 3 - level ? "bg-accent" : "bg-line"}`} />
      ))}
    </span>
  );
}
