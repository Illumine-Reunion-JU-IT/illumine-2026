"use client";

import React, { useState, useEffect } from "react";
import ArcReactor from "@/components/arc-reactor";
import BigCircle from "@/components/ui/BigCircle";
import Plus from "@/components/ui/Plus";
import DecryptedText from "@/components/ui/DecryptedText";

const schedule = [
  { id: 1, title: "1) Inauguration", time: "10:00 a.m.", description: "The official start of Illumine 2026 with a grand opening ceremony." },
  { id: 2, title: "2) Inaugural Speech", time: "10:30 a.m.", description: "An inspiring address to kick off the festivities." },
  { id: 3, title: "3) Football Match", time: "11:30 a.m.", description: "An adrenaline-fueled clash on the field for the championship." },
  { id: 4, title: "4) Lunch", time: "1:00 p.m.", description: "A well-deserved break with a grand feast for all attendees." },
  { id: 5, title: "5) Cricket Match", time: "3:00 p.m.", description: "A thrilling cricket showdown between rival teams." },
  { id: 6, title: "6) Student Performance", time: "5:00 p.m.", description: "Showcasing the incredible talent of our students on stage." },
  { id: 7, title: "7) Senior Performance", time: "6:30 p.m.", description: "A special performance by the senior batch to remember." },
  { id: 8, title: "8) Band Performance", time: "7:30 p.m.", description: "Live music to electrify the evening atmosphere." },
  { id: 9, title: "9) DJ Night", time: "9:00 p.m.", description: "An electrifying DJ set to dance the night away." },
  { id: 10, title: "10) Closing Ceremony", time: "10:00 p.m.", description: "The grand finale of Illumine 2026." },
];

export default function EventsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % schedule.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#070707] text-[#d9fff6] font-[Mechsuit]">
      {/* BACKGROUND DECORATIVE ACCENTS */}
      <Plus className="absolute bottom-[10%] left-[45%] hidden md:block" />
      <Plus className="absolute bottom-[15%] right-[20%] hidden md:block" />

      {/* HEADER TITLE */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[20px] md:left-auto md:translate-x-0 md:right-[120px] md:top-[35px] z-20 text-center md:text-right w-full md:w-auto">
        <h1 className="text-[36px] sm:text-[54px] md:text-[78px] tracking-[3px] md:tracking-[5px] text-[#b7b7ff] inline-block">
          <DecryptedText
            text="Events"
            animateOn="view"
            speed={120}
            sequential={true}
            revealDirection="start"
          />
        </h1>
        <Plus className="absolute -left-12 top-1/2 -translate-y-1/2 hidden md:block" />
      </div>

      {/* ARC REACTOR */}
      {/* Mobile: Fully visible & small inside container, centered below title. Desktop: Fully shifted out of the left wall edge. */}
      <div className="absolute left-1/2 top-[90px] -translate-x-1/2 scale-[0.55] sm:scale-[0.7] md:left-[60px] md:top-[50%] md:-translate-y-1/2 md:translate-x-0 md:scale-[1.1] transition-all duration-500 z-10">
        <ArcReactor size={400} accentColor="purple" />
      </div>

      {/* VISUAL RADIAL LIST VIEWPORT */}
      <div className="absolute left-0 top-0 h-full w-full pointer-events-none overflow-hidden z-10">
        {schedule.map((event, index) => {
          const step = index - activeIndex;
          const distance = Math.abs(step);

          if (distance > 3 && !isMobile) return null;
          if (distance > 2 && isMobile) return null;

          // Adjusted radial setups to complement the fully visible reactor positions
          const radius = isMobile ? 320 : 720; 
          const angleMultiplier = isMobile ? 0.38 : 0.22;
          const angle = step * angleMultiplier;

          const maxAngle = 1.4;
          const clampedAngle = Math.max(-maxAngle, Math.min(maxAngle, angle));

          let leftPosition = 0;
          let topPosition = 0;

          if (isMobile) {
            // Mobile: Arcing cards under the now lower, fully visible top-centered reactor wheel
            const x = radius * Math.sin(clampedAngle);
            const y = radius * Math.cos(clampedAngle);
            
            leftPosition = dimensions.width / 2 + x - 130; 
            topPosition = 110 + y; // Moved down to elegantly clear the smaller reactor scale safely
          } else {
            // Desktop/Laptop: Tied to the curve of the reactor which sits at left-[60px] 
            const x = radius * Math.cos(clampedAngle);
            const y = radius * Math.sin(clampedAngle);

            // shift x starting point outward to seamlessly follow the newly centered reactor's frame path
            leftPosition = -20 + x * 0.95;
            topPosition = (dimensions.height * 0.5) + y - 32;
          }

          const opacity =
            distance === 0
              ? 1
              : distance === 1
                ? 0.45
                : 0.12;

          const scale = distance === 0 ? 1 : distance === 1 ? 0.82 : 0.68;

          return (
            <div
              key={event.id}
              onClick={() => setActiveIndex(index)}
              className="absolute transition-all duration-700 ease-out pointer-events-auto cursor-pointer"
              style={{
                left: `${leftPosition}px`,
                top: `${topPosition}px`,
                transform: `scale(${scale})`,
                opacity,
                filter: distance > 0 ? "blur(1.5px)" : "blur(0px)",
                zIndex: 10 - distance,
              }}
            >
              <EventCard
                text={`${event.title} – ${event.time}`}
                active={distance === 0}
                isMobile={isMobile}
              />
            </div>
          );
        })}
      </div>

      {/* HUD DECORATIVE CIRCLE AND NAV CONTROLS */}
      <div className="absolute right-6 bottom-6 md:right-[240px] md:top-1/2 md:-translate-y-1/2 flex flex-col items-center gap-4 z-20">
        <div className="h-[56px] w-[56px] md:h-[88px] md:w-[88px] opacity-60 md:opacity-100 relative">
          <BigCircle />
        </div>
        
        {/* Futuristic cyberpunk button controls */}
        <div className="flex gap-2 pointer-events-auto">
          <button 
            onClick={() => setActiveIndex((prev) => (prev === 0 ? schedule.length - 1 : prev - 1))}
            className="w-10 h-10 border border-[#6265fe]/40 hover:border-[#bef3df] bg-black/60 text-[#bef3df] hover:text-white flex items-center justify-center font-bold font-mono transition-all duration-300 cursor-pointer select-none [clip-path:polygon(20%_0,100%_0,100%_80%,80%_100%,0_100%,0_20%)] shadow-[0_0_10px_rgba(98,101,254,0.1)] hover:shadow-[0_0_15px_rgba(190,243,223,0.3)] text-sm active:scale-90"
            aria-label="Previous Event"
          >
            ▲
          </button>
          <button 
            onClick={() => setActiveIndex((prev) => (prev === schedule.length - 1 ? 0 : prev + 1))}
            className="w-10 h-10 border border-[#6265fe]/40 hover:border-[#bef3df] bg-black/60 text-[#bef3df] hover:text-white flex items-center justify-center font-bold font-mono transition-all duration-300 cursor-pointer select-none [clip-path:polygon(20%_0,100%_0,100%_80%,80%_100%,0_100%,0_20%)] shadow-[0_0_10px_rgba(98,101,254,0.1)] hover:shadow-[0_0_15px_rgba(190,243,223,0.3)] text-sm active:scale-90"
            aria-label="Next Event"
          >
            ▼
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}

/* ---------------- EVENT CARD ---------------- */

function EventCard({ text, active, isMobile }: { text: string; active: boolean; isMobile: boolean }) {
  return (
    <div 
      className={`relative flex items-center whitespace-nowrap px-6 md:px-[42px] font-bold font-['TT_Lakes_Neue_Trial'] transition-all duration-300
        ${isMobile ? "h-[44px] w-[260px] text-[13px] tracking-[1px]" : "h-[64px] text-[26px] tracking-[2px] text-[#BEF3DF]"}
      `}
    >
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          clipPath: "polygon(8% 0%, 100% 0%, 100% 50%, 92% 100%, 0% 100%, 0% 50%)",
          background: active ? "#9d98e8" : "#22223bbf",
          border: active ? "1px solid #b7b7ff" : "1px solid #3f3f5a",
        }}
      />

      <span className={`relative z-10 w-full text-center ${active ? "text-white" : "text-[#8a8aab]"}`}>
        {active ? (
          <DecryptedText
            text={text}
            animateOn="view"
            speed={40}
            sequential={true}
            revealDirection="start"
          />
        ) : (
          text
        )}
      </span>
    </div>
  );
}