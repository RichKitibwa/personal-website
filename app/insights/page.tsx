import type { Metadata } from "next";
import Link from "next/link";
import { externalArticles, publishedArticles } from "@/content/articles";
import { Container, Eyebrow } from "@/components/shared/Section";
import { ContactCta } from "@/components/home/ContactCta";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Writing by Rich Kitibwa on engineering AI systems, clinical software, product development and working across disciplines.",
  alternates: { canonical: "/insights" },
};

const upcoming = [
  "What building an AI-powered clinical decision-support system taught me about engineering",
  "Building reliable RAG systems: retrieval, provenance and evaluation",
  "From biomedical science to software engineering: the value of interdisciplinary thinking",
];

const dateFmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function InsightsPage() {
  return (
    <>
      <section className="pb-24 pt-16 sm:pt-24">
        <Container>
          <Eyebrow>Insights</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl">
            Notes from building things that have to work.
          </h1>

          {publishedArticles.length ? (
            <ol className="mt-16 divide-y divide-line border-y border-line">
              {publishedArticles.map((a) => (
                <li key={a.slug}>
                  <Link href={`/insights/${a.slug}`} className="group grid gap-2 py-8 sm:grid-cols-[10rem_1fr] sm:gap-10">
                    <time dateTime={a.date} className="font-mono text-xs text-muted sm:pt-2">
                      {dateFmt.format(new Date(a.date))}
                    </time>
                    <span>
                      <span className="font-display text-3xl leading-tight transition group-hover:text-accent">{a.title}</span>
                      <span className="mt-2 block text-muted">{a.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          ) : null}

          <div className="mt-16 max-w-3xl rounded-2xl border border-dashed border-line p-8 sm:p-10">
            <p className="text-lg">New articles are being written. Topics in progress:</p>
            <ul className="mt-6 grid gap-3">
              {upcoming.map((t) => (
                <li key={t} className="relative pl-6 text-muted before:absolute before:left-0 before:text-accent before:content-['—']">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {externalArticles.length ? (
            <div className="mt-20">
              <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">Earlier writing</h2>
              <p className="mt-3 max-w-2xl text-muted">
                Tutorials I wrote in 2021 while getting deep into Python and web development.
              </p>
              <ol className="mt-8 divide-y divide-line border-y border-line">
                {externalArticles.map((a) => (
                  <li key={a.href}>
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid gap-2 py-7 sm:grid-cols-[10rem_1fr] sm:gap-10"
                    >
                      <time dateTime={a.date} className="font-mono text-xs text-muted sm:pt-2">
                        {dateFmt.format(new Date(a.date))}
                      </time>
                      <span>
                        <span className="font-display text-2xl leading-tight transition group-hover:text-accent sm:text-3xl">
                          {a.title} <span aria-hidden className="text-lg">↗</span>
                        </span>
                        <span className="mt-2 block text-muted">
                          {a.description} <span className="text-xs">On {a.source}.</span>
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </Container>
      </section>
      <ContactCta />
    </>
  );
}
