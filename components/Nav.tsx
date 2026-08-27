"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";
import clsx from "clsx";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/design-team", label: "Design Team" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <Link
          href="/"
          className="group inline-flex items-baseline gap-2 font-mono text-sm tracking-tight"
        >
          <span className="text-ink">lukas fleury</span>
          <span className="text-ink-subtle transition group-hover:text-accent">
            /mech·eng
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] px-1 py-1 text-sm">
            {links.map((l) => {
              const active =
                l.href === "/" ? pathname === "/" : pathname?.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={clsx(
                    "rounded-full px-3 py-1.5 transition",
                    active
                      ? "bg-white/10 text-ink"
                      : "text-ink-muted hover:text-ink"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm text-accent transition hover:border-accent/70 hover:bg-accent/15 md:inline-flex"
          >
            <FileText className="h-3.5 w-3.5" />
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
