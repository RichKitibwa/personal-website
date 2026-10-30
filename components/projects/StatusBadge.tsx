import type { ProjectStatus } from "@/content/projects";

const tone: Record<ProjectStatus, string> = {
  "In production": "bg-emerald-500",
  "Piloted in clinics": "bg-rose-500",
  "Research & development": "bg-violet-500",
  "In active development": "bg-sky-500",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line px-2.5 py-1 text-xs text-muted">
      <span aria-hidden className={`size-1.5 rounded-full ${tone[status]}`} />
      {status}
    </span>
  );
}
