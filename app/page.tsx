import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { featuredProjects, getProject } from "@/content/projects";
import { capabilities } from "@/content/skills";
import { experience, publications } from "@/content/experience";
import { Container, Eyebrow, SectionHeading } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/shared/Button";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { MediaFrame } from "@/components/projects/MediaFrame";
import { FlowDiagram } from "@/components/projects/FlowDiagram";
import { StatusBadge } from "@/components/projects/StatusBadge";
import { ContactCta } from "@/components/home/ContactCta";

function HeroLink({ slug }: { slug: string }) {
  const project = getProject(slug);
  if (!project) throw new Error(`Unknown project slug in hero: ${slug}`);
  return (
    <Link
      href={`/work/${slug}`}
      className="text-ink-fg underline decoration-ink-accent/50 underline-offset-4 transition hover:decoration-ink-accent"
    >
      {project.name}
    </Link>
  );
}

const proof = [
  { value: "168", label: "patients in a published field evaluation of clinical software I engineer" },
  { value: "2", label: "countries piloting that software: done in Uganda, under way in Zambia" },
  { value: "5", label: "products across health, AI, hardware, enterprise and media" },
  { value: "3", label: "teams I ship for in parallel: MamaOpe, Bench and Ascension" },
];

export default function HomePage() {
  const publication = publications[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-ink-fg" aria-labelledby="hero-title">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-ink-accent/10 blur-3xl"
        />
        <Container className="relative grid gap-12 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16 lg:pb-28">
          <div>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-muted">
              <span>
                {profile.name} · Software Engineer
              </span>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-ink-accent/40 px-2.5 py-1 normal-case tracking-normal text-ink-accent transition hover:bg-ink-accent/10"
              >
                <span aria-hidden className="relative flex size-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-ink-accent/70 motion-reduce:hidden" />
                  <span className="relative size-1.5 rounded-full bg-ink-accent" />
                </span>
                Open to work
              </a>
            </p>
            <h1 id="hero-title" className="mt-6 font-display text-[2.6rem] leading-[1.02] tracking-tight sm:text-[3.6rem] lg:text-[3.9rem]">
              I build <em className="text-ink-accent">whole</em> products for all kinds of users: clinicians, sports fans,
              procurement teams and more.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-fg/80">
              I&apos;m Rich, a software engineer. At MamaOpe Medicals I work on <HeroLink slug="healthnavi" />, clinical
              decision-support software, and <HeroLink slug="empirico" />, a medical knowledge platform. I also build{" "}
              <HeroLink slug="bench-sports" />, a sports streaming app, and <HeroLink slug="ascension-procurement" />, a
              procurement system. I build with other engineers and own my work end to end: backend, frontend, deployment,
              CI/CD and debugging.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/work" variant="inverse">
                Explore my work
              </Button>
              <Button href="/contact" variant="secondary">
                Let&apos;s connect
              </Button>
              <Button href={profile.resumePath} variant="secondary" newTab>
                View resume
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-ink-line">
              <Image
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                fill
                priority
                sizes="(min-width: 1024px) 384px, 90vw"
                className="object-cover grayscale-[15%]"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 right-8 rounded-xl border border-ink-line bg-ink/90 p-4 backdrop-blur sm:-left-8">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ink-muted">Currently</p>
              <p className="mt-1.5 text-sm leading-snug">
                Software Engineer at <span className="text-ink-accent">MamaOpe Medicals</span>, Bench and Ascension.
              </p>
              <p className="mt-3 flex items-start gap-2 border-t border-ink-line pt-3 text-xs leading-snug text-ink-fg/75">
                <span aria-hidden className="mt-1 size-1.5 shrink-0 rounded-full bg-ink-accent" />
                {profile.availability}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Proof strip */}
      <section aria-label="At a glance" className="border-b border-line">
        <Container>
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {proof.map((item, i) => (
              <Reveal
                key={item.value + item.label}
                delay={i * 80}
                className="border-line py-8 pr-4 max-lg:[&:nth-child(-n+2)]:border-b lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
              >
                <dt className="sr-only">{item.label}</dt>
                <dd>
                  <span className="font-display text-5xl">{item.value}</span>
                  <span className="mt-2 block text-sm leading-snug text-muted">{item.label}</span>
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Introduction */}
      <section className="py-24 sm:py-32" aria-labelledby="intro-title">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <Eyebrow className="lg:pt-3">Who I am</Eyebrow>
          <Reveal>
            <h2 id="intro-title" className="font-display text-4xl leading-[1.1] tracking-tight sm:text-5xl">
              My work rarely stays in one field, and I like it that way.
            </h2>
            <div className="prose-body mt-8 max-w-2xl text-lg leading-relaxed text-muted">
              <p>
                In the same week I might tune a retrieval pipeline for clinicians, fix a payment flow for sports fans
                and model an approval chain for a procurement team. The users and the stakes are different every time.
                What stays the same is how I start: learn how the people involved actually work, then build the
                simplest thing that holds up in production.
              </p>
              <p>
                I came to software from a medical laboratory. It taught me to be careful with evidence and to understand
                how people really work before I build for them, whether they are doctors, fans or finance teams.
                It&apos;s part of the story, not the whole of it.
              </p>
            </div>
            <div className="mt-8">
              <ArrowLink href="/about">More about how I work</ArrowLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="border-t border-line bg-raised py-24 sm:py-32" aria-labelledby="capabilities-title">
        <Container>
          <SectionHeading
            id="capabilities-title"
            eyebrow="What I bring to the table"
            title="What I can take on."
            intro="Each one links to the project where I actually did it."
          />
          <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((cap, i) => (
              <li key={cap.id} className="flex flex-col bg-raised p-7">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-lg font-semibold leading-snug">{cap.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{cap.body}</p>
                <p className="mt-auto pt-6 text-xs text-muted">
                  Evidence:{" "}
                  {cap.projects.map((slug, j) => {
                    const p = getProject(slug);
                    return p ? (
                      <span key={slug}>
                        {j > 0 ? ", " : ""}
                        <Link href={`/work/${slug}`} className="text-fg underline decoration-line underline-offset-4 hover:decoration-accent">
                          {p.name}
                        </Link>
                      </span>
                    ) : null;
                  })}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Selected work */}
      <section className="py-24 sm:py-32" aria-labelledby="work-title">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              id="work-title"
              eyebrow="Selected work"
              title="Things I've built and still build."
              intro="Five products in five different fields. Each case study covers the problem, what I did and how it turned out."
            />
            <ArrowLink href="/work">All work</ArrowLink>
          </div>

          <div className="mt-16 grid gap-24">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.slug} as="article" className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={i % 2 ? "lg:order-2" : ""}>
                  {project.cover ? (
                    <div
                      className="rounded-3xl p-6 sm:p-10"
                      style={{ background: `linear-gradient(140deg, ${project.accent}22, transparent 75%)` }}
                    >
                      <MediaFrame media={project.cover} sizes="(min-width: 1024px) 520px, 100vw" />
                    </div>
                  ) : project.architecture ? (
                    <FlowDiagram
                      tone="ink"
                      title={project.architecture.title}
                      nodes={project.architecture.nodes.slice(0, 4)}
                    />
                  ) : null}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                    <StatusBadge status={project.status} />
                  </div>
                  <p className="mt-5 text-sm text-muted">
                    {project.org} · {project.domain}
                  </p>
                  <h3 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">{project.name}</h3>
                  <p className="mt-4 text-lg leading-relaxed">{project.headline}</p>
                  <p className="mt-3 leading-relaxed text-muted">{project.summary}</p>
                  <dl className="mt-6 grid gap-3 border-t border-line pt-6 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-muted">My role</dt>
                      <dd className="mt-1">{project.engagement}</dd>
                    </div>
                    <div>
                      <dt className="text-muted">Built with</dt>
                      <dd className="mt-1">{project.technologies.slice(0, 4).join(" · ")}</dd>
                    </div>
                  </dl>
                  <div className="mt-8">
                    <ArrowLink href={`/work/${project.slug}`}>Read the case study</ArrowLink>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Experience snapshot */}
      <section className="border-t border-line bg-raised py-24 sm:py-32" aria-labelledby="experience-title">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading id="experience-title" eyebrow="Experience" title="Where I've worked." />
            <div className="mt-8">
              <ArrowLink href="/experience">Full experience & skills</ArrowLink>
            </div>
          </div>
          <ol className="divide-y divide-line border-y border-line">
            {experience.map((role) => (
              <li key={role.org} className="grid gap-1 py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
                <div>
                  <p className="font-medium">{role.org}</p>
                  <p className="text-sm text-muted">{role.title}</p>
                </div>
                <p className="font-mono text-xs text-muted sm:pt-1">{role.period}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Background */}
      <section className="py-24 sm:py-32" aria-labelledby="background-title">
        <Container className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <SectionHeading id="background-title" eyebrow="Background" title="Education and research." />
          </div>
          <Reveal className="rounded-2xl border border-line p-7">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">Education</p>
            <p className="mt-4 font-display text-2xl leading-tight">BSc Biomedical Laboratory Technology</p>
            <p className="mt-2 text-sm text-muted">Makerere University · 2022</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Plus MITx coursework in computer science with Python and in computational thinking and data science
              (2024).
            </p>
          </Reveal>
          <Reveal delay={100} className="rounded-2xl border border-line p-7">
            <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">Publication</p>
            <p className="mt-4 font-display text-2xl leading-tight">Co-author, clinical evaluation of the MamaOpe CDSS</p>
            <p className="mt-2 text-sm text-muted">
              {publication.venue} · {publication.date}
            </p>
            <div className="mt-4">
              <ArrowLink href={publication.href} className="text-sm">
                Read the paper
              </ArrowLink>
            </div>
          </Reveal>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
