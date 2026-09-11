"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: "WEBSITE DESIGN & DEVELOPMENT",
    desc: "Business websites, startup sites, landing pages, and full redesigns — designed and built custom.",
  },
  {
    title: "E-COMMERCE",
    desc: "Product experiences, shopping interfaces, payment integrations, and CMS setups.",
  },
  {
    title: "DIGITAL EXPERIENCES",
    desc: "UI/UX design, interactive interfaces, motion, and scroll experiences.",
  },
  {
    title: "DIGITAL GROWTH",
    desc: "Performance, SEO foundations, analytics, and ongoing improvement.",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const titleRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;
    const section = sectionRef.current;

    const items = titleRefs.current.slice(0, services.length);
    const vh = window.innerHeight;

    // Place each title far below initially (stacked by viewport) so they animate into a compact stack
    items.forEach((el, i) => {
      gsap.set(el, { y: i * vh });
    });

    // Measure title height to compute a tighter scroll area
    const compactHeight = items[0]?.getBoundingClientRect().height ?? 80;
    const gap = 8; // px between stacked titles
    const totalScroll = vh + (compactHeight + gap) * (services.length - 1);

    // Give the section the exact scroll space needed (prevents excessive white space after the section)
    section.style.height = `${Math.round(totalScroll)}px`;

    // gsap.context scopes cleanup to this section's own animations — a global
    // ScrollTrigger sweep here would kill every other section's triggers too.
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${Math.round(totalScroll)}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });

      // Animate titles from big gaps → compact stacked column
      tl.to(items, {
        y: (i) => i * (compactHeight + gap),
        ease: "power3.out",
        stagger: { each: 0.8, from: "start" },
      });
    }, section);

    return () => {
      ctx.revert();
      section.style.height = "";
    };
  }, []);

  return (
    <section id="services" className="w-full bg-off-white">
      <div ref={sectionRef} className="relative w-full">
        <div className="sticky top-0 h-screen w-full flex items-start">
          <div className="w-full px-6 md:px-12 pt-8">
            <div className="max-w-6xl mx-auto">
              <div className="pb-10 border-b border-obsidian mb-12">
                <h2 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter text-obsidian leading-[0.8]">
                  Services
                </h2>
              </div>

              {/* Overlay container: titles are absolutely positioned layers that GSAP moves into a stacked layout */}
              <div className="relative w-full h-screen">
                {services.map((service, i) => (
                  <div
                    key={service.title}
                    ref={(el) => {
                      if (!el) return;
                      titleRefs.current[i] = el;
                    }}
                    className="absolute left-0 top-0 w-full bg-off-white"
                    style={{ willChange: "transform, opacity", zIndex: services.length - i }}
                  >
                    <div className="py-6 md:py-8">
                      <h3 className="text-3xl md:text-6xl lg:text-5xl font-black uppercase tracking-tighter text-obsidian">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm md:text-base text-zinc-500 font-medium max-w-2xl">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
