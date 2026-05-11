'use client'

import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { useMotionValue, useTransform, animate } from 'framer-motion'
import { bigCirclePaths } from '@/data/Paths/heroPaths'

type BigCircleProps = {
    className?: string
}

const CX = 68.17
const CY = 77.25

/**
 * Runs a looping opacity pulse on a DOM element after a delay.
 * Uses the same animate() from Framer so it integrates cleanly.
 *
 * min / max   — fillOpacity range
 * duration    — one full breath cycle in seconds
 * startDelay  — seconds before the pulse begins (after entry finishes)
 */
function startPulse(
    el: Element | null,
    attribute: 'opacity' | 'fill-opacity',
    min: number,
    max: number,
    duration: number,
    startDelay: number,
) {
    if (!el) return
    const mv = useMotionValue(max) // won't actually call a hook here — see note below

    // We can't call hooks inside a plain function, so we drive this with
    // a raw recursive rAF loop — simple and zero-dependency.
    let rafId: number
    let start: number | null = null
    let cancelled = false

    const tick = (ts: number) => {
        if (cancelled) return
        if (start === null) start = ts
        const elapsed = (ts - start) / 1000
        // Sine wave between min and max
        const t = 0.5 + 0.5 * Math.sin((elapsed / duration) * 2 * Math.PI)
        const val = min + t * (max - min)
            ; (el as SVGElement).setAttribute(attribute, String(+val.toFixed(4)))
        rafId = requestAnimationFrame(tick)
    }

    const timer = setTimeout(() => {
        rafId = requestAnimationFrame(tick)
    }, startDelay * 1000)

    return () => {
        cancelled = true
        clearTimeout(timer)
        cancelAnimationFrame(rafId)
    }
}

/**
 * RingGroup
 *
 * Rotation uses native SVG rotate(angle, cx, cy) — bypasses Framer CSS
 * transforms entirely so there is no orbital drift.
 *
 * pulseMin / pulseMax  — opacity breath range for the whole group
 * pulseDuration        — seconds per breath cycle
 * pulseDelay           — seconds after entry before pulse starts
 */
function RingGroup({
    children,
    direction,
    idleDuration,
    entryDelay,
    pulseMin = 0.55,
    pulseMax = 1.0,
    pulseDuration = 3,
    pulseDelay = 0,
}: {
    children: React.ReactNode
    direction: 1 | -1
    idleDuration: number
    entryDelay: number
    pulseMin?: number
    pulseMax?: number
    pulseDuration?: number
    pulseDelay?: number
}) {
    const angle = useMotionValue(direction * 540)
    const opacity = useMotionValue(0)
    const scale = useMotionValue(0.5)

    const svgTransform = useTransform(
        [angle, scale],
        ([a, s]: number[]) => `rotate(${a}, ${CX}, ${CY}) scale(${s})`,
    )

    const ref = useRef<SVGGElement>(null)

    // Sync motion values → SVG attributes each frame
    useEffect(() => {
        const unsubT = svgTransform.on('change', (val: string) => {
            ref.current?.setAttribute('transform', val)
        })
        const unsubO = opacity.on('change', (val: number) => {
            ref.current?.setAttribute('opacity', String(val))
        })

        let cancelPulse: (() => void) | undefined

        const run = async () => {
            await new Promise(r => setTimeout(r, entryDelay * 1000))

            // Phase 1 — entry burst
            await Promise.all([
                animate(angle, 0, { duration: 0.75, ease: [0.22, 1, 0.36, 1] }),
                animate(opacity, 1, { duration: 0.5, ease: 'easeOut' }),
                animate(scale, 1, { duration: 0.75, ease: [0.22, 1, 0.36, 1] }),
            ])

            // Phase 2 — slow continuous rotation (accumulate, never reset)
            animate(angle, angle.get() + direction * 360 * 999, {
                duration: idleDuration * 999,
                ease: 'linear',
            })

            // Phase 3 — opacity breath pulse via rAF sine wave
            let rafId: number
            let startTs: number | null = null
            let cancelled = false

            const tick = (ts: number) => {
                if (cancelled) return
                if (startTs === null) startTs = ts
                const elapsed = (ts - startTs) / 1000
                const t = 0.5 + 0.5 * Math.sin((elapsed / pulseDuration) * 2 * Math.PI)
                const val = pulseMin + t * (pulseMax - pulseMin)
                ref.current?.setAttribute('opacity', val.toFixed(4))
                rafId = requestAnimationFrame(tick)
            }

            const pulseTimer = setTimeout(() => {
                rafId = requestAnimationFrame(tick)
            }, pulseDelay * 1000)

            cancelPulse = () => {
                cancelled = true
                clearTimeout(pulseTimer)
                cancelAnimationFrame(rafId)
            }
        }

        run()

        return () => {
            unsubT()
            unsubO()
            cancelPulse?.()
        }
    }, [])

    useLayoutEffect(() => {
        if (ref.current) {
            ref.current.setAttribute(
                'transform',
                `rotate(${direction * 540}, ${CX}, ${CY}) scale(0.5)`,
            )
            ref.current.setAttribute('opacity', '0')
        }
    }, [])

    return <g ref={ref}>{children}</g>
}

/**
 * CenterDot — separate component so we can pulse its fillOpacity
 * independently (white flash cycle, like the blue circle's center dot).
 */
function CenterDot({
    direction,
    idleDuration,
    entryDelay,
}: {
    direction: 1 | -1
    idleDuration: number
    entryDelay: number
}) {
    const angle = useMotionValue(direction * 540)
    const opacity = useMotionValue(0)
    const scale = useMotionValue(0.5)

    const svgTransform = useTransform(
        [angle, scale],
        ([a, s]: number[]) => `rotate(${a}, ${CX}, ${CY}) scale(${s})`,
    )

    const groupRef = useRef<SVGGElement>(null)
    const dotRef = useRef<SVGPathElement>(null)

    useEffect(() => {
        const unsubT = svgTransform.on('change', (val: string) => {
            groupRef.current?.setAttribute('transform', val)
        })
        const unsubO = opacity.on('change', (val: number) => {
            groupRef.current?.setAttribute('opacity', String(val))
        })

        let rafId: number
        let cancelled = false

        const run = async () => {
            await new Promise(r => setTimeout(r, entryDelay * 1000))

            await Promise.all([
                animate(angle, 0, { duration: 0.75, ease: [0.22, 1, 0.36, 1] }),
                animate(opacity, 1, { duration: 0.5, ease: 'easeOut' }),
                animate(scale, 1, { duration: 0.75, ease: [0.22, 1, 0.36, 1] }),
            ])

            animate(angle, angle.get() + direction * 360 * 999, {
                duration: idleDuration * 999,
                ease: 'linear',
            })

            // Center dot pulse: fillOpacity 0.4 → 1.0 → 0.4
            // with a sharp peak (uses pow curve for a "flash" feel)
            let startTs: number | null = null
            const PERIOD = 3.5    // seconds per cycle
            const DELAY = 0.8    // seconds before first pulse

            const tick = (ts: number) => {
                if (cancelled) return
                if (startTs === null) startTs = ts
                const elapsed = (ts - startTs) / 1000
                const raw = 0.5 + 0.5 * Math.sin((elapsed / PERIOD) * 2 * Math.PI)
                // Sharpen the peak so it flashes bright then dims quickly
                const t = Math.pow(raw, 2.5)
                const fillOp = 0.35 + t * 0.65
                dotRef.current?.setAttribute('fill-opacity', fillOp.toFixed(4))
                rafId = requestAnimationFrame(tick)
            }

            setTimeout(() => {
                rafId = requestAnimationFrame(tick)
            }, DELAY * 1000)
        }

        run()

        return () => {
            cancelled = true
            cancelAnimationFrame(rafId)
            unsubT()
            unsubO()
        }
    }, [])

    useLayoutEffect(() => {
        groupRef.current?.setAttribute(
            'transform',
            `rotate(${direction * 540}, ${CX}, ${CY}) scale(0.5)`,
        )
        groupRef.current?.setAttribute('opacity', '0')
    }, [])

    return (
        <g ref={groupRef}>
            <path
                ref={dotRef}
                d={bigCirclePaths.centerDot}
                fill="white"
                fillOpacity="0.4"
            />
        </g>
    )
}

const BigCircle: React.FC<BigCircleProps> = ({ className = '' }) => {
    return (
        <div className={`h-12 aspect-square absolute ${className}`}>
            <svg
                width="146"
                height="155"
                viewBox="0 0 146 155"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                overflow="visible"
            >
                {/*
                 * Rings — outermost → innermost, alternating CW / CCW.
                 * Each ring breathes opacity on a different period and offset
                 * so they pulse independently (never all bright or all dim together).
                 *
                 * Ring A  outerRing + topArcAccent         CW   30s  pulse 4.0s
                 * Ring B  outerCircleStroke               CCW   22s  pulse 3.2s  offset 1.2s
                 * Ring C  arcTop/Bottom/Overlay + accents  CW   16s  pulse 2.6s  offset 0.6s
                 * Center  centerDot (flash pulse)         CCW   10s
                 */}

                <RingGroup
                    direction={1}
                    idleDuration={30}
                    entryDelay={0.0}
                    pulseMin={0.4}
                    pulseMax={0.95}
                    pulseDuration={4.0}
                    pulseDelay={0.2}
                >
                    <g opacity="0.35">
                        <path d={bigCirclePaths.outerRing} fill="white" fillOpacity="0.15" />
                    </g>
                    <path d={bigCirclePaths.topArcAccent} fill="white" />
                </RingGroup>

                <RingGroup
                    direction={-1}
                    idleDuration={22}
                    entryDelay={0.1}
                    pulseMin={0.45}
                    pulseMax={1.0}
                    pulseDuration={3.2}
                    pulseDelay={1.2}
                >
                    <g opacity="0.8">
                        <path d={bigCirclePaths.outerCircleStroke} fill="white" fillOpacity="0.15" />
                    </g>
                </RingGroup>

                <RingGroup
                    direction={1}
                    idleDuration={16}
                    entryDelay={0.2}
                    pulseMin={0.5}
                    pulseMax={1.0}
                    pulseDuration={2.6}
                    pulseDelay={0.6}
                >
                    <g opacity="0.9">
                        <g opacity="0.5">
                            <path d={bigCirclePaths.arcTop} fill="white" fillOpacity="0.4" />
                        </g>
                        <g opacity="0.15">
                            <path d={bigCirclePaths.arcBottom} fill="white" fillOpacity="0.15" />
                        </g>
                        <path d={bigCirclePaths.highlight} fill="white" />
                    </g>
                    <g opacity="0.3">
                        <path d={bigCirclePaths.outerRingOverlay} fill="white" fillOpacity="0.15" />
                    </g>
                    <path d={bigCirclePaths.smallLineAccent} fill="white" fillOpacity="0.15" />
                </RingGroup>

                <CenterDot
                    direction={-1}
                    idleDuration={10}
                    entryDelay={0.32}
                />
            </svg>
        </div>
    )
}

export default BigCircle