import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject, categories } from "@/content/projects";
import { Container, Eyebrow } from "@/components/shared/Section";
import { MediaFrame } from "@/components/projects/MediaFrame";
import { FlowDiagram } from "@/components/projects/FlowDiagram";
import { StatusBadge } from "@/components/projects/StatusBadge";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { Reveal } from "@/components/shared/Reveal";
import { JsonLd } from "@/components/shared/JsonLd";
import { ContactCta } from "@/components/home/ContactCta";
import { breadcrumbJsonLd } from "@/lib/structured-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name} — case study`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      title,
      description: project.summary,
      url: `/work/${project.slug}`,
      images: project.cover?.frame === "browser" ? [{ url: project.cover.src, alt: project.cover.alt }] : undefined,
    },
  };
}

function Block({ title, children, id }: { title: string; children: React.ReactNode; id: string }) {
  return (
    <Reveal as="section" aria-labelledby={id} className="grid gap-6 border-t border-line py-14 lg:grid-cols-[14rem_1fr] lg:gap-16">
      <h2 id={id} className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted lg:pt-1.5">
        {title}
      </h2>
      <div className="max-w-3xl">{children}</div>
    </Reveal>
  );
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="prose-body text-lg leading-relaxed">
      {items.map((t) => (
        <p key={t}>{t}</p>
      ))}
    </div>
  );
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const categoryLabels = categories.filter((c) => project.categories.includes(c.id)).map((c) => c.label);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.name, path: `/work/${project.slug}` },
        ])}
      />

      <article>
        <header className="relative overflow-hidden bg-ink pb-16 pt-14 text-ink-fg sm:pt-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-32 -top-32 size-[30rem] rounded-full blur-3xl"
            style={{ background: `${project.accent}22` }}
          />
          <Container className="relative">
            <nav aria-label="Breadcrumb" className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-muted">
              <Link href="/work" className="hover:text-ink-accent">
                Work
              </Link>{" "}
              / {project.name}
            </nav>
            <p className="mt-8 text-sm text-ink-muted">
              {project.org} · {project.domain}
            </p>
            <h1 className="mt-3 font-display text-5xl leading-none tracking-tight sm:text-7xl">{project.name}</h1>
            <p className="mt-6 max-w-3xl font-display text-2xl leading-snug text-ink-fg/90 sm:text-3xl">
              {project.headline}
            </p>

            <dl className="mt-12 grid gap-6 border-t border-ink-line pt-8 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <dt className="text-ink-muted">My role</dt>
                <dd className="mt-1.5">{project.engagement}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Status</dt>
                <dd className="mt-1.5">
                  {project.status}
                  {project.period ? <span className="text-ink-muted"> · {project.period}</span> : null}
                </dd>
              </div>
              <div>
                <dt className="text-ink-muted">Areas</dt>
                <dd className="mt-1.5">{categoryLabels.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-ink-muted">Stack</dt>
                <dd className="mt-1.5">{project.technologies.slice(0, 5).join(" · ")}</dd>
              </div>
            </dl>
          </Container>
        </header>

        {project.cover ? (
          <div className="border-b border-line" style={{ background: `linear-gradient(180deg, ${project.accent}14, transparent)` }}>
            <Container className={`py-14 ${project.cover.frame === "phone" ? "flex justify-center" : ""}`}>
              <div className={project.cover.frame === "browser" ? "mx-auto max-w-4xl" : ""}>
                <MediaFrame media={project.cover} priority sizes="(min-width: 1024px) 896px, 100vw" />
              </div>
            </Container>
          </div>
        ) : null}

        {project.metrics?.length ? (
          <section aria-label="Key results" className="border-b border-line">
            <Container>
              <dl className="grid grid-cols-2 lg:grid-cols-4">
                {project.metrics.map((m) => (
                  <div key={m.label} className="border-line py-8 pr-4 max-lg:[&:nth-child(-n+2)]:border-b lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
                    <dt className="sr-only">{m.label}</dt>
                    <dd>
                      <span className="font-display text-5xl">{m.value}</span>
                      <span className="mt-2 block text-sm leading-snug text-muted">{m.label}</span>
                      <a
                        href={m.source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block font-mono text-[0.65rem] text-muted underline decoration-line underline-offset-4 hover:text-accent"
                      >
                        Source: {m.source.label}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </Container>
          </section>
        ) : null}

        <Container className="pb-10 pt-6">
          <Block title="The problem" id="problem">
            <Paragraphs items={project.problem} />
          </Block>
          <Block title="Context" id="context">
            <Paragraphs items={project.context} />
          </Block>
          <Block title="The solution" id="solution">
            <Paragraphs items={project.solution} />
          </Block>

          {project.architecture ? (
            <Reveal as="section" aria-labelledby="architecture" className="border-t border-line py-14">
              <h2 id="architecture" className="mb-8 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">
                Architecture
              </h2>
              <FlowDiagram
                title={project.architecture.title}
                nodes={project.architecture.nodes}
                note={project.architecture.note}
              />
            </Reveal>
          ) : null}

          <Block title="What I did" id="role">
            <div className="grid gap-8 sm:grid-cols-2">
              {project.role.map((group) => (
                <div key={group.area}>
                  <h3 className="font-semibold">{group.area}</h3>
                  <ul className="mt-3 grid gap-2.5 text-[0.95rem] leading-relaxed text-muted">
                    {group.items.map((item) => (
                      <li key={item} className="relative pl-4 before:absolute before:left-0 before:top-[0.7em] before:size-1.5 before:rounded-full before:bg-accent">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Engineering decisions" id="decisions">
            <dl className="grid gap-8">
              {project.decisions.map((d) => (
                <div key={d.title}>
                  <dt className="text-lg font-semibold">{d.title}</dt>
                  <dd className="mt-2 leading-relaxed text-muted">{d.body}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block title="Challenges" id="challenges">
            <dl className="grid gap-8">
              {project.challenges.map((c) => (
                <div key={c.title}>
                  <dt className="text-lg font-semibold">{c.title}</dt>
                  <dd className="mt-2 leading-relaxed text-muted">{c.body}</dd>
                </div>
              ))}
            </dl>
          </Block>

          <Block title="Outcomes" id="outcomes">
            <ul className="grid gap-3 text-lg leading-relaxed">
              {project.outcomes.map((o) => (
                <li key={o} className="relative pl-6 before:absolute before:left-0 before:text-accent before:content-['—']">
                  {o}
                </li>
              ))}
            </ul>
          </Block>

          {project.gallery.length ? (
            <Block title="Screens" id="screens">
              <div className={`grid gap-8 ${project.gallery[0].frame === "phone" ? "sm:grid-cols-2" : ""}`}>
                {project.gallery.map((m) => (
                  <MediaFrame key={m.src} media={m} />
                ))}
              </div>
            </Block>
          ) : null}

          <Block title="Technologies" id="technologies">
            <ul className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <li key={t} className="rounded-full border border-line px-3 py-1.5 font-mono text-xs">
                  {t}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="What I took away" id="learnings">
            <Paragraphs items={project.learnings} />
          </Block>

          {project.links.length ? (
            <Block title="References" id="references">
              <ul className="grid gap-3">
                {project.links.map((l) => (
                  <li key={l.href}>
                    <ArrowLink href={l.href}>{l.label}</ArrowLink>
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}
        </Container>

        <nav aria-label="Next project" className="border-t border-line">
          <Container className="py-16">
            <Eyebrow>Next case study</Eyebrow>
            <Link href={`/work/${next.slug}`} className="group mt-4 block">
              <span className="font-display text-5xl leading-none tracking-tight transition group-hover:text-accent sm:text-6xl">
                {next.name} <span aria-hidden>→</span>
              </span>
              <span className="mt-3 block max-w-2xl text-muted">{next.headline}</span>
            </Link>
            <div className="mt-6">
              <StatusBadge status={next.status} />
            </div>
          </Container>
        </nav>
      </article>
      <ContactCta />
    </>
  );
}
