"use client";

import { revealStyle, useInView } from "./motion";
import { Eyebrow, MonoLabel, Section } from "./ui";

const quotes = [
  {
    source: "Intercom",
    quote: "SSO setup keeps failing for enterprise accounts...",
  },
  {
    source: "Gong",
    quote: "We need SAML before we can roll this out...",
  },
  {
    source: "Slack",
    quote: "Another customer asked about login issues...",
  },
  {
    source: "Survey",
    quote: "Authentication was the main reason we churned.",
  },
];

export function SignalProblem() {
  const { ref, inView } = useInView(0.2);

  return (
    <Section>
      <Eyebrow>The signal problem</Eyebrow>
      <h2 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
        Your customers are telling you what to build.
        <span className="text-slate"> Just not in one place.</span>
      </h2>

      <div ref={ref} className="mt-16 sm:mt-20">
        {/* Four scattered sources */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quotes.map((q, i) => (
            <div
              key={q.source}
              className="border border-edge bg-graphite p-6"
              style={revealStyle(inView, i * 130)}
            >
              <MonoLabel>{q.source}</MonoLabel>
              <p className="mt-4 text-sm leading-relaxed text-paper/90">
                &ldquo;{q.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Converging lines */}
        <svg
          viewBox="0 0 800 80"
          className="hidden w-full text-edge lg:block"
          aria-hidden="true"
          preserveAspectRatio="none"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 600ms ease 550ms",
          }}
        >
          <path
            d="M100 0 L100 20 Q100 40 130 40 L370 40 Q400 40 400 60 L400 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M300 0 L300 20 Q300 40 330 40 L370 40 Q400 40 400 60 L400 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M500 0 L500 20 Q500 40 470 40 L430 40 Q400 40 400 60 L400 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M700 0 L700 20 Q700 40 670 40 L430 40 Q400 40 400 60 L400 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        <div className="mx-auto h-10 w-px bg-edge lg:hidden" />

        {/* Relay node */}
        <div className="flex flex-col items-center">
          <div
            className="border border-lime/40 bg-graphite px-10 py-4"
            style={revealStyle(inView, 700)}
          >
            <span className="font-mono text-sm font-semibold tracking-[0.3em] text-lime">
              RELAY
            </span>
          </div>
          <div className="h-10 w-px bg-edge" />

          {/* Unified signal */}
          <div
            className="w-full max-w-md border border-edge bg-graphite p-8 text-center"
            style={revealStyle(inView, 880)}
          >
            <MonoLabel>Unified signal</MonoLabel>
            <p className="mt-4 font-display text-2xl font-semibold tracking-tight">
              SSO &amp; Authentication
            </p>
            <div className="mt-6 flex items-center justify-center gap-8 font-mono text-sm">
              <span className="text-paper">184 mentions</span>
              <span className="text-lime">$74K ARR at risk</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
