"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { profile } from "@/data/site";

export function WorldHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="intro"
      ref={ref}
      className="pointer-events-none relative flex h-screen w-full flex-col justify-center"
    >
      <motion.div style={{ y, opacity }} className="site-container">
        <motion.span
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-eyebrow"
        >
          {profile.company} · Computer Vision · ADAS · Robotics
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight text-ink sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {profile.name}
          <br />
          builds <span className="gradient-animate">intelligence</span>
          <br />
          that moves.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-base text-ink-muted md:text-lg"
        >
          {profile.title} crafting robot perception, autonomous driving systems, and
          edge AI — from Mars rovers to production ADAS.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="pointer-events-auto mt-9 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream shadow-[0_10px_30px_rgba(28,25,23,0.2)] transition-all hover:-translate-y-0.5 hover:bg-copper"
          >
            See the work
          </a>
          <a
            href="#contact"
            className="rounded-full glass-panel px-6 py-3 text-sm font-medium text-ink transition-all hover:-translate-y-0.5"
          >
            Get in touch
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-muted md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          Drive · or scroll to read
        </span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-[1px] bg-gradient-to-b from-ink/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
