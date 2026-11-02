"use client";

import { useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Scroll-driven exploded assembly of the 5" custom quadcopter.              */
/*  Pure SVG + a single scroll listener, no external libraries.               */
/* -------------------------------------------------------------------------- */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, v));
const ease = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const stage = (scroll: number, inP: number, outP: number) =>
  ease(clamp((scroll - inP) / (outP - inP)));

/* -------------------------------------------------------------------------- */
/*  Part definitions                                                          */
/* -------------------------------------------------------------------------- */

type Part = {
  id: string;
  from: { x: number; y: number; r?: number };
  to: { x: number; y: number; r?: number };
  in: number;
  out: number;
};

const parts: Part[] = [
  {
    id: "airframe",
    from: { x: 0, y: 220, r: -20 },
    to: { x: 0, y: 0, r: 0 },
    in: 0.0,
    out: 0.08,
  },
  {
    id: "motor-fl",
    from: { x: -240, y: -180, r: -25 },
    to: { x: -110, y: -110, r: 0 },
    in: 0.1,
    out: 0.18,
  },
  {
    id: "motor-fr",
    from: { x: 240, y: -180, r: 25 },
    to: { x: 110, y: -110, r: 0 },
    in: 0.14,
    out: 0.22,
  },
  {
    id: "motor-rl",
    from: { x: -240, y: 180, r: 25 },
    to: { x: -110, y: 110, r: 0 },
    in: 0.18,
    out: 0.26,
  },
  {
    id: "motor-rr",
    from: { x: 240, y: 180, r: -25 },
    to: { x: 110, y: 110, r: 0 },
    in: 0.22,
    out: 0.3,
  },
  {
    id: "fc-adapter",
    from: { x: 0, y: -220, r: 90 },
    to: { x: 0, y: 0, r: 0 },
    in: 0.32,
    out: 0.4,
  },
  {
    id: "fc",
    from: { x: 0, y: -200, r: 0 },
    to: { x: 0, y: 0, r: 0 }, // drops straight down, no rotation at any point
    in: 0.42,
    out: 0.5,
  },
  {
    id: "battery",
    from: { x: 260, y: 40, r: 60 },
    to: { x: 0, y: 0, r: 0 },
    in: 0.52,
    out: 0.6,
  },
  {
    id: "fpv-cam",
    from: { x: -260, y: -30, r: -60 },
    to: { x: -92, y: 0, r: 0 },
    in: 0.62,
    out: 0.7,
  },
  {
    id: "gps",
    from: { x: -55, y: -260, r: 0 },
    to: { x: -55, y: 0, r: 0 }, // sits on the left side of the plate
    in: 0.7,
    out: 0.76,
  },
  {
    id: "telemetry",
    from: { x: 260, y: 40, r: 0 },
    to: { x: 55, y: 0, r: 0 }, // sits on the right side of the plate
    in: 0.74,
    out: 0.8,
  },
  {
    id: "prop-fl",
    from: { x: -200, y: -220, r: 80 },
    to: { x: -110, y: -110, r: 0 },
    in: 0.82,
    out: 0.9,
  },
  {
    id: "prop-fr",
    from: { x: 200, y: -220, r: -80 },
    to: { x: 110, y: -110, r: 60 },
    in: 0.84,
    out: 0.92,
  },
  {
    id: "prop-rl",
    from: { x: -200, y: 220, r: 80 },
    to: { x: -110, y: 110, r: 60 },
    in: 0.86,
    out: 0.94,
  },
  {
    id: "prop-rr",
    from: { x: 200, y: 220, r: -80 },
    to: { x: 110, y: 110, r: 0 },
    in: 0.88,
    out: 0.96,
  },
];

/* Callout stages */
const callouts = [
  {
    at: 0.0,
    title: "Airframe",
    body: "Started from an 8\" X-frame in SolidWorks, with arms and center plate as one unit. Every frame component 3D-printed myself, iterating on fit and stiffness until it held under flight loads.",
  },
  {
    at: 0.14,
    title: "Motors",
    body: "Four RS2205 brushless motors at the arm ends, matched to the 3S pack and sized for the 8-inch prop load.",
  },
  {
    at: 0.28,
    title: "Custom FC adapter",
    body: "The SpeedyBee F405 AIO doesn't line up with the frame's stock hole pattern, so I designed and 3D-printed a custom adapter to bridge them.",
  },
  {
    at: 0.38,
    title: "Flight controller",
    body: "SpeedyBee F405 AIO with integrated ESCs and power distribution. Started on Betaflight for tuning, then flashed to ArduPilot once hover was dialed in to open up waypoint navigation. Every joint soldered by hand.",
  },
  {
    at: 0.5,
    title: "Battery",
    body: "3S 2200 mAh LiPo mounted top-side, strapped down.",
  },
  {
    at: 0.58,
    title: "FPV camera",
    body: "Analog FPV cam up front for the live feed. The pilot-view half of the build before autonomy took over.",
  },
  {
    at: 0.66,
    title: "GPS + radio telemetry",
    body: "GPS puck on a stand-off above the stack, telemetry radio alongside. This is what lets the drone know where it is and what waypoint comes next, then report heading, altitude, and battery back to the ground.",
  },
  {
    at: 0.8,
    title: "Propellers",
    body: "Three-blade 8-inch props with a custom-designed geometry, modelled in SolidWorks and sized to the motor's torque curve.",
  },
  {
    at: 0.95,
    title: "Crashed it. Tuned it. Flew it.",
    body: "Early flights ended in the grass more than the sky. Each crash sent me back to Betaflight, the printer, or the soldering iron. Those iterations are what took it from wobble to stable hover, then to autonomous waypoint runs on ArduPilot.",
  },
];

function currentCallout(p: number) {
  let picked = callouts[0];
  for (const c of callouts) if (p >= c.at) picked = c;
  return picked;
}

/* -------------------------------------------------------------------------- */
/*  SVG parts                                                                 */
/* -------------------------------------------------------------------------- */

const accent = "#d97757";
const accentDim = "rgba(217,119,87,0.35)";
const fillDim = "rgba(217,119,87,0.08)";
const white = "rgba(255,255,255,0.85)";

function Airframe() {
  // Combined arms + rectangular centre plate. The plate runs vertically
  // between the front and rear motor pairs (approx motor-to-motor length).
  return (
    <g>
      {/* X-arms */}
      <line x1={-130} y1={-130} x2={130} y2={130} stroke={white} strokeWidth={11} strokeLinecap="round" />
      <line x1={130} y1={-130} x2={-130} y2={130} stroke={white} strokeWidth={11} strokeLinecap="round" />

      {/* Rectangular center frame plate — horizontal, spanning motor-to-motor width */}
      <rect
        x={-110}
        y={-27}
        width={220}
        height={54}
        rx={8}
        fill={fillDim}
        stroke={accentDim}
        strokeWidth={1.6}
      />
      {/* Standoff holes along the top and bottom edges */}
      {[-90, -60, 60, 90].map((x) => (
        <g key={x}>
          <circle cx={x} cy={-15} r={2.4} fill="#0d0d10" stroke={accentDim} strokeWidth={0.8} />
          <circle cx={x} cy={15} r={2.4} fill="#0d0d10" stroke={accentDim} strokeWidth={0.8} />
        </g>
      ))}

      {/* Mount pads at the arm ends */}
      {[
        [-110, -110],
        [110, -110],
        [-110, 110],
        [110, 110],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={16} fill="none" stroke={accentDim} strokeWidth={1.5} />
      ))}
    </g>
  );
}

function FCAdapter() {
  // Custom-printed adapter — hexagonal-ish shape hinting at 3D print topology
  return (
    <g opacity={0.95}>
      <polygon
        points="-30,-22 30,-22 38,0 30,22 -30,22 -38,0"
        fill="rgba(217,119,87,0.15)"
        stroke={accent}
        strokeWidth={1.4}
      />
      {/* Standoff holes */}
      {[
        [-22, -14],
        [22, -14],
        [-22, 14],
        [22, 14],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.4} fill="#0d0d10" stroke={accent} strokeWidth={1} />
      ))}
      {/* Center label */}
      <text
        x={0}
        y={4}
        textAnchor="middle"
        fill={accent}
        fontSize={7.5}
        fontFamily="monospace"
        letterSpacing="1"
      >
        3D-PRINT
      </text>
    </g>
  );
}

function Motor() {
  return (
    <g>
      <circle r={20} fill="rgba(0,0,0,0.6)" stroke={white} strokeWidth={2.2} />
      <circle r={7} fill={accent} />
    </g>
  );
}

function ThreeBladeProp() {
  // Three blades 120° apart, rounded ends
  const blade = (
    <ellipse cx={35} cy={0} rx={35} ry={4.5} fill={accent} opacity={0.9} />
  );
  return (
    <g opacity={0.9}>
      <g transform="rotate(0)">{blade}</g>
      <g transform="rotate(120)">{blade}</g>
      <g transform="rotate(240)">{blade}</g>
      <circle r={4} fill="#111" />
    </g>
  );
}

function FlightController() {
  return (
    <g>
      <rect x={-24} y={-24} width={48} height={48} rx={4} fill="rgba(0,0,0,0.75)" stroke={accent} strokeWidth={1.5} />
      {[-16, -8, 0, 8, 16].map((y) => (
        <line key={y} x1={-22} y1={y} x2={22} y2={y} stroke={accentDim} strokeWidth={0.6} />
      ))}
      <text x={0} y={4} textAnchor="middle" fill={accent} fontSize={8.5} fontFamily="monospace">F405</text>
    </g>
  );
}

function Battery() {
  return (
    <g>
      <rect x={-40} y={-18} width={80} height={36} rx={5} fill="rgba(20,20,22,0.9)" stroke={white} strokeWidth={1.5} />
      <text
        x={0}
        y={4}
        textAnchor="middle"
        fill={white}
        fontSize={9}
        fontFamily="monospace"
        letterSpacing="1"
      >
        3S · 2200
      </text>
    </g>
  );
}

function FPVCamera() {
  // Small front-facing analog FPV cam: lens cylinder with a mount
  return (
    <g>
      <rect x={-10} y={-11} width={20} height={22} rx={3} fill="rgba(20,20,22,0.9)" stroke={white} strokeWidth={1.4} />
      <circle cx={0} cy={0} r={6.5} fill="rgba(0,0,0,0.9)" stroke={accent} strokeWidth={1.3} />
      <circle cx={0} cy={0} r={2.4} fill={accent} />
      <text x={0} y={18} textAnchor="middle" fill={accent} fontSize={6.5} fontFamily="monospace" letterSpacing="1">FPV</text>
    </g>
  );
}

function GPS() {
  // GPS puck: disc with a hint of patch antenna
  return (
    <g>
      <circle r={14} fill="rgba(20,20,22,0.9)" stroke={white} strokeWidth={1.4} />
      <rect x={-7} y={-7} width={14} height={14} rx={1.5} fill="rgba(217,119,87,0.15)" stroke={accent} strokeWidth={1} />
      <circle r={2} fill={accent} />
      <text x={0} y={24} textAnchor="middle" fill={accent} fontSize={6.5} fontFamily="monospace" letterSpacing="1">GPS</text>
    </g>
  );
}

function TelemetryRadio() {
  // Small telemetry module with a stub antenna
  return (
    <g>
      <rect x={-10} y={-7} width={20} height={14} rx={2} fill="rgba(20,20,22,0.9)" stroke={white} strokeWidth={1.3} />
      <line x1={0} y1={-7} x2={0} y2={-22} stroke={accent} strokeWidth={1.4} />
      <circle cx={0} cy={-22} r={1.6} fill={accent} />
      <text x={0} y={18} textAnchor="middle" fill={accent} fontSize={6.5} fontFamily="monospace" letterSpacing="1">RF</text>
    </g>
  );
}

function renderPart(id: string) {
  if (id === "airframe") return <Airframe />;
  if (id === "fc-adapter") return <FCAdapter />;
  if (id === "fc") return <FlightController />;
  if (id === "battery") return <Battery />;
  if (id === "fpv-cam") return <FPVCamera />;
  if (id === "gps") return <GPS />;
  if (id === "telemetry") return <TelemetryRadio />;
  if (id.startsWith("motor")) return <Motor />;
  if (id.startsWith("prop")) return <ThreeBladeProp />;
  return null;
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export default function DroneAssembly() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    let raf = 0;

    const update = () => {
      raf = 0;
      const el = scrollerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = el.offsetHeight - vh;
      const scrolled = clamp(-rect.top, 0, scrollable);
      const p = scrollable > 0 ? scrolled / scrollable : 0;
      setProgress(p);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const active = currentCallout(progress);

  return (
    <section
      ref={scrollerRef}
      aria-label="Drone assembly walkthrough"
      /* Shorter scroll range — snappier pace, less time stuck in the loop. */
      className="relative -mt-24 hidden md:block"
      style={{ height: "180vh" }}
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-[1fr_1fr] items-center gap-8 px-6">
          {/* Left: SVG assembly */}
          <div className="relative aspect-square w-full">
            <svg
              viewBox="-320 -320 640 640"
              className="h-full w-full"
              role="img"
              aria-label="Exploded assembly of the custom quadcopter"
            >
              {/* faint reference grid */}
              <g opacity={0.08}>
                {Array.from({ length: 13 }, (_, i) => i * 40 - 240).map((v) => (
                  <line key={`h${v}`} x1={-320} y1={v} x2={320} y2={v} stroke="white" strokeWidth={0.5} />
                ))}
                {Array.from({ length: 13 }, (_, i) => i * 40 - 240).map((v) => (
                  <line key={`v${v}`} x1={v} y1={-320} x2={v} y2={320} stroke="white" strokeWidth={0.5} />
                ))}
              </g>

              {parts.map((part) => {
                const t = ready ? stage(progress, part.in, part.out) : 1;
                const x = lerp(part.from.x, part.to.x, t);
                const y = lerp(part.from.y, part.to.y, t);
                const r = lerp(part.from.r ?? 0, part.to.r ?? 0, t);
                const opacity = clamp(t * 3.3);
                return (
                  <g
                    key={part.id}
                    transform={`translate(${x} ${y}) rotate(${r})`}
                    opacity={opacity}
                  >
                    {renderPart(part.id)}
                  </g>
                );
              })}
            </svg>

            <div className="absolute inset-x-0 bottom-0 mx-auto flex w-full max-w-md items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
                assembly
              </span>
              <div className="h-px flex-1 bg-white/10">
                <div
                  className="h-full bg-accent transition-[width] duration-100"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
                {String(Math.round(progress * 100)).padStart(3, "0")}%
              </span>
            </div>
          </div>

          {/* Right: text callout */}
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-ink-subtle">
              Interactive · scroll to assemble
            </div>
            <h3 className="title mt-4 text-4xl md:text-5xl">Building it.</h3>
            <div className="mt-8 min-h-[140px]" key={active.title}>
              <div className="fade-up font-mono text-xs uppercase tracking-[0.2em] text-accent">
                {active.title}
              </div>
              <p className="fade-up-1 mt-3 max-w-md text-lg leading-relaxed text-ink-muted text-haze">
                {active.body}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
