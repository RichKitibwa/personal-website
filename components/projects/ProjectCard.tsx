import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/content/projects";
import { StatusBadge } from "./StatusBadge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-raised transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/5">
      <div
        className="relative aspect-[16/10] overflow-hidden border-b border-line"
        style={{ background: `linear-gradient(135deg, ${project.accent}26, transparent 70%)` }}
      >
        {project.cover ? (
          <Image
            src={project.cover.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className={
              project.cover.frame === "phone"
                ? "object-contain object-bottom pt-6 transition duration-500 group-hover:scale-[1.03]"
                : "object-cover object-top transition duration-500 group-hover:scale-[1.03]"
            }
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center p-6">
            <ol aria-hidden className="flex w-full flex-wrap items-center justify-center gap-1.5">
              {project.architecture?.nodes.slice(0, 4).map((n, i) => (
                <li key={n.label} className="flex items-center gap-1.5">
                  <span className="rounded-md border border-line bg-bg/90 px-2 py-1 text-[0.68rem] font-medium">{n.label}</span>
                  {i < 3 ? <span className="text-muted">→</span> : null}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          <span className="text-xs text-muted">{project.org}</span>
        </div>
        <h3 className="mt-4 font-display text-3xl leading-tight">
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {project.name}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
        <p className="mt-4 text-xs text-muted">
          <span className="font-medium text-fg">Role:</span> {project.engagement}
        </p>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.technologies.slice(0, 5).map((t) => (
            <li key={t} className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[0.68rem] text-fg/80">
              {t}
            </li>
          ))}
        </ul>
        <span className="mt-auto pt-6 text-sm font-medium text-accent">
          Read case study <span aria-hidden>→</span>
        </span>
      </div>
    </article>
  );
}
