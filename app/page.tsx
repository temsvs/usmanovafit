import React from "react";

import { AboutSection } from "../components/About/AboutSection";
import { CookieBanner } from "../components/Cookies/CookieBanner";
import { HeroSection } from "../components/Hero/HeroSection";
import { ProgramsSection } from "../components/Programs/ProgramsSection";
import { ResultSection } from "../components/Result/ResultSection";
import { ScrollToTopButton } from "../components/ScrollToTop/ScrollToTopButton";

export default function HomePage() {
  return (
    <main>
      <HeroSection programsHref="#programs" />
      <AboutSection />
      <ProgramsSection />
      <ResultSection />
      <CookieBanner />
      <ScrollToTopButton />
    </main>
  );
}
