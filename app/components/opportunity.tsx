"use client";

import { revealStyle, useCountUp, useInView } from "./motion";
import { Eyebrow, MonoLabel, Section } from "./ui";

const stats = [
  { label: "Customers affected", value: 42, format: (v: number) => `${v}` },
  {
    label: "ARR at risk",
    value: 74200,
    format: (v: number) => `$${v.toLocaleString("en-US")}`,
  },
  { label: "Sales deals blocked", value: 8, format: (v: number) => `${v}` },
  { label: "Mentions", value: 184, format: (v: number) => `${v}` },
];

function StatRow({
  label,
  value,
  format,
  index,
  inView,
}: {
  label: string;
  value: number;
  format: (v: number) => string;
  index: number;
  inView: boolean;
}) {
  const delay = 200 + index * 150;
  const displayed = useCountUp(value, inView, 1000, delay);

  return (
    <div
      className="flex items-baseline justify-between gap-4"
      style={revealStyle(inView, delay)}
    >
      <dt>
        <MonoLabel>{label}</MonoLabel>
      </dt>
      <dd className="font-mono text-sm text-paper">{format(displayed)}</dd>
    </div>
  );
}

function OpportunityCard() {
  const { ref, inView } = useInView();

  return (
    <div ref={ref} className="border border-edge bg-graphite">
      <div className="border-b border-edge px-6 py-3">
        <MonoLabel>Product opportunity</MonoLabel>
      </div>
      <div className="p-6 sm:p-8">
        <h3
          className="font-display text-2xl font-semibold tracking-tight"
          style={revealStyle(inView, 0)}
        >
          Improve SSO onboarding
        </h3>

        <dl className="mt-8 space-y-4 border-t border-edge pt-6">
          {stats.map((stat, i) => (
            <StatRow
              key={stat.label}
              label={stat.label}
              value={stat.value}
              format={stat.format}
              index={i}
              inView={inView}
            />
          ))}
        </dl>

        <div className="mt-8 border-t border-edge pt-6">
          <div
            className="flex items-baseline justify-between gap-4"
            style={revealStyle(inView, 900)}
          >
            <MonoLabel>Priority</MonoLabel>
            <span className="font-mono text-sm tracking-[0.15em] text-lime">
              HIGH
            </span>
          </div>
          <div className="mt-3 h-2 bg-paper/10">
            <div
              className="h-full bg-lime transition-[width] duration-[1100ms] ease-out"
              style={{
                width: inView ? "85%" : "0%",
                transitionDelay: "1000ms",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Opportunity() {
  return (
    <Section>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div>
          <Eyebrow>Impact</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
            Prioritize problems by impact.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate">
            Not another feed of feedback. Relay quantifies every signal against
            revenue, deals, and customers affected — so the roadmap argument
            ends with numbers, not opinions.
          </p>
        </div>
        <OpportunityCard />
      </div>
    </Section>
  );
}
