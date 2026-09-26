import Link from "next/link";
import { ArrowUpRight, Home } from "lucide-react";

export const metadata = {
  title: "Page not found — Lukas Fleury",
};

const suggestions = [
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/design-team", label: "Design Team" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col justify-center pt-8 md:pt-0">
      <div className="fade-up font-mono text-xs uppercase tracking-[0.2em] text-ink-subtle">
        §404 · off the drawing
      </div>

      <h1 className="title title-tight fade-up-1 mt-6 max-w-4xl text-balance text-5xl md:text-7xl lg:text-8xl">
        This part isn&apos;t
        <br />
        <span className="text-ink-muted">in the assembly.</span>
      </h1>

      <p className="fade-up-2 mt-8 max-w-xl text-lg text-ink-muted">
        The page you were looking for doesn&apos;t exist, or the link is stale.
        Head back and take one of the routes below.
      </p>

      <div className="fade-up-3 mt-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-5 py-2.5 text-sm text-accent transition hover:border-accent/70 hover:bg-accent/15"
        >
          <Home className="h-3.5 w-3.5" />
          Home
        </Link>
        {suggestions.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-ink transition hover:border-white/25 hover:bg-white/[0.06]"
          >
            {s.label}
            <ArrowUpRight className="h-3.5 w-3.5 text-ink-subtle transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
          </Link>
        ))}
      </div>
    </div>
  );
}
