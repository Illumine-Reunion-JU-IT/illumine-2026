'use client'
import React from 'react'
import { smallCirclePaths } from '@/data/Paths/heroPaths'

type SmallCircleProps = {
    className?: string
    speedFactor?: number
}

const SmallCircle: React.FC<SmallCircleProps> = ({
    className = '',
    speedFactor = 1,
}) => {
    const duration = (3.5 / speedFactor).toFixed(2)
    const animName = `circleSpin${speedFactor.toString().replace('.', '_')}`

    return (
        <div
            className={`h-full aspect-square flex justify-center items-center ${className}`}
        >
            <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="scale-110"
            >
                <style>{`
                    @keyframes ${animName} {
                        from { transform: rotate(0deg); }
                        to   { transform: rotate(360deg); }
                    }
                    @keyframes segFade {
                        0%, 100% { opacity: 0.5; }
                        50%      { opacity: 0.28; }
                    }
                    .circle-group-${animName} {
                        animation:
                            ${animName} ${duration}s linear infinite,
                            segFade 2.8s ease-in-out infinite;
                    }
                `}</style>
                <g
                    className={`circle-group-${animName}`}
                    style={{ transformOrigin: '16px 16px' }}
                >
                    <path d={smallCirclePaths.top} fill="white" />
                    <path opacity="0.2" d={smallCirclePaths.right} fill="#909090" />
                    <path opacity="0.65" d={smallCirclePaths.bottom} fill="#909090" />
                </g>
            </svg>
        </div>
    )
}

export default SmallCircle
