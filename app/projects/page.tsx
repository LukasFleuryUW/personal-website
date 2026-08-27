import PageHeader from "@/components/PageHeader";
import ExperienceCard, { Experience } from "@/components/ExperienceCard";

const projects: Experience[] = [
  {
    role: "250 mm Arduino Quadcopter",
    org: "From-scratch build + prop analysis",
    place: "Cambridge, ON",
    period: "2026",
    bullets: [
      "Designed and built a 250 mm quadcopter from scratch — mechanical frame, electrical integration, and Arduino-based flight controller — under a hard cost ceiling.",
      "Ran a structured experimental program on a static thrust stand: 2-blade vs. 3-blade props and low- vs. high-pitch geometries, comparing thrust, hover endurance, and step-response.",
      "Used onboard accelerometer telemetry for FFT-based vibration analysis to tie prop geometry back to airframe response.",
      "Treated the build as end-to-end product development — sourcing, soldering, electrical safety, controls tuning, and quantitative flight evaluation.",
    ],
    tags: ["Arduino", "Controls", "FFT Analysis", "Thrust Testing"],
    image: {
      src: "/images/quadcoptor.jpg",
      alt: "250 mm Arduino-controlled quadcopter build",
    },
  },
  {
    role: "Valvetronic Dual-Exit Exhaust",
    org: "Personal build",
    place: "Cambridge, ON",
    period: "2025",
    bullets: [
      "Designed a custom valvetronic-style flow-diverter in SolidWorks — dual-exit exhaust with an RF-actuated valve for a cabin-controlled toggle between quiet and open modes.",
      "Modelled the full exhaust routing from cat-back through the diverter to both exits.",
      "Fabricated and installed the assembly end-to-end on my own vehicle.",
    ],
    tags: ["SolidWorks", "RF Actuation", "Fabrication"],
    image: {
      src: "/images/exhaust-full.jpg",
      alt: "SolidWorks render of the full valvetronic dual-exit exhaust assembly",
    },
    imageLayout: "wide",
  },
  {
    role: "SkillsOntario Precision Machining",
    org: "Provincial Competition",
    place: "Ontario",
    period: "2024",
    bullets: [
      "1st place — Waterloo Regional Precision Machining.",
      "Represented at the SkillsOntario provincial competition.",
      "Manufactured complex aluminum and steel parts under timed, high-tolerance constraints — mill, lathe, hand-tapping.",
    ],
    tags: ["Manual Machining", "Precision", "Award"],
    image: {
      src: "/images/machining-lathe.jpg",
      alt: "Aluminum stock spinning in a three-jaw lathe chuck, turning tool engaged",
    },
  },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHeader section="§03" eyebrow="projects" title="On my own time." />
      <div className="mt-14">
        {projects.map((p, i) => (
          <ExperienceCard key={p.role} index={i + 1} data={p} />
        ))}
      </div>
    </>
  );
}
