"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export function useInView(visibleRatio = 0.35) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const check = () => {
      const rect = el.getBoundingClientRect();
      const visible =
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      if (visible >= rect.height * visibleRatio) {
        setInView(true);
        return true;
      }
      return false;
    };

    if (check()) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setInView(true),
      { threshold: visibleRatio }
    );
    observer.observe(el);
    // Fallback for environments where IntersectionObserver is unreliable
    const onScroll = () => check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [visibleRatio]);

  return { ref, inView };
}

export function useCountUp(
  target: number,
  run: boolean,
  duration = 1200,
  delay = 0,
  decimals = 0
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!run) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let frame = 0;
    let start: number | null = null;
    const factor = Math.pow(10, decimals);

    // Guarantees the counter lands on its final value even when frames
    // never tick (hidden tab) or the user prefers reduced motion.
    const settle = window.setTimeout(
      () => setValue(target),
      reduceMotion ? 0 : delay + duration + 600
    );

    if (!reduceMotion) {
      const tick = (now: number) => {
        if (start === null) start = now;
        const elapsed = now - start - delay;
        if (elapsed < 0) {
          frame = requestAnimationFrame(tick);
          return;
        }
        const t = Math.min(elapsed / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(Math.round(target * eased * factor) / factor);
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
    };
  }, [run, target, duration, delay, decimals]);

  return value;
}

export function revealStyle(inView: boolean, delay: number): CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`,
  };
}
