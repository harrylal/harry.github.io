"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-copper"
      style={{ scaleX }}
    />
  );
}

const sections = [
  { id: "intro", label: "Intro" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "story", label: "Story" },
  { id: "expertise", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "tech", label: "Tech" },
  { id: "philosophy", label: "Philosophy" },
  { id: "contact", label: "Contact" },
];

export function SectionRail() {
  const [active, setActive] = useState("intro");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-2.5 xl:flex"
    >
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className="group flex items-center justify-end gap-2.5"
          aria-label={label}
        >
          <span
            className={`font-mono text-[9px] uppercase tracking-widest transition-all duration-300 ${
              active === id
                ? "translate-x-0 opacity-100 text-ink"
                : "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-50 text-ink-muted"
            }`}
          >
            {label}
          </span>
          <span
            className={`block rounded-full transition-all duration-400 ${
              active === id
                ? "h-2.5 w-2.5 bg-copper shadow-[0_0_10px_rgba(194,94,46,0.4)]"
                : "h-1.5 w-1.5 bg-ink/15 group-hover:bg-ink/30"
            }`}
          />
        </a>
      ))}
    </nav>
  );
}
