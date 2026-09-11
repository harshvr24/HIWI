"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Monogram from "@/components/Monogram";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-reveal", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full bg-off-white py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5 about-reveal">
            <p className="text-zinc-400 uppercase tracking-widest text-xs mb-4 font-bold">About</p>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter text-obsidian leading-[0.9]">
              A studio wired in.
            </h2>
            <div className="mt-8 text-obsidian">
              <Monogram size={44} />
            </div>
          </div>

          {/* gap, not space-y: the global `p { margin: 0 !important }` defeats margin-based spacing */}
          <div className="md:col-span-7 flex flex-col gap-6 text-lg text-zinc-600 leading-relaxed about-reveal">
            <p>
              HIWI is a digital studio founded by Harsh — the name comes from a simple idea:{" "}
              <span className="text-obsidian font-medium">Harsh is wired in.</span> Wired into
              technology, into design, into how businesses actually grow online.
            </p>
            <p>
              We build websites with a purpose. Not because a business “needs a website”,
              but because a good one becomes an asset — it says who you are, builds credibility,
              and gives customers a clear way to act.
            </p>
            <p>
              Today the studio focuses on website design and development. The direction is
              bigger: digital experiences, e-commerce, and the products that come after.
              Build. Evolve. Grow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
