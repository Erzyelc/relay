"use client";

import { useEffect, useState } from "react";
import { revealStyle, useInView } from "./motion";
import { Eyebrow, MonoLabel, Section } from "./ui";

const steps = [
  {
    number: "01",
    title: "Connect",
    body: "Connect the tools your customers already use. Intercom. Gong. Slack. HubSpot. Zendesk.",
  },
  {
    number: "02",
    title: "Analyze",
    body: "Relay continuously identifies recurring customer signals across every conversation.",
  },
  {
    number: "03",
    title: "Prioritize",
    body: "See which problems affect the most customers and revenue — before you plan the roadmap.",
  },
];

const tools = ["Intercom", "Gong", "Slack", "HubSpot", "Zendesk"];

const STEP_INTERVAL = 3200;

function lineFade(inView: boolean, delay: number) {
  return {
    opacity: inView ? 1 : 0,
    transition: `opacity 600ms ease ${delay}ms`,
  } as const;
}

function FlowX({ delay, duration }: { delay: number; duration: number }) {
  return (
    <span className="pointer-events-none absolute -inset-y-3 left-0 right-0 overflow-hidden motion-reduce:hidden">
      <span
        className="absolute top-1/2 h-px w-24 -translate-y-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-lime), transparent)",
          boxShadow: "0 0 12px 1px rgba(199, 255, 74, 0.35)",
          animation: `flow-x ${duration}ms linear infinite`,
          animationDelay: `${delay}ms`,
          opacity: 0,
        }}
      />
    </span>
  );
}

function FlowY({
  delay,
  duration,
  heightClass = "h-16",
}: {
  delay: number;
  duration: number;
  heightClass?: string;
}) {
  return (
    <span className="pointer-events-none absolute -inset-x-3 top-0 bottom-0 overflow-hidden motion-reduce:hidden">
      <span
        className={`absolute left-1/2 w-px -translate-x-1/2 ${heightClass}`}
        style={{
          background:
            "linear-gradient(180deg, transparent, var(--color-lime), transparent)",
          boxShadow: "0 0 12px 1px rgba(199, 255, 74, 0.35)",
          animation: `flow-y ${duration}ms linear infinite`,
          animationDelay: `${delay}ms`,
          opacity: 0,
        }}
      />
    </span>
  );
}

function VerticalConnector({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <div className="relative mx-auto my-6 h-8 w-px bg-edge">
      {inView && <FlowY delay={delay} duration={2400} heightClass="h-5" />}
    </div>
  );
}

function RelayNode({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <div
      className="shrink-0 self-center border border-lime/40 px-8 py-4"
      style={revealStyle(inView, delay)}
    >
      <span className="font-mono text-sm font-semibold tracking-[0.3em] text-lime">
        RELAY
      </span>
    </div>
  );
}

function InsightNode({ inView, delay }: { inView: boolean; delay: number }) {
  return (
    <div
      className="shrink-0 self-center border border-edge bg-ink px-8 py-4 text-center"
      style={revealStyle(inView, delay)}
    >
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper">
        Product insight
      </span>
    </div>
  );
}

function Pipeline({ inView }: { inView: boolean }) {
  return (
    <div className="mt-16 border border-edge bg-graphite p-6 sm:p-10">
      <MonoLabel>Connect</MonoLabel>

      {/* Desktop: every tool feeds a shared bus into Relay */}
      <div className="mt-8 hidden lg:flex lg:items-stretch">
        {/* Tool rows, each with its own feed line */}
        <div className="flex w-80 shrink-0 flex-col">
          {tools.map((tool, i) => (
            <div key={tool} className="flex h-12 items-center">
              <span
                className="block w-28 shrink-0 border border-edge px-3 py-2 text-center font-mono text-xs text-slate"
                style={revealStyle(inView, i * 100)}
              >
                {tool}
              </span>
              <div
                className="relative h-px flex-1 bg-edge"
                style={lineFade(inView, 300 + i * 100)}
              >
                {inView && <FlowX delay={i * 950} duration={4800} />}
              </div>
            </div>
          ))}
        </div>

        {/* Bus: spans from the first feed line to the last */}
        <div className="relative my-6 w-px bg-edge" style={lineFade(inView, 700)}>
          {inView && <FlowY delay={600} duration={3600} />}
        </div>

        {/* Merged flow */}
        <div className="flex flex-1 items-center">
          <div
            className="relative h-px flex-1 bg-edge"
            style={lineFade(inView, 800)}
          >
            {inView && <FlowX delay={0} duration={2400} />}
          </div>
          <RelayNode inView={inView} delay={550} />
          <div
            className="relative h-px flex-1 bg-edge"
            style={lineFade(inView, 800)}
          >
            {inView && <FlowX delay={1200} duration={2400} />}
          </div>
          <InsightNode inView={inView} delay={700} />
        </div>
      </div>

      {/* Mobile: stacked flow */}
      <div className="mt-8 flex flex-col items-stretch lg:hidden">
        <div className="flex flex-row flex-wrap gap-2">
          {tools.map((tool, i) => (
            <span
              key={tool}
              className="border border-edge px-4 py-2 font-mono text-xs text-slate"
              style={revealStyle(inView, i * 100)}
            >
              {tool}
            </span>
          ))}
        </div>
        <VerticalConnector inView={inView} delay={0} />
        <RelayNode inView={inView} delay={550} />
        <VerticalConnector inView={inView} delay={1200} />
        <InsightNode inView={inView} delay={700} />
      </div>
    </div>
  );
}

export function HowItWorks() {
  const { ref, inView } = useInView(0.25);
  const [active, setActive] = useState(0);

  // Auto-advance the active step while the section is on screen.
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(
      () => setActive((a) => (a + 1) % steps.length),
      STEP_INTERVAL
    );
    return () => clearTimeout(id);
  }, [inView, active]);

  return (
    <Section id="how-it-works">
      <Eyebrow>How it works</Eyebrow>
      <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
        From noise to roadmap.
        <br />
        <span className="text-slate">Three-step system.</span>
      </h2>

      <div ref={ref}>
        <div className="mt-16 grid gap-px border border-edge bg-edge md:grid-cols-3">
          {steps.map((step, i) => {
            const isActive = i === active;
            return (
              <button
                key={step.number}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                className={`flex flex-col p-8 text-left transition-colors duration-500 ${
                  isActive ? "bg-graphite" : "bg-ink hover:bg-graphite/50"
                }`}
                style={revealStyle(inView, i * 150)}
              >
                <span
                  className={`font-mono text-xs transition-colors duration-500 ${
                    isActive ? "text-lime" : "text-slate"
                  }`}
                >
                  {step.number} —
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">
                  {step.body}
                </p>
                <span className="mt-6 block h-px w-full bg-edge">
                  {isActive && inView && (
                    <span
                      className="block h-full bg-lime motion-reduce:hidden"
                      style={{ animation: `grow-x ${STEP_INTERVAL}ms linear` }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div id="integrations">
          <Pipeline inView={inView} />
        </div>
      </div>
    </Section>
  );
}
