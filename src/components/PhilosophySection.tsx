"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const text =
  "Every business deserves a digital presence that reflects its potential. A website shouldn't just exist — it should say who you are, what you do, and why people should trust you. We design and build digital experiences that make businesses more visible, more credible, and ready to grow.";

const PhilosophySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || !sectionRef.current || !containerRef.current) return;

    // Split into per-character spans, grouped by word so lines only break at spaces
    textRef.current.innerHTML = "";
    const characters: HTMLSpanElement[] = [];
    text.split(" ").forEach((word, wordIndex, words) => {
      const wordSpan = document.createElement("span");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      const chars = wordIndex < words.length - 1 ? `${word} ` : word;
      chars.split("").forEach((char) => {
        const span = document.createElement("span");
        span.innerText = char;
        span.style.opacity = "0.2";
        span.style.color = "#a1a1aa";
        span.style.display = "inline-block";
        span.style.whiteSpace = char === " " ? "pre" : "normal";
        wordSpan.appendChild(span);
        characters.push(span);
      });

      textRef.current!.appendChild(wordSpan);
    });

    // Pin the container at the bottom-left while letters animate
    const pinST = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: containerRef.current,
      pinSpacing: false,
    });

    // Animate letters from dim → obsidian over the full scroll of the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
      },
    });

    tl.to(characters, {
      opacity: 1,
      color: "#090909",
      stagger: { each: 0.1, from: "start" },
      ease: "none",
      onUpdate: function () {
        const progress = this.progress();
        const activeIndex = Math.floor(progress * characters.length);
        characters.forEach((span, i) => {
          if (i === activeIndex) {
            span.style.textShadow = "0 0 20px rgba(9,9,9,0.45)";
          } else if (Math.abs(i - activeIndex) < 5) {
            span.style.textShadow = "0 0 10px rgba(9,9,9,0.15)";
          } else {
            span.style.textShadow = "none";
          }
        });
      },
    });

    return () => {
      pinST.kill();
      tl.kill();
    };
  }, []);

  return (
    // 300vh gives the scroll room for the letter animation
    <section id="philosophy" ref={sectionRef} className="relative w-full bg-off-white" style={{ height: "300vh" }}>
      {/* This container gets pinned by GSAP — sits at bottom-left of viewport */}
      <div
        ref={containerRef}
        className="w-full flex flex-col justify-center px-8 md:px-16"
        style={{ height: "100vh" }}
      >
        {/* mx-auto centres the block; the paragraph itself stays left-aligned —
            centre-aligned ragged text at this size and length reads badly. */}
        <div className="max-w-5xl mx-auto">
          <p className="text-zinc-400 uppercase tracking-widest text-xs mb-2 font-bold">
            Philosophy
          </p>
          <h2
            ref={textRef}
            className="text-[4.5vw] md:text-[2.3vw] leading-[1.15] font-black text-zinc-300"
          >
            {text}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
