// Insights index. To publish an article:
//   1. Add content/articles/<slug>.mdx (plain Markdown + optional JSX).
//   2. Add an entry below. Entries with `draft: true` are not listed or built.
// Only publish articles written from genuine experience.

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date, e.g. "2026-11-15"
  tags: string[];
  draft?: boolean;
};

export const articles: ArticleMeta[] = [];

export const publishedArticles = articles
  .filter((a) => !a.draft)
  .sort((a, b) => b.date.localeCompare(a.date));

// Earlier posts published elsewhere (dev.to, later Medium). Listed on /insights and opened on the
// original site. Only add writing Rich actually published.
export type ExternalArticle = {
  title: string;
  description: string;
  date: string; // ISO date
  href: string;
  source: string;
};

export const externalArticles: ExternalArticle[] = [
  {
    title: "Building a web app with user authentication using Flask",
    description: "A step-by-step guide to sign-up, login and protected pages in a Flask app.",
    date: "2021-08-27",
    href: "https://dev.to/richkitibwa/building-a-webapp-with-user-authentification-using-flask-443h",
    source: "dev.to",
  },
  {
    title: "A gentle introduction to Flask",
    description: "What Flask is, and how to get a first Python web app running.",
    date: "2021-08-11",
    href: "https://dev.to/richkitibwa/a-gentle-introduction-to-flask-2d95",
    source: "dev.to",
  },
  {
    title: "Introduction to Python functions",
    description: "How functions work in Python and why they make code easier to reuse.",
    date: "2021-08-03",
    href: "https://dev.to/richkitibwa/introduction-to-python-functions-79d",
    source: "dev.to",
  },
];
