"use client";

import { philosophyPoints } from "@/data/site";
import { Reveal, RevealGroup, RevealItem, TiltCard } from "@/components/ui/Motion";

export function ScrollPhilosophy() {
  return (
    <section id="philosophy" className="section-padding">
      <div className="site-container">
        <Reveal>
          <p className="text-eyebrow">07 — How I work</p>
          <h2 className="section-heading mt-3">Philosophy</h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2">
          {philosophyPoints.map((point, i) => (
            <RevealItem key={point.title} className="group">
              <TiltCard className="glass-card h-full p-7 md:p-8" intensity={6}>
                <span className="font-mono text-sm text-copper/50">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-lg font-semibold text-ink">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
                  {point.description}
                </p>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
