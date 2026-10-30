import type { FlowNode } from "@/content/projects";

// Architecture/flow diagram rendered as an ordered list, so it is readable by
// screen readers and reflows from a row (desktop) to a column (mobile).
export function FlowDiagram({
  nodes,
  title,
  note,
  tone = "light",
}: {
  nodes: FlowNode[];
  title: string;
  note?: string;
  tone?: "light" | "ink";
}) {
  const ink = tone === "ink";
  return (
    <figure
      className={`rounded-2xl border p-5 sm:p-7 ${ink ? "border-ink-line bg-ink text-ink-fg" : "border-line bg-raised"}`}
    >
      <figcaption className={`font-mono text-[0.7rem] uppercase tracking-[0.18em] ${ink ? "text-ink-muted" : "text-muted"}`}>
        {title}
      </figcaption>
      <ol className="mt-6 grid gap-3 lg:auto-cols-fr lg:grid-flow-col">
        {nodes.map((node, i) => (
          <li key={node.label} className="relative flex lg:flex-col">
            <div
              className={`flex-1 rounded-xl border p-4 ${ink ? "border-ink-line bg-white/[0.03]" : "border-line bg-bg"}`}
            >
              <span className={`font-mono text-[0.68rem] ${ink ? "text-ink-accent" : "text-accent"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2 text-sm font-semibold leading-snug">{node.label}</p>
              <p className={`mt-1 text-xs leading-relaxed ${ink ? "text-ink-muted" : "text-muted"}`}>{node.detail}</p>
            </div>
            {i < nodes.length - 1 ? (
              <span
                aria-hidden
                className={`absolute z-10 grid size-6 place-items-center rounded-full border text-[0.7rem] max-lg:-bottom-[1.05rem] max-lg:left-6 max-lg:rotate-90 lg:-right-[1.05rem] lg:top-1/2 lg:-translate-y-1/2 ${ink ? "border-ink-line bg-ink text-ink-accent" : "border-line bg-raised text-accent"}`}
              >
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      {note ? <p className={`mt-5 text-xs leading-relaxed ${ink ? "text-ink-muted" : "text-muted"}`}>{note}</p> : null}
    </figure>
  );
}
