"use client";

import React, { useRef, useState } from "react";
import ArcReactor from "@/components/arc-reactor";
import BigCircle from "@/components/ui/BigCircle";
import Plus from "@/components/ui/Plus";
import DecryptedText from "@/components/ui/DecryptedText";

const schedule = [
  {
    id: 1,
    title: "1) Inauguration",
    time: "10:00 a.m.",
    description:
      "The official start of Illumine 2026 with a grand opening ceremony.",
  },
  {
    id: 2,
    title: "2) Inaugural Speech",
    time: "10:30 a.m.",
    description: "An inspiring address to kick off the festivities.",
  },
  {
    id: 3,
    title: "3) Football Match",
    time: "11:30 a.m.",
    description:
      "An adrenaline-fueled clash on the field for the championship.",
  },
  {
    id: 4,
    title: "4) Lunch",
    time: "1:00 p.m.",
    description: "A well-deserved break with a grand feast for all attendees.",
  },
  {
    id: 5,
    title: "5) Cricket Match",
    time: "3:00 p.m.",
    description: "A thrilling cricket showdown between rival teams.",
  },
  {
    id: 6,
    title: "6) Student Performance",
    time: "5:00 p.m.",
    description: "Showcasing the incredible talent of our students on stage.",
  },
  {
    id: 7,
    title: "7) Senior Performance",
    time: "6:30 p.m.",
    description: "A special performance by the senior batch to remember.",
  },
  {
    id: 8,
    title: "8) Band Performance",
    time: "7:30 p.m.",
    description: "Live music to electrify the evening atmosphere.",
  },
  {
    id: 9,
    title: "9) DJ Night",
    time: "9:00 p.m.",
    description: "An electrifying DJ set to dance the night away.",
  },
  {
    id: 10,
    title: "10) Closing Ceremony",
    time: "10:00 p.m.",
    description: "The grand finale of Illumine 2026.",
  },
];

export default function EventsPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const SPACING = 35; // 🔥 tighter than before, balanced

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollTop = scrollRef.current.scrollTop;
    setActiveIndex(Math.round(scrollTop / SPACING));
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#070707] text-[#d9fff6] font-[Mechsuit]">
      {/* PLUS */}

      <Plus className="bottom-[150px] left-[600px]" />
      <Plus className="bottom-[150px] right-[400px]" />

      {/* TITLE */}
      <div>
        <h1 className="absolute right-[120px] top-[35px] text-[78px] tracking-[5px] text-[#b7b7ff]">
          <DecryptedText
            text="Events"
            animateOn="view"
            speed={120}
            sequential={true}
            revealDirection="start"
          />
        </h1>
        <Plus className="right-[500px] top-[160px]" />
        <Plus className="right-[120px] top-[160px]" />
      </div>

      {/* ARC REACTOR */}
      <div className="absolute left-[-100px] top-[42%] -translate-y-1/2 scale-[1.55]">
        <ArcReactor size={440} accentColor="purple" />
      </div>

      {/* SCROLL AREA */}
      <div className="absolute left-[-80px] top-[60px] h-[760px] w-[1550px] overflow-hidden">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="scrollbar-hide absolute inset-0 overflow-y-scroll"
        >
          <div className="h-[240px]" />

          <div className="relative h-[2400px]">
            {schedule.map((event, index) => {
              const radius = 820;

              const step = index - activeIndex;

              const maxAngle = 1.25;
              const angle = step * 0.28;

              const clampedAngle = Math.max(
                -maxAngle,
                Math.min(maxAngle, angle),
              );

              const x = radius * Math.cos(clampedAngle);
              const y = radius * Math.sin(clampedAngle);

              const topBase = index * SPACING;

              // 🔥 balanced positioning (NOT too left)
              const leftPosition = -200 + x * 0.95;

              const topPosition = topBase + y * 0.35;

              const distance = Math.abs(step);

              const opacity =
                distance === 0
                  ? 1
                  : distance === 1
                    ? 0.5
                    : distance === 2
                      ? 0.25
                      : 0.08;

              const scale = distance === 0 ? 1.05 : distance === 1 ? 0.9 : 0.8;

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-700 ease-out"
                  style={{
                    left: `${leftPosition}px`,
                    top: `${topPosition}px`,
                    transform: `scale(${scale})`,
                    opacity,
                    filter: distance > 1 ? "blur(1px)" : "blur(0px)",
                  }}
                >
                  <EventCard
                    text={`${event.title} – ${event.time}`}
                    active={distance === 0}
                  />
                </div>
              );
            })}
          </div>

          <div className="h-[900px]" />
        </div>
      </div>

      {/* BIG CIRCLE */}
      <div className="absolute right-[240px] top-3/7 h-[88px] w-[88px] -translate-y-1/2 opacity-100">
        <BigCircle />
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

function EventCard({ text, active }: { text: string; active: boolean }) {
  return (
    <div className="relative flex h-[64px] items-center whitespace-nowrap px-[42px] text-[28px] tracking-[2px] text-[#BEF3DF] font-bold font-['TT_Lakes_Neue_Trial'] ">
      <div
        className="absolute inset-0"
        style={{
          clipPath:
            "polygon(10% 0%, 100% 0%, 100% 45%, 90% 100%, 0% 100%, 0% 45%)",
          background: active ? "#9d98e8" : "#5c5c7dff",
        }}
      />

      <span className="relative z-10">
        <DecryptedText
          text={text}
          animateOn="view"
          speed={60}
          sequential={true}
          revealDirection="start"
        />
      </span>
    </div>
  );
}
