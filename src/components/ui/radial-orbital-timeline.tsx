"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Monogram from "@/components/Monogram";
import ScrambledText from "@/components/ScrambledText";

export interface OrbitalItem {
  id: number;
  title: string;
  content: string;
  /** In-page anchor the node links to. Lenis intercepts hash anchors document-wide. */
  href: string;
  icon: React.ElementType;
  relatedIds: number[];
}

interface RadialOrbitalTimelineProps {
  items: OrbitalItem[];
  /** Accessible name for the nav landmark wrapping the nodes. */
  label: string;
}

// The orbit sits below the panel's vertical middle so the ring clears the hero headline
// that overlays the top third of the same panel.
const CENTER_Y_RATIO = 0.62;
const NODE_SIZE = 40;
const CARD_WIDTH = 256;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export default function RadialOrbitalTimeline({
  items,
  label,
}: RadialOrbitalTimelineProps) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [hasFocus, setHasFocus] = useState(false);
  const [inView, setInView] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Radius is measured from the panel, never hardcoded: this renders into a half-width
  // hero column that is ~950px wide at 1920 but full-width and only 60vh tall on a phone.
  // The height cap is derived, not guessed — the orbit sits at CENTER_Y_RATIO, so the
  // space below it is (1 - ratio) * height, and the bottom node still needs ~44px under
  // it for its label. A flat fraction of the height overflows a landscape phone.
  const radius = clamp(
    Math.min(size.width * 0.3, size.height * (1 - CENTER_Y_RATIO) - 44),
    48,
    210
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () =>
      setSize({ width: el.clientWidth, height: el.clientHeight });
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotionChange = () => setReduceMotion(mq.matches);
    onMotionChange();
    mq.addEventListener("change", onMotionChange);

    return () => {
      ro.disconnect();
      io.disconnect();
      mq.removeEventListener("change", onMotionChange);
    };
  }, []);

  // Auto-rotation, stopped whenever it would be wasted work or would make the nodes a
  // moving target: scrolled off-screen, tab hidden, card open, pointer or keyboard on a node.
  useEffect(() => {
    const running =
      inView && !hasFocus && activeId === null && hoveredId === null && !reduceMotion;
    if (!running) return;

    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      if (timer !== null) return;
      timer = setInterval(() => {
        setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)));
      }, 50);
    };
    const stop = () => {
      if (timer === null) return;
      clearInterval(timer);
      timer = null;
    };

    const onVisibility = () => (document.hidden ? stop() : start());

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [inView, hasFocus, activeId, hoveredId, reduceMotion]);

  const toggleItem = useCallback(
    (id: number) => {
      setActiveId((prev) => {
        if (prev === id) return null;
        // Snap the opened node to the top of the orbit so its card expands downward into
        // open space. Skipped under reduced motion — the flip/clamp below keeps the card
        // on-screen wherever the node happens to be sitting.
        const index = items.findIndex((item) => item.id === id);
        if (index !== -1 && !reduceMotion) {
          setRotationAngle(270 - (index / items.length) * 360);
        }
        return id;
      });
    },
    [items, reduceMotion]
  );

  const closeAll = () => setActiveId(null);
  const activeItem = items.find((item) => item.id === activeId) ?? null;

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
      onClick={(e) => {
        // Only a click on the empty backdrop closes; clicks inside a node or card never
        // satisfy this, so no child needs to stop propagation (which would also stop
        // SmoothScroll's document-level anchor handler).
        if (e.target === e.currentTarget) closeAll();
      }}
    >
      <nav
        aria-label={label}
        className="absolute left-1/2"
        style={{ top: `${CENTER_Y_RATIO * 100}%` }}
        onMouseLeave={() => setHoveredId(null)}
        onFocusCapture={() => setHasFocus(true)}
        onBlurCapture={() => setHasFocus(false)}
      >
        {/* Core: the HIWI mark, not a gradient blob. The expanding pulse rings are
            obsidian, not lime — lime on off-white is too low-contrast to read as motion. */}
        <div className="pointer-events-none absolute left-0 top-0">
          <div
            className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-obsidian/25 opacity-40"
            style={{ width: 84, height: 84, animationDuration: "3s" }}
          />
          <div
            className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-obsidian/15 opacity-30"
            style={{
              width: 108,
              height: 108,
              animationDuration: "3s",
              animationDelay: "1s",
            }}
          />
          <div className="absolute left-0 top-0 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-lime/40 bg-obsidian shadow-[0_0_28px_rgba(199,255,61,0.18)]">
            <Monogram size={26} className="text-off-white" />
          </div>
        </div>

        {/* Orbit ring, sized from the same radius the nodes use so it actually passes
            through them — the upstream snippet drew a 384px ring for a 400px orbit. */}
        <div
          className="pointer-events-none absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border"
          style={{
            width: radius * 2,
            height: radius * 2,
            borderColor: "rgba(9, 9, 9, 0.14)",
          }}
        />

        {items.map((item, index) => {
          const angle = ((index / items.length) * 360 + rotationAngle) % 360;
          const radian = (angle * Math.PI) / 180;
          // Rounded before they reach an inline style: the browser's CSSOM rounds
          // `-63.10332556124591px` to `-63.1033px` when it parses the server HTML, and
          // React's hydration check reports that as a mismatch.
          const x = Number((radius * Math.cos(radian)).toFixed(2));
          const y = Number((radius * Math.sin(radian)).toFixed(2));
          const depth = (1 + Math.sin(radian)) / 2;

          const isActive = activeId === item.id;
          const isRelated =
            activeItem !== null &&
            !isActive &&
            activeItem.relatedIds.includes(item.id);
          const Icon = item.icon;

          // Keep the card inside the panel: centre it on the node, then push it back in
          // if either edge would escape. Without this a 256px card overflows a 390px
          // phone panel the moment a node swings wide.
          const cardWidth = Math.min(CARD_WIDTH, Math.max(size.width - 24, 180));
          const idealLeft = size.width / 2 + x - cardWidth / 2;
          const cardShiftX =
            clamp(idealLeft, 12, Math.max(size.width - cardWidth - 12, 12)) - idealLeft;

          return (
            <div
              key={item.id}
              className="absolute left-0 top-0 transition-[transform,opacity] duration-700 ease-out"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                // Far side of the orbit sits back, but only slightly: this is the page's
                // navigation, so every label has to stay readable. The open node never dims.
                opacity: isActive
                  ? 1
                  : Number(clamp(0.7 + 0.3 * depth, 0.7, 1).toFixed(3)),
                zIndex: isActive ? 60 : Math.round(20 + 10 * Math.cos(radian)),
              }}
            >
              <button
                type="button"
                aria-expanded={isActive}
                aria-label={`${item.title} — ${item.content}`}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() =>
                  setHoveredId((prev) => (prev === item.id ? null : prev))
                }
                onClick={() => toggleItem(item.id)}
                className="absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-obsidian focus-visible:ring-offset-2 focus-visible:ring-offset-off-white"
                style={{ width: NODE_SIZE, height: NODE_SIZE }}
              >
                <span
                  className={`absolute inset-0 rounded-full border-2 transition-colors duration-300 ${
                    isActive
                      ? // Obsidian rim, not lime-on-lime: against off-white the lime fill
                        // alone has too little edge definition to read as the open node.
                        "border-obsidian bg-lime shadow-[0_0_22px_rgba(199,255,61,0.75)]"
                      : isRelated
                        ? // Hollow: off-white fill inside an obsidian rim, so related nodes
                          // sit visually between the solid idle nodes and the lime one.
                          "animate-pulse border-obsidian bg-off-white"
                        : "border-obsidian bg-obsidian"
                  }`}
                />
                <Icon
                  size={16}
                  className={`relative transition-colors duration-300 ${
                    isActive || isRelated ? "text-obsidian" : "text-off-white"
                  }`}
                />
              </button>

              <span
                className={`pointer-events-none absolute left-0 top-7 w-max -translate-x-1/2 whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${
                  // Not lime: lime text on off-white fails contrast badly. The lime node
                  // itself is what marks the open section.
                  isActive ? "text-obsidian" : "text-obsidian/70"
                }`}
              >
                <ScrambledText text={item.title} active={hoveredId === item.id} />
              </span>

              {isActive && (
                <Card
                  className="absolute left-0 border-off-white/20 bg-obsidian/95 text-off-white shadow-[0_18px_60px_rgba(0,0,0,0.6)] backdrop-blur-lg"
                  style={{
                    width: cardWidth,
                    transform: `translateX(calc(-50% + ${cardShiftX}px))`,
                    // Flip above the node when it is in the lower half of the orbit.
                    ...(y > 0 ? { bottom: 56 } : { top: 56 }),
                  }}
                >
                  <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm font-black uppercase tracking-[0.14em] text-off-white">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0 text-xs leading-relaxed text-off-white/75">
                    <p>{item.content}</p>

                    {/* A plain hash anchor on purpose — SmoothScroll's document-level
                        listener turns it into a Lenis scroll with no extra wiring. */}
                    <a
                      href={item.href}
                      onClick={closeAll}
                      className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-lime transition-opacity hover:opacity-70"
                    >
                      Go to section
                      <ArrowRight size={12} />
                    </a>

                    {item.relatedIds.length > 0 && (
                      <div className="mt-4 border-t border-off-white/10 pt-3">
                        <div className="mb-2 flex items-center gap-1 text-off-white/60">
                          <Link2 size={10} />
                          <h4 className="text-[10px] font-medium uppercase tracking-[0.18em]">
                            Connected
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.relatedIds.map((relatedId) => {
                            const related = items.find((i) => i.id === relatedId);
                            if (!related) return null;
                            return (
                              <Button
                                key={relatedId}
                                variant="outline"
                                size="sm"
                                className="h-6 rounded-none border-off-white/20 bg-transparent px-2 py-0 text-[10px] uppercase tracking-wider text-off-white/80 hover:bg-off-white/10 hover:text-off-white"
                                onClick={() => toggleItem(relatedId)}
                              >
                                {related.title}
                                <ArrowRight size={8} className="ml-1 text-off-white/60" />
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
