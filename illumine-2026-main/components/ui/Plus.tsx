'use client'
import React from 'react'
import { plusPathLines } from '@/data/Paths/heroPaths'

type PlusProps = {
    className?: string
    delay?: number
}

const Plus: React.FC<PlusProps> = ({ className = '', delay = 0 }) => {
    return (
        <div className={`absolute h-4 aspect-square ${className}`}>
            <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <style>{`
                    @keyframes plusGlitchIn {
                        0%   { opacity: 0; }
                        10%  { opacity: 0.4; }
                        15%  { opacity: 0; }
                        25%  { opacity: 0.35; }
                        30%  { opacity: 0; }
                        45%  { opacity: 0.4; }
                        100% { opacity: 0.4; }
                    }
                    @keyframes plusBlink {
                        0%, 100% { opacity: 0.4; }
                        50%      { opacity: 0.12; }
                    }
                    .plus-glitch {
                        opacity: 0;
                        animation:
                            plusGlitchIn 0.6s ease-out ${delay}s forwards,
                            plusBlink 3.5s ease-in-out ${delay + 0.6}s infinite;
                    }
                `}</style>
                <line
                    className="plus-glitch"
                    x1={plusPathLines.vertical.x1}
                    y1={plusPathLines.vertical.y1}
                    x2={plusPathLines.vertical.x2}
                    y2={plusPathLines.vertical.y2}
                    stroke="white"
                    strokeOpacity="1"
                />
                <line
                    className="plus-glitch"
                    y1={plusPathLines.horizontal.y1}
                    x2={plusPathLines.horizontal.x2}
                    y2={plusPathLines.horizontal.y2}
                    stroke="white"
                    strokeOpacity="1"
                    style={{ animationDelay: `${delay + 0.08}s` }}
                />
            </svg>
        </div>
    )
}

export default Plus
