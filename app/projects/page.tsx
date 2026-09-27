import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ExperienceCard, { Experience } from "@/components/ExperienceCard";

export const metadata: Metadata = {
  title: "Projects — Lukas Fleury",
  description:
    "Personal builds: 5\" FPV quadcopter designed and PID-tuned from scratch, valvetronic dual-exit exhaust, and SkillsOntario precision machining.",
};

const projects: Experience[] = [
  {
    role: "5\" FPV Quadcopter",
    org: "From-scratch build + PID tuning",
    place: "Cambridge, ON",
    period: "2026",
    bullets: [
      "Built a 5-inch FPV racing-style quadcopter end-to-end — starting from an open-source frame in CAD, then designing my own propellers and a custom flight-controller adapter to fit the electronics stack.",
      "3D-printed every frame component myself, iterating on fit and stiffness until the airframe held up to flight loads.",
      "Selected and integrated the electronics: SpeedyBee F405 AIO flight controller, RS2205 brushless motors, FlySky radio link, and 3S 2200mAh LiPo packs.",
      "Soldered every joint on the airframe myself — ESCs to motors, power distribution, receiver, and flight-controller harness — then configured and PID-tuned it in Betaflight to hit stable hover and controlled flight.",
      "Treated it as end-to-end product development — mechanical design, electrical integration, controls tuning, and flight-test iteration.",
    ],
    tags: ["FPV", "Betaflight", "PID Tuning", "SolidWorks"],
    image: {
      src: "/images/drone-1.jpg",
      alt: "5-inch FPV quadcopter build — finished airframe",
    },
    video: {
      src: "/images/drone-video.mp4",
      poster: "/images/drone-video-poster.jpg",
      alt: "FPV drone flight footage",
      hasSound: true,
    },
    mediaAspect: "aspect-[9/16]",
  },
  {
    role: "Valvetronic Dual-Exit Exhaust",
    org: "Personal build",
    place: "Cambridge, ON",
    period: "2026 · ongoing",
    bullets: [
      "Designed a custom valvetronic-style flow-diverter in SolidWorks — dual-exit exhaust with an RF-actuated valve for a cabin-controlled toggle between quiet and open modes.",
      "Modelled the full exhaust routing from cat-back through the diverter to both exits.",
      "Fabricating and installing the assembly end-to-end on my own vehicle — currently ongoing.",
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
