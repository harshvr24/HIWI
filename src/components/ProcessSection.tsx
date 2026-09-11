"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const STEPS = [
  { num: "01", name: "Discover", desc: "Understand the business, audience, goals, and existing digital presence." },
  { num: "02", name: "Define", desc: "Define the structure, content, user journey, and visual direction." },
  { num: "03", name: "Design", desc: "Create the UI/UX and visual experience." },
  { num: "04", name: "Build", desc: "Develop the website with modern technologies and best practices." },
  { num: "05", name: "Test", desc: "Test responsiveness, usability, performance, and compatibility." },
  { num: "06", name: "Launch", desc: "Deploy the website and configure the infrastructure." },
  { num: "07", name: "Evolve", desc: "Ongoing improvements, maintenance, and future development." },
];

const ProcessSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !headingRef.current) return;
    // only enable GSAP pinning on medium+ screens (disable on small/mobile)
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    if (!mq.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;

    // gsap.context scopes cleanup to this section's own animations — a global
    // ScrollTrigger sweep here would kill every other section's triggers too.
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        // "bottom bottom", not "+=offsetHeight": the latter holds the heading pinned for a
        // full section height past the top edge — one viewport too long — so it stays fixed
        // and overlaps whatever section comes next.
        end: "bottom bottom",
        pin: headingRef.current,
        pinSpacing: false,
        anticipatePin: 1,
      });

      // Staggered reveal for list rows
      gsap.fromTo(
        ".process-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".process-list",
            start: "top 80%",
          },
        }
      );
    }, container);

    // Lenis changes document height after mount, so trigger positions need recomputing
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={containerRef} className="w-full bg-off-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 md:col-span-4">
            <div ref={headingRef} className="self-start z-10">
              <h2 className="text-4xl md:text-4xl lg:text-6xl font-black uppercase text-obsidian text-left">Process</h2>
              <p className="mt-6 text-sm text-zinc-500 max-w-md mx-auto md:mx-0">
                A structured path from first conversation to launch — and beyond it.
              </p>
            </div>
          </div>

          <div className="col-span-12 md:col-span-8 flex justify-center md:justify-end">
            <div className="process-list w-full md:w-3/4 border-t border-b border-zinc-300 mx-auto md:mx-0">
              {STEPS.map((step, i) => (
                <div
                  key={step.num}
                  className={`process-item flex items-start gap-6 py-6 px-4 ${i < STEPS.length - 1 ? "border-b border-zinc-300" : ""}`}
                >
                  <div className="text-sm text-zinc-400 w-8 pt-1 shrink-0">{step.num}</div>
                  <div className="flex-1">
                    <div className="text-base md:text-lg font-bold text-obsidian uppercase tracking-wide">{step.name}</div>
                    <p className="mt-1 text-sm text-zinc-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
