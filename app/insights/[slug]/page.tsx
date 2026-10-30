import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { publishedArticles } from "@/content/articles";
import { profile } from "@/content/profile";
import { Container } from "@/components/shared/Section";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { absoluteUrl, siteUrl } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  // Next requires at least one param for a static dynamic route; the
  // placeholder is never linked and 404s (see below).
  return publishedArticles.length ? publishedArticles.map((a) => ({ slug: a.slug })) : [{ slug: "_" }];
}

const findArticle = (slug: string) => publishedArticles.find((a) => a.slug === slug);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/insights/${article.slug}` },
    openGraph: { type: "article", title: article.title, description: article.description, publishedTime: article.date },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = findArticle(slug);
  if (!article) notFound();

  const { default: Body } = await import(`@/content/articles/${article.slug}.mdx`);

  return (
    <article className="pb-24 pt-16 sm:pt-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.description,
          datePublished: article.date,
          author: { "@type": "Person", "@id": `${siteUrl}/#person`, name: profile.name },
          mainEntityOfPage: absoluteUrl(`/insights/${article.slug}`),
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/insights" },
          { name: article.title, path: `/insights/${article.slug}` },
        ])}
      />
      <Container className="max-w-3xl">
        <Link href="/insights" className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted hover:text-accent">
          ← Insights
        </Link>
        <h1 className="mt-8 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl">{article.title}</h1>
        <p className="mt-4 text-muted">
          <time dateTime={article.date}>{article.date}</time> · {profile.name}
        </p>
        <div className="prose-article mt-12">
          <Body />
        </div>
      </Container>
    </article>
  );
}
