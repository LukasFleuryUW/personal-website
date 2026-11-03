import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";

const links = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/design-team", label: "Design Team" },
];

export default function Home() {
  return (
    <div className="flex min-h-[20vh] flex-col items-center justify-center pt-8 text-center md:pt-0">
      <div className="fade-up">
        <span className="chip-avail inline-flex items-center gap-3 rounded-full border border-accent/40 bg-accent/[0.08] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-accent md:text-xs">
          <span
            aria-hidden
            className="chip-dot inline-block h-2 w-2 rounded-full bg-accent"
          />
          Seeking Summer 2027 Co-op
        </span>
      </div>

      {/* Hero title uses the same `.title` utility as the Footer and the
          other PageHeaders so typography stays consistent site-wide. */}
      <h1 className="title title-tight fade-up-1 mt-8 max-w-4xl text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
        Lukas Fleury.
        <br />
        <span className="text-ink-muted">Mechanical Engineering Student.</span>
      </h1>

      <p className="fade-up-2 mt-8 max-w-xl text-base leading-relaxed text-ink-muted text-haze md:text-lg">
        I design, build, and automate. Robotic arms, drones, and whatever&apos;s
        on the bench next.
      </p>

      <div className="fade-up-3 mt-10 flex flex-wrap justify-center gap-3">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2.5 rounded-full border border-accent/50 bg-accent/10 px-7 py-3.5 text-base text-accent transition hover:border-accent/80 hover:bg-accent/15"
        >
          <FileText className="h-4 w-4" />
          Resume
        </a>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 text-base text-ink transition hover:border-white/25 hover:bg-white/[0.06]"
          >
            {l.label}
            <ArrowUpRight className="h-4 w-4 text-ink-subtle transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
          </Link>
        ))}
      </div>
    </div>
  );
}
