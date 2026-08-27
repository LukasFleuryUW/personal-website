"use client";

import { useEffect, useRef } from "react";

/**
 * A matrix of dots with two overlapping curved waves of warm orange light
 * sweeping across the grid. Dots always retain a faint warm tint so the
 * screen is never fully cold.
 */
export default function DotMatrix() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ---- config ----
    const SPACING = 26;
    const BASE_RADIUS = 1.1;
    const PEAK_RADIUS = 3.0;
    const BAND_WIDTH = 240;         // thickness of the wave band
    const WAVE_PERIOD_MS = 22000;   // one full cycle — slow, hypnotic
    const WAVE_ANGLE = Math.PI / 3.4;
    const CURVE_AMPLITUDE = 160;    // how much the wave bends
    const CURVE_WAVELENGTH = 520;   // how many bumps across the screen
    const WAVE_COUNT = 3;           // overlapping waves — at least one always on screen

    // Claude-style warm orange
    const R = 217, G = 119, B = 87;

    // ---- sizing / DPR ----
    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Axis unit vector (direction the wave travels)
    const axisX = Math.cos(WAVE_ANGLE);
    const axisY = Math.sin(WAVE_ANGLE);
    // Perpendicular axis — we sample sine along this to curve the band
    const perpX = -axisY;
    const perpY = axisX;

    let raf = 0;
    const start = performance.now();

    // Compute the traveling position of a wave with a given phase (0..1 offset).
    // Travel is clamped to just past the visible projected range so there is
    // always at least one wave visible when combined with the other phases.
    const wavePos = (t: number, projMax: number, phase: number) => {
      const p = (t + phase) % 1;
      // sawtooth so waves march steadily across then wrap — combined with
      // multiple phase-offset waves this keeps the screen constantly lit.
      const travel = projMax + BAND_WIDTH * 2;
      return -BAND_WIDTH + p * travel;
    };

    // Bright/soft contribution of a wave to a dot at (x, y)
    const contribution = (x: number, y: number, linePos: number) => {
      const proj = x * axisX + y * axisY;
      const perp = x * perpX + y * perpY;
      // curved line: distance to a sine-warped wavefront
      const warp = Math.sin(perp / CURVE_WAVELENGTH * Math.PI * 2) * CURVE_AMPLITUDE;
      const dist = Math.abs(proj - linePos - warp);
      if (dist > BAND_WIDTH) return 0;
      const n = 1 - dist / BAND_WIDTH; // 0..1
      return n * n * (3 - 2 * n);       // smoothstep
    };

    const draw = (now: number) => {
      const t = ((now - start) % WAVE_PERIOD_MS) / WAVE_PERIOD_MS;

      // Projected extent of the visible canvas along the wave axis
      // (both axis components are positive for our chosen angle).
      const projMax = width * axisX + height * axisY;

      // Multiple overlapping waves at evenly spaced phases so at least one
      // is always sweeping across the visible grid.
      const lines: number[] = [];
      for (let w = 0; w < WAVE_COUNT; w++) {
        lines.push(wavePos(t, projMax, w / WAVE_COUNT));
      }

      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / SPACING) + 2;
      const rows = Math.ceil(height / SPACING) + 2;
      const offsetX = ((width % SPACING) / 2) - SPACING;
      const offsetY = ((height % SPACING) / 2) - SPACING;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = offsetX + i * SPACING;
          const y = offsetY + j * SPACING;

          let k = 0;
          for (let w = 0; w < WAVE_COUNT; w++) {
            const weight = w === 0 ? 1 : 0.75;
            k += contribution(x, y, lines[w]) * weight;
          }
          k = Math.min(1, k);

          // Baseline warm tint so the grid is never fully cold
          // Even at k = 0, dots are a soft, subtle orange
          const baseAlpha = 0.12;
          const alpha = baseAlpha + 0.8 * k;
          const radius = BASE_RADIUS + (PEAK_RADIUS - BASE_RADIUS) * k;

          ctx.fillStyle = `rgba(${R}, ${G}, ${B}, ${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();

          // Glow at the crest
          if (k > 0.5) {
            const glow = (k - 0.5) / 0.5;
            ctx.fillStyle = `rgba(${R}, ${G}, ${B}, ${0.2 * glow})`;
            ctx.beginPath();
            ctx.arc(x, y, radius * 3.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 h-full w-full"
      style={{ zIndex: 0 }}
    />
  );
}
