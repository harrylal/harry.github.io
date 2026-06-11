"use client";

import { experience } from "@/data/experience";
import { achievements } from "@/data/achievements";
import { Reveal, RevealGroup, RevealItem, TiltCard } from "@/components/ui/Motion";

export function ScrollExperience() {
  return (
    <section id="experience" className="section-padding">
      <div className="site-container">
        <Reveal>
          <p className="text-eyebrow">01 — Experience</p>
          <h2 className="section-heading mt-3">Experience</h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
          <RevealGroup className="relative space-y-5">
            {experience.map((item) => (
              <RevealItem key={item.role}>
                <div className="glass-card p-6 md:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-lg font-semibold text-ink md:text-xl">
                      {item.role}
                    </h3>
                    <span className="font-mono text-[11px] text-copper">{item.period}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-ink-muted">{item.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border/70 bg-canvas/60 px-3 py-1 font-mono text-[11px] text-ink-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <RevealGroup className="grid grid-cols-2 gap-3 self-start">
            {achievements.map((item) => (
              <RevealItem key={item.label} className="group">
                <TiltCard className="glass-card h-full p-5">
                  <p className="text-3xl font-semibold text-ink">
                    {item.value}
                    {item.suffix}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-ink">{item.label}</p>
                  <p className="mt-1 text-xs text-ink-muted">{item.description}</p>
                </TiltCard>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
