"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ─── Preset accent colors ───────────────────────────────────────────────────
export type AccentPreset = "teal" | "yellow" | "orange" | "red" | "purple" | "white";

const ACCENT_PRESETS: Record<AccentPreset, string> = {
  teal:   "#64ffda",
  yellow: "#ffe94d",
  orange: "#ffaa33",
  red:    "#ff4d6d",
  purple: "#c084fc",
  white:  "#e8f0ec",
};

// ─── Props ──────────────────────────────────────────────────────────────────
interface ArcReactorProps {
  size?:        number;
  className?:   string;
  /** Preset name OR any valid CSS hex / rgb color string */
  accentColor?: AccentPreset | (string & {});
}

// ─── Helper: hex → rgba string ──────────────────────────────────────────────
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const len = h.length === 3 ? 1 : 2;
  const r = parseInt(h.slice(0, len).padEnd(2, h[0]), 16);
  const g = parseInt(h.slice(len, len * 2).padEnd(2, h[len]), 16);
  const b = parseInt(h.slice(len * 2, len * 3).padEnd(2, h[len * 2]), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ─── Component ──────────────────────────────────────────────────────────────
export default function ArcReactor({
  size        = 440,
  className   = "",
  accentColor = "teal",
}: ArcReactorProps) {

  // Resolve color
  const accent: string =
    accentColor in ACCENT_PRESETS
      ? ACCENT_PRESETS[accentColor as AccentPreset]
      : (accentColor as string);

  // Derive a glow-safe rgba for filter-less fills
  const accentFaint  = hexToRgba(accent, 0.22);
  const accentGlow   = hexToRgba(accent, 0.55);

  const [powered, setPowered] = useState(false);
  const [tick,    setTick]    = useState(0);
  const rafRef   = useRef<number>(0);
  const startRef = useRef<number>(0);
  const tiltRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setTimeout(() => setPowered(true), 80);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const loop = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      setTick(ts - startRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!tiltRef.current) return;
    const rect = tiltRef.current.getBoundingClientRect();
    const mx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const my = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    tiltRef.current.style.transform =
      `perspective(900px) rotateX(${my * -7}deg) rotateY(${mx * 7}deg)`;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // ── Derived values ────────────────────────────────────────────────────────
  const rnd = (val: number) => Number(val.toFixed(3));
  const t  = tick / 1000;
  const cx = rnd(size / 2);
  const cy = rnd(size / 2);
  const sc = (px: number) => rnd(px * (size / 440));

  // Ring radii
  const RO  = sc(195); // outer circle
  const ROI = sc(180); // outer inner boundary
  const RM1 = sc(140); // mid ring 1
  const RM2 = sc(118); // mid ring 2
  const RI1 = sc(90);  // inner ring 1
  const RI2 = sc(65);  // inner ring 2
  const RC  = sc(40);  // core
  const RE  = sc(9);   // eye

  // Stepped mechanical rotations
  const outerAngle = rnd((t * 3.5) % 360);

  const mid1Angle = (() => {
    const c = t % 12;
    if (c < 4)  return rnd((c / 4) * 140);
    if (c < 5)  return rnd(140 - (c - 4) * 8);
    if (c < 10) return rnd(132 + ((c - 5) / 5) * 228);
    return 360;
  })();

  const mid2Angle = rnd(-((t * 9) % 360));

  const inner1Angle = (() => {
    const c = t % 6;
    if (c < 1.8) return rnd((c / 1.8) * 95);
    if (c < 2.3) return rnd(95 - ((c - 1.8) / 0.5) * 9);
    if (c < 5.2) return rnd(86 + ((c - 2.3) / 2.9) * 274);
    return 360;
  })();

  const inner2Angle    = rnd(-(inner1Angle * 0.9 + 30));

  const tealLargeAngle = (() => {
    const c = t % 8;
    if (c < 2.5) return rnd((c / 2.5) * 110);
    if (c < 3.1) return rnd(110 - ((c - 2.5) / 0.6) * 12);
    if (c < 7)   return rnd(98 + ((c - 3.1) / 3.9) * 262);
    return 360;
  })();

  const tealSmallAngle = rnd(-(tealLargeAngle * 0.65 + 60));

  const breathe  = rnd(0.5 + 0.5 * Math.sin(t * 1.9));
  const breathe2 = rnd(0.5 + 0.5 * Math.sin(t * 2.4 + 1.2));

  const blink = (off: number, spd = 2) => {
    const v = Math.sin(t * spd + off);
    return v > 0.75 ? 0.06 : v > 0.2 ? 0.5 : 0.78;
  };

  // ── Geometry helpers ──────────────────────────────────────────────────────
  const pt = (angleDeg: number, r: number) => {
    const rad = ((angleDeg - 90) * Math.PI) / 180;
    return { x: rnd(cx + r * Math.cos(rad)), y: rnd(cy + r * Math.sin(rad)) };
  };

  const strokeArc = (a0: number, a1: number, r: number) => {
    const s = pt(a0, r), e = pt(a1, r);
    const lg = a1 - a0 > 180 ? 1 : 0;
    return `M${s.x},${s.y} A${r},${r} 0 ${lg} 1 ${e.x},${e.y}`;
  };

  const filledArc = (a0: number, a1: number, r: number, w: number) => {
    const ro = r + w / 2, ri = r - w / 2;
    const s1 = pt(a0, ro), e1 = pt(a1, ro);
    const s2 = pt(a1, ri), e2 = pt(a0, ri);
    const lg = a1 - a0 > 180 ? 1 : 0;
    return `M${s1.x},${s1.y} A${ro},${ro} 0 ${lg} 1 ${e1.x},${e1.y} L${s2.x},${s2.y} A${ri},${ri} 0 ${lg} 0 ${e2.x},${e2.y} Z`;
  };

  const op = (base: number, delay = 0): React.CSSProperties => ({
    opacity:    powered ? base : 0,
    transition: `opacity 0.85s ease ${delay}s`,
  });

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div
      className={className}
      style={{ display: "inline-block", position: "relative", width: size, height: size }}
    >
      <div ref={tiltRef} style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ display: "block" }}
          aria-label="Arc Reactor HUD"
        >
          <defs>
            <radialGradient id="ar-core" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#1c2920" />
              <stop offset="100%" stopColor="#0b0f0d" />
            </radialGradient>
            {/* Glow filter using current accent color */}
            <filter id="ar-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ── OUTERMOST BROKEN ARCS ── */}
          <g style={op(1, 0)}>
            <path d={strokeArc(-88,  28,  RO + sc(22))} fill="none" stroke="rgba(145,155,150,0.28)" strokeWidth={sc(1.2)} />
            <path d={strokeArc( 42,  130, RO + sc(22))} fill="none" stroke="rgba(135,145,140,0.22)" strokeWidth={sc(1)}   />
            <path d={strokeArc(148,  242, RO + sc(22))} fill="none" stroke="rgba(135,145,140,0.22)" strokeWidth={sc(1)}   />
            <path d={strokeArc(258,  340, RO + sc(22))} fill="none" stroke="rgba(130,140,135,0.20)" strokeWidth={sc(0.9)} />
          </g>

          {/* Outermost tick marks */}
          <g style={op(1, 0.05)}>
            {Array.from({ length: 80 }, (_, i) => {
              const a    = (i / 80) * 360;
              const long = i % 8 === 0;
              const p1   = pt(a, RO + sc(24));
              const p2   = pt(a, RO + sc(long ? 36 : 28));
              return (
                <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                  stroke={long ? "rgba(155,165,160,0.42)" : "rgba(125,135,130,0.22)"}
                  strokeWidth={sc(long ? 1.2 : 0.65)} />
              );
            })}
          </g>

          {/* Small square dots on outer rim — accent-colored highlights */}
          <g style={op(1, 0.1)}>
            {Array.from({ length: 28 }, (_, i) => {
              const a   = (i / 28) * 360;
              const p   = pt(a, RO + sc(38));
              const sz  = i % 4 === 0 ? sc(4) : sc(2.2);
              const isAccent = i % 9 === 0;
              return (
                <rect key={i}
                  x={rnd(p.x - sz / 2)} y={rnd(p.y - sz / 2)}
                  width={sz} height={sz}
                  fill={isAccent ? accent : "rgba(145,155,150,0.7)"}
                  rx={sc(0.4)}
                  opacity={blink(i * 0.65, 1.2 + (i % 4) * 0.4)}
                />
              );
            })}
          </g>

          {/* ── OUTER RING BAND ── */}
          <circle cx={cx} cy={cy} r={RO}  fill="none" stroke="rgba(148,158,153,0.28)" strokeWidth={sc(1.5)} style={op(1, 0.05)} />
          <circle cx={cx} cy={cy} r={ROI} fill="none" stroke="rgba(140,150,145,0.20)" strokeWidth={sc(1)}   style={op(1, 0.08)} />

          {/* Tick marks inside outer ring band */}
          <g style={op(1, 0.1)}>
            {Array.from({ length: 56 }, (_, i) => {
              const a    = (i / 56) * 360;
              const long = i % 7 === 0;
              const p1   = pt(a, ROI + sc(3));
              const p2   = pt(a, ROI + sc(long ? 12 : 6));
              return (
                <line key={i} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                  stroke={long ? "rgba(165,175,170,0.5)" : "rgba(135,145,140,0.28)"}
                  strokeWidth={sc(long ? 1.3 : 0.7)} />
              );
            })}
          </g>

          {/* Rotating outer ring notch accent */}
          <g transform={`rotate(${outerAngle},${cx},${cy})`} style={op(0.85, 0.08)}>
            <path d={strokeArc(-35, 55,  rnd(RO - sc(4)))} fill="none" stroke="rgba(190,200,195,0.52)" strokeWidth={sc(2.5)} />
            <path d={strokeArc(120, 170, rnd(RO - sc(4)))} fill="none" stroke="rgba(175,185,180,0.38)" strokeWidth={sc(1.5)} />
          </g>

          {/* ── MID RING 1 + BOLD ARC SEGMENT ── */}
          <circle cx={cx} cy={cy} r={RM1} fill="none" stroke="rgba(145,155,150,0.25)" strokeWidth={sc(1.5)} style={op(1, 0.12)} />

          <g transform={`rotate(${mid1Angle},${cx},${cy})`} style={op(1, 0.15)} filter="url(#ar-glow)">
            {/* Dark filled body of the thick arc */}
            <path d={filledArc(-58, 58, RM1, sc(24))}
              fill="rgba(48,58,53,0.92)" stroke={accent} strokeOpacity={0.25} strokeWidth={sc(0.7)} />
            {/* Accent highlight stroke along the outer edge */}
            <path d={strokeArc(-58, 58, rnd(RM1 + sc(11)))}
              fill="none" stroke={accent} strokeWidth={sc(2.5)} strokeOpacity={0.85} strokeLinecap="round" />
            {/* Accent end-cap notches */}
            <path d={strokeArc(-60, -55, rnd(RM1 + sc(4)))} fill="none" stroke={accent} strokeOpacity={0.6} strokeWidth={sc(3.5)} />
            <path d={strokeArc( 55,  60, rnd(RM1 + sc(4)))} fill="none" stroke={accent} strokeOpacity={0.6} strokeWidth={sc(3.5)} />
          </g>

          {/* ── MID RING 2 ── */}
          <circle cx={cx} cy={cy} r={RM2} fill="none" stroke="rgba(138,148,143,0.22)" strokeWidth={sc(1.2)} style={op(1, 0.2)} />
          <g transform={`rotate(${mid2Angle},${cx},${cy})`} style={op(0.7, 0.22)}>
            <path d={strokeArc(5, 70, RM2)} fill="none" stroke="rgba(180,190,185,0.48)" strokeWidth={sc(2)} />
          </g>

          {/* ── ACCENT LARGE ARC (spinning, prominent) ── */}
          <g transform={`rotate(${tealLargeAngle},${cx},${cy})`} style={op(1, 0.55)} filter="url(#ar-glow)">
            <path d={strokeArc(105, 175, rnd(RM1 - sc(6)))}
              fill="none" stroke={accent} strokeWidth={sc(3.5)} strokeLinecap="round" />
          </g>

          {/* ── INNER RING 1 ── */}
          <circle cx={cx} cy={cy} r={RI1}
            fill="rgba(16,22,18,0.75)" stroke="rgba(142,152,147,0.32)" strokeWidth={sc(1.5)}
            style={op(1, 0.28)} />
          <g transform={`rotate(${inner1Angle},${cx},${cy})`} style={op(0.88, 0.3)}>
            <path d={strokeArc(-18,  14, RI1)} fill="none" stroke="rgba(195,205,200,0.58)" strokeWidth={sc(2.5)} />
            <path d={strokeArc(162, 196, RI1)} fill="none" stroke="rgba(175,185,180,0.40)" strokeWidth={sc(1.8)} />
          </g>

          {/* ── INNER RING 2 (wedge segments) ── */}
          <circle cx={cx} cy={cy} r={RI2}
            fill="rgba(12,17,14,0.88)" stroke="rgba(142,152,147,0.35)" strokeWidth={sc(1.5)}
            style={op(1, 0.38)} />

          <g transform={`rotate(${inner2Angle},${cx},${cy})`} style={op(1, 0.4)}>
            {/* Dark pie slices */}
            <path d={filledArc(-45,  -8, rnd(RI2 - sc(2)), sc(18))} fill="rgba(32,42,37,0.92)" stroke="rgba(155,165,160,0.22)" strokeWidth={sc(0.8)} />
            <path d={filledArc( 15,  72, rnd(RI2 - sc(2)), sc(18))} fill="rgba(28,38,33,0.90)" stroke="rgba(150,160,155,0.20)" strokeWidth={sc(0.8)} />
            <path d={filledArc(192, 268, rnd(RI2 - sc(2)), sc(18))} fill="rgba(32,42,37,0.88)" stroke="rgba(150,160,155,0.18)" strokeWidth={sc(0.8)} />
            {/* Accent wedge (bottom-right) */}
            <path d={filledArc(120, 172, rnd(RI2 - sc(2)), sc(18))}
              fill={accent}
              fillOpacity={0.82 * (0.55 + 0.45 * breathe)}
              filter="url(#ar-glow)" />
          </g>

          {/* Accent small counter-spinning arc */}
          <g transform={`rotate(${tealSmallAngle},${cx},${cy})`} style={op(1, 0.62)} filter="url(#ar-glow)">
            <path d={strokeArc(192, 232, rnd(RI2 + sc(3)))}
              fill="none" stroke={accent} strokeWidth={sc(3)} strokeLinecap="round"
              strokeOpacity={rnd(0.65 + 0.35 * breathe2)} />
          </g>

          {/* ── CROSSHAIR LINES (accent color) ── */}
          <line
            x1={rnd(cx - RI1 - sc(42))} y1={cy} x2={rnd(cx - RI1 - sc(12))} y2={cy}
            stroke={accent} strokeWidth={sc(2.5)} filter="url(#ar-glow)"
            style={{ opacity: powered ? rnd(0.65 + 0.35 * breathe)  : 0, transition: "opacity 0.6s ease 0.75s" }} />
          <line
            x1={rnd(cx + RI1 + sc(12))} y1={cy} x2={rnd(cx + RI1 + sc(42))} y2={cy}
            stroke={accent} strokeWidth={sc(2.5)} filter="url(#ar-glow)"
            style={{ opacity: powered ? rnd(0.65 + 0.35 * breathe2) : 0, transition: "opacity 0.6s ease 0.80s" }} />

          {/* ── DATA SQUARES (accent color) ── */}
          <rect x={rnd(cx - sc(22))} y={rnd(cy - sc(30))} width={sc(5.5)} height={sc(5.5)}
            fill={accent} rx={sc(0.5)} filter="url(#ar-glow)"
            style={{ opacity: powered ? blink(0.3) : 0, transition: "opacity 0.4s ease 0.9s" }} />
          <rect x={rnd(cx + sc(16))} y={rnd(cy - sc(30))} width={sc(5.5)} height={sc(5.5)}
            fill={accent} rx={sc(0.5)} filter="url(#ar-glow)"
            style={{ opacity: powered ? blink(1.3) : 0, transition: "opacity 0.4s ease 0.95s" }} />
          <rect x={rnd(cx - sc(23))} y={rnd(cy + sc(22))} width={sc(4.5)} height={sc(4.5)}
            fill={accent} rx={sc(0.5)} filter="url(#ar-glow)"
            style={{ opacity: powered ? blink(2.1) : 0, transition: "opacity 0.4s ease 1.0s" }} />

          {/* ── CORE DISC ── */}
          <circle cx={cx} cy={cy} r={RC}
            fill="url(#ar-core)" stroke="rgba(162,172,167,0.45)" strokeWidth={sc(1.8)}
            style={op(1, 0.44)} />
          <g transform={`rotate(${-inner1Angle * 1.4},${cx},${cy})`} style={op(0.78, 0.48)}>
            <path d={strokeArc(-12,  18, RC)} fill="none" stroke="rgba(178,188,183,0.52)" strokeWidth={sc(2)}   />
            <path d={strokeArc(165, 200, RC)} fill="none" stroke="rgba(160,170,165,0.38)" strokeWidth={sc(1.5)} />
          </g>

          {/* Core eye ring */}
          <circle cx={cx} cy={cy} r={RE}
            fill="rgba(10,14,12,0.92)" stroke="rgba(162,172,167,0.55)" strokeWidth={sc(1.5)}
            style={{ opacity: powered ? (0.55 + 0.45 * breathe) : 0, transition: "opacity 0.8s ease 0.52s" }} />

          {/* Eye center glint (accent tinted) */}
          <circle cx={cx} cy={cy} r={sc(2.8)}
            fill={accentFaint}
            style={{ opacity: powered ? (0.4 + 0.6 * breathe) : 0, transition: "opacity 0.6s ease 0.58s" }} />
        </svg>
      </div>
    </div>
  );
}