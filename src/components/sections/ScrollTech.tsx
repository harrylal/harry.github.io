"use client";

import { techCategories } from "@/data/technologies";
import { Reveal, RevealGroup, RevealItem, TiltCard } from "@/components/ui/Motion";

export function ScrollTech() {
  const ticker = techCategories.flatMap((c) => c.technologies.map((t) => t.name));

  return (
    <section id="tech" className="section-padding">
      <div className="site-container">
        <Reveal>
          <p className="text-eyebrow">06 — Toolkit</p>
          <h2 className="section-heading mt-3">Technologies</h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {techCategories.map((cat) => (
            <RevealItem key={cat.id} className="group">
              <TiltCard className="glass-card h-full p-6">
                <div className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: cat.color }}
                  />
                  <h3 className="text-sm font-semibold text-ink">{cat.title}</h3>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {cat.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      className="rounded-full border border-border/70 bg-canvas/60 px-3 py-1 text-xs text-ink-muted"
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <div className="mt-14 overflow-hidden border-y border-border/50 py-4">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
          {[...ticker, ...ticker].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="font-mono text-sm uppercase tracking-widest text-ink-muted/60"
            >
              {name} <span className="text-copper">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
