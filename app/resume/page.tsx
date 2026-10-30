import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { education, certifications, publications } from "@/content/experience";
import { siteUrl } from "@/lib/site";

// Print-ready resume. `npm run resume:pdf` renders this page to
// public/resume/Rich-Kitibwa-Resume.pdf, so the PDF and site stay in sync.

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Rich Kitibwa, software engineer working across healthcare, AI, sport, enterprise and media.",
  alternates: { canonical: "/resume" },
};

const roles = [
  {
    org: "MamaOpe Medicals",
    meta: "Kampala, Uganda",
    title: "Software Engineer — Full-Stack, AI/ML, Signal Processing & QA",
    period: "Feb 2021 – Present",
    bullets: [
      "Engineer on HealthNavi, a clinical decision-support system for respiratory illness piloted in Uganda, with a pilot under way in Zambia. Co-authored its published Uganda evaluation: 168 patients across five Kampala facilities, with 92.3% sensitivity for pneumonia and 89.5% for TB against clinicians' final diagnoses.",
      "Built the retrieval and model service behind Empirico (empirico.ai), a medical knowledge platform: PDF ingestion from AWS S3, Azure OpenAI embeddings, Zilliz/Milvus hybrid search and Gemini generation behind a FastAPI service, with source-diversified retrieval and page-level citations.",
      "Improved latency, cost and reliability with embedding and response caching, quick vs. deep search modes, streaming responses, rate limiting, concurrency controls and Docker-based deployment.",
      "Developed HealthNavi features across a React/TypeScript frontend, FastAPI backend and PostgreSQL, integrated it with the Empirico API, and evaluated AI responses against clinical reference answers.",
      "Worked on the MamaOpe smart auscultation device: hardware prototyping and testing, MATLAB respiratory-rate estimation from chest sounds, and Android (Java/Kotlin) device integration.",
    ],
  },
  {
    org: "Bench Sports Media",
    meta: "benchsports.com",
    title: "Software Engineer",
    period: "Mar 2026 – Present",
    bullets: [
      "Implemented pay-per-view and subscriber access, card-driven checkout and Stripe Connect creator flows, and creator channel onboarding for a sports streaming platform.",
      "Built live-streaming features with Mux (in-app preview, live chat, viewer counts and tipping) and fixed live streams ending early on mobile.",
      "Built out the Expo/React Native mobile app and met App Store and Google Play requirements (Sign in with Apple, in-app account deletion).",
    ],
    stack: "Next.js · React Native/Expo · TypeScript · Mux · Stripe Connect · Clerk · Vercel",
  },
  {
    org: "Ascension Services",
    meta: "ascensionservices.net",
    title: "Software Engineer",
    period: "May 2025 – Present",
    bullets: [
      "Full-stack engineer on an enterprise procurement platform (suppliers, RFQs, purchase orders, inventory, payments); 700+ commits across the FastAPI backend and Next.js frontend.",
      "Built purchase-order amendments and cancellations, approval forwarding, quote-integrity checks and printable procurement documents.",
      "Implemented trial and subscription lifecycle emails, and moved supplier emails to Celery/Redis background queues.",
    ],
    stack: "Python · FastAPI · Next.js · TypeScript · PostgreSQL · Alembic · Celery · Redis · Docker",
  },
  {
    org: "Powem",
    meta: "Nairobi, Kenya (remote) · powem.co",
    title: "Software Engineer",
    period: "Jun 2019 – May 2020",
    bullets: ["Built, tested and maintained React web applications in a small agile team, working remotely."],
  },
  {
    org: "Lancet Laboratories",
    meta: "Kampala, Uganda",
    title: "Medical Laboratory Technologist",
    period: "Aug 2018 – Feb 2021",
    bullets: ["Performed diagnostic testing across clinical chemistry, haematology and microbiology under rigorous quality control."],
  },
];

const skills = [
  ["Languages", "Python, TypeScript, JavaScript, Java, Kotlin, MATLAB"],
  ["Web & mobile", "React, Next.js, React Native/Expo, Android"],
  ["Backend", "FastAPI, Flask, Node.js, Celery; familiar with Spring Boot, Django"],
  ["AI & data", "RAG, LLM integration (Gemini, OpenAI), embeddings, vector & hybrid search (Milvus/Zilliz), signal processing"],
  ["Data & cloud", "PostgreSQL, Redis, MongoDB, Docker, AWS, Google Cloud, DigitalOcean, Vercel, CI/CD"],
  ["Practices", "Requirements analysis, system design, testing & QA, payments (Stripe Connect), HL7 FHIR"],
];

function H({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 mt-5 border-b border-neutral-300 pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-neutral-500">
      {children}
    </h2>
  );
}

export default function ResumePage() {
  const site = siteUrl.replace(/^https?:\/\//, "");
  return (
    <div className="bg-neutral-100 py-10 print:bg-white print:py-0">
      <div className="no-print mx-auto mb-6 flex max-w-[210mm] items-center justify-between px-4 text-sm text-neutral-600">
        <span>Resume, printable view</span>
        <a href={profile.resumePath} target="_blank" rel="noopener noreferrer" className="rounded-full bg-neutral-900 px-4 py-2 font-medium text-white">
          Open PDF
        </a>
      </div>

      <article className="mx-auto max-w-[210mm] bg-white px-[16mm] py-[14mm] text-[9.6pt] leading-[1.42] text-neutral-900 shadow-sm print:max-w-none print:p-0 print:shadow-none">
        <header className="flex items-end justify-between gap-6 border-b-2 border-neutral-900 pb-3">
          <div>
            <h1 className="font-display text-[28pt] leading-none">{profile.name}</h1>
            <p className="mt-1.5 text-[10.5pt] text-neutral-700">
              Software & Product Engineer · Applied AI · Health Technology
            </p>
          </div>
          <ul className="text-right text-[8.6pt] leading-[1.5] text-neutral-700">
            <li>{profile.location}</li>
            <li>{profile.email} · {profile.phone}</li>
            <li>linkedin.com/in/kitibwa-rich · github.com/RichKitibwa</li>
            {siteUrl.includes("localhost") ? null : <li>{site}</li>}
          </ul>
        </header>

        <H>Profile</H>
        <p>
          Software and product engineer with over six years of experience building AI systems, clinical software and
          digital products, after starting my career as a medical laboratory technologist. I work across frontend,
          backend, mobile, data and infrastructure, and with clinicians, product owners and business stakeholders, to
          turn complex requirements into software that works in the real world. Co-author of a published clinical
          evaluation of AI decision-support software.
        </p>

        <H>Experience</H>
        <div className="grid gap-3.5">
          {roles.map((r) => (
            <section key={r.org} className="break-inside-avoid">
              <div className="flex items-baseline justify-between gap-4">
                <p>
                  <span className="font-semibold">{r.org}</span>
                  {r.meta ? <span className="text-neutral-500"> · {r.meta}</span> : null}
                </p>
                <p className="shrink-0 text-[8.6pt] text-neutral-600">{r.period}</p>
              </div>
              <p className="italic text-neutral-700">{r.title}</p>
              <ul className="mt-1 grid gap-0.5 pl-3.5 [list-style:disc] marker:text-neutral-400">
                {r.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              {r.stack ? <p className="mt-0.5 text-[8.6pt] text-neutral-600">Stack: {r.stack}</p> : null}
            </section>
          ))}
        </div>

        <div className="break-inside-avoid">
          <H>Skills</H>
          <dl className="grid grid-cols-[7.5rem_1fr] gap-x-3 gap-y-0.5">
            {skills.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="font-semibold">{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid grid-cols-2 gap-x-8 break-inside-avoid">
          <div>
            <H>Education</H>
            {education.map((e) => (
              <p key={e.award}>
                <span className="font-semibold">{e.award}</span>
                <br />
                {e.institution} · {e.period.replace("Graduated ", "")}
              </p>
            ))}
            <H>Certifications</H>
            <ul className="grid gap-0.5">
              {certifications.map((c) => (
                <li key={c.name}>
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="underline decoration-neutral-300 underline-offset-2">
                    {c.name}
                  </a>
                  , {c.issuer}, {c.date}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <H>Publication</H>
            {publications.map((p) => (
              <p key={p.href}>
                {p.authors}. <span className="italic">{p.title}.</span> {p.venue}, {p.date}. doi:10.12688/verixiv.2433.1
              </p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}
