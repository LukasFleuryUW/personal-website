import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ExperienceCard, { Experience } from "@/components/ExperienceCard";

export const metadata: Metadata = {
  title: "Work | Lukas Fleury",
  description:
    "Engineering co-op experience: current Operations Engineer at LiftWerx (wind turbine repair), and Mammoet heavy-lift drawings for Bruce Power and Pickering Nuclear.",
};

const roles: Experience[] = [
  {
    role: "Operations Engineer Co-op",
    org: "LiftWerx",
    place: "Cambridge, ON",
    period: "Aug–Dec 2026 · current",
    bullets: [
      "Model and draft lift plans in SolidWorks for 12 field crews running up-tower turbine repairs across North America. Crane position, rigging arrangement, and load path all built out as assemblies, sized to the component being swapped and the clearances on that specific tower.",
      "Designed a yaw drive extractor that pulls failed yaw drives out of the nacelle. Hydraulic jacks brace against the bed plate to break the M20 bolts loose, which is the only way to get them out in a space that tight.",
      "Design work on accessory lifting rigs and crane equipment that let crews swap major turbine components without a full crane teardown. Smaller setup, faster turnaround, less time the turbine spends offline.",
    ],
    tags: ["Wind Energy", "Lift Planning", "Design", "PDM"],
    image: {
      src: "/images/liftwerx-turbine.jpg",
      alt: "LiftWerx up-tower crane servicing a wind turbine hub",
    },
  },
  {
    role: "Engineering Co-op",
    org: "Mammoet",
    place: "Puslinch, ON",
    period: "Jan–May 2026",
    bullets: [
      "Drew up 80+ fabrication and assembly drawings for cranes and heavy-lift rigging. A lot of the work was pulling the drawing database into a cleaner, standardized state so field teams weren't working off inconsistent revisions.",
      "Detailed setup, assembly, and usage drawings for heavy-lift transport systems like jack-and-slide and SPMT interfaces. The gear that moves massive loads across the ground. Clearer drawings mean less field improvisation and safer, faster installs.",
      "Developed the drawing package for a 150-ton transformer install at Bruce Power and 100-ton steam generators at Pickering Nuclear. The drawings those crews worked off through the install.",
    ],
    tags: ["AutoCAD", "Operations", "Heavy Lift", "Nuclear"],
    image: {
      src: "/images/mammoet-crane.jpg",
      alt: "Mammoet crawler crane lifting a component onto a nuclear generating station",
    },
  },
];

const earlyJobs = [
  {
    role: "Sheet Metal Worker",
    org: "The Welmar Group",
    place: "Guelph, ON",
    period: "Summers '23 + '24",
    note: "Installed commercial HVAC duct systems from blueprints across job sites. First hands-on exposure to reading drawings and fitting parts under real field conditions.",
  },
  {
    role: "Line Cook",
    org: "Cambridge Mill · Pearle Hospitality",
    place: "Cambridge, ON",
    period: "2023 – 2025",
    note: "Cooked on the line through high school. Learned to work fast, run a station cleanly, and hold a standard when the pass is stacked.",
  },
];

export default function WorkPage() {
  return (
    <>
      <PageHeader section="§02" eyebrow="work" title="Where I get paid." />
      <div className="mt-14">
        {roles.map((r, i) => (
          <ExperienceCard key={r.org} index={i + 1} data={r} />
        ))}
      </div>

      <section className="mt-24 border-t border-white/5 pt-10">
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-subtle">
            earlier
          </span>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-muted">
            during high school
          </span>
        </div>
        <ul className="mt-6 divide-y divide-white/5">
          {earlyJobs.map((j) => (
            <li
              key={j.role}
              className="grid gap-2 py-5 md:grid-cols-[140px_1fr_auto] md:gap-8"
            >
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">
                {j.period}
              </div>
              <div>
                <div className="text-sm text-ink">
                  {j.role}{" "}
                  <span className="text-ink-subtle">·</span>{" "}
                  <span className="text-ink-muted">{j.org}</span>
                </div>
                <p className="mt-1 max-w-2xl text-xs leading-relaxed text-ink-muted text-haze">
                  {j.note}
                </p>
              </div>
              <div className="hidden text-xs text-ink-subtle md:block">
                {j.place}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
