import { Eyebrow, MonoLabel, Section } from "./ui";

const plans = [
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    blurb: "For early product teams.",
    features: ["5 feedback sources", "10,000 signals/month", "3 users"],
    featured: false,
    cta: "Start free trial",
  },
  {
    name: "Growth",
    price: "$299",
    period: "/month",
    blurb: "For growing SaaS teams.",
    features: [
      "Unlimited sources",
      "50,000 signals/month",
      "10 users",
      "Revenue intelligence",
    ],
    featured: true,
    cta: "Start free trial",
  },
  {
    name: "Scale",
    price: "Custom",
    period: "",
    blurb: "For larger organizations.",
    features: [
      "Unlimited signals",
      "Custom integrations",
      "SSO",
      "Dedicated support",
    ],
    featured: false,
    cta: "Talk to sales",
  },
];

export function Pricing() {
  return (
    <Section id="pricing">
      <Eyebrow>Pricing</Eyebrow>
      <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
        Simple plans. Serious signal.
      </h2>

      <div className="mt-16 grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col border bg-graphite p-8 ${
              plan.featured ? "border-lime/50" : "border-edge"
            }`}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold tracking-tight">
                {plan.name}
              </h3>
              {plan.featured && (
                <MonoLabel className="text-lime">Most popular</MonoLabel>
              )}
            </div>
            <p className="mt-6 font-display text-4xl font-semibold tracking-tight">
              {plan.price}
              {plan.period && (
                <span className="font-mono text-sm font-normal text-slate">
                  {plan.period}
                </span>
              )}
            </p>
            <p className="mt-2 text-sm text-slate">{plan.blurb}</p>

            <ul className="mt-8 flex-1 space-y-3 border-t border-edge pt-6">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 font-mono text-xs text-paper/90"
                >
                  <span
                    className={`h-1 w-1 shrink-0 ${
                      plan.featured ? "bg-lime" : "bg-slate"
                    }`}
                  />
                  {feature}
                </li>
              ))}
            </ul>

            <a
              href="#get-started"
              className={`mt-8 inline-flex items-center justify-center px-6 py-3 font-mono text-[13px] uppercase tracking-[0.08em] transition-colors ${
                plan.featured
                  ? "bg-lime text-ink hover:bg-paper"
                  : "border border-edge text-paper hover:border-slate"
              }`}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
}
