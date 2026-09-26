"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [resumeMsg, setResumeMsg] = useState(false);

  // Close the mobile menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Auto-dismiss the "resume being updated" note
  useEffect(() => {
    if (!resumeMsg) return;
    const t = window.setTimeout(() => setResumeMsg(false), 3200);
    return () => window.clearTimeout(t);
  }, [resumeMsg]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5">
        <Link
          href="/"
          className="group inline-flex items-baseline gap-2 font-mono text-sm tracking-tight"
          aria-label="Lukas Fleury — Home"
        >
          <span className="text-ink">lukas fleury</span>
          <span className="hidden text-ink-subtle transition group-hover:text-accent sm:inline">
            /mech·eng
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-3 md:flex">
          <nav
            aria-label="Primary"
            className="flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.03] px-1 py-1 text-sm"
          >
            {links.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(l.href);
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

          <div className="relative">
            <button
              type="button"
              onClick={() => setResumeMsg((v) => !v)}
              aria-expanded={resumeMsg}
              className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm text-accent transition hover:border-accent/70 hover:bg-accent/15"
            >
              <FileText className="h-3.5 w-3.5" />
              Resume
            </button>
            {resumeMsg ? (
              <div
                role="status"
                className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-white/10 bg-[#1c1c20] p-3 text-xs text-ink-muted shadow-lg"
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
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-ink transition hover:border-white/25 md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {open ? (
        <div className="fixed inset-0 top-[68px] z-40 md:hidden">
          <div
            className="absolute inset-0 bg-[#0f0f11]/95 backdrop-blur-md"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav
            aria-label="Mobile"
            className="relative mx-auto flex max-w-6xl flex-col gap-1 px-6 pt-8"
          >
            {links.map((l, i) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{ animationDelay: `${i * 40}ms` }}
                  className={clsx(
                    "fade-up group flex items-center justify-between rounded-2xl border px-5 py-4 text-lg transition",
                    active
                      ? "border-white/20 bg-white/[0.06] text-ink"
                      : "border-white/8 bg-white/[0.02] text-ink-muted hover:border-white/20 hover:text-ink"
                  )}
                >
                  <span>{l.label}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
                    §{String(i).padStart(2, "0")}
                  </span>
                </Link>
              );
            })}

            <button
              type="button"
              onClick={() => setResumeMsg((v) => !v)}
              className="fade-up mt-4 inline-flex items-center justify-between rounded-2xl border border-accent/40 bg-accent/10 px-5 py-4 text-lg text-accent transition hover:border-accent/70 hover:bg-accent/15"
              style={{ animationDelay: `${links.length * 40}ms` }}
            >
              <span className="inline-flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Resume
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent/70">
                pdf
              </span>
            </button>

            {resumeMsg ? (
              <div
                role="status"
                className="mt-3 rounded-xl border border-white/10 bg-[#1c1c20] p-4 text-sm text-ink-muted"
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
          </nav>
        </div>
      ) : null}
    </header>
  );
}
