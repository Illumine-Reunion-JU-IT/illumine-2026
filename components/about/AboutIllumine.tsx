'use client';

import Image from 'next/image';
import { svgPaths } from '../../data/aboutilluminepaths';

export default function AboutIllumine() {
  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] overflow-hidden flex items-center justify-center p-2 md:p-6 font-mono">
      <div className="relative z-10 w-full max-w-7xl h-[92vh] md:h-[95vh] flex flex-col transition-all duration-500">
        <div className="w-full flex flex-col items-center shrink-0 mb-4">
          <div className="relative z-30 -mb-4 md:-mb-6">
            <div className="relative w-72 md:w-[520px] h-14 md:h-20">
              <Image
                src={svgPaths.aboutIllumine}
                alt="About Illumine"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          <img
            src={svgPaths.upperBorder}
            alt="HUD Top"
            className="w-full h-auto drop-shadow-[0_0_20px_rgba(165,180,252,0.5)]"
          />
        </div>

        <div className="relative grow w-full overflow-hidden flex items-center justify-center bg-black/40 border-x border-white/10">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80 grayscale-[0.1]"
          >
            <source src="/videos/hero.webm" type="video/webm" />
          </video>

          <div className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_1px_rgba(0,0,0,1)]" />
          <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,#0a0a0a_100%)]" />

          <div className="absolute inset-0 z-20 p-6 md:p-12 pointer-events-none">
            <div className="flex flex-col gap-1 opacity-100">
              <div className="flex items-baseline gap-4">
                <h2 className="text-xl md:text-3xl text-white font-black tracking-tighter drop-shadow-md">ILLUMINE 2026</h2>

                <div className="grid grid-cols-2 gap-x-6 gap-y-0.5 text-[9px] md:text-[11px] text-white font-bold">
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /><span>SPEC.37.74</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /><span>SPEC.37.74</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /><span>343 SA</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" /><span>343 SA</span></div>
                </div>
              </div>

              <p className="text-xs md:text-sm text-white font-bold tracking-widest mt-1">00:02:25</p>

              <div className="mt-4 w-48 md:w-64 h-8 md:h-10 border border-white/20 bg-white/5 relative overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-y-0 left-0 w-1/4 bg-white/30 animate-pulse" />
                <div className="absolute inset-0 flex items-center px-3">
                  <div className="w-8 h-full bg-white/40" />
                </div>
              </div>
            </div>

            <div className="absolute top-1/4 right-1/4 hidden md:block opacity-100">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 border border-indigo-400 rounded-full animate-ping" />
                <div className="absolute inset-0 border border-indigo-400/30 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full relative shrink-0 mt-4">
          <div className="absolute bottom-[160%] left-0 w-full px-8 md:px-20 flex flex-col md:flex-row items-end justify-between gap-10 pointer-events-none opacity-100">
            <div className="hidden md:flex flex-col space-y-2 text-[10px] text-indigo-300 font-bold pointer-events-auto">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_#6366f1]" />
                <span className="tracking-[0.4em] uppercase text-white drop-shadow-md">JU_IT_DEPT // SYNC_ACTIVE</span>
              </div>
            </div>

            <div className="max-w-2xl text-right pointer-events-auto">
              <h3 className="text-[11px] uppercase tracking-[0.7em] text-indigo-400 font-black mb-3 drop-shadow-lg">
                // DEPARTMENT_PROFILE
              </h3>
              <p className="text-[13px] md:text-[16px] leading-relaxed text-white font-medium text-justify md:text-right drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
                Illumine is a biennial reunion event organized by the <span className="text-indigo-300 font-bold">Department of Information Technology</span> at Jadavpur University.
                This session celebrates our <span className="text-indigo-400 font-extrabold">Silver Jubilee</span>, bridging generations of innovation.
              </p>
            </div>
          </div>

          <img
            src={svgPaths.lowerBorder}
            alt="HUD Bottom"
            className="w-full h-auto drop-shadow-[0_0_20px_rgba(165,180,252,0.5)]"
          />

          <div className="absolute left-6 bottom-[-15px] md:bottom-[-25px] w-14 h-14 md:w-20 md:h-20 opacity-50">
            <Image
              src={svgPaths.group101}
              alt="Decoration"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-12 text-[9px] uppercase tracking-[1em] text-white/20 select-none hidden md:block">
        CORE_SYS // ACCESS_GRANTED
      </div>
    </div>
  );
}
