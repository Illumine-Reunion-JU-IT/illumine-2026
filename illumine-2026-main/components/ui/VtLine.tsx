'use client'
import React from 'react'
import { vtLinePaths } from '@/data/Paths/heroPaths'

type VtLineProps = {
    className?: string
}

const VtLine: React.FC<VtLineProps> = ({ className = '' }) => {
    return (
        <div className={`absolute ${className}`}>
            <svg
                width="15"
                height="468"
                viewBox="0 0 15 468"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <style>{`
                    @keyframes lineDraw {
                        from { stroke-dashoffset: 454; }
                        to   { stroke-dashoffset: 0; }
                    }
                    @keyframes linePulse {
                        0%, 100% { opacity: 0.5; }
                        50%      { opacity: 0.15; }
                    }
                    .vt-line {
                        stroke-dasharray: 454;
                        stroke-dashoffset: 454;
                        animation:
                            lineDraw 1.4s cubic-bezier(0.4, 0, 0.2, 1) forwards,
                            linePulse 3s ease-in-out 1.4s infinite;
                    }
                    @keyframes arrowFadeIn {
                        from { opacity: 0; }
                        to   { opacity: 0.5; }
                    }
                    .vt-arrow {
                        opacity: 0;
                        animation: arrowFadeIn 0.3s ease-out 1.3s forwards;
                    }
                `}</style>
                <g>
                    <line
                        className="vt-line"
                        x1={vtLinePaths.line.x1}
                        y1={vtLinePaths.line.y1}
                        x2={vtLinePaths.line.x2}
                        y2="0"
                        stroke="white"
                    />
                    <path
                        className="vt-arrow"
                        d={vtLinePaths.arrow}
                        fill="white"
                        stroke="white"
                    />
                </g>
            </svg>
        </div>
    )
}

export default VtLine
