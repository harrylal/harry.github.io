"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { contactLinks } from "@/data/site";

export function Navigation() {
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.94]);
  const blur = useTransform(scrollY, [0, 100], [0, 14]);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      style={{
        backgroundColor: useTransform(bgOpacity, (v) => `rgba(243, 239, 230, ${v})`),
        backdropFilter: useTransform(blur, (b) => `blur(${b}px)`),
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-500 ${
        visible ? "shadow-[0_1px_0_rgba(28,25,23,0.06)]" : ""
      }`}
    >
      <nav className="site-container flex items-center justify-between py-4 md:py-5">
        <a
          href="#intro"
          className="font-serif text-lg tracking-tight text-ink transition-opacity hover:opacity-60 md:text-xl"
          data-cursor="expand"
        >
          HL
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {[
            ["#experience", "Experience"],
            ["#education", "Education"],
            ["#work", "Projects"],
            ["#contact", "Contact"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="text-sm text-ink-muted transition-colors hover:text-ink"
              data-cursor="expand"
            >
              {label}
            </a>
          ))}
        </div>

        <a
          href={contactLinks.email}
          className="rounded-full bg-ink px-4 py-2 text-xs font-medium text-cream transition-all hover:bg-copper md:px-5 md:py-2.5"
          data-cursor="expand"
        >
          Get in touch
        </a>
      </nav>
    </motion.header>
  );
}
