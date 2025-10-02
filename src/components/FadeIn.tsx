"use client";

import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type FadeInProps = {
  children: React.ReactNode;
  vars?: gsap.TweenVars;
  start?: string;
  className?: string;
  targetChildren?: boolean;
};

/**
 * Wraps content in a container that applies a staggered fade-in animation when scrolled into view.
 *
 * The animation initializes elements with opacity 0 and a vertical offset, then animates them to
 * opacity 1 and y 0 with a staggered timing and ScrollTrigger tied to the container.
 *
 * @param vars - Optional GSAP tween vars to extend or override the default animation configuration.
 * @param start - ScrollTrigger start position (e.g., `"top 50%"`) that determines when the animation begins.
 * @param targetChildren - If `true`, animate the container's child elements individually; otherwise animate the container itself.
 * @returns A JSX element that wraps `children` and applies the configured scroll-triggered fade-in animation.
 */
export function FadeIn({
  children,
  className,
  start = "top 50%",
  targetChildren = false,
  vars = {},
}: FadeInProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const target = targetChildren
      ? containerRef.current?.children
      : containerRef.current;

    if (!target) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(target, {
        opacity: 0,
        y: 60,
      });

      gsap.to(target, {
        duration: 0.8,
        opacity: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.2,
        ...vars,
        scrollTrigger: {
          trigger: containerRef.current,
          start,
        },
      });
    });
  });

  return (
    <div ref={containerRef} className={clsx(className)}>
      {children}
    </div>
  );
}