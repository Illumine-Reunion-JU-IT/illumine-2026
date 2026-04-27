import React from 'react'
import Image from 'next/image'
import HeroBg from '@/public/photos/Hero/hero.png'
import { Oxanium } from 'next/font/google'
import {
    buttonClipPath,
    plusPathLines,
    smallCirclePaths,
    bigCirclePaths,
    blueCirclePaths,
    vtLinePaths,
} from '@/data/Paths/heroPaths'

const oxanium = Oxanium({
    subsets: ['latin'],
    weight: [
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
    ],
})

type PlusPathProps = {
    className?: string;
};

const PlusPath: React.FC<PlusPathProps> = ({ className = "" }) => {
    return (
        <div className={`absolute h-4 aspect-square  ${className}`}>
            <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <line
                    x1={plusPathLines.vertical.x1}
                    y1={plusPathLines.vertical.y1}
                    x2={plusPathLines.vertical.x2}
                    y2={plusPathLines.vertical.y2}
                    stroke="white"
                    strokeOpacity="0.4"
                />
                <line
                    y1={plusPathLines.horizontal.y1}
                    x2={plusPathLines.horizontal.x2}
                    y2={plusPathLines.horizontal.y2}
                    stroke="white"
                    strokeOpacity="0.4"
                />
            </svg>
        </div>
    );
};

const SmallCircle: React.FC<PlusPathProps> = ({ className = "" }) => {

    return (
        <div className={`h-full aspect-square flex justify-center items-center ${className}`}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='scale-110'>
                <g opacity="0.5">
                    <path d={smallCirclePaths.top} fill="white" />
                    <path opacity="0.2" d={smallCirclePaths.right} fill="#909090" />
                    <path opacity="0.65" d={smallCirclePaths.bottom} fill="#909090" />
                </g>
            </svg>

        </div>
    )
}

const BigCircle: React.FC<PlusPathProps> = ({ className = "" }) => {
    return (
        <div className={`h-12 aspect-square absolute ${className}`}>
            <svg width="146" height="155" viewBox="0 0 146 155" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                <g opacity="0.35">
                    <path d={bigCirclePaths.outerRing} fill="white" fillOpacity="0.15" />
                </g>
                <path d={bigCirclePaths.topArcAccent} fill="white" />
                <path d={bigCirclePaths.smallLineAccent} fill="white" fillOpacity="0.15" />
                <path d={bigCirclePaths.centerDot} fill="white" fillOpacity="0.4" />
                <g opacity="0.8">
                    <path d={bigCirclePaths.outerCircleStroke} fill="white" fillOpacity="0.15" />
                </g>
            </svg>

        </div>
    )
}

const BlueCircle: React.FC<PlusPathProps> = ({ className = "" }) => {
    return (
        <div className={`h-8 aspect-square absolute ${className}`}>
            <svg width="122" height="86" viewBox="0 0 122 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_46_1901)">
                    <path opacity="0.9" d={blueCirclePaths.rectBottom} fill="white" fillOpacity="0.15" />
                    <path d={blueCirclePaths.dotGray} fill="#909090" />
                    <path d={blueCirclePaths.dotBlue} fill="#6265FE" />
                    <g opacity="0.65">
                        <path opacity="0.65" d={blueCirclePaths.diagonalLine} fill="#909090" />
                    </g>
                    <g opacity="0.5">
                        <path opacity="0.5" d={blueCirclePaths.circleOuterFill} fill="#909090" />
                    </g>
                    <path d={blueCirclePaths.circleOuterFill} fill="#6265FE" />
                    <path d={blueCirclePaths.lineLeft} fill="#6265FE" />
                    <path opacity="0.45" d={blueCirclePaths.lineLeftFaded} fill="#6265FE" />
                    <path opacity="0.75" d={blueCirclePaths.diagonalAccent1} fill="#909090" />
                    <path opacity="0.75" d={blueCirclePaths.diagonalAccent2} fill="#909090" />
                    <path d={blueCirclePaths.centerDot} fill="#909090" />
                </g>
                <defs>
                    <clipPath id="clip0_46_1901">
                        <rect width="122" height="85.6185" fill="white" transform="matrix(-1 0 0 -1 122 85.6185)" />
                    </clipPath>
                </defs>
            </svg>

        </div>
    )
}

const VtLine: React.FC<PlusPathProps> = ({ className = "" }) => {
    return (
        <div className={`absolute ${className}`}>
            <svg width="15" height="468" viewBox="0 0 15 468" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.5">
                    <line x1={vtLinePaths.line.x1} y1={vtLinePaths.line.y1} x2={vtLinePaths.line.x2} stroke="white" />
                    <path d={vtLinePaths.arrow} fill="white" stroke="white" />
                </g>
            </svg>

        </div>
    )
}


const Hero: React.FC = () => {
    return (
        <div className='h-screen w-full relative flex flex-col justify-center items-center gap-4'>
            <Image
                src={HeroBg}
                alt="Hero Background"
                fill
                className='object-cover absolute inset-0'
            />
            <div className='relative z-10 text-[#B6BBFF] scale-75 sm:scale-100 lg:scale-150'>
                <svg width="437" height="32" viewBox="0 0 437 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M404.954 31.8979L412.929 23.9234H428.877V19.9362H416.916L424.89 11.9617H436.852V27.9107L432.865 31.8979H404.954ZM400.967 31.8979V23.5185V19.9362L420.903 0H432.865L400.967 31.8979Z" fill="currentColor" />
                    <path d="M361.904 31.8979L369.879 23.9234H397.789V31.8979H361.904ZM361.904 27.9107V19.5312V15.949L365.892 11.9617H377.853L361.904 27.9107ZM361.904 7.97448V5.17095V3.98724L365.892 0H389.815L381.84 7.97448H361.904ZM373.866 19.9362L381.84 11.9617H389.815V7.97448H385.828L393.802 0L397.789 3.98724V15.949L393.802 19.9362H373.866Z" fill="currentColor" />
                    <path d="M330.816 31.8979L338.791 23.9234H350.753V11.9617L358.727 3.98724V27.9107L354.74 31.8979H330.816ZM322.842 27.9107V11.1518V3.98724L326.829 0H350.753L342.778 7.97448H330.816V19.9362L322.842 27.9107ZM322.842 31.8979L354.74 0H358.727L326.829 31.8979H322.842Z" fill="currentColor" />
                    <path d="M283.779 31.8979L291.754 23.9234H319.665V31.8979H283.779ZM283.779 27.9107V19.5312V15.949L287.767 11.9617H299.728L283.779 27.9107ZM283.779 7.97448V5.17095V3.98724L287.767 0H311.69L303.716 7.97448H283.779ZM295.741 19.9362L303.716 11.9617H311.69V7.97448H307.703L315.677 0L319.665 3.98724V15.949L315.677 19.9362H295.741Z" fill="currentColor" />
                    <path d="M233.565 31.8979V29.0944V27.9107L245.527 15.949L233.565 3.98724V0H241.54L253.501 11.9617H265.463V19.9362H253.501L249.514 23.9234H265.463L269.45 27.9107V31.8979H233.565ZM253.501 7.97448L245.527 0H269.45V3.98724L265.463 7.97448H253.501Z" fill="currentColor" />
                    <path d="M194.503 31.8979V15.1391V7.97448L202.477 15.949V31.8979H194.503ZM222.413 31.8979L194.503 3.98724V1.18371V0H202.477L222.413 19.9362V0H230.388V31.8979H222.413Z" fill="currentColor" />
                    <path d="M183.351 31.8979V9.56315V0H191.325V31.8979H183.351Z" fill="currentColor" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M156.25 31.8979L128.339 3.98724V1.18371V0H136.314L164.224 27.9107V31.8979H156.25ZM161.867 21.9298L155.887 15.949L171.836 0H179.81V1.18371V3.98724L161.867 21.9298ZM179.81 15.1391V31.8979H171.836V15.949L179.81 7.97448V15.1391ZM128.339 15.1391V31.8979H136.314V15.949L128.339 7.97448V15.1391Z" fill="currentColor" />
                    <path d="M93.264 31.8979L89.2768 27.9107V8.37943V0H97.2513V23.9234H113.2L105.226 31.8979H93.264ZM109.213 31.8979L117.187 23.9234V0H125.162V27.9107L121.175 31.8979H109.213Z" fill="currentColor" />
                    <path d="M54.2015 31.8979L62.176 23.9234H82.1122L86.0995 27.9107V31.8979H54.2015ZM50.2143 31.8979V9.56315V0H58.1888V23.9234L50.2143 31.8979Z" fill="currentColor" />
                    <path d="M15.139 31.8979L23.1135 23.9234H43.0497L47.037 27.9107V31.8979H15.139ZM11.1518 31.8979V9.56315V0H19.1263V23.9234L11.1518 31.8979Z" fill="currentColor" />
                    <path d="M0 31.8979V9.56315V0H7.97448V31.8979H0Z" fill="currentColor" />
                </svg>
            </div>
            <h1 className={`${oxanium.className} text-[#B6BBFF] text-lg sm:text-2xl lg:text-4xl uppercase relative z-10 font-semibold text-center px-4`}>
                DEPARTMENT OF INFORMATION TECHNOLOGY
            </h1>
            <h1 className={`${oxanium.className} text-[#B6BBFF] text-xl sm:text-2xl lg:text-3xl uppercase relative z-10`}>
                time remaining
            </h1>
            <h1 className={`${oxanium.className} text-[#B6BBFF] text-2xl sm:text-4xl lg:text-5xl font-normal tracking-wide relative z-10`}>
                69 d 69 h 69 m 69 s
            </h1>

            {/* Buttons */}
            <div className='w-[60%] sm:w-[40%] lg:w-[27%] relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 sm:h-[8%]'>

                <button
                    className={`${oxanium.className} h-10 w-full sm:h-[80%] sm:w-[40%] bg-[#6265fe] text-white text-xs sm:text-sm border-none`}
                    style={{ clipPath: buttonClipPath }}
                >
                    EVENTS
                </button>

                <div
                    className="relative h-10 w-full sm:h-[80%] sm:w-[50%]"
                    style={{ clipPath: buttonClipPath }}
                >
                    <div className="absolute inset-0 border-4 border-white pointer-events-none" />
                    <button className={`${oxanium.className} w-full h-full bg-transparent text-white text-xs sm:text-sm`}>
                        MAGAZINE
                    </button>
                </div>

            </div>

            {/* Left terminal text — hidden on small screens */}
            <div className='hidden lg:block absolute h-[30%] w-[15%] left-4 top-[60%] text-[8px] text-[#BEF3DF] blur-[0.6px]'>
                <pre>{`> boot_illumine.exe\n\nINITIALIZING...\nILLUMINE 0x2K26\n\nNODE: IT DEPT // JADAVPUR UNIVERSITY\nEVENT: BIENNIAL REUNION\n\nFLAG: SILVER JUBILEE (25Y)\n\n...processing memories\n...compiling legacy\n...rendering future\n\n>> ACCESS GRANTED`}</pre>
            </div>

            {/* Right terminal text — hidden on small screens */}
            <div className='hidden lg:block absolute h-[40%] w-[15%] right-10 top-[30%] text-[8px] text-[#BEF3DF] text-right blur-[0.6px]'>
                <pre>{`TRMX CORE\nLAB\nVRS 03.44.77   SYS INIT\nSEC NODE 77AF91C2   AUTH: ROOT\n\nPROCESS : EXEC [98.7%]\n----------------------\n\nCFG RESET   ACT:B-9\nNET CHN     QNT:D-4\n\nMEM:67%   TEMP:34C   GPU:OK\n\nINPUT:READY   OUTPUT:READY\nERR:NONE\n\n----------------------\n                    END >>`}</pre>
            </div>
            <div className='w-full h-full inset-0 absolute'>
                <PlusPath className='top-[15%] left-[25%]' />
                <PlusPath className='top-[15%] left-[75%]' />
                <PlusPath className='top-[15%] right-[5%]' />
                <PlusPath className='bottom-[5%] left-[5%]' />
                <PlusPath className='bottom-[5%] left-[15%]' />

                <div className='h-[7%] w-[15%] absolute bottom-[5%] left-1/2 -translate-x-1/2 flex items-center justify-between'>
                    <SmallCircle />
                    <SmallCircle />
                    <SmallCircle />
                </div>

                {/* Decorative elements — hidden on small screens */}
                <BigCircle className='hidden lg:block right-[23%] top-[45%] scale-120' />
                <BigCircle className='hidden lg:block left-[20%] bottom-[30%] scale-80' />
                <BlueCircle className='hidden sm:block top-12 left-8' />
                <BlueCircle className='hidden sm:block bottom-8 right-8 rotate-180' />
                <VtLine className='hidden lg:block top-1/2 -translate-y-1/2 right-4 scale-y-110 mt-16' />
            </div>
        </div>


    )
}

export default Hero