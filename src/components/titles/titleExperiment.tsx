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

    // Create a master timeline with ScrollTrigger (this handles both pinning and animation)
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=200vh", // Stay pinned and animate for 2 viewport heights
        scrub: 0.5,
        pin: true,
        immediateRender: true,
      },
    });

    // Animate each character on scroll
    charsRef.current.forEach((char, index) => {
      if (!char) return;

      // Each character changes font multiple times based on scroll
      const fontChanges = 8; // Number of font changes per character

      // Create multiple font changes for each character
      for (let i = 0; i < fontChanges; i++) {
        const progress = i / fontChanges;
        const fontIndex = (index + i) % fonts.length;

        masterTimeline.to(
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
      masterTimeline.to(
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
      className="w-full h-screen flex items-center justify-center paper-bg"
    >
      <h1
        ref={titleRef}
        className="text-[12vw] font-bold text-center px-4 swanky-and-moo-moo-regular flex flex-col lg:flex-row lg:gap-[0.5vw]"
        style={{ letterSpacing: "0.02em", lineHeight: "1" }}
      >
        {title.split(" ").map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {[...word].map((char, charIndex) => {
              const absoluteIndex =
                wordIndex === 0 ? charIndex : word.length + charIndex + 1;
              const isRed = absoluteIndex === 0;

              return (
                <span
                  key={`${wordIndex}-${charIndex}`}
                  ref={(el) => {
                    charsRef.current[absoluteIndex] = el;
                  }}
                  className="inline-block transition-all align-middle"
                  style={{
                    fontFamily: "sans-serif",
                    color: isRed ? "#D71414" : "inherit",
                    lineHeight: "1",
                    verticalAlign: "middle",
                  }}
                >
                  {char}
                </span>
              );
            })}
          </span>
        ))}
      </h1>
    </div>
  );
}
