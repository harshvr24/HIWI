"use client";

import { CircleUser, Layers, LayoutGrid, Send, Workflow } from "lucide-react";
import RadialOrbitalTimeline, {
  type OrbitalItem,
} from "@/components/ui/radial-orbital-timeline";

// The five nodes are the five sections of this page — the orbital *is* the hero nav.
// Copy is descriptive only: no dates, metrics, or status claims, per the brand rule
// against fabricated numbers. `relatedIds` are simply the neighbouring sections in page
// order, so the chips read as previous/next.
const SECTIONS: OrbitalItem[] = [
  {
    id: 1,
    title: "Work",
    content: "Selected client work — Vexagon Clouds and Sanghi Tubes.",
    href: "#work",
    icon: LayoutGrid,
    relatedIds: [2],
  },
  {
    id: 2,
    title: "Services",
    content:
      "Website design and development, e-commerce, digital experiences, and digital growth.",
    href: "#services",
    icon: Layers,
    relatedIds: [1, 3],
  },
  {
    id: 3,
    title: "Process",
    content: "Seven steps, from Discover through to Evolve.",
    href: "#process",
    icon: Workflow,
    relatedIds: [2, 4],
  },
  {
    id: 4,
    title: "About",
    content: "A digital studio founded by Harsh. Build. Evolve. Grow.",
    href: "#about",
    icon: CircleUser,
    relatedIds: [3, 5],
  },
  {
    id: 5,
    title: "Start a Project",
    content: "Tell us what you're building and how to reach you.",
    href: "#start-a-project",
    icon: Send,
    relatedIds: [4],
  },
];

const HeroOrbital = () => (
  <RadialOrbitalTimeline items={SECTIONS} label="Sections" />
);

export default HeroOrbital;
