import Link from "next/link";
import type { ReactNode } from "react";

const styles = {
  primary: "bg-accent text-bg hover:opacity-90",
  secondary: "border border-current/25 hover:border-current/60",
  inverse: "bg-ink-fg text-ink hover:bg-white",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  newTab,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: keyof typeof styles;
  /** Opens in a new tab, e.g. the resume PDF so it views in the browser instead of downloading. */
  newTab?: boolean;
  className?: string;
}) {
  const cls = `inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition ${styles[variant]} ${className}`;
  if (newTab || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
