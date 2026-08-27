import PageHeader from "@/components/PageHeader";
import ExperienceCard, { Experience } from "@/components/ExperienceCard";

const roles: Experience[] = [
  {
    role: "Operations Engineer Co-op",
    org: "LiftWerx",
    place: "Cambridge, ON",
    period: "Aug–Dec 2026 · incoming",
    bullets: [
      "Supporting the development of sustainable repair and maintenance solutions for wind turbines — work that extends the service life of renewable-energy infrastructure.",
      "Helping plan and execute wind turbine repair and maintenance operations, balancing safety, efficiency, and sustainability across active wind farms.",
      "Applying engineering principles to the renewable energy sector to keep clean-energy systems reliable over the long term.",
      "Contributing to the up-tower lifting equipment and rigging processes that let major turbine components be serviced without a full crane teardown.",
      "Gaining hands-on exposure to the operations, safety, and logistics side of renewable-energy infrastructure — from planning through on-site execution.",
    ],
    tags: ["Wind Energy", "Operations", "Sustainability"],
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
      "Produced 80+ fabrication and assembly drawings for cranes and heavy-lift rigging in AutoCAD and AutoCRANE, improving drawing accuracy and database standardization across the team.",
      "Designed detailed usage, assembly, and setup drawings for heavy-lift transport systems including jack-and-slide and SPMT interfaces, reducing field complexity and supporting safer, faster on-site execution.",
      "Developed the project drawing package for a 150-ton transformer install at Bruce Power and 100-ton steam generators at Pickering Nuclear — supporting critical nuclear infrastructure upgrades.",
      "Built Excel-based automation that converts crane load configuration data into standardized, engineer-readable documents, improving that workflow by roughly 90%.",
    ],
    tags: ["AutoCAD", "AutoCRANE", "Heavy Lift", "Nuclear"],
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
    note: "Installed commercial HVAC duct systems from blueprints across job sites — first hands-on exposure to reading drawings and fitting parts under real field conditions.",
  },
  {
    role: "Line Cook",
    org: "Cambridge Mill · Pearle Hospitality",
    place: "Cambridge, ON",
    period: "2023 – 2025",
    note: "Cooked on the line through high school — learned to work fast, run a station cleanly, and hold a standard when the pass is stacked.",
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
                <p className="mt-1 max-w-2xl text-xs leading-relaxed text-ink-muted">
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
