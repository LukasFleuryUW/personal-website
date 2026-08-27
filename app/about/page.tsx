import Image from "next/image";
import PageHeader from "@/components/PageHeader";

const stack = [
  { k: "CAD", v: "SolidWorks (CSWA) · AutoCAD · Inventor" },
  { k: "CAM", v: "Mastercam · AutoCRANE" },
  { k: "Shop", v: "Mill · Lathe · CNC · MIG/TIG · 3D Print" },
  { k: "Code", v: "MATLAB · C++ · Excel VBA · SAP" },
];

const facts = [
  { k: "Based", v: "Cambridge, ON" },
  { k: "School", v: "University of Waterloo · Mechanical Engineering" },
  { k: "Now", v: "Incoming Ops Eng Co-op · LiftWerx" },
  { k: "Next", v: "Available for Summer 2027 co-op" },
];

const timeline = [
  {
    year: "Fall 2026",
    title: "LiftWerx — Operations Engineer Co-op",
    body: "Sustainable repair and maintenance solutions for wind turbines — extending the life of renewable-energy infrastructure.",
  },
  {
    year: "Winter 2026",
    title: "Mammoet — Engineering Co-op",
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
    title: "The Welmar Group — Sheet Metal",
    body: "Two summers installing commercial HVAC on live job sites across southern Ontario.",
  },
  {
    year: "'23–'25",
    title: "Cambridge Mill — Line Cook",
    body: "Cooked on the line at Pearle Hospitality's Cambridge Mill through high school. First place I learned to work fast and hold a standard under pressure.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        section="§01"
        eyebrow="about"
        title="Blueprints, then parts."
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

        <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-ink-muted">
          <p className="fade-up-2">
            I started in the shop — two summers in sheet metal, competitions on
            the mill — before I ever put a fillet in a CAD model. Those early
            experiences taught me the importance of service, responsibility,
            and setting a positive example for the people working around me.
          </p>
          <p className="fade-up-2">
            I&apos;ve carried those principles into engineering. Through
            high-school and university design teams, I&apos;ve learned to work
            collaboratively to solve difficult problems and turn ideas into
            practical solutions.
          </p>
          <p className="fade-up-2">
            My co-ops at <span className="text-ink">Mammoet</span> and{" "}
            <span className="text-ink">LiftWerx</span> have shown me how
            engineering serves society. Working around nuclear infrastructure
            and developing operation drawings for field crews taught me the
            weight of precision and safety — a missed dimension shows up as a
            delay on site, or worse. At LiftWerx, I&apos;m getting to see the
            other side of that: how engineering can support sustainable energy
            through wind turbine repair and solutions that extend the life of
            renewable infrastructure.
          </p>
          <p className="fade-up-2">
            My favourite work sits at the seam between CAD and the shop floor.
            Drawings that survive contact with a fabricator. Parts that come
            off a mill inside spec on the first setup. Solutions that keep
            real, physical systems running.
          </p>
        </div>
      </div>

      <section className="mt-20 grid gap-8 border-t border-white/5 pt-10 md:grid-cols-[280px_1fr] md:gap-12">
        <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-xl border border-white/8 bg-white/[0.02]">
          <Image
            src="/images/machining-tapping.jpg"
            alt="Hand-tapping threads into a machined aluminum part held in a bench vise"
            fill
            sizes="(min-width: 768px) 280px, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="title text-xl md:text-2xl">In the shop</h2>
          <p className="mt-4 max-w-xl text-ink-muted">
            Manual machining is where I started — mill, lathe, hand-tapping,
            deburring. It&apos;s also what I keep coming back to. Making the
            part myself is how I make sure the drawing actually works, and how
            I stay honest about tolerances I&apos;d otherwise dismiss on paper.
          </p>
          <p className="mt-4 max-w-xl text-ink-muted">
            The SkillsOntario provincial competition sharpened that instinct
            under a stopwatch: aluminum and steel parts, tight tolerances, and
            no room for a second setup.
          </p>
        </div>
      </section>

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
                <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                  {t.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 border-t border-white/5 pt-10">
        <h2 className="title text-xl md:text-2xl">Outside of engineering</h2>

        <div className="mt-8 space-y-10">
          <figure className="grid gap-6 md:grid-cols-[200px_1fr] md:items-center md:gap-8">
            <div className="relative aspect-[4/5] w-full max-w-[200px] overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]">
              <Image
                src="/images/car.png"
                alt="My personal vehicle"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <figcaption className="max-w-xl text-ink-muted">
              <span className="text-ink">Wrenching on my own car.</span> Coilovers,
              headlight swaps, exhaust work, regular maintenance — most of what
              lives under the hood I&apos;ve had my hands on. It&apos;s where my
              interest in mechanical design started, and it&apos;s still the
              fastest way I know to test a CAD idea against the real world.
            </figcaption>
          </figure>

          <figure className="grid gap-6 md:grid-cols-[200px_1fr] md:items-center md:gap-8">
            <div className="relative aspect-[4/5] w-full max-w-[200px] overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02]">
              <Image
                src="/images/welding.png"
                alt="MIG welding — sparks flying, viewed through a welding helmet"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <figcaption className="max-w-xl text-ink-muted">
              <span className="text-ink">Behind the hood.</span> I love welding
              for the same reason I love machining — it&apos;s the last step
              between a drawing and a part that&apos;s actually in the world.
              MIG, TIG, and a lot of learning the hard way on scrap.
            </figcaption>
          </figure>
        </div>

        <p className="mt-10 max-w-2xl text-ink-muted">
          Outside of that: teaching people how to run a mill, and finding
          excuses to make the part myself instead of buying it. If you&apos;re
          into any of the same, say hi.
        </p>
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
