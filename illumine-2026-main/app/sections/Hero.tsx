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
    const router = useRouter() // <-- Initialized router

    return (
        <div className='h-screen w-full relative flex flex-col justify-center items-center gap-4'>
            <Image
                src={HeroBg}
                alt="Hero Background"
                fill
                className='object-cover absolute inset-0'
            />
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
        href="https://drive.google.com/file/d/12Mm7dJbenzOH1eOHfEo-tZb07NLZ1k9N/view?usp=sharing" 
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
