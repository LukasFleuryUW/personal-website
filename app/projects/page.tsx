import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ExperienceCard, { Experience } from "@/components/ExperienceCard";
import DroneAssembly from "@/components/DroneAssembly";

export const metadata: Metadata = {
  title: "Projects | Lukas Fleury",
  description:
    "Personal builds: 8\" autonomous waypoint quadcopter designed, PID-tuned, and taught to fly its own routes, a valvetronic dual-exit exhaust, and SkillsOntario precision machining.",
};

const projects: Experience[] = [
  {
    role: "8\" Autonomous Waypoint Drone",
    org: "Design, build, and autonomy",
    place: "Cambridge, ON",
    period: "2026",
    bullets: [
      "Designed and built an 8-inch FPV-style quadcopter end-to-end on a fixed budget. The airframe started as an X-frame in SolidWorks with custom propellers and a 3D-printed flight-controller adapter sized around the actual electronics stack.",
      "Integrated the full electronics stack: SpeedyBee F405 AIO flight controller, RS2205 brushless motors, 3S 2200mAh LiPo, FlySky RC link, GPS module, radio telemetry, and an FPV camera. Every electronic on the airframe soldered by hand, from ESC leads to the power distribution and receiver harness.",
      "PID-tuned it in Betaflight across crash, fix, and fly cycles. Each crash sent me back to the printer, the soldering iron, or the tuning tab, and those iterations are what took it from wobble to stable hover and controlled flight.",
      "Once hover was solid, flashed to ArduPilot and layered on GPS and radio telemetry to make the drone autonomous. It now follows pre-planned waypoint routes on its own, which was the goal of the build from the start.",
    ],
    tags: ["ArduPilot", "Betaflight", "PID Tuning", "SolidWorks", "Autonomous"],
    image: {
      src: "/images/drone-1.jpg",
      alt: "8-inch autonomous waypoint quadcopter, finished airframe",
    },
    video: {
      src: "/images/drone-video.mp4",
      poster: "/images/drone-video-poster.jpg",
      alt: "Autonomous quadcopter flight footage",
      hasSound: true,
    },
    mediaAspect: "aspect-[9/16]",
  },
  {
    role: "Neemah · 5-DOF Robotic Arm",
    org: "Design, actuation, and motion planning",
    place: "Cambridge, ON",
    period: "2026 · ongoing",
    bullets: [
      "Neemah is a five-axis arm with a 20\" reach, actuated by a NEMA 17 stepper at every joint. Each stepper drives through a custom 28:1 planetary gearbox I designed to multiply holding torque enough that the arm parks anywhere in its envelope without back-driving. Drivers run off an Arduino CNC shield.",
      "Ran torque load tests on each geared joint to validate the stepper and gearbox combination against the arm's own weight plus payload. Confirmed every joint could hold and move loads without stalling or losing position when the step signal cut.",
      "Currently building out the control stack in ROS 2. MoveIt handles the inverse kinematics and collision-aware path planning, with RViz simulating the arm's pose before anything runs on the physical hardware. The goal is to hand the arm a target pose and have it plan and execute its own path to get there.",
    ],
    tags: ["SolidWorks", "ROS 2", "MoveIt", "Stepper Control", "Planetary Gearbox"],
    image: {
      src: "/images/arm-ss-2.png",
      alt: "SolidWorks CAD view of Neemah, in-progress build",
      badge: "In Progress",
    },
    video: {
      src: "/images/arm-video.mp4",
      poster: "/images/arm-video-poster.jpg",
      alt: "Robotic arm moving under stepper control",
      badge: "In Progress",
    },
    mediaAspect: "aspect-[4/5]",
  },
  {
    role: "Custom 28:1 Planetary Gearbox",
    org: "Design, print, and validate",
    place: "Cambridge, ON",
    period: "2026",
    bullets: [
      "Two-stage compound planetary, 28:1 total ratio, built around a NEMA 17 input. Three planet gears per stage, six total. One reduction unit fits every joint of the arm, with only the housing changing to match each mounting pattern.",
      "Three PLA print iterations on an FDM printer. Each dialed in tolerance compensation for snug bearing press-fits off the bed, and trimmed gear-tooth contact area to cut friction without losing engagement.",
      "Load tested to ~70% mechanical efficiency, enough torque multiplication to hold each arm segment against its own weight and payload without back-driving.",
    ],
    tags: ["SolidWorks", "Planetary Gear", "FDM", "PLA", "Mechanical Design"],
    image: {
      src: "/images/box-ss-2.png",
      alt: "SolidWorks CAD view of the custom 28:1 planetary gearbox",
    },
    video: {
      src: "/images/gearbox-video.mp4",
      poster: "/images/gearbox-video-poster.jpg",
      alt: "3D-printed 28:1 planetary gearbox under torque load",
    },
    mediaAspect: "aspect-[4/5]",
  },
  {
    role: "Valvetronic Dual-Exit Exhaust",
    org: "Personal build",
    place: "Cambridge, ON",
    period: "2025",
    bullets: [
      "Designed a custom valvetronic-style flow-diverter in SolidWorks: a dual-exit exhaust with an RF-actuated valve for a cabin-controlled toggle between quiet and open modes.",
      "Modelled the full exhaust routing from cat-back through the diverter to both exits.",
      "Fabricating and installing the assembly end-to-end on my own vehicle. Currently ongoing.",
    ],
    tags: ["SolidWorks", "RF Actuation", "Fabrication"],
    image: {
      src: "/images/exhaust-full.jpg",
      alt: "SolidWorks render of the full valvetronic dual-exit exhaust assembly",
    },
    imageLayout: "wide",
  },
];

function slug(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ProjectsPage() {
  return (
    <>
      <PageHeader section="§03" eyebrow="projects" title="On my own time." />

      <nav
        aria-label="Projects index"
        className="fade-up-2 mt-10 rounded-2xl border border-white/8 bg-white/[0.02] p-2 backdrop-blur-sm"
      >
        <ul className="divide-y divide-white/5">
          {projects.map((p, i) => (
            <li key={p.role}>
              <a
                href={`#${slug(p.role)}`}
                className="group flex items-baseline gap-4 rounded-xl px-4 py-3 transition hover:bg-white/[0.04]"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 truncate text-sm text-ink md:text-base">
                  {p.role}
                </span>
                <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-ink-subtle sm:inline">
                  {p.period}
                </span>
                <span
                  aria-hidden
                  className="font-mono text-xs text-ink-subtle transition group-hover:translate-x-0.5 group-hover:text-accent"
                >
                  &rarr;
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-14">
        {projects.map((p, i) => (
          <section
            key={p.role}
            id={slug(p.role)}
            className="scroll-mt-24"
          >
            <ExperienceCard index={i + 1} data={p} />
            {i === 0 ? <DroneAssembly /> : null}
          </section>
        ))}
      </div>
    </>
  );
}
