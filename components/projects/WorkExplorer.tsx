"use client";

import { useMemo, useState } from "react";
import { categories, type CategoryId, type Project } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

export function WorkExplorer({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (active !== "all" && !p.categories.includes(active)) return false;
      if (!q) return true;
      const haystack = [p.name, p.org, p.summary, p.domain, ...p.technologies].join(" ").toLowerCase();
      return haystack.includes(q);
    });
  }, [projects, active, query]);

  const filters = [{ id: "all" as const, label: "All projects" }, ...categories];

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={active === f.id}
              onClick={() => setActive(f.id)}
              className="rounded-full border border-line px-3.5 py-1.5 text-sm text-muted transition hover:border-fg/40 hover:text-fg aria-pressed:border-fg aria-pressed:bg-fg aria-pressed:text-bg"
            >
              {f.label}
            </button>
          ))}
        </div>
        <label className="relative block lg:w-64">
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search — e.g. FastAPI, RAG"
            className="h-10 w-full rounded-full border border-line bg-raised px-4 text-sm placeholder:text-muted/70"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
      </p>

      {visible.length ? (
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-12 rounded-2xl border border-dashed border-line p-10 text-center text-muted">
          No projects match that filter yet.
        </p>
      )}
    </div>
  );
}
