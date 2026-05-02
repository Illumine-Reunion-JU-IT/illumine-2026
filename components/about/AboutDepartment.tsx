"use client";

import React from 'react';
import Image from 'next/image';
import BigCircle from '@/components/ui/BigCircle';
import Vector4 from '@/assets/coming_soon_svgs/svg/Vector4';
import Vector5 from '@/assets/coming_soon_svgs/svg/Vector5';
import Svg60_50 from '@/assets/coming_soon_svgs/svg/Svg60_50';
import Group95 from '@/assets/coming_soon_svgs/svg/Group95';
import Rectangle70 from '@/assets/coming_soon_svgs/svg/Rectangle70';
import DecryptedText from '@/components/ui/DecryptedText';

const Cross = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
    <div className={`absolute aspect-square opacity-60 ${className || ''}`} style={{ width: '1.25vw', ...style }}>
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/40 -translate-x-1/2"></div>
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/40 -translate-y-1/2"></div>
    </div>
);

export default function AboutDepartment() {
    return (
        <div className="relative w-full min-h-screen bg-black/40 backdrop-blur-md overflow-hidden flex flex-col items-center justify-center font-tt-lakes text-white py-24 select-none">
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

            <Cross style={{ top: '8%', left: '8%' }} />
            <Cross style={{ top: '12%', right: '10%' }} />
            <Cross style={{ bottom: '15%', left: '18%' }} />
            <Cross style={{ bottom: '10%', right: '25%' }} />
            <Cross style={{ top: '45%', right: '5%' }} />

            <h1 className="font-mechsuit text-2xl lg:text-2xl xl:text-[2.5vw] text-[#C4CCFF] drop-shadow-[0_0_12px_rgba(196,204,255,0.4)] tracking-widest z-10 mb-16 text-center">
                <DecryptedText
                    text="ABOUT THE DEPARTMENT"
                    animateOn="view"
                    speed={60}
                    sequential={true}
                    revealDirection="start"
                />

            </h1>

            <div className="relative w-[90vw] max-w-[1200px] h-auto min-h-[700px] lg:min-h-[600px] lg:h-[600px] mt-8 z-10">
                <div className="absolute -top-[15px] lg:-top-[20px] left-[10%] lg:left-[35%] w-[120px] lg:w-[180px] h-[15px] lg:h-[20px] bg-[#222] border border-[#444] border-b-0 skew-x-[40deg] opacity-80"></div>

                <div className="hidden lg:flex absolute -bottom-6 left-[25%] right-[35%] justify-between px-2 opacity-50">
                    {Array.from({ length: 45 }).map((_, i) => (
                        <div key={i} className={`w-[1px] h-${i % 5 === 0 ? '4' : '2'} bg-white`}></div>
                    ))}
                </div>

                <div className="hidden lg:flex absolute -left-[6rem] top-[50%] -rotate-90 origin-center items-center gap-3">
                    <div className="rotate-90 origin-center">
                        <Svg60_50 className="w-4 h-auto" />
                    </div>
                    <div className="w-20 h-[1px] bg-white/20 relative flex items-center">
                        <div className="w-[30%] h-[3px] bg-[#74fcbd] absolute left-0 shadow-[0_0_8px_#74fcbd]"></div>
                    </div>
                </div>

                <div className="hidden lg:block absolute bottom-[-70px] left-[-60px] z-30 pointer-events-none w-[395px] h-[277px] ">
                    <Vector4 />
                </div>

                <div className="hidden lg:block absolute top-[20px] right-[20px] z-30 pointer-events-none w-[112px] h-[12px] ">
                    <Vector5 />
                </div>

                <div className="hidden lg:block absolute -bottom-20 left-[20%] z-30 pointer-events-none w-[296px] h-[22px] ">
                    <Group95 />
                </div>

                <div className="hidden lg:block absolute top-[55%] -left-[10px] -translate-y-1/2 z-30 pointer-events-none w-[11px] h-[115px] ">
                    <Rectangle70 />
                </div>


                <div className="hidden lg:flex absolute -top-24 -left-20 w-[180px] h-[180px] z-20 mix-blend-screen opacity-90 items-center justify-center">
                    <BigCircle className='!w-[120%] !h-[120%] !relative' />
                </div>

                <div className="hidden lg:flex absolute -bottom-16 -right-16 w-[140px] h-[140px] z-20 mix-blend-screen opacity-50 items-center justify-center">
                    <BigCircle className="!w-[120%] !h-[120%] !relative" />
                </div>

                <div
                    className="w-full h-full min-h-[700px] lg:min-h-[600px] relative bg-black/60 flex flex-col lg:flex-row overflow-hidden z-10 [clip-path:polygon(40px_0,160px_0,180px_25px,100%_25px,100%_100%,40px_100%,0_calc(100%-30px),0_30px)] lg:[clip-path:polygon(80px_0,320px_0,350px_45px,100%_45px,100%_100%,80px_100%,0_calc(100%-55px),0_55px)]"
                >
                    <div className="relative w-full lg:w-[60%] h-[40%] lg:h-full shrink-0 z-20 bg-black">
                        <Image
                            src="/photos/Hero/hero.png"
                            alt="Jadavpur University IT Department"
                            fill
                            className="object-cover opacity-100 brightness-110 grayscale-[10%]"
                        />
                        <div className="absolute inset-0 bg-[#3a2a1a]/10 mix-blend-color-dodge pointer-events-none"></div>
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#111] to-transparent hidden lg:block"></div>
                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#111] to-transparent lg:hidden"></div>
                    </div>

                    <div className="relative w-full lg:w-[40%] h-[60%] lg:h-full p-6 lg:p-10 flex flex-col justify-center text-right z-30">
                        <div className="w-full max-w-[380px] ml-auto">

                            <div className="text-[#BEF3DF] text-[15px] mb-1 font-normal text-right">
                                <DecryptedText
                                    text="About our Department"
                                    animateOn="view"
                                    speed={40}
                                    sequential={true}
                                />
                            </div>

                            <p className="text-[#BEF3DF] text-[13px] lg:text-[14px] leading-[1.8] font-light text-right">
                                <DecryptedText
                                    text="Illumine is a biennial reunion event organized by the Department of Information Technology at Jadavpur University. Held every two years, this gathering brings together alumni, current students, and faculty members to celebrate the department's achievements and foster connections within the IT community. Illumine provides a unique platform for former students to reconnect with old friends and mentors, share their career experiences, and contribute to the ongoing development of the department. It also offers current students' valuable opportunities to gain insights from alumni, explore potential career paths, and engage with the broader IT professional community. With its focus on celebrating the department's legacy and future, Illumine is a significant and anticipated occasion for all involved. This time we intend to make the reunion even more special and grand since this year marks the Silver Jubilee of our department."
                                    animateOn="view"
                                    speed={12}
                                    maxIterations={15}
                                    sequential={false}
                                />
                            </p>
                        </div>
                    </div>
                </div>

                <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-30 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 600">

                    <path d="M 80,0 L 320,0 L 350,45 L 1000,45 L 1000,600 L 80,600 L 0,545 L 0,55 Z"
                        fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />

                    <path d="M 85,6 L 315,6" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    <path d="M 355,51 L 995,51" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <path d="M 6,60 L 6,540" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" vectorEffect="non-scaling-stroke" />

                    <polyline points="0,90 0,55 80,0 110,0" fill="none" stroke="rgba(182, 191, 255, 0.6)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                    <polyline points="1000,100 1000,45 960,45" fill="none" stroke="rgba(255, 255, 255, 0.4)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
                    <polyline points="0,510 0,545 80,600 110,600" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />

                    <path d="M 1000,150 L 1015,150 L 1015,450 L 1000,450"
                        fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <path d="M 0,250 L -15,250 L -15,400 L 0,400"
                        fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" vectorEffect="non-scaling-stroke" />

                    <path d="M 75,-5 L 85,5 M 75,5 L 85,-5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <path d="M 315,-5 L 325,5 M 315,5 L 325,-5" stroke="rgba(255,255,255,0.5)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                </svg>

            </div>
        </div>
    );
}