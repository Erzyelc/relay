"use client";

import { revealStyle, useCountUp, useInView } from "./motion";
import { MonoLabel } from "./ui";

const sources = [
  { name: "Intercom", count: 82 },
  { name: "Gong", count: 47 },
  { name: "Slack", count: 31 },
  { name: "Surveys", count: 24 },
];

const max = Math.max(...sources.map((s) => s.count));

function SourceRow({
  name,
  count,
  index,
  inView,
}: {
  name: string;
  count: number;
  index: number;
  inView: boolean;
}) {
  const delay = 500 + index * 150;
  const displayed = useCountUp(count, inView, 900, delay);

  return (
    <div
      className="grid grid-cols-[6rem_1fr_2.5rem] items-center gap-4 transition-opacity duration-500"
      style={{ opacity: inView ? 1 : 0, transitionDelay: `${delay}ms` }}
    >
      <span className="font-mono text-xs text-slate">{name}</span>
      <span className="h-1 bg-paper/10">
        <span
          className="block h-full bg-lime transition-[width] duration-[900ms] ease-out"
          style={{
            width: inView ? `${(count / max) * 100}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </span>
      <span className="text-right font-mono text-xs text-paper">
        {displayed}
      </span>
    </div>
  );
}

export function SignalCard() {
  const { ref, inView } = useInView();
  const mentions = useCountUp(184, inView, 1100, 250);
  const trend = useCountUp(32, inView, 1100, 250);
  const arr = useCountUp(74200, inView, 1300, 900);

  return (
    <div ref={ref} className="border border-edge bg-graphite">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-edge px-5 py-3">
        <MonoLabel>Customer signal detected</MonoLabel>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" />
          <MonoLabel className="text-lime">Live</MonoLabel>
        </span>
      </div>

      <div className="grid gap-px bg-edge md:grid-cols-[1.4fr_1fr]">
        {/* Left: signal + sources */}
        <div className="bg-graphite p-6 sm:p-8">
          <div
            className="flex flex-wrap items-baseline justify-between gap-4"
            style={revealStyle(inView, 100)}
          >
            <h3 className="font-display text-2xl font-semibold tracking-tight">
              SSO &amp; login issues
            </h3>
            <p className="font-mono text-sm">
              <span className="text-paper">{mentions} mentions</span>{" "}
              <span className="text-lime">&uarr; {trend}%</span>
            </p>
          </div>

          <div className="mt-8" style={revealStyle(inView, 300)}>
            <MonoLabel>Sources</MonoLabel>
            <div className="mt-4 space-y-3">
              {sources.map((s, i) => (
                <SourceRow
                  key={s.name}
                  name={s.name}
                  count={s.count}
                  index={i}
                  inView={inView}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: impact */}
        <div className="grid grid-rows-2 gap-px bg-edge">
          <div className="bg-graphite p-6 sm:p-8" style={revealStyle(inView, 700)}>
            <MonoLabel>ARR at risk</MonoLabel>
            <p className="mt-3 font-display text-4xl font-semibold tracking-tight">
              ${arr.toLocaleString("en-US")}
            </p>
          </div>
          <div
            className="bg-graphite p-6 sm:p-8"
            style={revealStyle(inView, 1100)}
          >
            <MonoLabel>Recommended priority</MonoLabel>
            <p className="mt-3 inline-block bg-lime/10 px-3 py-1 font-mono text-sm tracking-[0.15em] text-lime">
              HIGH
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
