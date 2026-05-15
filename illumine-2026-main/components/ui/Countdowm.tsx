'use client'
import { useState, useEffect } from 'react'
import { Oxanium } from 'next/font/google'

const oxanium = Oxanium({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'],
})

type TimeUnit = {
    value: number
    label: string
}

function getTimeRemaining() {
    // Explicit UTC midnight to avoid timezone shifting the date
    const target = new Date(Date.UTC(2026, 11, 22, 0, 0, 0)) // month is 0-indexed: 11 = December
    const now = new Date()
    const diff = target.getTime() - now.getTime()

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    }
}
function pad(n: number) {
    return String(n).padStart(2, '0')
}

type DigitProps = {
    value: string
    prevValue: string
}

const FlipDigit: React.FC<DigitProps> = ({ value, prevValue }) => {
    const [flipping, setFlipping] = useState(false)

    useEffect(() => {
        if (value !== prevValue) {
            setFlipping(true)
            const t = setTimeout(() => setFlipping(false), 400)
            return () => clearTimeout(t)
        }
    }, [value, prevValue])

    return (
        <span className="relative inline-block">
            <style>{`
                @keyframes digitFlip {
                    0%   { opacity: 1; transform: translateY(0);      }
                    40%  { opacity: 0; transform: translateY(-6px);   }
                    60%  { opacity: 0; transform: translateY(6px);    }
                    100% { opacity: 1; transform: translateY(0);      }
                }
                @keyframes digitGlitch {
                    0%   { clip-path: inset(0 0 100% 0); opacity: 0; }
                    15%  { clip-path: inset(60% 0 0 0);  opacity: 1; }
                    30%  { clip-path: inset(0 0 40% 0);  opacity: 1; }
                    50%  { clip-path: inset(20% 0 20% 0);opacity: 1; }
                    70%  { clip-path: inset(0 0 0 0);    opacity: 0.6;}
                    100% { clip-path: inset(0 0 0 0);    opacity: 1; }
                }
                .digit-flip  { animation: digitFlip  0.4s ease-in-out; }
                .digit-glitch{ animation: digitGlitch 0.4s ease-in-out; }
            `}</style>
            <span className={flipping ? 'digit-flip' : ''}>
                {value}
            </span>
            {flipping && (
                <span className="absolute inset-0 digit-glitch text-[#6265fe]">
                    {value}
                </span>
            )}
        </span>
    )
}

type SegmentProps = {
    current: number
    prev: number
    label: string
}

const TimeSegment: React.FC<SegmentProps> = ({ current, prev, label }) => {
    const curStr = pad(current)
    const prevStr = pad(prev)

    return (
        <div className="flex flex-col items-center scale-90">
            <div className={`
                ${oxanium.className}
                text-[#B6BBFF]
                text-2xl sm:text-4xl lg:text-5xl
                font-normal tracking-tighter
                tabular-nums
                flex items-baseline gap-[2px]
            `}>
                {curStr.split('').map((digit, i) => (
                    <FlipDigit
                        key={i}
                        value={digit}
                        prevValue={prevStr[i] || '0'}
                    />
                ))}
                <span className={`${oxanium.className} text-2xl sm:text-4xl lg:text-5xl font-normal text-[#B6BBFF]`}>
                    {label[0]}
                </span>
            </div>
        </div>
    )
}


const Countdown: React.FC = () => {
    const [time, setTime] = useState(getTimeRemaining())
    const [prev, setPrev] = useState(getTimeRemaining())
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        // Set initial values fresh on client
        const initial = getTimeRemaining()
        setTime(initial)
        setPrev(initial)

        const interval = setInterval(() => {
            // Use functional updates to avoid stale closure —
            // prev always gets the value time HAD before this tick
            setTime(current => {
                setPrev(current)
                return getTimeRemaining()
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    if (!mounted) {
        return (
            <div className={`
                ${oxanium.className}
                text-[#B6BBFF]
                text-2xl sm:text-4xl lg:text-5xl
                font-normal tracking-tighter
            `}>
                -- d -- h -- m -- s
            </div>
        )
    }

    return (
        <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
            <TimeSegment current={time.days} prev={prev.days} label="days" />

            <TimeSegment current={time.hours} prev={prev.hours} label="hours" />

            <TimeSegment current={time.minutes} prev={prev.minutes} label="minutes" />

            <TimeSegment current={time.seconds} prev={prev.seconds} label="seconds" />
        </div>
    )
}

export default Countdown