import { MonoLabel, Section } from "./ui";

const teams = [
  {
    label: "Product",
    body: "Walk into planning with ranked customer problems instead of a backlog of anecdotes.",
  },
  {
    label: "Customer success",
    body: "Spot churn-driving issues while the accounts are still on the roster — not in the postmortem.",
  },
  {
    label: "Revenue",
    body: "Know exactly which product gaps are blocking deals, and what closing them is worth.",
  },
];

export function Proof() {
  return (
    <Section id="solutions">
      <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
        Built for teams that make decisions from customer signals.
      </h2>

      <div className="mt-16 grid gap-px border border-edge bg-edge md:grid-cols-3">
        {teams.map((team) => (
          <div key={team.label} className="bg-graphite p-8">
            <MonoLabel className="text-lime">{team.label}</MonoLabel>
            <p className="mt-4 text-sm leading-relaxed text-slate">
              {team.body}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
