"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TitleExperimentProps {
  title: string;
}

export function TitleExperiment({ title }: TitleExperimentProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!titleRef.current || !containerRef.current) return;

    const fonts = [
      "serif",
      "sans-serif",
      "monospace",
      "cursive",
      "fantasy",
      "system-ui",
      "Georgia, serif",
      "Courier New, monospace",
      "Arial, sans-serif",
      "Impact, sans-serif",
    ];

    const section = containerRef.current.closest("section");

    // Create a single ScrollTrigger for pinning
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=200vh",
    });

    // Animate each character on scroll
    charsRef.current.forEach((char, index) => {
      if (!char) return;

      // Each character changes font multiple times based on scroll
      const fontChanges = 8; // Number of font changes per character
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200vh",
          scrub: 0.5,
          immediateRender: true,
        },
      });

      // Create multiple font changes for each character
      for (let i = 0; i < fontChanges; i++) {
        const progress = i / fontChanges;
        const fontIndex = (index + i) % fonts.length;

        timeline.to(
          char,
          {
            fontFamily: fonts[fontIndex],
            fontWeight: 400 + (i % 5) * 100,
            duration: 0.1,
            ease: "none",
          },
          progress
        );
      }

      // Add some scale and rotation variations
      timeline.to(
        char,
        {
          scale: 1 + Math.sin(index) * 0.2,
          rotation: Math.cos(index) * 5,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [title]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen flex items-center justify-center"
    >
      <h1
        ref={titleRef}
        className="text-[12vw] font-bold text-center px-4"
        style={{ letterSpacing: "0.02em", lineHeight: "1" }}
      >
        {[...title].map((char, index) => {
          const isRed = index === 0;

          return (
            <span
              key={index}
              ref={(el) => {
                charsRef.current[index] = el;
              }}
              className="inline-block transition-all align-middle"
              style={{
                fontFamily: "sans-serif",
                color: isRed ? "#D71414" : "inherit",
                lineHeight: "1",
                verticalAlign: "middle",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </h1>
    </div>
  );
}
