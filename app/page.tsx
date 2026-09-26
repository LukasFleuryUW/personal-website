"use client";

import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/design-team", label: "Design Team" },
];

export default function Home() {
  const [resumeMsg, setResumeMsg] = useState(false);

  useEffect(() => {
    if (!resumeMsg) return;
    const t = window.setTimeout(() => setResumeMsg(false), 3600);
    return () => window.clearTimeout(t);
  }, [resumeMsg]);

  return (
    <div className="flex min-h-[70vh] flex-col justify-center pt-8 md:pt-0">
      <div className="fade-up">
        <span className="chip-avail inline-flex items-center gap-3 rounded-full border border-accent/40 bg-accent/[0.08] px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] text-accent md:text-sm">
          <span
            aria-hidden
            className="chip-dot inline-block h-2 w-2 rounded-full bg-accent"
          />
          Seeking Summer 2027 Co-op
        </span>
      </div>

      <h1 className="title title-tight fade-up-1 mt-6 max-w-5xl text-balance text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        Lukas Fleury.
        <br />
        <span className="text-ink-muted">Mechanical Engineering Student.</span>
      </h1>

      <p className="fade-up-2 mt-8 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl">
        I turn CAD into parts that carry weight — heavy-lift rigging, wind
        turbine repair, and autonomous aircraft.
      </p>

      <div className="fade-up-3 mt-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => setResumeMsg((v) => !v)}
          aria-expanded={resumeMsg}
          className="group inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/10 px-5 py-2.5 text-sm text-accent transition hover:border-accent/80 hover:bg-accent/15"
        >
          <FileText className="h-3.5 w-3.5" />
          Resume
        </button>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-ink transition hover:border-white/25 hover:bg-white/[0.06]"
          >
            {l.label}
            <ArrowUpRight className="h-3.5 w-3.5 text-ink-subtle transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
          </Link>
        ))}
      </div>

      {resumeMsg ? (
        <div
          role="status"
          className="fade-up mt-5 max-w-md rounded-xl border border-white/10 bg-[#1c1c20] p-4 text-sm text-ink-muted"
        >
          <span className="text-ink">Resume currently being updated.</span>{" "}
          Check back soon — or reach me directly at{" "}
          <a
            className="text-accent underline underline-offset-2"
            href="mailto:lfleury@uwaterloo.ca"
          >
            lfleury@uwaterloo.ca
          </a>
          .
        </div>
      ) : null}
    </div>
  );
}
