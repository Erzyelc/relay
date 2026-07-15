"use client";

import { useState } from "react";
import { revealStyle, useCountUp, useInView } from "./motion";
import { Eyebrow, MonoLabel, Section } from "./ui";

type Signal = {
  name: string;
  mentions: number;
  trend: number;
  arrValue: number; // in $K
  summary: string;
  action: string;
};

const signals: Signal[] = [
  {
    name: "SSO & authentication",
    mentions: 184,
    trend: 32,
    arrValue: 74.2,
    summary:
      "Enterprise customers are experiencing difficulty configuring SAML SSO. The issue is primarily affecting accounts with 100+ seats and has been mentioned in 14 recent sales conversations.",
    action: "Prioritize authentication onboarding improvements.",
  },
  {
    name: "Reporting exports",
    mentions: 121,
    trend: 14,
    arrValue: 41.8,
    summary:
      "Customers on Growth plans repeatedly request scheduled CSV and PDF exports. Most requests come from customer success teams preparing weekly stakeholder reports.",
    action: "Ship scheduled exports for saved report views.",
  },
  {
    name: "Mobile experience",
    mentions: 97,
    trend: 8,
    arrValue: 28.4,
    summary:
      "Field sales users report that dashboards are difficult to read on mobile. Complaints cluster around chart legibility and slow load times on cellular connections.",
    action: "Audit responsive layouts for the top five dashboard views.",
  },
  {
    name: "API rate limits",
    mentions: 64,
    trend: -4,
    arrValue: 19.1,
    summary:
      "A small group of high-volume integrators hit rate limits during bulk syncs. Mentions are declining after the last limit increase, but three enterprise accounts remain affected.",
    action: "Offer burst limits for enterprise API tiers.",
  },
];

const formatArr = (v: number) => `$${v.toFixed(1)}K`;

function SignalRow({
  signal,
  index,
  selected,
  inView,
  onSelect,
}: {
  signal: Signal;
  index: number;
  selected: boolean;
  inView: boolean;
  onSelect: () => void;
}) {
  const delay = 150 + index * 120;
  const mentions = useCountUp(signal.mentions, inView, 900, delay);
  const arr = useCountUp(signal.arrValue, inView, 900, delay, 1);

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`grid w-full grid-cols-[1fr_5rem_4.5rem_5.5rem] items-center gap-2 border-b border-edge px-6 py-4 text-left transition-colors last:border-b-0 sm:gap-4 ${
        selected ? "bg-ink" : "hover:bg-ink/50"
      }`}
      style={revealStyle(inView, delay)}
    >
      <span className="flex items-center gap-3 text-sm">
        <span
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
            selected ? "bg-lime" : "bg-slate/40"
          }`}
        />
        <span className={selected ? "text-paper" : "text-slate"}>
          {signal.name}
        </span>
      </span>
      <span className="text-right font-mono text-sm text-paper">
        {mentions}
      </span>
      <span
        className={`text-right font-mono text-sm ${
          signal.trend > 0 ? "text-lime" : "text-slate"
        }`}
      >
        {signal.trend > 0 ? "+" : ""}
        {signal.trend}%
      </span>
      <span className="text-right font-mono text-sm text-paper">
        {formatArr(arr)}
      </span>
    </button>
  );
}

export function SignalsDashboard() {
  const [selected, setSelected] = useState(0);
  const { ref, inView } = useInView(0.25);
  const signal = signals[selected];

  return (
    <Section id="signals">
      <Eyebrow>Signals</Eyebrow>
      <h2 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
        See patterns before they become problems.
      </h2>

      <div
        ref={ref}
        className="mt-16 grid gap-px border border-edge bg-edge lg:grid-cols-[1.5fr_1fr]"
      >
        {/* Table */}
        <div className="bg-graphite">
          <div className="flex items-center justify-between border-b border-edge px-6 py-3">
            <MonoLabel>Signals — last 30 days</MonoLabel>
            <MonoLabel className="text-lime">4 active</MonoLabel>
          </div>

          <div className="grid grid-cols-[1fr_5rem_4.5rem_5.5rem] gap-2 border-b border-edge px-6 py-3 sm:gap-4">
            <MonoLabel>Signal</MonoLabel>
            <MonoLabel className="text-right">Mentions</MonoLabel>
            <MonoLabel className="text-right">Trend</MonoLabel>
            <MonoLabel className="text-right">ARR impact</MonoLabel>
          </div>

          {signals.map((s, i) => (
            <SignalRow
              key={s.name}
              signal={s}
              index={i}
              selected={i === selected}
              inView={inView}
              onSelect={() => setSelected(i)}
            />
          ))}
        </div>

        {/* Detail panel */}
        <div className="bg-graphite" style={revealStyle(inView, 500)}>
          <div className="border-b border-edge px-6 py-3">
            <MonoLabel>Signal detail</MonoLabel>
          </div>
          <div className="p-6 sm:p-8">
            <h3 className="font-display text-xl font-semibold tracking-tight">
              {signal.name}
            </h3>

            <div className="mt-6">
              <MonoLabel>AI summary</MonoLabel>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {signal.summary}
              </p>
            </div>

            <div className="mt-8 border-t border-edge pt-6">
              <MonoLabel>Recommended action</MonoLabel>
              <p className="mt-3 text-sm leading-relaxed text-paper">
                {signal.action}
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-px border border-edge bg-edge">
              <div className="bg-ink p-4">
                <MonoLabel>Mentions</MonoLabel>
                <p className="mt-2 font-mono text-lg text-paper">
                  {signal.mentions}
                </p>
              </div>
              <div className="bg-ink p-4">
                <MonoLabel>ARR impact</MonoLabel>
                <p className="mt-2 font-mono text-lg text-lime">
                  {formatArr(signal.arrValue)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
