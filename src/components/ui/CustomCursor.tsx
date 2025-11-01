"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Client-side only detection to prevent hydration mismatch
    setIsMounted(true);
    const checkDesktop = window.innerWidth >= 1024;
    setIsDesktop(checkDesktop);

    if (!checkDesktop) return;

    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 150);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);

  // Don't render until mounted (avoids hydration mismatch)
  if (!isMounted) return null;

  // Don't render on tablet or mobile
  if (!isDesktop) return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed w-4 h-4 bg-white rounded-full pointer-events-none z-[9999] transition-transform duration-150 ${
        isClicking ? "scale-150" : "scale-100"
      } ${isVisible ? "opacity-100" : "opacity-0"}`}
      style={{
        transform: "translate(-50%, -50%)",
        mixBlendMode: "difference",
      }}
    />
  );
}
