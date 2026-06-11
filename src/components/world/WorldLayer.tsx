"use client";

import dynamic from "next/dynamic";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SignDef } from "@/components/world/DrivingCanvas";

const DrivingCanvas = dynamic(() => import("@/components/world/DrivingCanvas"), {
  ssr: false,
  loading: () => null,
});

const DRIVE_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "KeyW",
  "KeyA",
  "KeyS",
  "KeyD",
  "Space",
]);

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

/**
 * The 3D rover world rendered as a persistent, full-site background.
 * Content scrolls on top; a scroll-reactive scrim frosts the scene so text
 * stays readable while the rover keeps roaming behind everything.
 */
export function WorldLayer() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [near, setNear] = useState<SignDef | null>(null);
  const [isCar, setIsCar] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const nearRef = useRef<SignDef | null>(null);

  const { scrollYProgress } = useScroll();
  // Frost grows as you leave the hero, then eases so the world still glows through.
  const scrimOpacity = useTransform(scrollYProgress, [0, 0.12, 1], [0, 0.78, 0.7]);
  const blurPx = useTransform(scrollYProgress, [0, 0.12], [0, 5]);
  const scrimBlur = useMotionTemplate`blur(${blurPx}px)`;

  useEffect(() => {
    const check = () =>
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(pointer: coarse)").matches;
    const onResize = () => setIsDesktop(check());
    const raf = requestAnimationFrame(onResize);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNear = useCallback((s: SignDef | null) => {
    nearRef.current = s;
    setNear(s);
  }, []);
  const handlePick = useCallback((id: string) => scrollToSection(id), []);
  const handleMode = useCallback((car: boolean) => setIsCar(car), []);

  useEffect(() => {
    if (isDesktop === false) return;
    const onKeyDown = (e: KeyboardEvent) => {
      // Only hijack drive keys while the hero is in view.
      if (window.scrollY < window.innerHeight * 0.7 && DRIVE_KEYS.has(e.code)) {
        e.preventDefault();
      }
      if (e.code === "Enter" && nearRef.current) {
        e.preventDefault();
        scrollToSection(nearRef.current.id);
      }
    };
    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDesktop]);

  return (
    <>
      {/* Layer 0 — the live 3D world */}
      <div className="world-fixed" aria-hidden>
        {isDesktop === null ? (
          <div className="h-full w-full bg-canvas" />
        ) : isDesktop ? (
          <DrivingCanvas onNear={handleNear} onPick={handlePick} onMode={handleMode} />
        ) : (
          <MobileWorld />
        )}
      </div>

      {/* Layer 1 — readability scrim that frosts the world as you scroll */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          opacity: scrimOpacity,
          backdropFilter: scrimBlur,
          WebkitBackdropFilter: scrimBlur,
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--canvas) 60%, transparent) 0%, color-mix(in srgb, var(--canvas) 88%, transparent) 100%)",
        }}
      />

      {/* HUD — only meaningful while driving in the hero */}
      {isDesktop && (
        <div className="pointer-events-none fixed inset-0 z-30">
          <div
            className={`absolute bottom-6 left-6 hidden rounded-2xl glass-panel px-4 py-3 transition-all duration-500 md:block ${
              atTop ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <p className="font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              Drive the rover
            </p>
            <div className="mt-2 flex items-center gap-2 text-ink/80">
              {["W", "A", "S", "D"].map((k) => (
                <kbd
                  key={k}
                  className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface/80 text-xs font-semibold shadow-sm"
                >
                  {k}
                </kbd>
              ))}
              <span className="ml-1 text-xs text-ink-muted">or arrows</span>
            </div>
            <p className="mt-2 text-xs text-ink-muted">
              Reach a sign and press{" "}
              <kbd className="rounded border border-border bg-surface/80 px-1.5 py-0.5 text-[10px] font-semibold">
                Enter
              </kbd>
            </p>
            <p className="mt-1.5 text-xs text-ink-muted">
              Press{" "}
              <kbd className="rounded border border-copper/40 bg-copper-soft px-1.5 py-0.5 text-[10px] font-semibold text-copper">
                E
              </kbd>{" "}
              to morph into a {isCar ? "rover" : "car"}
            </p>
          </div>

          <div
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full glass-panel px-5 py-2.5 shadow-lg transition-all duration-300 ${
              near && atTop ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ borderColor: near ? `${near.color}66` : undefined }}
          >
            <p className="text-sm font-semibold text-ink">
              {near?.label} ·{" "}
              <span className="font-normal text-ink-muted">press Enter to open</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

function MobileWorld() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-canvas">
      <div className="absolute -left-24 top-10 h-72 w-72 animate-float-slow rounded-full bg-copper/20 blur-3xl" />
      <div className="absolute -right-20 top-1/3 h-80 w-80 animate-float-slow rounded-full bg-forest/20 blur-3xl [animation-delay:-3s]" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 animate-float-slow rounded-full bg-copper-glow/20 blur-3xl [animation-delay:-6s]" />
    </div>
  );
}
