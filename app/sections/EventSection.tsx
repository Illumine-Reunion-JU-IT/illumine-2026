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
    description: "The official start of Illumine 2026 with a grand opening ceremony.",
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
    description: "An adrenaline-fueled clash on the field for the championship.",
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

/**
 * Particle positions — seeded manually (deterministic, no hydration mismatch).
 */
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

/**
 * Build the visual stack: the active event is prominently displayed
 * in the lower-center area, with ghost copies receding above it
 * (shifting left + scaling down + fading) showing PREVIOUS events,
 * and a couple below showing NEXT events.
 * This matches the reference image's perspective cascade.
 */
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
    isActive: boolean;
    bgOpacity: number;
  }[] = [];

  // 5 ghost copies ABOVE showing PREVIOUS events (receding upward-left, progressively fading)
  for (let i = 5; i >= 1; i--) {
    // Calculate previous event index with wrap-around
    const prevEventId = activeId - i;
    const eventToShow = EVENTS[(prevEventId - 1 + EVENTS.length) % EVENTS.length];
    const label = `${eventToShow.id}) ${eventToShow.title} – ${eventToShow.time}`;

    slots.push({
      key: `above-${i}`,
      event: eventToShow,
      label,
      scale: Math.max(0.5, 1 - i * 0.09),
      opacity: Math.max(0.04, 0.38 - i * 0.07),
      fontSize: Math.max(10, 22 - i * 2.5),
      translateX: -i * 22,
      isActive: false,
      bgOpacity: Math.max(0.02, 0.07 - i * 0.012),
    });
  }

  // ACTIVE card (center-bottom)
  slots.push({
    key: `active`,
    event: activeEvent,
    label: activeLabel,
    scale: 1,
    opacity: 1,
    fontSize: 24,
    translateX: 0,
    isActive: true,
    bgOpacity: 0.22,
  });

  // 2 ghost copies BELOW showing NEXT events (receding downward, less shift)
  for (let i = 1; i <= 2; i++) {
    // Calculate next event index with wrap-around
    const nextEventId = activeId + i;
    const eventToShow = EVENTS[(nextEventId - 1 + EVENTS.length) % EVENTS.length];
    const label = `${eventToShow.id}) ${eventToShow.title} – ${eventToShow.time}`;

    slots.push({
      key: `below-${i}`,
      event: eventToShow,
      label,
      scale: Math.max(0.7, 1 - i * 0.08),
      opacity: Math.max(0.08, 0.35 - i * 0.12),
      fontSize: Math.max(14, 20 - i * 2),
      translateX: 0,
      isActive: false,
      bgOpacity: Math.max(0.03, 0.06 - i * 0.015),
    });
  }

  return slots;
}

export default function EventSection() {
  const [activeId, setActiveId] = useState(3);
  const [glitching, setGlitching] = useState(false);
  const stack = buildStack(activeId);

  // Trigger glitch effect on initial load
  useEffect(() => {
    setGlitching(true);
    const timer = setTimeout(() => setGlitching(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Cycle to next event
  const cycleNext = () => {
    setActiveId((prev) => (prev >= EVENTS.length ? 1 : prev + 1));
  };

  return (
    <section className={styles.section}>
      {/* Background particles */}
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

      {/* Arc Reactor — left side */}
      <div className={styles.arcReactorWrapper} aria-hidden="true">
        <ArcReactor size={550} accentColor="teal" />
      </div>

      {/* BigCircle — right of center */}
      <div className={styles.bigCircleWrapper} aria-hidden="true">
        <div style={{ transform: "scale(1.6)" }}>
          <BigCircle />
        </div>
      </div>

      {/* Plus markers at the bottom of the section */}
      <Plus className={styles.plusBottom1} delay={0.9} />
      <Plus className={styles.plusBottom2} delay={1.2} />

      {/* Main content */}
      <div className={`${styles.content} ${glitching ? styles.systemUpdate : ''}`}>
        {/* Title — top right */}
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
          {/* Plus markers beneath the EVENTS title */}
          <Plus className={styles.plusBelowTitle1} delay={0.3} />
          <Plus className={styles.plusBelowTitle2} delay={0.6} />
        </div>

        {/* Visual events stack */}
        <div className={styles.eventsStack}>
          {/* Connector line */}
          <div className={styles.connectorLine} aria-hidden="true" />

          {stack.map((slot) => (
            <div
              key={slot.key}
              className={`${styles.eventCard} ${slot.isActive ? styles.cardActive : styles.cardInactive}`}
              onClick={
                slot.isActive
                  ? cycleNext
                  : () => {
                      // Determine which event this ghost card represents and set it as active
                      const eventIndex = slot.key.startsWith("above")
                        ? (activeId - parseInt(slot.key.replace("above-", "")) - 1 + EVENTS.length) % EVENTS.length
                        : (activeId + parseInt(slot.key.replace("below-", "")) - 1) % EVENTS.length;
                      setActiveId(eventIndex + 1);
                    }
              }
              style={{
                transform: `scale(${slot.scale}) translateX(${slot.translateX}px)`,
                opacity: slot.opacity,
                zIndex: slot.isActive ? 10 : 1,
              }}
            >
              <div
                className={styles.cardInner}
                style={{
                  background: slot.isActive
                    ? `rgba(140, 140, 200, ${slot.bgOpacity})`
                    : `rgba(255, 255, 255, ${slot.bgOpacity})`,
                }}
              >
                {/* Deprecated DecryptedText for event cards - keeping original text style */}
                {/* <DecryptedText
                  key={slot.key}
                  text={slot.label}
                  animateOn="view"
                  speed={40}
                  sequential={true}
                /> */}
                <span
                  className={styles.eventText}
                  style={{ fontSize: slot.fontSize }}
                >
                  {slot.label}
                </span>
              </div>

              {/* Active card frame + line decoration */}
              {slot.isActive && (
                <>
                  <svg
                    className={styles.activeFrame}
                    viewBox="0 0 720 52"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M1 26 L14 1 L706 1 L719 26 L706 51 L14 51 Z"
                      fill="none"
                      stroke="rgba(255,255,255,0.25)"
                      strokeWidth="1.5"
                    />
                  </svg>

                  {/* Horizontal line extending right */}
                  <div className={styles.activeLine}>
                    <div className={styles.lineSegment} style={{ width: 50 }} />
                    <div className={styles.lineDot} />
                  </div>

                  {/* Horizontal line extending left (shorter) */}
                  <div className={styles.activeLineLeft}>
                    <div className={styles.lineSegment} style={{ width: 30 }} />
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
