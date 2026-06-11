"use client";

import { storyTimeline } from "@/data/story";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Motion";

export function ScrollStory() {
  return (
    <section id="story" className="section-padding">
      <div className="site-container">
        <Reveal>
          <p className="text-eyebrow">03 — Journey</p>
          <h2 className="section-heading mt-3">Story</h2>
        </Reveal>

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {storyTimeline.map((item, i) => (
            <RevealItem key={`${item.title}-${i}`}>
              <article className="glass-card flex h-full flex-col p-5 md:p-6">
                {"year" in item && item.year ? (
                  <span className="font-mono text-[11px] text-copper">{item.year}</span>
                ) : (
                  <span className="font-mono text-[11px] text-forest">Childhood</span>
                )}
                <h3 className="mt-2 text-base font-semibold leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
                <p className="mt-4 font-mono text-[9px] uppercase tracking-wider text-forest/80">
                  {item.interaction}
                </p>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
