import Link from "next/link";
import type { ReactNode } from "react";

export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const external = href.startsWith("http");
  const cls = `group inline-flex items-center gap-1.5 font-medium text-fg underline decoration-line underline-offset-[6px] transition-colors hover:decoration-accent ${className}`;
  const arrow = (
    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
      {external ? "↗" : "→"}
    </span>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
      {arrow}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
      {arrow}
    </Link>
  );
}
