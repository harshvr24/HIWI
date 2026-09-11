"use client";

import { useEffect, useState } from "react";
import Monogram from "@/components/Monogram";

const MARQUEE_TEXT = "© HIWI — WIRED TO BUILD WHAT'S NEXT ";

const Footer = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const formatTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };
    formatTime();
    const id = setInterval(formatTime, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="relative z-10 w-full min-h-[40vh] bg-obsidian text-off-white flex flex-col">
      {/* Top bar: mark + location + time */}
      <div className="flex justify-between items-center px-8 md:px-16 py-2 md:py-3 text-lg text-off-white/70">
        <span className="flex items-center gap-3">
          <Monogram size={22} className="text-off-white" />
          Based in India
        </span>
        {time && <span>{time}</span>}
      </div>

      {/* Middle: contact links */}
      <div className="flex flex-1 items-center justify-between px-8 md:px-16 py-4 md:py-6 w-full">
        {/* TODO(Harsh): replace # with the real HIWI Instagram URL */}
        <a
          href="#"
          className="font-black uppercase text-off-white hover:text-lime transition-colors text-xl md:text-2xl lg:text-3xl"
        >
          Instagram
        </a>

        <a
          href="mailto:harshvr24@gmail.com"
          className="font-black uppercase text-off-white hover:text-lime transition-colors text-xl md:text-2xl lg:text-3xl"
        >
          Email
        </a>

        {/* TODO(Harsh): replace # with the real HIWI LinkedIn URL */}
        <a
          href="#"
          className="font-black uppercase text-off-white hover:text-lime transition-colors text-xl md:text-2xl lg:text-3xl"
        >
          LinkedIn
        </a>
      </div>

      {/* Bottom: auto-moving marquee */}
      <div className="overflow-hidden shrink-0">
        <div className="flex py-1 md:py-2 marquee-track mb-12">
          <span className="marquee-content flex shrink-0 items-center gap-8 pr-8 font-black text-base md:text-3xl lg:text-5xl text-off-white/90 whitespace-nowrap">
            {[...Array(6)].map((_, i) => (
              <span key={i}>{MARQUEE_TEXT}</span>
            ))}
          </span>
          <span
            className="marquee-content flex shrink-0 items-center gap-8 pr-8 font-black text-base md:text-3xl lg:text-5xl text-off-white/90 whitespace-nowrap"
            aria-hidden
          >
            {[...Array(6)].map((_, i) => (
              <span key={i}>{MARQUEE_TEXT}</span>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
