"use client";

import { ScrollProgressBar, SectionRail } from "@/components/scroll/ScrollChrome";
import { SmoothScroll } from "@/components/scroll/SmoothScroll";
import { WorldLayer } from "@/components/world/WorldLayer";
import { WorldHero } from "@/components/sections/WorldHero";
import { ScrollExperience } from "@/components/sections/ScrollExperience";
import { ScrollEducation } from "@/components/sections/ScrollEducation";
import { ScrollStory } from "@/components/sections/ScrollStory";
import { ScrollExpertise } from "@/components/sections/ScrollExpertise";
import { ScrollWork } from "@/components/sections/ScrollWork";
import { ScrollTech } from "@/components/sections/ScrollTech";
import { ScrollPhilosophy } from "@/components/sections/ScrollPhilosophy";
import { ScrollContact } from "@/components/sections/ScrollContact";

export function PortfolioPage() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgressBar />
      <SectionRail />
      <WorldLayer />

      <div className="relative z-10">
        <WorldHero />
        <div className="relative">
          <ScrollExperience />
          <ScrollEducation />
          <ScrollStory />
          <ScrollExpertise />
          <ScrollWork />
          <ScrollTech />
          <ScrollPhilosophy />
          <ScrollContact />
        </div>
      </div>
    </>
  );
}
