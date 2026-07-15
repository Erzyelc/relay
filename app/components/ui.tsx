import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-lime">
      {"// "}
      {children}
    </p>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`border-t border-edge ${className}`}>
      <div className="mx-auto max-w-6xl px-6 py-24 sm:py-32">{children}</div>
    </section>
  );
}

export function MonoLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`font-mono text-[11px] uppercase tracking-[0.18em] text-slate ${className}`}
    >
      {children}
    </span>
  );
}

export function ButtonPrimary({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center bg-lime px-6 py-3 font-mono text-[13px] uppercase tracking-[0.08em] text-ink transition-colors hover:bg-paper"
    >
      {children}
    </a>
  );
}

export function ButtonSecondary({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center border border-edge px-6 py-3 font-mono text-[13px] uppercase tracking-[0.08em] text-paper transition-colors hover:border-slate"
    >
      {children}
    </a>
  );
}
