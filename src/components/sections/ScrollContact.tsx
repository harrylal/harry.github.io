"use client";

import { motion } from "framer-motion";
import { contactLinks, profile } from "@/data/site";
import { Reveal, Magnetic } from "@/components/ui/Motion";

const links = [
  { label: "Email", href: contactLinks.email, detail: "Send a message" },
  { label: "LinkedIn", href: contactLinks.linkedin, detail: "in/harry-lal" },
  { label: "GitHub", href: contactLinks.github, detail: "Code & experiments" },
  { label: "Resume", href: contactLinks.resume, detail: "Download PDF" },
];

export function ScrollContact() {
  return (
    <section id="contact" className="section-padding">
      <div className="site-container">
        <div className="relative overflow-hidden rounded-[2rem] glass-dark p-8 md:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 animate-float-slow rounded-full bg-copper/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 animate-float-slow rounded-full bg-forest/20 blur-3xl [animation-delay:-4s]" />

          <div className="relative">
            <Reveal>
              <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-copper-glow">
                08 — Let&apos;s talk
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight text-cream sm:text-4xl md:text-5xl">
                Building autonomy that <span className="gradient-animate">protects lives</span>.
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-cream/60">
                Based in {profile.location} — open to ambitious engineering
                collaborations, research partnerships, and teams pushing computer
                vision, ADAS, and robotics forward.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {links.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.label === "Email" ? undefined : "_blank"}
                  rel={link.label === "Email" ? undefined : "noopener noreferrer"}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-cream/10 bg-cream/5 p-5 transition-colors hover:border-copper/40 hover:bg-cream/10"
                >
                  <p className="font-medium text-cream">{link.label}</p>
                  <p className="mt-1.5 text-sm text-cream/45">{link.detail}</p>
                </motion.a>
              ))}
            </div>

            <div className="mt-10">
              <Magnetic>
                <a
                  href={contactLinks.email}
                  className="inline-flex items-center gap-2 rounded-full bg-copper px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-copper-glow"
                >
                  Start a conversation →
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
