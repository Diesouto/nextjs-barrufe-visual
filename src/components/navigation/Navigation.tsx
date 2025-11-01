"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar after scrolling 3 viewport heights
      const scrollPosition = window.scrollY;
      const threeViewportHeights = window.innerHeight * 3;
      setIsVisible(scrollPosition > threeViewportHeights);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Home
        </Link>
        <div className="flex gap-6">
          <a href="#posts" className="hover:underline">
            Posts
          </a>
          <a href="#workshops" className="hover:underline">
            Workshops
          </a>
        </div>
      </div>
    </nav>
  );
}
