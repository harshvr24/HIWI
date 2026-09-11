"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PILLARS = [
  { word: "BUILD.", desc: "Create a strong digital foundation." },
  { word: "EVOLVE.", desc: "Keep improving how you show up online." },
  { word: "GROW.", desc: "Experiences that earn visibility, trust, and leads." },
];

const PillarsSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const wordRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;
    gsap.registerPlugin(ScrollTrigger);

    wordRefs.current = wordRefs.current.slice(0, PILLARS.length);

    // gsap.context scopes cleanup to this section's own animations — a global
    // ScrollTrigger sweep here would kill every other section's triggers too.
    const ctx = gsap.context(() => {
      // 3 oversized lines get a longer beat each than the reference's 7 words.
      const endPercent = PILLARS.length * 60;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${endPercent}%`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        wordRefs.current,
        { opacity: 0, y: -80 },
        { opacity: 1, y: 0, stagger: 1, ease: "none" },
        0
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full bg-off-white">
      <div style={{ height: `${PILLARS.length * 60}vh` }}>
        <div className="sticky top-0 h-screen w-full flex items-center">
          <div className="w-full px-4 md:px-8">
            <div className="w-full flex flex-col justify-center gap-4 md:gap-6">
              {PILLARS.map((pillar, i) => (
                <div
                  key={pillar.word}
                  ref={(el) => {
                    if (!el) return;
                    wordRefs.current[i] = el;
                  }}
                  className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8 opacity-0"
                  style={{ transform: "translateY(-40px)" }}
                >
                  <h1 className="m-0 text-[13vw] md:text-[9vw] leading-[0.9] font-black uppercase tracking-[-0.03em] text-obsidian">
                    {pillar.word}
                  </h1>
                  <p className="text-zinc-500 text-sm md:text-lg font-medium max-w-xs md:max-w-sm">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PillarsSection;
