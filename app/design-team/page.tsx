import PageHeader from "@/components/PageHeader";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

const work = [
  {
    title: "Airframe",
    body: "Lightweight primary structure built to survive flight loads while keeping every gram accounted for.",
  },
  {
    title: "Aerodynamics",
    body: "Aerodynamic surfaces designed and iterated against the aircraft's autonomous-glider mission profile.",
  },
  {
    title: "Fabrication",
    body: "Turning CAD into a real airframe — layup, machining, and assembly of flight-ready parts.",
  },
];

export default function DesignTeamPage() {
  return (
    <>
      <div className="fade-up flex items-center gap-6 pt-8 md:pt-16">
        <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] md:h-24 md:w-24">
          <Image
            src="/watflight-logo.png"
            alt="WATFlight logo"
            width={72}
            height={72}
            className="h-14 w-14 md:h-16 md:w-16"
            priority
          />
        </div>
        <div>
          <div className="flex items-baseline gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-subtle">
              §04
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
              design team
            </span>
          </div>
          <h1 className="title fade-up-1 mt-2 text-balance text-5xl md:text-7xl">
            WATFlight.
          </h1>
        </div>
      </div>

      <p className="fade-up-2 mt-10 max-w-2xl text-xl leading-relaxed text-ink-muted">
        A University of Waterloo student design team building the future of
        flight — cleaner, more efficient aircraft that prove autonomy and
        sustainability can share the same airframe. I&apos;m on the
        Mechanical team.
      </p>

      <div className="fade-up-3 mt-8">
        <a
          href="https://watflight.com/"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm text-ink transition hover:border-white/25 hover:bg-white/[0.06]"
        >
          Visit watflight.com
          <ArrowUpRight className="h-3.5 w-3.5 text-ink-subtle transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink" />
        </a>
      </div>

      <section className="mt-20 border-t border-white/5 pt-10">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-subtle">
            mechanical team
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            airframe · aero · fab
          </span>
        </div>
        <p className="mt-6 max-w-2xl text-ink-muted">
          The Mechanical team turns an autonomous glider concept into a
          flight-ready aircraft. We develop the airframe, aerodynamic
          surfaces, and lightweight structures, then validate each design
          through manufacturing and ground testing.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {work.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
            >
              <h3 className="title text-lg">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
