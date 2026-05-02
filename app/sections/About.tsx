'use client'

import React, { useEffect, useRef } from 'react'
import {
    TitlePath,
    polygonclip,
    bottomBarFillPath,
    bottomBarStrokePath,
    bottomBarRects,
    hRulerFullTicks,
    hRulerShortTicks,
    vRulerFullTicks,
    vRulerShortTicks,
} from '@/data/Paths/aboutDeptPaths'
import TerminalText from '@/components/ui/TerminalText'
import BigCircle from '@/components/ui/BigCircle'

// ─── Title: entry draw-in via strokeDashoffset ────────────────────────────────
function AnimatedTitle() {
    const pathRef = useRef<SVGPathElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        const path = pathRef.current
        if (!path) return

        const len = path.getTotalLength()
        path.style.strokeDasharray = String(len)
        path.style.strokeDashoffset = String(len)
        path.style.opacity = '0'

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return
                observer.disconnect()

                path.style.transition = 'opacity 0.3s ease'
                path.style.opacity = '1'

                path.animate(
                    [{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
                    { duration: 1400, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' }
                )

                setTimeout(() => {
                    path.style.transition = 'stroke-opacity 0.6s ease'
                    path.style.strokeOpacity = '0'
                }, 1400)
            },
            { threshold: 0.3 }
        )
        if (svgRef.current) observer.observe(svgRef.current)
        return () => observer.disconnect()
    }, [])

    return (
        <svg
            ref={svgRef}
            // On mobile the SVG will be constrained by max-w-full + w-full
            width="884"
            height="39"
            viewBox="0 0 884 39"
            xmlns="http://www.w3.org/2000/svg"
            // Fills container width on small screens, caps at natural size on large
            className="w-full max-w-[884px] h-auto"
            aria-label="ABOUT ILLUMINE"
        >
            <path
                ref={pathRef}
                d={TitlePath}
                fill="#B6BBFF"
                stroke="#B6BBFF"
                strokeWidth="0.6"
                strokeOpacity="1"
            />
        </svg>
    )
}

// ─── Chamfered box: entry fade + scale ───────────────────────────────────────
function AnimatedBox({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        el.style.opacity = '0'
        el.style.transform = 'scale(0.97)'
        el.style.transition = 'none'

        const obs = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return
                obs.disconnect()
                requestAnimationFrame(() => {
                    el.style.transition =
                        'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)'
                    el.style.opacity = '1'
                    el.style.transform = 'scale(1)'
                })
            },
            { threshold: 0.15 }
        )
        obs.observe(el)
        return () => obs.disconnect()
    }, [])

    return (
        // Mobile: full width, auto height. md+: 90% wide, 80% viewport height
        <div
            ref={ref}
            className="w-[90%] bg-white p-[1px] h-[70svh] md:h-[80%]"
            style={{ clipPath: polygonclip }}
        >
            {children}
        </div>
    )
}

// ─── Bottom bar ───────────────────────────────────────────────────────────────
function BottomBar() {
    const ref = useRef<SVGSVGElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        let raf: number
        let start: number | null = null
        const tick = (ts: number) => {
            if (start === null) start = ts
            const t = 0.5 + 0.5 * Math.sin(((ts - start) / 3500) * 2 * Math.PI)
            el.style.opacity = String(0.35 + t * 0.35)
            raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [])

    return (
        <svg
            ref={ref}
            width="426"
            height="25"
            viewBox="0 0 426 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.5 }}
            // Scale down the decorative bar on small screens
            className="w-[280px] sm:w-[340px] md:w-[426px] h-auto"
        >
            <g opacity="0.8">
                <path d={bottomBarFillPath} fill="white" />
                <path d={bottomBarStrokePath} stroke="white" />
            </g>
            {bottomBarRects.map((x) => (
                <rect key={x} opacity="0.6" x={x} y="15.3535" width="3" height="9" fill="white" />
            ))}
        </svg>
    )
}

// ─── Horizontal ruler ─────────────────────────────────────────────────────────
function HRuler() {
    const ref = useRef<SVGSVGElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        let raf: number
        let start: number | null = null
        const PERIOD = 4000
        const tick = (ts: number) => {
            if (start === null) start = ts
            const t = ((ts - start) % PERIOD) / PERIOD
            const wave = 0.5 + 0.5 * Math.sin(t * 2 * Math.PI)
            const op = 0.3 + 0.3 * Math.pow(wave, 3)
            el.style.opacity = String(op)
            raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [])

    return (
        <svg
            ref={ref}
            width="251"
            height="16"
            viewBox="0 0 251 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.4 }}
            className="w-[160px] sm:w-[200px] md:w-[251px] h-auto"
        >
            {hRulerFullTicks.map((x) => (
                <line key={`f${x}`} opacity="0.9" x1={x} y1="0" x2={x} y2="16" stroke="white" />
            ))}
            {hRulerShortTicks.map((x) => (
                <line key={`s${x}`} opacity="0.5" x1={x} y1="5" x2={x} y2="16" stroke="white" />
            ))}
        </svg>
    )
}

// ─── Vertical ruler ───────────────────────────────────────────────────────────
function VRuler() {
    const ref = useRef<SVGSVGElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        let raf: number
        let start: number | null = null
        const tick = (ts: number) => {
            if (start === null) start = ts
            const t = 0.5 + 0.5 * Math.sin(((ts - start) / 2800) * 2 * Math.PI)
            el.style.opacity = String(0.25 + t * 0.35)
            raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [])

    return (
        <svg
            ref={ref}
            width="16"
            height="126"
            viewBox="0 0 16 126"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.4 }}
            className="h-[80px] sm:h-[100px] md:h-[126px] w-auto"
        >
            {vRulerFullTicks.map((y) => (
                <line key={`f${y}`} opacity="0.9" x1="0" y1={y} x2="16" y2={y} stroke="white" />
            ))}
            {vRulerShortTicks.map((y) => (
                <line key={`s${y}`} opacity="0.5" x1="5" y1={y} x2="16" y2={y} stroke="white" />
            ))}
        </svg>
    )
}

// ─── Main component ───────────────────────────────────────────────────────────
const About: React.FC = () => {
    return (
        // Mobile: min-h-screen + auto height so content isn't clipped.
        // md+: h-screen (original locked viewport height)
        <div className="min-h-screen md:h-screen w-full bg-background flex flex-col justify-center items-center gap-6 md:gap-12 p-6 sm:p-10 md:p-16 relative overflow-hidden">

            {/* SVG Title */}
            <AnimatedTitle />

            {/* Chamfered box */}
            <AnimatedBox>
                <div
                    className="w-full h-full relative text-white"
                    style={{
                        clipPath: polygonclip,
                        backgroundImage: `url('https://images.unsplash.com/flagged/photo-1554473675-d0904f3cbf38?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                >
                    {/* ── MOBILE gradient: bottom-to-top, image visible at top ── */}
                    <div
                        className="md:hidden absolute inset-0 z-[10] pointer-events-none"
                        style={{
                            background: 'linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.4) 60%, transparent 100%)',
                        }}
                    />

                    {/* ── DESKTOP gradient: original left-to-right wash ── */}
                    <div
                        className="hidden md:block absolute inset-0 z-[10] pointer-events-none"
                        style={{
                            background: `
                                radial-gradient(ellipse at center, transparent 15%, rgba(0,0,0,0.7) 100%),
                                linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0.85) 45%, rgba(0,0,0,0.4) 60%, transparent 80%)
                            `,
                        }}
                    />

                    {/* ── MOBILE layout: text pinned to bottom ── */}
                    <div className="md:hidden absolute bottom-0 left-0 right-0 z-[15] px-6 pb-8">
                        <TerminalText
                            text={`Illumine is a biennial reunion event organized by the\nDepartment of Information Technology at Jadavpur University. Held every two years, this gathering brings together alumni, current students, and faculty members to celebrate the department's achievements and foster connections within the IT community. Illumine provides a unique platform for former students to reconnect with old friends and mentors, share their career experiences, and contribute to the ongoing development of the department. It also offers current students valuable opportunities to gain insights from alumni, explore potential career paths, and engage with the broader IT professional community. With its focus on celebrating the department's legacy and future, Illumine is a significant and anticipated occasion for all involved. This time we intend to make the reunion even more special and grand since this year marks the Silver Jubilee of our department.`}
                            align="left"
                            className="text-[13px] sm:text-[14px] break-words whitespace-pre-line"
                        />
                    </div>

                    {/* ── DESKTOP layout: original right-aligned text panel ── */}
                    <div className="hidden md:flex w-full h-full items-center justify-end px-10">
                        <div className="w-[35%] h-[90%] overflow-auto relative z-[15]">
                            <TerminalText
                                text={`Illumine is a biennial reunion event organized by the\nDepartment of Information Technology at Jadavpur University. Held every two years, this gathering brings together alumni, current students, and faculty members to celebrate the department's achievements and foster connections within the IT community. Illumine provides a unique platform for former students to reconnect with old friends and mentors, share their career experiences, and contribute to the ongoing development of the department. It also offers current students valuable opportunities to gain insights from alumni, explore potential career paths, and engage with the broader IT professional community. With its focus on celebrating the department's legacy and future, Illumine is a significant and anticipated occasion for all involved. This time we intend to make the reunion even more special and grand since this year marks the Silver Jubilee of our department.`}
                                align="right"
                                className="text-[19px] break-words whitespace-pre-line"
                            />
                        </div>
                    </div>
                </div>
            </AnimatedBox>

            {/* ── Decorative layer ── */}
            <div className="absolute inset-0 h-full w-full pointer-events-none">

                {/*
                    BigCircles:
                    - Hidden on very small screens to avoid clutter
                    - Scale adjusted per breakpoint
                */}
                <BigCircle className="hidden sm:block absolute top-[10%] sm:top-[15%] left-[2%] sm:left-[5%] scale-75 sm:scale-100 md:scale-120 z-10 pointer-events-none" />
                <BigCircle className="hidden sm:block absolute bottom-[1%] right-[2%] sm:right-[5%] scale-60 sm:scale-75 md:scale-90 rotate-180 z-10 pointer-events-none" color="cyan" />

                {/* Bottom bar */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[4%] md:bottom-[6%]">
                    <BottomBar />
                </div>

                {/* Horizontal ruler */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[0%] scale-100 md:scale-150">
                    <HRuler />
                </div>

                {/*
                    Vertical ruler:
                    - Hidden on mobile (no room at left edge)
                    - Shown from sm upward
                */}
                <div className="hidden sm:block absolute top-1/2 -translate-y-1/2 left-[2%] md:left-[5%] scale-100 md:scale-150">
                    <VRuler />
                </div>

            </div>
        </div>
    )
}

export default About