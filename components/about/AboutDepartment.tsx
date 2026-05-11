"use client";

import React from "react";
import Image from "next/image";
import BigCircle from "@/components/ui/BigCircle";
import Vector4 from "@/assets/coming_soon_svgs/svg/Vector4";
import Vector5 from "@/assets/coming_soon_svgs/svg/Vector5";
import Svg60_50 from "@/assets/coming_soon_svgs/svg/Svg60_50";
import Group95 from "@/assets/coming_soon_svgs/svg/Group95";
import Rectangle70 from "@/assets/coming_soon_svgs/svg/Rectangle70";
import DecryptedText from "@/components/ui/DecryptedText";

const Cross = ({
  style,
  className,
}: {
  style?: React.CSSProperties;
  className?: string;
}) => (
  <div
    className={`absolute aspect-square opacity-60 ${className || ""}`}
    style={{ width: "1.2vw", ...style }}
  >
    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/30 -translate-x-1/2"></div>
    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/30 -translate-y-1/2"></div>
  </div>
);

export default function AboutDepartment() {
  return (
    <div className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center font-tt-lakes text-white py-20">

      {/* subtle noise */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")',
        }}
      ></div>

      {/* crosses */}
      <Cross style={{ top: "8%", left: "8%" }} />
      <Cross style={{ top: "12%", right: "10%" }} />
      <Cross style={{ bottom: "15%", left: "18%" }} />
      <Cross style={{ bottom: "10%", right: "25%" }} />
      <Cross style={{ top: "45%", right: "5%" }} />

      {/* heading */}
      <h1 className="font-mechsuit text-xl lg:text-2xl xl:text-[2.3vw] text-[#C4CCFF] drop-shadow-[0_0_10px_rgba(196,204,255,0.4)] tracking-[0.2em] z-10 mb-14 text-center">
        <DecryptedText
          text="ABOUT THE DEPARTMENT"
          animateOn="view"
          speed={60}
          sequential
          revealDirection="start"
        />
      </h1>

      {/* main container */}
      <div className="relative w-[92vw] max-w-[1200px] min-h-[650px] lg:h-[600px] z-10">

        {/* top plate */}
        <div className="absolute -top-[18px] left-[30%] w-[160px] h-[18px] bg-[#222] border border-[#444] border-b-0 skew-x-[40deg] opacity-80"></div>

        {/* decorative svgs */}
        <div className="hidden lg:block absolute bottom-[-70px] left-[-60px] z-30 w-[395px] h-[277px] opacity-70">
          <Vector4 />
        </div>

        <div className="hidden lg:block absolute top-[20px] right-[20px] z-30 w-[112px] h-[12px] opacity-70">
          <Vector5 />
        </div>

        <div className="hidden lg:block absolute -bottom-20 left-[20%] z-30 w-[296px] h-[22px] opacity-70">
          <Group95 />
        </div>

        <div className="hidden lg:block absolute top-[55%] -left-[10px] -translate-y-1/2 z-30 w-[11px] h-[115px] opacity-70">
          <Rectangle70 />
        </div>

        {/* glowing circles */}
        <div className="hidden lg:flex absolute -top-20 -left-16 w-[160px] h-[160px] z-20 opacity-80">
          <BigCircle className="!w-full !h-full !relative" />
        </div>

        <div className="hidden lg:flex absolute -bottom-16 -right-16 w-[140px] h-[140px] z-20 opacity-50">
          <BigCircle className="!w-full !h-full !relative" />
        </div>

        {/* content box */}
        <div className="w-full h-full relative bg-black/80 flex flex-col lg:flex-row overflow-hidden z-10 
        [clip-path:polygon(60px_0,280px_0,320px_40px,100%_40px,100%_100%,60px_100%,0_calc(100%-50px),0_50px)]">

          {/* image */}
          <div className="relative w-full lg:w-[60%] h-[300px] lg:h-full bg-black">
            <Image
              src="/photos/Hero/hero.png"
              alt="Jadavpur University IT Department"
              fill
              className="object-cover brightness-110"
            />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent hidden lg:block"></div>
          </div>

          {/* text */}
          <div className="w-full lg:w-[40%] p-6 lg:p-10 flex flex-col justify-center text-right">

            <div className="text-[#BEF3DF] text-sm mb-2">
              <DecryptedText
                text="About our Department"
                animateOn="view"
                speed={40}
                sequential
              />
            </div>

            <p className="text-[#BEF3DF] text-[13px] lg:text-sm leading-relaxed font-light text-justify">
  <DecryptedText
    text="Illumine is a biennial reunion event organized by the Department of Information Technology at Jadavpur University. Held every two years, this gathering brings together alumni, current students, and faculty members to celebrate the department's achievements and foster connections within the IT community. Illumine provides a unique platform for former students to reconnect with old friends and mentors, share their career experiences, and contribute to the ongoing development of the department. It also offers current students' valuable opportunities to gain insights from alumni, explore potential career paths, and engage with the broader IT professional community. With its focus on celebrating the department's legacy and future, Illumine is a significant and anticipated occasion for all involved. This time we intend to make the reunion even more special and grand since this year marks the Silver Jubilee of our department"
    animateOn="view"
    speed={12}
    maxIterations={12}
  />
</p>

          </div>
        </div>
      </div>
    </div>
  );
}