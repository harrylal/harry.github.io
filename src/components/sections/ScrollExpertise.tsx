"use client";

import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { expertiseAreas } from "@/data/expertise";
import { Reveal } from "@/components/ui/Motion";

export function ScrollExpertise() {
  const [activeId, setActiveId] = useState(expertiseAreas[0].id);
  const [paused, setPaused] = useState(false);
  const active = expertiseAreas.find((a) => a.id === activeId) ?? expertiseAreas[0];
  const count = expertiseAreas.length;

  const rotation = useMotionValue(0);
  const counter = useTransform(rotation, (r) => -r);
  const last = useRef(0);

  useAnimationFrame((t) => {
    const dt = last.current ? (t - last.current) / 1000 : 0;
    last.current = t;
    if (!paused) rotation.set(rotation.get() + dt * 9); // ~9°/s
  });

  return (
    <section id="expertise" className="section-padding">
      <div className="site-container">
        <Reveal>
          <p className="text-eyebrow">04 — Capabilities</p>
          <h2 className="section-heading mt-3">Skills</h2>
          <p className="mt-3 max-w-md text-sm text-ink-muted">
            Tap a node to explore the toolkit behind each capability.
          </p>
        </Reveal>

        <Reveal delay={1} className="mt-10">
          <div
            className="relative mx-auto aspect-square w-full max-w-[34rem]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Decorative orbit rings */}
            <svg className="absolute inset-0 h-full w-full text-border" viewBox="0 0 100 100" aria-hidden>
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.25" strokeDasharray="1 2" />
              <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="0.25" />
            </svg>

            {/* Center hub */}
            <div className="absolute left-1/2 top-1/2 z-20 flex aspect-square w-[44%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full glass-panel p-5 text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-copper">
                {`0${expertiseAreas.indexOf(active) + 1}`}
              </span>
              <p className="mt-1 text-base font-semibold leading-tight text-ink">
                {active.title}
              </p>
              <AnimatePresence mode="wait">
                <motion.ul
                  key={active.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 flex flex-wrap justify-center gap-1.5"
                >
                  {active.subskills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-border/70 bg-canvas/70 px-2.5 py-1 text-[11px] text-ink-muted"
                    >
                      {skill}
                    </li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>

            {/* Rotating ring of skill planets */}
            <motion.div className="absolute inset-0" style={{ rotate: rotation }}>
              {expertiseAreas.map((area, index) => {
                const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
                const x = 50 + Math.cos(angle) * 40;
                const y = 50 + Math.sin(angle) * 40;
                const isActive = area.id === activeId;
                return (
                  <motion.button
                    key={area.id}
                    type="button"
                    onClick={() => setActiveId(area.id)}
                    style={{ left: `${x}%`, top: `${y}%`, rotate: counter }}
                    whileHover={{ scale: 1.08 }}
                    className={`absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-3 py-2 text-xs font-medium shadow-sm transition-colors ${
                      isActive
                        ? "border-copper bg-copper text-cream glow-ring"
                        : "border-border bg-surface/85 text-ink-muted backdrop-blur hover:border-copper/40 hover:text-ink"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive ? "bg-cream" : "bg-copper"
                      }`}
                    />
                    {area.title}
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
