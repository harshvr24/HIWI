"use client";

import { useParams } from "next/navigation";
import { projects } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Globe, ArrowLeft, ExternalLink } from "lucide-react";
import Footer from "@/components/Footer";

export default function WorkPage() {
  const { slug } = useParams();

  const project = projects.find((p) => p.slug === slug);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      });

      gsap.from(".image-zoom", {
        scale: 1.1,
        duration: 2,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-off-white text-obsidian">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/#work" className="text-zinc-500 hover:text-obsidian underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-off-white text-obsidian">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference">
        <Link
          href="/#work"
          className="flex items-center gap-2 text-white hover:opacity-70 transition-opacity uppercase text-sm font-bold tracking-widest"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
        <Link href="/" className="text-white font-black text-xl tracking-tighter">
          HIWI
        </Link>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full h-[70vh] overflow-hidden bg-off-white">
        <div className="absolute inset-0 image-zoom">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-off-white via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <span className="reveal inline-block px-3 py-1 border border-obsidian/10 rounded-full text-xs font-mono mb-4 text-zinc-600 bg-off-white/70 backdrop-blur-sm">
              {project.industry}
            </span>
            <h1 className="reveal text-[12vw] md:text-[8vw] font-black leading-[0.85] tracking-tighter uppercase mb-6">
              {project.name}
            </h1>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <main className="max-w-7xl mx-auto px-6 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Left: Description */}
          <div className="lg:col-span-8">
            <h2 className="reveal text-2xl md:text-3xl font-medium mb-8 leading-relaxed text-zinc-800">
              {project.description}
            </h2>
            {/* gap, not space-y: the global `p { margin: 0 !important }` defeats margin-based spacing */}
            <div className="reveal flex flex-col gap-6 text-lg text-zinc-600 leading-relaxed max-w-3xl">
              {project.approach.split("\n").map(
                (para, i) => para.trim() && <p key={i}>{para}</p>
              )}
            </div>

            {/* Links */}
            <div className="reveal flex flex-wrap gap-4 mt-12">
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-obsidian text-off-white px-8 py-4 rounded-full font-bold hover:text-lime transition-all"
              >
                <Globe size={20} />
                Visit Website
                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Right: Meta Info */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-4">Industry</h3>
              <p className="text-lg font-medium">{project.industry}</p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-4">Role</h3>
              <p className="text-lg font-medium">{project.role}</p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-zinc-200/70 rounded-md text-sm font-medium text-zinc-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-bold mb-4">Key Features</h3>
              <ul className="space-y-2">
                {project.keyFeatures.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-zinc-600">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-lime shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-12 border-t border-zinc-200">
              <p className="text-sm text-zinc-500 font-mono">
                &copy; HIWI <br />
                Wired to build what&apos;s next.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
