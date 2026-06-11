"use client";

import { education } from "@/data/education";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Motion";

export function ScrollEducation() {
  return (
    <section id="education" className="section-padding">
      <div className="site-container">
        <Reveal>
          <p className="text-eyebrow">02 — Education</p>
          <h2 className="section-heading mt-3">Education</h2>
        </Reveal>

        <RevealGroup className="mt-12 space-y-5">
          {education.map((item) => (
            <RevealItem key={item.degree}>
              <article className="glass-card p-6 md:p-8">
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-ink md:text-xl">
                      {item.degree}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-ink-muted">
                      {item.school} · {item.location}
                    </p>
                  </div>
                  <span className="font-mono text-[11px] text-copper">{item.period}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
                {item.highlights.length > 0 && (
                  <ul className="mt-5 grid gap-2 border-t border-border/60 pt-5 sm:grid-cols-2">
                    {item.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm text-ink-muted">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-forest" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
