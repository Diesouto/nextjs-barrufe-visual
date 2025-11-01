"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTextProps {
  text: string;
  className?: string;
  redPattern?: (index: number) => boolean;
}

export function AnimatedText({
  text,
  className = "",
  redPattern,
}: AnimatedTextProps) {
  const textRef = useRef<HTMLElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!textRef.current) return;

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

    const section = textRef.current.closest("section");

    // Animate each character on scroll
    charsRef.current.forEach((char, index) => {
      if (!char) return;

      // Each character changes font multiple times based on scroll
      const fontChanges = 8;
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: 0.5,
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
          scale: 1 + Math.sin(index) * 0.1,
          rotation: Math.cos(index) * 3,
          duration: 0.5,
          ease: "power2.inOut",
        },
        0
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [text]);

  return (
    <span ref={textRef} className={className} style={{ lineHeight: "1" }}>
      {[...text].map((char, index) => {
        const isRed = redPattern ? redPattern(index) : false;

        return (
          <span
            key={index}
            ref={(el) => {
              charsRef.current[index] = el;
            }}
            className="inline-block transition-all align-middle"
            style={{
              fontFamily: "sans-serif",
              color: isRed ? "#ef4444" : "inherit",
              lineHeight: "1",
              verticalAlign: "middle",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </span>
  );
}
