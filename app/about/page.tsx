import type { Metadata } from "next";
import Image from "next/image";
import { profile } from "@/content/profile";
import { Container, Eyebrow, SectionHeading } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { ArrowLink } from "@/components/shared/ArrowLink";
import { ContactCta } from "@/components/home/ContactCta";

export const metadata: Metadata = {
  title: "About",
  description:
    "How Rich Kitibwa builds whole products across many domains, such as healthcare, AI, sport, enterprise and media.",
  alternates: { canonical: "/about" },
};

const approach = [
  ["Understand the problem", "Who is affected, what they actually do today, and what “better” would mean to them."],
  ["Find the real cause", "Separate symptoms from causes. Requirements come from the work, not from assumptions."],
  ["Weigh the options", "Look at a few ways to solve it and be clear about what each one costs: money, risk, time and upkeep."],
  ["Design the system", "Pick the simplest design that works: data, services, screens and what happens when things fail."],
  ["Build it", "Ship small working pieces often, across frontend, backend, infrastructure or hardware."],
  ["Test and validate", "Check it against reality: tests, known answers, feedback from the field and real users."],
  ["Measure and improve", "Use what the evidence says to decide what to fix next."],
];

// In Rich's words: "backend, front end, deploying on Vercel, Dokploy, CI/CD, debugging, I do it all".
const dayToDay = [
  ["Backend", "APIs, data models, background jobs and the integrations between them."],
  ["Frontend and mobile", "Web apps in React and Next.js, mobile apps in React Native and Expo."],
  ["Deployment", "Shipping to Vercel and self-hosted Dokploy servers, and getting apps through App Store review."],
  ["CI/CD", "Pipelines that test and release every change, so shipping is routine instead of an event."],
  ["Debugging", "Tracing production issues across services until the cause is found, not just the symptom."],
  ["Talking to people", "The people who will use the product, other engineers and the people who run the business. Most requirements come from listening."],
];

export default function AboutPage() {
  return (
    <>
      <section className="pb-20 pt-16 sm:pt-24">
        <Container className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <Eyebrow>About</Eyebrow>
            <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl">
              I like problems that don&apos;t fit neatly into one field.
            </h1>
          </div>
          <div className="relative aspect-[4/5] w-full max-w-xs overflow-hidden rounded-2xl border border-line">
            <Image src={profile.portrait.src} alt={profile.portrait.alt} fill sizes="320px" className="object-cover" />
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28" aria-labelledby="story">
        <Container className="grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <h2 id="story" className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">
            My story
          </h2>
          <Reveal className="prose-body max-w-3xl text-lg leading-relaxed">
            <p>
              My career began in a diagnostic laboratory. As a medical laboratory technologist I ran chemistry,
              haematology and microbiology tests where a careless result has real consequences. That work taught me
              quality control, attention to detail, and respect for how much depends on reliable information.
            </p>
            <p>
              I was drawn to software because it could fix problems I saw every day: slow processes, scattered
              information, decisions made without the right data. Alongside my lab work, I started building web
              applications at Powem, a software studio in Nairobi, working remotely. Then I joined MamaOpe Medicals, a
              healthtech company working on pneumonia and respiratory care.
            </p>
            <p>
              At MamaOpe my scientific background stopped being a side note and became an advantage. I&apos;ve worked on
              a respiratory screening device (hardware, signal processing and its Android app) and on the AI
              systems behind HealthNavi and Empirico. I co-authored the published evaluation of our clinical decision-support
              system, and I can talk with clinicians about how it should behave as easily as I can talk with engineers
              about how it&apos;s built.
            </p>
            <p>
              Alongside that, I build products well outside healthcare: an enterprise procurement platform and a sports
              streaming product with live video, payments and mobile apps. I build them with other engineers and own
              my work end to end. Different domains, same discipline.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line bg-raised py-20 sm:py-28" aria-labelledby="approach">
        <Container>
          <SectionHeading
            id="approach"
            eyebrow="How I approach problems"
            title="Seven steps I come back to, whatever the stack."
          />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {approach.map(([title, body], i) => (
              <li key={title} className="bg-raised p-6">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </li>
            ))}
            <li className="flex items-end bg-ink p-6 text-ink-fg">
              <p className="font-display text-2xl leading-tight">
                Then repeat, <em className="text-ink-accent">with better evidence.</em>
              </p>
            </li>
          </ol>
        </Container>
      </section>

      <section className="py-20 sm:py-28" aria-labelledby="day-to-day">
        <Container className="grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <h2 id="day-to-day" className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">
            On any given day
          </h2>
          <Reveal className="max-w-3xl">
            <p className="font-display text-3xl leading-snug sm:text-4xl">
              I work on the whole product, from the database to the screen to the release.
            </p>
            <ul className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {dayToDay.map(([title, body]) => (
                <li key={title} className="border-t border-line pt-4">
                  <p className="font-medium">{title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-20 sm:py-28" aria-labelledby="drives">
        <Container className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 id="drives" className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">
              What drives my work
            </h2>
            <p className="mt-6 text-lg leading-relaxed">
              Problems that matter to the people who have them, in any field. I like work where different worlds meet:
              medicine and machine learning, sport and live video, money and business rules, hardware and software.
              Every new field means learning how people really work, and that is the part I enjoy most.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">Professional philosophy</h2>
            <blockquote className="mt-6 font-display text-3xl leading-snug sm:text-4xl">
              Technology is a tool, not the goal. A solution is worth what it solves, how reliably it works and the
              difference it makes.
            </blockquote>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-line py-20" aria-labelledby="education">
        <Container className="grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <h2 id="education" className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-muted">
            Education
          </h2>
          <div className="max-w-3xl">
            <p className="font-display text-3xl">BSc Biomedical Laboratory Technology</p>
            <p className="mt-2 text-muted">Makerere University, Kampala · Graduated January 2022</p>
            <p className="mt-6 leading-relaxed text-muted">
              Laboratory science gave me scientific reasoning, a habit of checking evidence, and a working understanding
              of the clinical systems I now build software for. I added structured computer-science training through
              MITx in 2024.
            </p>
            <div className="mt-8">
              <ArrowLink href="/experience">Experience, skills & certifications</ArrowLink>
            </div>
          </div>
        </Container>
      </section>

      <ContactCta />
    </>
  );
}
