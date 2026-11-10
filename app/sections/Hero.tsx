'use client'
import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation' // <-- Added import
import HeroBg from '@/public/photos/Hero/hero.png'
import { buttonClipPath } from '@/data/Paths/heroPaths'
import DecryptedText from '@/components/ui/DecryptedText'

import BlueCircle from '@/components/ui/BlueCircle'
import BigCircle from '@/components/ui/BigCircle'
import Countdown from '@/components/ui/Countdowm'
import GlitchLogo from '@/components/ui/GlitchLogo'
import Plus from '@/components/ui/Plus'
import SmallCircle from '@/components/ui/SmallCircle'
import VtLine from '@/components/ui/VtLine'
import TerminalText from '@/components/ui/TerminalText'

const Hero: React.FC = () => {
    const router = useRouter()
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY, currentTarget } = e
        const { width, height, left, top } = currentTarget.getBoundingClientRect()
        const x = (clientX - left) / width - 0.5
        const y = (clientY - top) / height - 0.5
        setMousePos({ x, y })
    }

    return (
        <div 
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
            className='h-screen w-full relative flex flex-col justify-center items-center gap-3 sm:gap-4 bg-[#070707] overflow-hidden'
            style={{ perspective: '1200px' }}
        >
            <style>{`
                @keyframes orbitCW {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes orbitCCW {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(-360deg); }
                }
                @keyframes emblemFloatA {
                    0%, 100% {
                        transform: translateY(0px) translateZ(10px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-10px) translateZ(28px) rotate(2deg);
                    }
                }
                @keyframes emblemFloatB {
                    0%, 100% {
                        transform: translateY(0px) translateZ(10px) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-12px) translateZ(32px) rotate(-2deg);
                    }
                }
                @keyframes pulseRings {
                    0%, 100% {
                        opacity: 0.35;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.85;
                        transform: scale(1.08);
                    }
                }
                .emblem-stage {
                    transition: transform 0.25s cubic-bezier(0.2, 0, 0, 1);
                    transform-style: preserve-3d;
                }
            `}</style>

            <Image
                src={HeroBg}
                alt="Hero Background"
                fill
                priority
                className='object-cover absolute inset-0 opacity-80'
            />

            {/* DYNAMIC HOLOGRAPHIC LOGO DISPLAY — Interactive 3D Pop-Out & Floating Emblems */}
            <div 
                className="emblem-stage relative z-20 flex items-center justify-center gap-6 sm:gap-12 mb-1"
                style={{
                    transform: `rotateY(${mousePos.x * 16}deg) rotateX(${-mousePos.y * 16}deg)`,
                }}
            >
                {/* 1. Jadavpur University Emblem with Orbital Energy Ring */}
                <div className="relative group cursor-pointer flex flex-col items-center">
                    {/* Rotating cybernetic HUD ring */}
                    <div 
                        className="absolute -inset-3 sm:-inset-4 rounded-full border border-dashed border-[#BEF3DF]/30 pointer-events-none"
                        style={{ animation: 'orbitCW 14s linear infinite' }}
                    />
                    <div 
                        className="absolute -inset-1 sm:-inset-2 rounded-full border border-[#7B61FF]/40 pointer-events-none"
                        style={{ animation: 'orbitCCW 9s linear infinite' }}
                    />
                    {/* Ambient Neon Backglow */}
                    <div className="absolute inset-0 rounded-full bg-[#7B61FF]/20 blur-xl opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />
                    
                    {/* Floating & Pop-Out Crest */}
                    <div 
                        className="relative transform-gpu transition-all duration-500 ease-out group-hover:scale-125 group-hover:translate-z-10 group-hover:drop-shadow-[0_0_24px_rgba(182,187,255,0.95)]"
                        style={{ animation: 'emblemFloatA 4.2s ease-in-out infinite' }}
                    >
                        <img
                            src="/images/JULogoPNG.png"
                            alt="Jadavpur University Crest"
                            className="h-14 w-14 sm:h-20 sm:w-20 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                        />
                    </div>
                    {/* Mini HUD Badge */}
                    <span className="mt-2 text-[9px] tracking-[0.25em] text-[#B6BBFF]/70 uppercase font-mono opacity-80 group-hover:text-white group-hover:opacity-100 transition-colors">
                        JU // ESTD 1906
                    </span>
                </div>

                {/* Central Holographic Link Beam */}
                <div className="hidden sm:flex flex-col items-center justify-center opacity-60">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-[#BEF3DF] via-[#7B61FF] to-[#BEF3DF] shadow-[0_0_8px_#7B61FF]" />
                    <span className="text-[8px] font-mono text-[#BEF3DF] tracking-widest my-1 uppercase">25 YEARS</span>
                    <div className="w-12 h-[1px] bg-gradient-to-r from-[#BEF3DF] via-[#7B61FF] to-[#BEF3DF] shadow-[0_0_8px_#7B61FF]" />
                </div>

                {/* 2. Illumine 2026 Silver Jubilee Emblem with Orbital Energy Ring */}
                <div className="relative group cursor-pointer flex flex-col items-center">
                    {/* Rotating cybernetic HUD ring */}
                    <div 
                        className="absolute -inset-3 sm:-inset-4 rounded-full border border-dashed border-[#7B61FF]/30 pointer-events-none"
                        style={{ animation: 'orbitCCW 12s linear infinite' }}
                    />
                    <div 
                        className="absolute -inset-1 sm:-inset-2 rounded-full border border-[#BEF3DF]/40 pointer-events-none"
                        style={{ animation: 'orbitCW 8s linear infinite' }}
                    />
                    {/* Ambient Neon Backglow */}
                    <div className="absolute inset-0 rounded-full bg-[#BEF3DF]/20 blur-xl opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500 pointer-events-none" />

                    {/* Floating & Pop-Out Crest */}
                    <div 
                        className="relative transform-gpu transition-all duration-500 ease-out group-hover:scale-125 group-hover:translate-z-10 group-hover:drop-shadow-[0_0_24px_rgba(190,243,223,0.95)]"
                        style={{ animation: 'emblemFloatB 4.8s ease-in-out infinite' }}
                    >
                        <img
                            src="/images/logos/light-icon.svg"
                            alt="Illumine 2026 Silver Jubilee"
                            className="h-14 w-14 sm:h-20 sm:w-20 object-contain drop-shadow-[0_0_12px_rgba(190,243,223,0.6)]"
                        />
                    </div>
                    {/* Mini HUD Badge */}
                    <span className="mt-2 text-[9px] tracking-[0.25em] text-[#BEF3DF]/80 uppercase font-mono opacity-80 group-hover:text-white group-hover:opacity-100 transition-colors">
                        SILVER JUBILEE // 2026
                    </span>
                </div>
            </div>

            <GlitchLogo />
            <h1 className="font-tt-lakes font-[700] text-[#B6BBFF] text-lg sm:text-2xl lg:text-3xl uppercase relative z-10 text-center px-4">
                <DecryptedText text='DEPARTMENT OF INFORMATION TECHNOLOGY' animateOn='view' speed={100} />
            </h1>
            <h1 className="font-tt-lakes font-normal text-[#B6BBFF] text-xl sm:text-2xl lg:text-3xl uppercase relative z-10">
                <DecryptedText text='time remaining' animateOn='view' speed={150} />
            </h1>
            <Countdown />

            {/* Buttons */}
            <div className='w-[60%] sm:w-[40%] lg:w-[27%] relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 sm:h-[8%]'>

                <button
                    onClick={() => router.push('/events')} // <-- Added onClick
                    className="font-tt-lakes font-medium h-10 w-full sm:h-[80%] sm:w-[40%] bg-[#6265fe] text-white text-xs sm:text-sm border-none hover:bg-[#7b7efe] transition-colors cursor-pointer"
                    style={{ clipPath: buttonClipPath }}
                >
                    <DecryptedText text='EVENTS' animateOn='view' speed={250} />
                </button>

                <div
    className="relative h-10 w-full sm:h-[80%] sm:w-[50%]"
    style={{ clipPath: buttonClipPath }}
>
    <div className="absolute inset-0 border-4 border-white pointer-events-none" />
    <a 
        href="https://drive.google.com/file/d/1EWQH2PHl4hqjfktKXWtzI6ykDdpQu07s/view?usp=drive_link" 
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center font-tt-lakes font-medium w-full h-full bg-transparent text-white text-xs sm:text-sm hover:bg-white/10 transition-colors cursor-pointer"
    >
        <DecryptedText text='NEWSLETTER' animateOn='view' speed={250} />
    </a>
</div>
            </div>

            {/* Left terminal text */}
            <TerminalText
                text={`> boot_illumine.exe\n\nINITIALIZING...\nILLUMINE 0x2K26\n\nNODE: IT DEPT // JADAVPUR UNIVERSITY\nEVENT: BIENNIAL REUNION\n\nFLAG: SILVER JUBILEE (25Y)\n\n...processing memories\n...compiling legacy\n...rendering future\n\n>> ACCESS GRANTED`}
                className='h-[30%] w-[15%] left-22 top-[50%]'
                speed={450}
            />

            {/* Right terminal text */}
            <TerminalText
                text={`TRMX CORE\nLAB\nVRS 03.44.77   SYS INIT\nSEC NODE 77AF91C2   AUTH: ROOT\n\nPROCESS : EXEC [98.7%]\n----------------------\n\nCFG RESET   ACT:B-9\nNET CHN     QNT:D-4\n\nMEM:67%   TEMP:34C   GPU:OK\n\nINPUT:READY   OUTPUT:READY\nERR:NONE\n\n----------------------\n                    END >>`}
                className='h-[40%] w-[15%] right-22 top-[30%]'
                align="right"
                revealDirection="end"
                speed={500}
            />

            <div className='w-full h-full inset-0 absolute pointer-events-none'>
                <Plus className='top-[15%] left-[25%]' delay={0.2} />
                <Plus className='top-[15%] left-[75%]' delay={0.6} />
                <Plus className='top-[15%] right-[5%]' delay={1.0} />
                <Plus className='bottom-[5%] left-[5%]' delay={1.4} />
                <Plus className='bottom-[5%] left-[15%]' delay={1.8} />

                <div className='h-[7%] w-[15%] absolute bottom-[5%] left-1/2 -translate-x-1/2 flex items-center justify-between'>
                    <SmallCircle speedFactor={0.8} />
                    <SmallCircle className='rotate-180' speedFactor={1} />
                    <SmallCircle speedFactor={1.2} />
                </div>

                {/* Decorative elements — hidden on small screens */}
                <BigCircle className='hidden lg:block right-[23%] top-[45%] scale-120' />
                <BigCircle className='hidden lg:block left-[20%] bottom-[20%] scale-80 rotate-180' />
                <BlueCircle className='hidden sm:block top-12 left-22' />
                <BlueCircle className='hidden sm:block bottom-8 right-22 rotate-180' />
                <VtLine className='hidden lg:block top-1/2 -translate-y-1/2 right-8 mt-16' />
            </div>
        </div>
    )
}

export default Hero
