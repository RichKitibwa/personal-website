import { Container, Eyebrow } from "@/components/shared/Section";
import { Button } from "@/components/shared/Button";

export default function NotFound() {
  return (
    <section className="py-32">
      <Container>
        <Eyebrow>404</Eyebrow>
        <h1 className="mt-5 font-display text-6xl leading-none tracking-tight">This page doesn&apos;t exist.</h1>
        <p className="mt-6 text-lg text-muted">It may have moved. The work is still here, though.</p>
        <div className="mt-10 flex gap-3">
          <Button href="/">Home</Button>
          <Button href="/work" variant="secondary">
            See the work
          </Button>
        </div>
      </Container>
    </section>
  );
}
