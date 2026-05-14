"use client";

import { useState, useEffect } from "react";
import ArcReactor from "@/components/arc-reactor";
import BigCircle from "@/components/ui/BigCircle";
import Plus from "@/components/ui/Plus";
import DecryptedText from "@/components/ui/DecryptedText";
import styles from "./EventSection.module.css";

const EVENTS = [
  {
    id: 1,
    title: "Inauguration",
    time: "10:00 a.m.",
    description:
      "The official start of Illumine 2026 with a grand opening ceremony.",
  },
  {
    id: 2,
    title: "Inaugural Speech",
    time: "10:30 a.m.",
    description: "An inspiring address to kick off the festivities.",
  },
  {
    id: 3,
    title: "Football Match",
    time: "11:30 a.m.",
    description:
      "An adrenaline-fueled clash on the field for the championship.",
  },
  {
    id: 4,
    title: "Lunch",
    time: "1:00 p.m.",
    description: "A well-deserved break with a grand feast for all attendees.",
  },
  {
    id: 5,
    title: "Cricket Match",
    time: "3:00 p.m.",
    description: "A thrilling cricket showdown between rival teams.",
  },
  {
    id: 6,
    title: "Student Performance",
    time: "5:00 p.m.",
    description: "Showcasing the incredible talent of our students on stage.",
  },
  {
    id: 7,
    title: "Senior Performance",
    time: "6:30 p.m.",
    description: "A special performance by the senior batch to remember.",
  },
  {
    id: 8,
    title: "Band Performance",
    time: "7:30 p.m.",
    description: "Live music to electrify the evening atmosphere.",
  },
  {
    id: 9,
    title: "DJ Night",
    time: "9:00 p.m.",
    description: "An electrifying DJ set to dance the night away.",
  },
  {
    id: 10,
    title: "Closing Ceremony",
    time: "10:00 p.m.",
    description: "The grand finale of Illumine 2026.",
  },
];

const PARTICLES = [
  { left: "12%", top: "18%", size: 2, opacity: 0.25 },
  { left: "25%", top: "8%", size: 1.5, opacity: 0.2 },
  { left: "38%", top: "72%", size: 2.5, opacity: 0.15 },
  { left: "55%", top: "15%", size: 1.5, opacity: 0.3 },
  { left: "68%", top: "85%", size: 2, opacity: 0.2 },
  { left: "78%", top: "30%", size: 1.5, opacity: 0.15 },
  { left: "85%", top: "60%", size: 2, opacity: 0.25 },
  { left: "92%", top: "22%", size: 1.5, opacity: 0.2 },
  { left: "15%", top: "55%", size: 2, opacity: 0.18 },
  { left: "45%", top: "42%", size: 1.5, opacity: 0.22 },
  { left: "72%", top: "48%", size: 2, opacity: 0.12 },
  { left: "30%", top: "90%", size: 1.5, opacity: 0.2 },
  { left: "60%", top: "65%", size: 2.5, opacity: 0.15 },
  { left: "8%", top: "78%", size: 2, opacity: 0.2 },
  { left: "50%", top: "88%", size: 1.5, opacity: 0.18 },
];

function buildStack(activeId: number) {
  const activeEvent = EVENTS.find((e) => e.id === activeId)!;
  const activeLabel = `${activeEvent.id}) ${activeEvent.title} – ${activeEvent.time}`;

  const slots: {
    key: string;
    event: typeof activeEvent;
    label: string;
    scale: number;
    opacity: number;
    fontSize: number;
    translateX: number;
    translateY: number;
    isActive: boolean;
    bgOpacity: number;
  }[] = [];

  // Upper Cascade (Previous Events)
  for (let i = 3; i >= 1; i--) {
    const prevEventId = activeId - i;
    const eventToShow =
      EVENTS[(prevEventId - 1 + EVENTS.length) % EVENTS.length];
    const label = `${eventToShow.id}) ${eventToShow.title} – ${eventToShow.time}`;

    const scale = 0.86 - (i - 1) * 0.18;
    const opacity = 0.65 - i * 0.2;
    const fontSize = 20 - i * 3;
    const translateX = -40 - (i - 1) * 45;
    const translateY = -32 - (i - 1) * 36;

    slots.push({
      key: `above-${i}`,
      event: eventToShow,
      label,
      scale,
      opacity,
      fontSize,
      translateX,
      translateY,
      isActive: false,
      bgOpacity: 0.12,
    });
  }

  // Active Card (Center Anchor)
  slots.push({
    key: `active`,
    event: activeEvent,
    label: activeLabel,
    scale: 1,
    opacity: 1,
    fontSize: 28,
    translateX: 0,
    translateY: 0,
    isActive: true,
    bgOpacity: 0.6,
  });

  // Lower Cascade (Next Events)
  for (let i = 1; i <= 3; i++) {
    const nextEventId = activeId + i;
    const eventToShow =
      EVENTS[(nextEventId - 1 + EVENTS.length) % EVENTS.length];
    const label = `${eventToShow.id}) ${eventToShow.title} – ${eventToShow.time}`;

    const scale = 0.88 - i * 0.09;
    const opacity = 0.55 - i * 0.17;
    const fontSize = 22 - i * 3.5;
    const translateX = -14 - i * 12;
    const translateY = 26 + i * 28;

    slots.push({
      key: `below-${i}`,
      event: eventToShow,
      label,
      scale,
      opacity,
      fontSize,
      translateX,
      translateY,
      isActive: false,
      bgOpacity: 0.1,
    });
  }

  return slots;
}

export default function EventSection() {
  const [activeId, setActiveId] = useState(3);
  const [glitching, setGlitching] = useState(false);
  const stack = buildStack(activeId);
  useEffect(() => {
    setGlitching(true);
    const timer = setTimeout(() => setGlitching(false), 500);
    return () => clearTimeout(timer);
  }, []);
  const cycleNext = () => {
    setActiveId((prev) => (prev >= EVENTS.length ? 1 : prev + 1));
  };

  return (
    <section className={styles.section}>
      {/* Background Particles */}
      <div className={styles.particles} aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <div
            key={i}
            className={styles.particle}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* Left Arc Reactor */}
      <div className={styles.arcReactorWrapper} aria-hidden="true">
        <ArcReactor size={550} accentColor="teal" />
      </div>

      {/* Right Big Circle */}
      <div className={styles.bigCircleWrapper} aria-hidden="true">
        <BigCircle />
      </div>

      {/* Bottom Plus Markers */}
      <Plus className={styles.plusBottom1} delay={0.9} />
      <Plus className={styles.plusBottom2} delay={1.2} />

      {/* Main Content Area */}
      <div
        className={`${styles.content} ${glitching ? styles.systemUpdate : ""}`}
      >
        {/* Title Section */}
        <div className={styles.titleWrapper}>
          <h2 className={styles.title}>
            <DecryptedText
              text="Events"
              animateOn="view"
              speed={60}
              sequential={true}
              revealDirection="start"
            />
          </h2>
                    <Plus className={styles.plusBelowTitle1} delay={0.3} />
          <Plus className={styles.plusBelowTitle2} delay={0.6} />
        </div>

        {/* Visual Events Stack */}
        <div className={styles.eventsStack}>
          {/* Connector Line */}
          <div className={styles.connectorLine} aria-hidden="true" />

          {stack.map((slot) => (
            <div
              key={slot.key}
              className={`${styles.eventCard} ${slot.isActive ? styles.cardActive : styles.cardInactive}`}
              onClick={
                slot.isActive
                  ? cycleNext
                  : () => {
                      const eventIndex = slot.key.startsWith("above")
                        ? (activeId -
                            parseInt(slot.key.replace("above-", "")) -
                            1 +
                            EVENTS.length) %
                          EVENTS.length
                        : (activeId +
                            parseInt(slot.key.replace("below-", "")) -
                            1) %
                          EVENTS.length;
                      setActiveId(eventIndex + 1);
                    }
              }
              style={{
                transform: `scale(${slot.scale}) translate(${slot.translateX}px, ${slot.translateY}px)`,
                opacity: slot.opacity,
                zIndex: slot.isActive ? 10 : 1,
              }}
            >
              <div
                className={styles.cardInner}
                style={{
                  background: slot.isActive
                    ? `rgba(130, 120, 180, ${slot.bgOpacity})`
                    : `rgba(40, 40, 60, ${slot.bgOpacity})`,
                }}
              >
                <span
                  className={styles.eventText}
                  style={{ fontSize: slot.fontSize }}
                >
                  {slot.label}
                </span>
              </div>

              {/* Active Card Decorations */}
              {slot.isActive && (
                <>
                  <div className={styles.activeCardTab} />

                                    <div className={styles.activeLine}>
                    <div
                      className={styles.lineSegment}
                      style={{ width: 200 }}
                    />
                    <div
                      className={`${styles.lineDot} ${styles.lineDotPulse}`}
                    />
                  </div>

                                    <div className={styles.activeLineLeft}>
                    <div
                      className={styles.lineSegment}
                      style={{ width: 300 }}
                    />
                    <div
                      className={`${styles.lineDot} ${styles.lineDotPulse}`}
                    />
                  </div>

                                    <div className={styles.bottomTrace}>
                    <div className={styles.traceH1} />
                    <div className={styles.traceAngle} />
                    <div className={styles.traceH2} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
