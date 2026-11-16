import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { projects, slug } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects | Lukas Fleury",
  description:
    "Personal builds: 8\" autonomous waypoint quadcopter designed, PID-tuned, and taught to fly its own routes, a valvetronic dual-exit exhaust, and SkillsOntario precision machining.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader section="§03" eyebrow="projects" title="On my own time." />

      <div className="fade-up-2 mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((p, i) => {
          const cover = p.image ?? {
            src: p.video!.poster ?? "",
            alt: p.video!.alt,
          };
          const badge = p.image?.badge ?? p.video?.badge;
          const fitClass = p.cardFit === "contain" ? "object-contain" : "object-cover";
          const isQuarterTurn = p.cardRotate === 90 || p.cardRotate === 270;
          const rotateClass =
            p.cardRotate === 90
              ? "rotate-90"
              : p.cardRotate === 180
              ? "rotate-180"
              : p.cardRotate === 270
              ? "-rotate-90"
              : "";
          return (
            <Link
              key={p.role}
              href={`/projects/${slug(p.role)}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] transition hover:border-accent/40 hover:bg-white/[0.04]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-b from-white/[0.04] to-black/20">
                {badge ? (
                  <span className="pointer-events-none absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-accent/50 bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-accent backdrop-blur-sm">
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                    />
                    {badge}
                  </span>
                ) : null}
                {cover.src ? (
                  isQuarterTurn ? (
                    // Rotated 90/270: size the image box to the frame's inverse
                    // aspect (3:4) so after a quarter turn it matches the 4:3
                    // frame, then object-cover zooms in to fill with no gaps.
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative h-[133.333%] w-[75%]">
                        <Image
                          src={cover.src}
                          alt={cover.alt}
                          fill
                          sizes="(min-width: 640px) 50vw, 100vw"
                          className={`object-cover ${rotateClass} transition duration-500 group-hover:scale-[1.03]`}
                        />
                      </div>
                    </div>
                  ) : (
                    <Image
                      src={cover.src}
                      alt={cover.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className={`${fitClass} transition duration-500 group-hover:scale-[1.03]`}
                    />
                  )
                ) : null}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                    {p.period}
                  </span>
                </div>

                <h3 className="title mt-3 text-xl text-ink md:text-2xl">
                  {p.role}
                </h3>
                <p className="mt-1 text-sm text-ink-muted text-haze">{p.org}</p>

                {p.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.slice(0, 6).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-subtle"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}

                <span
                  aria-hidden
                  className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle transition group-hover:text-accent"
                >
                  View project
                  <span className="transition group-hover:translate-x-0.5">
                    &rarr;
                  </span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
