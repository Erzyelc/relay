import { SignalCard } from "./signal-card";
import { ButtonPrimary, ButtonSecondary, Eyebrow } from "./ui";

export function Hero() {
  return (
    <section className="pt-16" id="product">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-20 sm:pt-28">
        <Eyebrow>Customer intelligence</Eyebrow>
        <h1 className="mt-6 font-display text-[clamp(3rem,8vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
          Know what your
          <br />
          customers need.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-slate">
          Relay turns support tickets, sales calls, and customer feedback into
          prioritized product insights.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonPrimary href="#get-started">
            Start analyzing feedback
          </ButtonPrimary>
          <ButtonSecondary href="#how-it-works">
            See how Relay works
          </ButtonSecondary>
        </div>

        <div className="mt-20 sm:mt-24">
          <SignalCard />
        </div>
      </div>
    </section>
  );
}
