import { profile } from "@/content/profile";
import { Container, Eyebrow } from "@/components/shared/Section";
import { Button } from "@/components/shared/Button";

export function ContactCta() {
  return (
    <section className="bg-ink text-ink-fg" aria-labelledby="cta-title">
      <Container className="py-24 sm:py-32">
        <Eyebrow className="text-ink-muted">Let&apos;s connect</Eyebrow>
        <h2 id="cta-title" className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl">
          Have something to build or fix? <em className="text-ink-accent">Let&apos;s talk.</em>
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink-fg/75">
          Whether you&apos;re building a product, improving an existing system or exploring an idea that needs someone who
          can work across disciplines, I&apos;d be glad to hear from you. {profile.availability}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/contact" variant="inverse">
            Start a conversation
          </Button>
          <Button href={`mailto:${profile.email}`} variant="secondary">
            {profile.email}
          </Button>
        </div>
      </Container>
    </section>
  );
}
