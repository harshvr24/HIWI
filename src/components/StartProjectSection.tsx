"use client";

import { useState } from "react";

const topics = [
  "New Website",
  "Website Redesign",
  "E-commerce",
  "Digital Experience",
  "Something Else",
];

const StartProjectSection = () => {
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  return (
    <section
      id="start-a-project"
      className="relative z-10 w-full bg-off-white py-24 md:py-32 flex flex-col justify-start"
    >
      <div className="px-8 md:px-12 max-w-6xl ml-4 md:ml-16 w-full">
        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-[60%_60%] items-start">
          {/* Left: label + LET'S TALK ABOUT + dropdown */}
          <div className="flex flex-col">
            <p className="text-zinc-500 uppercase tracking-widest text-sm font-semibold">
              Start a Project
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-6xl uppercase font-black text-obsidian">
              Let&apos;s talk about
            </h2>
            <div className="relative mt-2">
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full bg-transparent text-obsidian font-medium text-lg md:text-xl appearance-none cursor-pointer pr-8 py-4 border-0 border-b border-zinc-300 focus:border-obsidian focus:outline-none focus:ring-0"
                aria-label="Select topic"
              >
                <option value="" disabled>
                  Select...
                </option>
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
              <span
                className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400"
                aria-hidden
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>

          {/* Right: email input + CTA */}
          <div className="flex flex-col gap-6 mt-10 md:mt-42">
            <h2 className="text-4xl md:text-5xl lg:text-6xl uppercase font-black text-obsidian md:mt-10">
              Where we can reach you
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch sm:items-end mt-2">
              <div className="flex-1 min-w-0 border-b border-zinc-300 focus-within:border-obsidian transition-colors">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="w-full bg-transparent text-obsidian font-medium text-lg md:text-xl py-4 border-0 focus:outline-none focus:ring-0 placeholder:text-zinc-400"
                  aria-label="Your email"
                />
              </div>
              <button
                type="button"
                onClick={async () => {
                  setStatus(null);
                  if (!topic) return setStatus("Please select a topic");
                  if (!email) return setStatus("Please enter your email");
                  setLoading(true);
                  try {
                    const res = await fetch("/api/contact", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ topic, email }),
                    });
                    const data = await res.json();
                    if (data.ok) {
                      setStatus("Sent — we'll be in touch soon.");
                      setTopic("");
                      setEmail("");
                    } else {
                      setStatus(data.error || "Failed to send");
                    }
                  } catch {
                    setStatus("Network error");
                  } finally {
                    setLoading(false);
                  }
                }}
                style={{ minWidth: 180 }}
                className="shrink-0 inline-flex items-center gap-3 text-obsidian font-black uppercase text-xl md:text-base px-6 py-3 whitespace-nowrap hover:text-zinc-600 transition-colors"
                aria-label="Start a project"
                disabled={loading}
              >
                <span>{loading ? "Sending…" : "Start a Project"}</span>
                <span aria-hidden className="text-2xl leading-none">→</span>
              </button>
              {status && <div className="text-sm text-zinc-500 ml-4">{status}</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartProjectSection;
