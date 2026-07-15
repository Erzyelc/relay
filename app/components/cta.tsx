import { ButtonPrimary, ButtonSecondary, Eyebrow, Section } from "./ui";

export function CTA() {
  return (
    <Section id="get-started">
      <div className="flex flex-col items-center py-8 text-center sm:py-16">
        <Eyebrow>Get started</Eyebrow>
        <h2 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
          Your customers are already talking.
          <br />
          <span className="text-slate">Start listening.</span>
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonPrimary href="#pricing">
            Start analyzing feedback
          </ButtonPrimary>
          <ButtonSecondary href="#how-it-works">
            See how Relay works
          </ButtonSecondary>
        </div>
      </div>
    </Section>
  );
}
