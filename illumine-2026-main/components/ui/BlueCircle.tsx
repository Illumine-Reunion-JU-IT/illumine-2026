'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useAnimate, useMotionValue, animate } from 'framer-motion'
import { blueCirclePaths } from '@/data/Paths/heroPaths'

type BlueCircleProps = {
    className?: string
}

// Circle center in SVG coordinate space
const CX = 28.51
const CY = 27.32

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const SPRING_POP = {
    type: 'spring' as const,
    stiffness: 320,
    damping: 16,
    mass: 0.8,
}

/**
 * useOrbitAnimation
 * Phase 1 — entry: fast spin (720° → 0°) over 0.7s with expo easing
 * Phase 2 — idle:  slow uniform 0° → 360° looping at 12s/rev
 * Returns a ref to attach to the <g> element
 */
function useOrbitAnimation(delay = 0.42) {
    const [scope, animateEl] = useAnimate()

    useEffect(() => {
        const run = async () => {
            // Wait for entry delay
            await new Promise(r => setTimeout(r, delay * 1000))

            // Phase 1: fast spin-in + fade in
            await animateEl(scope.current, {
                rotate: [720, 0],
                opacity: [0, 0.75],
            }, {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
            })

            // Phase 2: slow uniform orbit, looping forever
            animateEl(scope.current, {
                rotate: [0, 360],
            }, {
                duration: 12,
                repeat: Infinity,
                ease: 'linear',
            })
        }
        run()
    }, [])

    return scope
}

/**
 * RingLayer — renders one copy of circleOuterFill, handles its own
 * fade-in first, then kicks off the spin. Splitting into a component
 * lets us use a single `animate` prop without conflicts.
 */
function RingLayer({
    fill,
    opacity,
    direction,
    duration,
}: {
    fill: string
    opacity: number
    direction: 1 | -1
    duration: number
}) {
    const [scope, animateEl] = useAnimate()

    useEffect(() => {
        const run = async () => {
            // Fade + scale in
            await animateEl(scope.current, {
                opacity: [0, opacity],
                scale: [0.8, 1],
            }, {
                duration: 0.45,
                ease: EASE_OUT_EXPO,
                delay: 0.28,
            })

            // Spin forever
            animateEl(scope.current, {
                rotate: [0, 360 * direction],
            }, {
                duration,
                repeat: Infinity,
                ease: 'linear',
            })
        }
        run()
    }, [])

    return (
        <path
            ref={scope}
            d={blueCirclePaths.circleOuterFill}
            fill={fill}
            opacity={0}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
    )
}

const BlueCircle: React.FC<BlueCircleProps> = ({ className = '' }) => {
    const orbitScope = useOrbitAnimation(0.42)

    return (
        <motion.div
            className={`h-8 aspect-square absolute ${className}`}
            initial={{ scale: 0, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={SPRING_POP}
        >
            {/* ── Entry flash ── */}
            <motion.div
                className="absolute inset-0 pointer-events-none z-10"
                initial={{ opacity: 0.6 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
                style={{
                    background:
                        'radial-gradient(circle, rgba(98,101,254,0.7) 0%, transparent 70%)',
                }}
            />

            <svg
                width="122"
                height="86"
                viewBox="0 0 122 86"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                overflow="visible"
            >
                <defs>
                    <clipPath id="clip0_46_1901_anim">
                        <rect
                            width="122"
                            height="85.6185"
                            fill="white"
                            transform="matrix(-1 0 0 -1 122 85.6185)"
                        />
                    </clipPath>
                </defs>

                <g clipPath="url(#clip0_46_1901_anim)">

                    {/* ── Background rect ── */}
                    <motion.path
                        d={blueCirclePaths.rectBottom}
                        fill="white"
                        fillOpacity="0.15"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    />

                    {/* ── Gray corner dot ── */}
                    <motion.path
                        d={blueCirclePaths.dotGray}
                        fill="#909090"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.16 }}
                    />

                    {/* ── Blue corner dot — blinks slowly on idle ── */}
                    <motion.path
                        d={blueCirclePaths.dotBlue}
                        fill="#6265FE"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 1, 1, 0.15, 1],
                        }}
                        transition={{
                            times: [0, 0.12, 0.5, 0.7, 1],
                            duration: 3.5,
                            delay: 0.2,
                            repeat: Infinity,
                            repeatDelay: 1.5,
                            ease: 'easeInOut',
                        }}
                    />

                    {/* ── Diagonal scan line — slow drift left/right ── */}
                    <motion.path
                        opacity="0.65"
                        d={blueCirclePaths.diagonalLine}
                        fill="#909090"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.65, 0.95, 0.65, 0.35, 0.65],
                            x: [0, 0, 4, 0, -4, 0],
                        }}
                        transition={{
                            times: [0, 0.1, 0.35, 0.6, 0.8, 1],
                            duration: 6,
                            delay: 0.3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />

                    {/*
                     * ── Outer rings ───────────────────────────────────────────────────
                     * Each RingLayer component handles its own fade-in then spins.
                     * Gray spins CW at 28s, blue spins CCW at 36s.
                     * They're slightly transparent so both are visible layered.
                     */}
                    <RingLayer fill="#909090" opacity={0.5} direction={1} duration={28} />
                    <RingLayer fill="#6265FE" opacity={0.6} direction={-1} duration={36} />

                    {/*
                     * ── Horizontal purple lines ───────────────────────────────────────
                     * Slide in from left, then alternate bright ↔ dark on a 1.8s cycle.
                     */}
                    <motion.path
                        d={blueCirclePaths.lineLeft}
                        initial={{ fill: '#6265FE', opacity: 0, x: -12 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            fill: ['#6265FE', '#2C2E8A', '#6265FE'],
                        }}
                        transition={{
                            opacity: { duration: 0.4, ease: EASE_OUT_EXPO, delay: 0.34 },
                            x: { duration: 0.4, ease: EASE_OUT_EXPO, delay: 0.34 },
                            fill: {
                                duration: 1.8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 1.0,
                                times: [0, 0.5, 1],
                            },
                        }}
                    />
                    <motion.path
                        d={blueCirclePaths.lineLeftFaded}
                        initial={{ fill: '#2C2E8A', opacity: 0, x: -12 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            fill: ['#2C2E8A', '#6265FE', '#2C2E8A'],
                        }}
                        transition={{
                            opacity: { duration: 0.4, ease: EASE_OUT_EXPO, delay: 0.38 },
                            x: { duration: 0.4, ease: EASE_OUT_EXPO, delay: 0.38 },
                            fill: {
                                duration: 1.8,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 1.0,
                                times: [0, 0.5, 1],
                            },
                        }}
                    />

                    {/*
                     * ── Orbital tick marks ────────────────────────────────────────────
                     * diagonalAccent1 (bottom-left) and diagonalAccent2 (top-right)
                     * are diametrically opposite on the circle edge.
                     *
                     * useOrbitAnimation sequences two phases via useAnimate:
                     *   Phase 1 — entry: 720° → 0° in 0.7s (fast spin-in)
                     *   Phase 2 — idle:  0° → 360° looping at 12s/rev (slow uniform)
                     *
                     * transformOrigin is set to the circle center so both ticks orbit
                     * the ring correctly rather than spinning around their own center.
                     */}
                    <g
                        ref={orbitScope}
                        opacity={0}
                        style={{ transformOrigin: `${CX}px ${CY}px` }}
                    >
                        <path
                            d={blueCirclePaths.diagonalAccent1}
                            fill="#909090"
                        />
                        <path
                            d={blueCirclePaths.diagonalAccent2}
                            fill="#909090"
                        />
                    </g>

                    {/* ── Center dot — pulse: gray → blue → white → blue → gray ── */}
                    <motion.path
                        d={blueCirclePaths.centerDot}
                        fill="#909090"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            fill: ['#909090', '#6265FE', '#ffffff', '#6265FE', '#909090'],
                        }}
                        transition={{
                            opacity: { duration: 0.3, delay: 0.5 },
                            scale: { duration: 0.45, ease: EASE_OUT_EXPO, delay: 0.5 },
                            fill: {
                                duration: 3.5,
                                repeat: Infinity,
                                repeatDelay: 0.5,
                                ease: 'easeInOut',
                                delay: 1.2,
                                times: [0, 0.25, 0.5, 0.75, 1],
                            },
                        }}
                        style={{ transformOrigin: `${CX}px ${CY}px` }}
                    />

                </g>
            </svg>
        </motion.div>
    )
}

export default BlueCircle