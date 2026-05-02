'use client'
import ArcReactor from '@/components/arc-reactor'
import Image from 'next/image'
import React from 'react'
import { useRef, useEffect } from 'react'
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
import { Title } from '@/data/Paths/GoodwillPaths'
import BigCircle from '@/components/ui/BigCircle'
import DecryptedText from '@/components/ui/DecryptedText'
import TerminalText from '@/components/ui/TerminalText'

type FramedImageProps = {
    imagePath: string
    alt?: string
    className?: string
}

const FramedImage: React.FC<FramedImageProps> = ({ imagePath, alt = "Professor", className = "" }) => {
    return (
        <div className={`relative w-[272px] h-[383px] ${className}`}>
            {/* 1. The Image Layer (Positioned behind the frame) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{
                    clipPath: 'polygon(0% 15%, 25% 5%, 85% 5%, 95% 15%, 95% 85%, 85% 95%, 15% 95%, 5% 85%)',
                    margin: '25px' // Adjust margin to fit perfectly inside your specific SVG paths
                }}
            >
                <Image
                    src={imagePath}
                    alt={alt}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
                {/* Subtle Scanline Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(190,243,223,0.1)_50%,transparent_50%)] bg-[length:100%_4px] pointer-events-none" />
            </div>

            {/* 2. The SVG Frame Layer */}
            <svg
                width="272"
                height="383"
                viewBox="0 0 272 383"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute inset-0 pointer-events-none"
            >
                <mask id="mask0_119_630" maskUnits="userSpaceOnUse" x="0" y="21" width="253" height="362">
                    <path d="M1.67378e-05 382.917L9.18178e-07 21.0055L252.643 21.0055L252.643 382.917L1.67378e-05 382.917Z" fill="white" />
                </mask>
                <g mask="url(#mask0_119_630)">
                    <path d="M252.465 21.1929L252.465 104.88L227.29 125.189L227.29 275.031L252.465 296.506L252.465 382.888L179.838 382.888L170.588 373.317L102.265 373.317L93.136 382.888L19.7854 382.888L1.59099e-05 363.946L1.24117e-05 283.919L21.1933 270.205L21.1933 60.7248L65.0264 21.1929L252.465 21.1929ZM250.936 104.277L250.936 22.5999L65.6295 22.6L22.7208 61.287L22.7209 270.888L1.52759 284.642L1.5276 363.424L20.4694 381.521L92.452 381.521L101.581 371.949L171.272 371.949L180.521 381.521L250.896 381.521L250.896 297.149L225.722 275.674L225.722 124.626L250.936 104.277Z" fill="#BEF3DF" />
                </g>
                <path d="M96.5945 382.888L104.395 375.046L168.94 375.046L176.861 382.888L96.5945 382.888Z" fill="#BEF3DF" />
                <path d="M251.7 360.408L269.234 353.089L269.234 276.961L245.386 259.347L245.386 109.505L226.526 124.867L226.526 275.272L251.741 297.069L251.7 360.408Z" fill="#BEF3DF" />
                <path d="M269.234 263.971L269.234 270.566L248.483 255.406L248.483 248.851L269.234 263.971Z" fill="#BEF3DF" />
                <path d="M269.234 251.303L269.234 257.858L248.483 242.738L248.483 236.183L269.234 251.303Z" fill="#BEF3DF" />
                <path d="M269.234 238.595L269.234 245.191L248.483 230.03L248.483 223.475L269.234 238.595Z" fill="#BEF3DF" />
                <path d="M269.234 225.927L269.234 232.482L248.483 217.362L248.483 210.807L269.234 225.927Z" fill="#BEF3DF" />
                <path d="M269.234 213.219L269.234 219.816L248.483 204.694L248.483 198.099L269.234 213.219Z" fill="#BEF3DF" />
                <path d="M269.234 200.552L269.234 207.107L248.483 191.986L248.483 185.431L269.234 200.552Z" fill="#BEF3DF" />
                <path d="M269.234 187.885L269.234 194.44L248.483 179.318L248.483 172.723L269.234 187.885Z" fill="#BEF3DF" />
                {/* Simplified mask rendering to ensure cross-browser compatibility */}
                <g opacity="1">
                    <path d="M165.079 21.8769L176.781 11.1393L211.646 11.1393L215.95 4.86571L263.282 4.86571L263.282 40.0944L271.566 46.6485L271.566 78.298L251.699 85.7779L251.699 21.8769L165.079 21.8769Z" fill="#BEF3DF" />
                </g>
                {/* Additional paths provided in the SVG snippet */}
                <path d="M19.1413 258.02L19.1413 264.132L1.67378e-05 276.68L1.64706e-05 270.567L19.1413 258.02Z" fill="#BEF3DF" />
                <path d="M19.1413 245.753L19.1413 251.906L1.67378e-05 264.413L1.64706e-05 258.301L19.1413 245.753Z" fill="#BEF3DF" />
                <path d="M19.1413 233.528L19.1413 239.641L1.67378e-05 252.188L1.64706e-05 246.075L19.1413 233.528Z" fill="#BEF3DF" />
                <path d="M21.9571 138.902L1.67378e-05 153.822L1.23151e-05 52.6411L48.6188 8.76603L90.1595 8.76603L97.9215 0.240486L131.862 0.240485L145.816 21.9164L65.1872 21.8764L21.9571 61.1256L21.9571 138.902Z" fill="#BEF3DF" />
            </svg>
        </div>
    )
}

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
            className="h-[80px] sm:h-[100px] md:h-[126px] w-auto scale-200"
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



const Goodwill: React.FC = () => {
    return (
        <div className='h-screen w-full bg-primary relative flex flex-col items-center justify-center gap-4 p-20'>
            <div className='absolute inset-0 w-full flex flex-col justify-center overflow-x-hidden opacity-70'>
                <ArcReactor className='self-end' />
                {/* vertical scale */}
                <div className=' h-[45%] ml-4 w-12 flex flex-col items-center justify-between absolute top-1/2 -translate-y-1/2'>
                    <VRuler />
                    <VRuler />
                </div>
            </div>
            <div className='w-full flex justify-center'>
                <svg width="732" height="39" viewBox="0 0 732 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d={Title} fill="#B6BBFF" />
                </svg>
            </div>

            <div className='w-[85%] h-[80%] flex'>
                <div className='h-full w-[15%] flex flex-col items-center justify-evenly'>
                    <div className='w-[40%] aspect-square rounded-full bg-red-500' />
                    <div className='w-[65%] aspect-square rounded-full bg-red-500 relative' >

                    </div>
                    <div className='w-[40%] aspect-square rounded-full bg-red-500' />
                    <div className='w-[40%] aspect-square rounded-full bg-red-500' />
                </div>
                <div className=' h-full w-[30%] bg-blue-500 flex flex-col items-center justify-center gap-4 p-4'>
                    <FramedImage imagePath='/photos/professors/faculty-vc.png' />
                </div>
                <div className='h-full w-[65%] p-8'>


                    <TerminalText className=' w-[40vw] text-xl ' text={`Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem reprehenderit saepe quia eveniet nobis veniam facilis recusandae unde sint alias, explicabo cumque cupiditate quos deleniti labore enim obcaecati ea dicta?
                    Aut assumenda voluptates deleniti, quos vitae consequuntur dolores eos eveniet eligendi. Est placeat optio ducimus vel eveniet ipsum enim aliquam, consequuntur, amet, officia aspernatur nobis voluptatum nostrum deserunt beatae molestias.
                    Non porro atque quas voluptates molestiae! Delectus, sequi repellendus aspernatur dolorem expedita mollitia tempore soluta in voluptates, error reprehenderit autem quae. Inventore dolores rerum cupiditate molestias ipsa at necessitatibus veniam?`} />
                </div>
            </div>





        </div>
    )
}

export default Goodwill