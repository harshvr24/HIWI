"use client";

import { useState, useEffect } from "react";

import gsap from "gsap";
import HeroVisual from "@/components/HeroVisual";
import HeroOrbital from "@/components/HeroOrbital";
import PhilosophySection from "@/components/PhilosophySection";
import WorkSection from "@/components/WorkSection";
import ServicesSection from "@/components/ServicesSection";
import PillarsSection from "@/components/PillarsSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import StartProjectSection from "@/components/StartProjectSection";
import TextType from "@/components/TextType";
import Footer from "@/components/Footer";

// Defined OUTSIDE Home so React never unmounts/remounts it on state changes
const HeroText = ({
  color,
  className = "",
  startAnimate,
}: {
  color: string;
  className?: string;
  startAnimate: boolean;
}) => {
  const variant = color === "text-off-white" ? "light" : "dark";

  useEffect(() => {
    if (!startAnimate) return;
    gsap.fromTo(
      `.hero-line-${variant}`,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.1 }
    );
  }, [startAnimate, variant]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 flex flex-col justify-start pt-[3vw] ${color} ${className}`}
    >
      <div className="w-full px-4">
        {/* 9vw fills ~99% of the line, so the fixed side padding only fits at desktop widths */}
        <h1 className="text-[7.5vw] md:text-[9vw] leading-[0.8] flex flex-col w-full tracking-[-0.05em] uppercase m-0 p-0 font-black">
          <span className="block text-right mr-2 md:mr-5">Wired to build</span>
          <div className="flex justify-end w-full">
            <span
              className={`hero-line-${variant} mt-2 md:ml-10`}
              style={{ opacity: 0 }}
            >
              {"What's next"}
            </span>
          </div>
        </h1>
      </div>
    </div>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [startAnimate, setStartAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        setLoading(false);
        setStartAnimate(true);
      }, 800);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Loading Overlay */}
      {loading && (
        <div
          className={`fixed inset-0 z-100 flex flex-col items-center justify-center bg-obsidian text-off-white transition-opacity duration-800 ${isFadingOut ? "opacity-0" : "opacity-100"}`}
        >
          <span className="w-2 h-2 rounded-full bg-lime mb-6 animate-pulse-glow"></span>
          <div className="text-sm tracking-[0.3em] opacity-80 uppercase animate-fade-up">
            HIWI — Wired to build what&apos;s next
          </div>
        </div>
      )}

      <main className="relative min-h-screen w-full bg-off-white top-0 left-0">
        {/* 1. Headline, spanning both columns. The hero is a single off-white ground now,
            so the old split-screen trick — a second, light-coloured copy of this text
            clipped inside a dark panel — is gone; one obsidian layer covers the full width.
            pointer-events-none is load-bearing: at z-30 this box would otherwise swallow
            every click meant for the orbital nodes and the CTAs underneath it. */}
        <div className="pointer-events-none absolute inset-0 z-30">
          <HeroText color="text-obsidian" startAnimate={startAnimate} />
        </div>

        {/* 2. Split Layout Container */}
        <div className="relative flex min-h-screen w-full flex-col md:flex-row">
          {/* Wire grid spans the whole hero, not just the left column. While the left half
              was obsidian the grid's edge hid inside the colour split; on one continuous
              off-white ground a texture that stops halfway reads as a rendering fault.
              It paints the off-white ground itself, so the columns above stay transparent. */}
          <HeroVisual />

          {/* Left Side: the orbital nav */}
          <div className="relative h-[60vh] md:h-screen md:w-1/2 overflow-hidden z-10">
            {/* The orbital is this page's navigation. The z-0 wrapper is deliberate: it
                opens a stacking context so an expanded card's z-index stays inside the
                panel instead of punching through the headline layer above. */}
            <div className="absolute inset-0 z-0">
              <HeroOrbital />
            </div>
          </div>

          {/* Right Side: Studio intro. Height is auto on mobile so the CTAs never fall below the fold. */}
          <div className="relative h-auto md:h-screen md:w-1/2 flex flex-col justify-start pt-10 pb-16 md:pt-[35vh] md:pb-0 items-start md:items-end px-6 md:pr-4 md:pl-0 z-20">
            <div className="max-w-md flex flex-col items-start gap-4">
              <div className="md:mt-[3em]">
                <span className="w-2.5 h-2.5 rounded-full bg-lime block animate-pulse-glow"></span>
              </div>
              <p className="text-zinc-500 text-lg leading-relaxed font-medium text-left">
                HIWI is a digital studio. We help businesses build a strong online
                presence and create digital foundations designed for growth.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <a
                  href="#start-a-project"
                  className="inline-flex items-center gap-2 bg-lime text-obsidian font-bold uppercase tracking-wide text-sm px-7 py-4 rounded-full hover:bg-obsidian hover:text-off-white transition-colors"
                >
                  Start a Project
                  <span aria-hidden>→</span>
                </a>
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 border border-zinc-300 text-obsidian font-bold uppercase tracking-wide text-sm px-7 py-4 rounded-full hover:border-obsidian transition-colors"
                >
                  Explore Our Work
                </a>
              </div>
            </div>
          </div>
        </div>

        <PhilosophySection />
        <WorkSection />
        <ServicesSection />
        <PillarsSection />
        <ProcessSection />
        <AboutSection />
        <StartProjectSection />
        <section className="relative z-10 w-full bg-off-white py-16 md:py-24 flex items-center justify-center">
          <TextType
            text={["LET'S BUILD", "WHAT'S NEXT"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="|"
            deletingSpeed={50}
            cursorBlinkDuration={0.5}
            className="text-4xl md:text-6xl lg:text-9xl uppercase font-semibold text-center text-obsidian px-4"
          />
        </section>
        <Footer />
      </main>
    </>
  );
}
