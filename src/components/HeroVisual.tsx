"use client";

import { useEffect, useRef } from "react";

// Substrate for the hero's orbital nav: a slowly drifting line grid on off-white.
// Deliberately faint — the lime signal now lives in the orbital core and its active
// nodes, and two competing lime animations in one panel reads as noise.
const GRID = 56; // px between wires

const HeroVisual = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let rafId: number | null = null;
    let drift = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Setting canvas.width wipes the bitmap, so repaint immediately. Without this the
      // grid vanishes for good on any resize that happens while the rAF loop isn't
      // running — a hidden tab, or reduced-motion, where the loop never starts at all.
      drawGrid(drift);
    };

    const drawGrid = (offset: number) => {
      ctx.fillStyle = "#F5F5F0";
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(9, 9, 9, 0.05)";
      ctx.beginPath();
      for (let x = -GRID + (offset % GRID); x < width + GRID; x += GRID) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = -GRID + (offset % GRID); y < height + GRID; y += GRID) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
      // sparse brighter intersections for a technical feel
      ctx.fillStyle = "rgba(9, 9, 9, 0.1)";
      for (let x = -GRID + (offset % GRID); x < width + GRID; x += GRID * 3) {
        for (let y = -GRID + (offset % GRID); y < height + GRID; y += GRID * 3) {
          ctx.fillRect(x - 1, y - 1, 2, 2);
        }
      }
    };

    const frame = () => {
      drift += 0.08;
      drawGrid(drift);
      rafId = requestAnimationFrame(frame);
    };

    const start = () => {
      if (rafId === null && !reduceMotion) rafId = requestAnimationFrame(frame);
    };
    const stop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    if (reduceMotion) {
      drawGrid(0);
    } else {
      start();
    }

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
};

export default HeroVisual;
