"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { projects } from "@/data/projects";
import { withBasePath } from "@/lib/paths";
import { Reveal } from "@/components/ui/Motion";

export function ScrollWork() {
  return (
    <section id="work" className="section-padding">
      <div className="site-container">
        <Reveal>
          <p className="text-eyebrow">05 — Selected work</p>
          <h2 className="section-heading mt-3">Work</h2>
        </Reveal>

        <div className="mt-14 space-y-6 md:space-y-10">
          {projects.map((project, i) => (
            <WorkChapter key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkChapter({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.08]);
  const reversed = index % 2 === 1;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={`grid items-center gap-8 rounded-3xl glass-panel p-5 md:grid-cols-2 md:gap-12 md:p-8 lg:gap-14 lg:p-10 ${
          reversed ? "md:[direction:rtl]" : ""
        }`}
      >
        <div className={`overflow-hidden rounded-2xl ${reversed ? "md:[direction:ltr]" : ""}`}>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-surface-muted">
            <motion.img
              src={withBasePath(project.image)}
              alt={project.title}
              style={{ y: imageY, scale: imageScale }}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            {project.results.map((r) => (
              <div
                key={r.label}
                className="rounded-xl border border-border/60 bg-canvas/60 px-3 py-2"
              >
                <p className="text-base font-semibold text-ink">{r.metric}</p>
                <p className="font-mono text-[9px] uppercase tracking-wider text-ink-muted">
                  {r.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className={`flex flex-col justify-center ${reversed ? "md:[direction:ltr]" : ""}`}>
          <span className="font-mono text-[11px] text-copper">
            {project.period} · Project {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-3 text-xl font-semibold leading-tight text-ink md:text-2xl">
            {project.title}
          </h3>
          <p className="mt-1 font-mono text-xs text-forest">{project.tagline}</p>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-ink-muted md:text-base">
            {project.description}
          </p>

          <ul className="mt-6 space-y-2.5">
            {project.architecture.slice(0, 3).map((line) => (
              <li key={line} className="flex gap-3 text-sm text-ink-muted">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />
                {line}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border/70 bg-canvas/60 px-3 py-1 font-mono text-[11px] text-ink-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link
              href={`/projects/${project.slug}`}
              className="text-sm font-medium text-copper transition-colors hover:text-ink"
            >
              Read deep-dive →
            </Link>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
              >
                GitHub ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
