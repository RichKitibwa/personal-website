import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { Container, Eyebrow } from "@/components/shared/Section";
import { WorkExplorer } from "@/components/projects/WorkExplorer";
import { ContactCta } from "@/components/home/ContactCta";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies from Rich Kitibwa: clinical decision support, a medical knowledge platform, a respiratory screening device, a sports streaming product and an enterprise procurement platform.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <section className="pb-24 pt-16 sm:pt-24">
        <Container>
          <Eyebrow>Work</Eyebrow>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl">
            Products I&apos;ve helped bring into the world.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Healthcare, AI, hardware, enterprise and media. Each case study separates what the product does from what I
            personally contributed, and links to public evidence where it exists.
          </p>
          <div className="mt-14">
            <WorkExplorer projects={projects} />
          </div>
        </Container>
      </section>
      <ContactCta />
    </>
  );
}
