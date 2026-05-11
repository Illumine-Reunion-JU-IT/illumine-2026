'use client'
import { useEffect, useRef, useState } from 'react'

const paths = [
    "M0 31.8979V9.56315V0H7.97448V31.8979H0Z",
    "M15.139 31.8979L23.1135 23.9234H43.0497L47.037 27.9107V31.8979H15.139ZM11.1518 31.8979V9.56315V0H19.1263V23.9234L11.1518 31.8979Z",
    "M54.2015 31.8979L62.176 23.9234H82.1122L86.0995 27.9107V31.8979H54.2015ZM50.2143 31.8979V9.56315V0H58.1888V23.9234L50.2143 31.8979Z",
    "M93.264 31.8979L89.2768 27.9107V8.37943V0H97.2513V23.9234H113.2L105.226 31.8979H93.264ZM109.213 31.8979L117.187 23.9234V0H125.162V27.9107L121.175 31.8979H109.213Z",
    "M156.25 31.8979L128.339 3.98724V1.18371V0H136.314L164.224 27.9107V31.8979H156.25ZM161.867 21.9298L155.887 15.949L171.836 0H179.81V1.18371V3.98724L161.867 21.9298ZM179.81 15.1391V31.8979H171.836V15.949L179.81 7.97448V15.1391ZM128.339 15.1391V31.8979H136.314V15.949L128.339 7.97448V15.1391Z",
    "M183.351 31.8979V9.56315V0H191.325V31.8979H183.351Z",
    "M194.503 31.8979V15.1391V7.97448L202.477 15.949V31.8979H194.503ZM222.413 31.8979L194.503 3.98724V1.18371V0H202.477L222.413 19.9362V0H230.388V31.8979H222.413Z",
    "M233.565 31.8979V29.0944V27.9107L245.527 15.949L233.565 3.98724V0H241.54L253.501 11.9617H265.463V19.9362H253.501L249.514 23.9234H265.463L269.45 27.9107V31.8979H233.565ZM253.501 7.97448L245.527 0H269.45V3.98724L265.463 7.97448H253.501Z",
    "M283.779 31.8979L291.754 23.9234H319.665V31.8979H283.779ZM283.779 27.9107V19.5312V15.949L287.767 11.9617H299.728L283.779 27.9107ZM283.779 7.97448V5.17095V3.98724L287.767 0H311.69L303.716 7.97448H283.779ZM295.741 19.9362L303.716 11.9617H311.69V7.97448H307.703L315.677 0L319.665 3.98724V15.949L315.677 19.9362H295.741Z",
    "M322.842 27.9107V11.1518V3.98724L326.829 0H350.753L342.778 7.97448H330.816V19.9362L322.842 27.9107ZM322.842 31.8979L354.74 0H358.727L326.829 31.8979H322.842ZM330.816 31.8979L338.791 23.9234H350.753V11.9617L358.727 3.98724V27.9107L354.74 31.8979H330.816Z",
    "M361.904 31.8979L369.879 23.9234H397.789V31.8979H361.904ZM361.904 27.9107V19.5312V15.949L365.892 11.9617H377.853L361.904 27.9107ZM361.904 7.97448V5.17095V3.98724L365.892 0H389.815L381.84 7.97448H361.904ZM373.866 19.9362L381.84 11.9617H389.815V7.97448H385.828L393.802 0L397.789 3.98724V15.949L393.802 19.9362H373.866Z",
    "M404.954 31.8979L412.929 23.9234H428.877V19.9362H416.916L424.89 11.9617H436.852V27.9107L432.865 31.8979H404.954ZM400.967 31.8979V23.5185V19.9362L420.903 0H432.865L400.967 31.8979Z",
]

const GlitchLogo: React.FC<{ className?: string }> = ({ className = "" }) => {
    const [visibleCount, setVisibleCount] = useState(0)
    const [glitching, setGlitching] = useState<boolean[]>(new Array(paths.length).fill(false))
    const hasAnimated = useRef(false)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true
                    animatePaths()
                }
            },
            { threshold: 0.3 }
        )
        if (containerRef.current) observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [])

    const animatePaths = () => {
        paths.forEach((_, i) => {
            // each letter glitches in with a small random flicker window
            const baseDelay = i * 80
            const flickerCount = 2 + Math.floor(Math.random() * 3)

            // flicker on/off before final reveal
            for (let f = 0; f < flickerCount; f++) {
                const flickerDelay = baseDelay + f * 60

                setTimeout(() => {
                    setGlitching(prev => {
                        const next = [...prev]
                        next[i] = true
                        return next
                    })
                    setVisibleCount(prev => Math.max(prev, i))
                }, flickerDelay)

                setTimeout(() => {
                    setGlitching(prev => {
                        const next = [...prev]
                        next[i] = false
                        return next
                    })
                }, flickerDelay + 40)
            }

            // final stable reveal
            setTimeout(() => {
                setVisibleCount(prev => Math.max(prev, i + 1))
                setGlitching(prev => {
                    const next = [...prev]
                    next[i] = false
                    return next
                })
            }, baseDelay + flickerCount * 60 + 60)
        })
    }

    return (
        <div ref={containerRef} className={`relative z-10 text-[#B6BBFF] scale-75 sm:scale-100 lg:scale-150 ${className}`}>
            <style>{`
                @keyframes pathGlitch {
                    0%   { opacity: 1;   clip-path: inset(0 0 80% 0); }
                    20%  { opacity: 0.6; clip-path: inset(40% 0 20% 0); }
                    40%  { opacity: 1;   clip-path: inset(10% 0 50% 0); }
                    60%  { opacity: 0.8; clip-path: inset(0 0 30% 0); }
                    80%  { opacity: 1;   clip-path: inset(20% 0 0 0); }
                    100% { opacity: 1;   clip-path: inset(0 0 0 0); }
                }
                @keyframes pathFlicker {
                    0%,100% { opacity: 1; }
                    50%     { opacity: 0.3; }
                }
                .path-glitch   { animation: pathGlitch  0.25s steps(1) forwards; }
                .path-flicker  { animation: pathFlicker 0.08s steps(1) infinite; }
                .path-stable   { opacity: 1; transition: opacity 0.1s; }
                .path-hidden   { opacity: 0; }
            `}</style>
            <svg
                width="437"
                height="32"
                viewBox="0 0 437 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {paths.map((d, i) => {
                    const isVisible = i < visibleCount
                    const isGlitch = glitching[i]
                    const isCurrent = i === visibleCount

                    let cls = 'path-hidden'
                    if (isGlitch) cls = 'path-flicker'
                    else if (isCurrent) cls = 'path-glitch'
                    else if (isVisible) cls = 'path-stable'

                    return (
                        <path
                            key={i}
                            d={d}
                            fill="currentColor"
                            className={cls}
                            fillRule={i === 4 ? 'evenodd' : undefined}
                            clipRule={i === 4 ? 'evenodd' : undefined}
                        />
                    )
                })}
            </svg>
        </div>
    )
}

export default GlitchLogo