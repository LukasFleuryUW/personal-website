import Image from "next/image";
import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "About | Lukas Fleury",
  description:
    "Waterloo Mechanical Engineering student with a shop-first approach to CAD, currently on co-op as an Operations Engineer at LiftWerx.",
};

const stack = [
  { k: "CAD", v: "SolidWorks (CSWP) · AutoCAD · Inventor" },
  { k: "CAM", v: "Mastercam" },
  { k: "Shop", v: "Mill · Lathe · CNC · MIG · 3D Print · Soldering" },
  { k: "Code", v: "C++ · MATLAB · Excel VBA · SAP" },
  { k: "Control", v: "Arduino · ROS 2 · Betaflight · ArduPilot" },
];

const facts = [
  { k: "Based", v: "Cambridge, ON" },
  { k: "School", v: "University of Waterloo · Mechanical Engineering" },
  { k: "Now", v: "Ops Eng Co-op · LiftWerx (current)" },
  { k: "Next", v: "Available for Summer 2027 co-op" },
];

const timeline = [
  {
    year: "Fall 2026",
    title: "LiftWerx · Operations Engineer Co-op",
    body: "Own lift-plan production for 6 field crews across North America: procedures, crane loads, rigging dimensions, and site layouts for up-tower turbine work. Small design and drawing work between plans.",
  },
  {
    year: "Winter 2026",
    title: "Mammoet · Engineering Co-op",
    body: "Fabrication drawings for cranes, jack-and-slide, and SPMT rigging supporting nuclear and utility installs.",
  },
  {
    year: "2025",
    title: "University of Waterloo",
    body: "Started BASc in Mechanical Engineering. Joined WATFlight on the Mechanical team.",
  },
  {
    year: "2024",
    title: "SkillsOntario Precision Machining",
    body: "1st place at the Waterloo Regional; represented at the provincial competition.",
  },
  {
    year: "'23–'24",
    title: "The Welmar Group · Sheet Metal",
    body: "Two summers installing commercial HVAC on live job sites across southern Ontario.",
  },
  {
    year: "'23–'25",
    title: "Cambridge Mill · Line Cook",
    body: "Cooked on the line at Pearle Hospitality's Cambridge Mill through high school. First place I learned to work fast and hold a standard under pressure.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        section="§01"
        eyebrow="about"
        title="Shop first, then CAD."
      />

      <div className="mt-10 grid gap-10 md:grid-cols-[240px_1fr] md:gap-14">
        <div className="fade-up-1">
          <div className="relative aspect-square w-full max-w-[240px] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            <Image
              src="/images/headshot.jpg"
              alt="Portrait of Lukas Fleury"
              fill
              sizes="(min-width: 768px) 240px, 60vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-ink-muted text-haze">
          <p className="fade-up-2">
            My interest in engineering started well before university. I spent
            time working in sheet metal shops and competing in machining, which
            gave me an appreciation for how things are actually made and the
            people behind the work. Those experiences shaped how I approach
            engineering today, with an emphasis on learning from others, taking
            responsibility, and working as part of a team.
          </p>
          <p className="fade-up-2">
            Through high school and university design teams, I&apos;ve had the
            opportunity to put that approach into practice. I&apos;ve worked
            alongside others to tackle challenging problems, develop ideas, and
            turn designs into something tangible.
          </p>
          <p className="fade-up-2">
            My co-op experiences at <span className="text-ink">Mammoet</span>{" "}
            and <span className="text-ink">LiftWerx</span> have given me a
            better understanding of the role engineering plays in real-world
            operations. At Mammoet, I worked around nuclear infrastructure,
            contributing to equipment designs and engineering drawings used by
            field personnel. At LiftWerx, I develop lift plans for crews
            carrying out major wind turbine repairs, including gearbox,
            bearing, hub, and blade exchanges. Both experiences have reinforced
            how much precision, communication, and safety matter when
            engineering decisions make their way into the field.
          </p>
          <p className="fade-up-2">
            I enjoy the connection between engineering design and hands-on
            work. Whether it&apos;s developing a CAD model, preparing a drawing
            for fabrication, or working through a problem with someone on the
            shop floor, I&apos;m most interested in seeing engineering translate
            into something practical.
          </p>
        </div>
      </div>

      <section className="mt-20 grid gap-10 border-t border-white/5 pt-10 md:grid-cols-2">
        <Col title="Quick facts" rows={facts} />
        <Col title="Stack" rows={stack} />
      </section>

      <section className="mt-20 border-t border-white/5 pt-10">
        <h2 className="title text-xl md:text-2xl">The road here</h2>
        <ol className="mt-8 space-y-6">
          {timeline.map((t) => (
            <li
              key={t.title}
              className="grid gap-2 border-l border-white/10 pl-6 md:grid-cols-[140px_1fr] md:gap-8 md:border-l-0 md:pl-0"
            >
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-ink-subtle">
                {t.year}
              </div>
              <div>
                <div className="text-ink">{t.title}</div>
                <p className="mt-1 text-sm leading-relaxed text-ink-muted text-haze">
                  {t.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 border-t border-white/5 pt-10">
        <h2 className="title text-xl md:text-2xl">Outside of engineering</h2>

        <div className="mt-8 grid items-center gap-8 lg:grid-cols-[560px_1fr] lg:gap-12">
          <div className="grid grid-cols-2 gap-4 lg:max-w-[560px]">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]">
              <Image
                src="/images/car.png"
                alt="My personal vehicle"
                fill
                sizes="(min-width: 1024px) 280px, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]">
              <Image
                src="/images/welding.png"
                alt="MIG welding, sparks flying, viewed through a welding helmet"
                fill
                sizes="(min-width: 1024px) 280px, 45vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="max-w-xl space-y-6 text-lg leading-relaxed text-ink-muted text-haze">
            <p>
              Outside of engineering, I&apos;m usually still finding ways to
              work with my hands. Whether it&apos;s working on my own car, from
              coilovers and headlight swaps to exhaust work, or spending time
              welding with MIG, I&apos;ve always enjoyed figuring out
              how things work and making them better. I also enjoy teaching
              others how to use a mill and tend to look for any excuse to make
              something myself rather than buy it. There&apos;s something
              especially satisfying about taking an idea from a drawing and
              turning it into something real.
            </p>
            <p>If you&apos;re into any of the same things, feel free to say hi.</p>
          </div>
        </div>
      </section>
    </>
  );
}

function Col({
  title,
  rows,
}: {
  title: string;
  rows: { k: string; v: string }[];
}) {
  return (
    <div>
      <h2 className="title text-lg md:text-xl">{title}</h2>
      <dl className="mt-6 space-y-4">
        {rows.map((r) => (
          <div key={r.k} className="flex gap-6">
            <dt className="w-16 shrink-0 text-xs uppercase tracking-[0.14em] text-ink-subtle">
              {r.k}
            </dt>
            <dd className="text-ink">{r.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
