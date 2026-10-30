import type { Metadata } from "next";
import { profile } from "@/content/profile";
import { Container, Eyebrow } from "@/components/shared/Section";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Rich Kitibwa about roles, projects, consulting or collaboration.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="pb-28 pt-16 sm:pt-24">
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-5 font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl">
            Have something to build or fix? <em className="text-accent">Let&apos;s talk.</em>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Whether you&apos;re hiring, building a product, improving an existing system or exploring an idea that needs
            someone who works across disciplines, I&apos;d be glad to hear from you.
          </p>
          <dl className="mt-12 grid gap-6 border-t border-line pt-8 text-sm">
            <div>
              <dt className="text-muted">Email</dt>
              <dd className="mt-1 text-base">
                <a href={`mailto:${profile.email}`} className="underline decoration-line underline-offset-4 hover:decoration-accent">
                  {profile.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Elsewhere</dt>
              <dd className="mt-1 flex gap-5 text-base">
                <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-accent">
                  LinkedIn ↗
                </a>
                <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-accent">
                  GitHub ↗
                </a>
                <a href={profile.resumePath} target="_blank" rel="noopener noreferrer" className="underline decoration-line underline-offset-4 hover:decoration-accent">
                  Resume (PDF)
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-muted">Based in</dt>
              <dd className="mt-1 text-base">{profile.location} · East Africa Time (UTC+3)</dd>
            </div>
            <div>
              <dt className="text-muted">Availability</dt>
              <dd className="mt-1 text-base">{profile.availability}</dd>
            </div>
          </dl>
        </div>
        <div className="lg:pt-8">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
