import { Nav } from "./components/nav";
import { Hero } from "./components/hero";
import { SignalProblem } from "./components/signal-problem";
import { HowItWorks } from "./components/how-it-works";
import { SignalsDashboard } from "./components/signals-dashboard";
import { Opportunity } from "./components/opportunity";
import { Proof } from "./components/proof";
import { Pricing } from "./components/pricing";
import { CTA } from "./components/cta";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SignalProblem />
        <HowItWorks />
        <SignalsDashboard />
        <Opportunity />
        <Proof />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
