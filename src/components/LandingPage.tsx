import HeroSlide from "./slides/HeroSlide";
import CurrentScenarioSlide from "./slides/CurrentScenarioSlide";

import StatsSlide from "./slides/StatsSlide";
import SolutionsSlide from "./slides/SolutionsSlide";
import DetailedSolutions from "./DetailedSolutions";
import PricingSlide from "./slides/PricingSlide";
import WhyTenazSlide from "./slides/WhyTenazSlide";
import { CLIENT_NAME } from "../config";

const LandingPage = () => {
  return (
    <div className="relative w-full bg-background text-foreground">
      {/* ── Global decorative layers ── */}
      <div className="fixed inset-0 dot-pattern pointer-events-none z-0 opacity-40" />
      <div className="fixed inset-0 hero-glow pointer-events-none z-0" />

      {/* ── Sections — each fills exactly 100dvh ── */}
      <main className="relative z-10">

        {/* 1. Hero */}
        <section className="min-h-[100dvh] md:h-[100dvh] flex flex-col overflow-hidden">
          <HeroSlide />
        </section>

        {/* 2. Cenário */}
        <section className="min-h-[100dvh] md:h-[100dvh] flex flex-col md:overflow-hidden theme-light bg-background text-foreground">
          <CurrentScenarioSlide />
        </section>



        {/* 4. Resultados */}
        <section className="min-h-[100dvh] md:h-[100dvh] flex flex-col md:overflow-hidden theme-light bg-background text-foreground">
          <StatsSlide />
        </section>

        {/* 5. Soluções — content-driven height */}
        <section className="min-h-[100dvh] flex flex-col theme-light bg-background text-foreground">
          <SolutionsSlide />
        </section>

        {/* 5.5. Detalhamento de Soluções */}
        <section className="py-20 md:py-28 theme-light bg-background text-foreground border-t border-border/40 relative">
          <DetailedSolutions />
        </section>

        {/* 5.75 Por que Tenaz */}
        <section className="min-h-[100dvh] md:h-[100dvh] flex flex-col md:overflow-hidden theme-light bg-background text-foreground">
          <WhyTenazSlide />
        </section>

        {/* 6. Investimento */}
        <section className="min-h-[100dvh] md:h-[100dvh] flex flex-col md:overflow-hidden theme-light bg-background text-foreground">
          <PricingSlide />
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 theme-light bg-background border-t border-border/40 py-8 text-center">
        <img
          src="/logo-hero.svg"
          alt={CLIENT_NAME}
          className="h-6 w-auto object-contain mx-auto mb-3 grayscale opacity-30"
        />
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {CLIENT_NAME}. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;
