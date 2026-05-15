'use client'

import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import { professors, sectionTitle } from '@/data/goodwillData'
import type { ProfessorData } from '@/data/goodwillData'
import DecryptedText from '@/components/ui/DecryptedText'
import styles from './GoodwillMessage.module.css'

const GLITCH_DURATION = 500 // ms for .systemUpdate class
const RING_CIRCUMFERENCE = 2 * Math.PI * 54 // r=54 on the progress ring

const GoodwillMessage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [glitching, setGlitching] = useState(false)
  const [textKey, setTextKey] = useState(0) // force re-mount text on swap
  const [revealing, setRevealing] = useState(false)

  const activeProfessor: ProfessorData = professors[activeIndex]

  const advanceTo = useCallback((nextIdx: number) => {
    setGlitching(true)
    setTimeout(() => {
      setActiveIndex(nextIdx)
      setTextKey(k => k + 1)
      setGlitching(false)
      setRevealing(true)
      setTimeout(() => setRevealing(false), 1200)
    }, GLITCH_DURATION)
  }, [])

  const handleSelectProfessor = (idx: number) => {
    if (idx === activeIndex) return
    advanceTo(idx)
  }

  return (
    <section
      id="goodwill-message"
      className={`${styles.section} ${glitching ? styles.systemUpdate : ''}`}
    >
      {/* Background target graphic */}
      <div className={styles.targetGraphic} aria-hidden="true">
        <svg className={styles.targetSvg} width="511" height="766" viewBox="0 0 511 766" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.5" clipPath="url(#clip0_162_156)">
            <path opacity="0.4" d="M233.352 467.35C221.885 446.953 214.595 424.219 212.125 400.944L215.111 400.625C217.54 423.491 224.704 445.837 235.974 465.88L233.352 467.35Z" fill="white" fillOpacity="0.25"/>
            <path d="M260.168 503.18C250.736 493.485 242.443 482.694 235.472 471.107L238.051 469.571C244.901 480.961 253.05 491.56 262.315 501.081L260.168 503.18Z" fill="white" fillOpacity="0.25"/>
            <path d="M211.187 385.065C211.091 375.493 211.787 365.92 213.256 356.456L216.226 356.92C214.779 366.212 214.097 375.616 214.192 385.02L211.187 385.065Z" fill="white" fillOpacity="0.25"/>
            <g opacity="0.8">
              <path d="M485.167 134.264L487.359 128.959C541.821 151.462 586.718 189.903 617.194 240.121C631.86 264.287 642.697 290.473 649.397 317.936C656.176 345.733 658.569 374.241 656.5 402.662L650.775 402.248C659.202 286.369 592.646 178.673 485.167 134.264Z" fill="white" fillOpacity="0.25"/>
              <path d="M211.429 167.83C245.988 140.378 287.193 121.442 330.587 113.055L331.677 118.695C289.189 126.904 248.844 145.454 215.005 172.329L211.429 167.83Z" fill="white" fillOpacity="0.25"/>
              <path d="M128.658 277.867L133.964 280.06C117.088 320.903 110.48 365.575 114.85 409.259C121.255 473.226 150.316 532.86 196.693 577.185L192.725 581.337C145.362 536.065 115.678 475.159 109.137 409.829C104.671 365.21 111.425 319.577 128.658 277.867Z" fill="white" fillOpacity="0.25"/>
            </g>
            <defs>
              <clipPath id="clip0_162_156">
                <rect width="586" height="586" fill="white" transform="translate(765.367 223.778) rotate(112.45)"/>
              </clipPath>
            </defs>
          </g>
        </svg>
      </div>

      {/* Title */}
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>
          <DecryptedText
            text={sectionTitle}
            animateOn="view"
            speed={60}
            sequential={true}
            revealDirection="start"
          />
        </h2>
        <div className={styles.accentBar} aria-hidden="true" />
      </div>

      <div className={styles.contentWrapper}>
        {/* Left ruler — animated equalizer bars */}
        <div className={styles.rulerWrapper} aria-hidden="true">
          {Array.from({ length: 52 }).map((_, i) => {
            const isMajor = i % 5 === 0
            return (
              <div
                key={i}
                className={`${isMajor ? styles.rulerTickMajor : styles.rulerTickMinor} ${styles.equalizerBar}`}
                style={{ '--bar-index': i } as React.CSSProperties}
              />
            )
          })}
        </div>

        {/* Thumbnail carousel column */}
        <div className={styles.thumbnailColumn}>

          {/* HUD ring overlay with progress arc */}
          <div className={styles.activeRingContainer} aria-hidden="true">
            <svg
              width="162" height="172"
              viewBox="0 0 162 172"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.activeRingSvg}
            >
              {/* Slow clockwise background ring */}
              <circle
                cx="75.67" cy="85.75"
                r="48"
                stroke="rgba(190,243,223,0.12)"
                strokeWidth="1.5"
                fill="none"
                className={styles.slowRingCW}
              />

              {/* Counter-clockwise dashed ring */}
              <circle
                cx="75.67" cy="85.75"
                r="61"
                stroke="rgba(190,243,223,0.08)"
                strokeWidth="1"
                fill="none"
                strokeDasharray="6 8"
                className={styles.slowRingCCW}
              />

              {/* Static base ring (original SVG structure) */}
              <g opacity="0.9">
                <g opacity="0.5">
                  <path d="M41.3789 85.8292C41.3789 66.8912 56.7293 51.5343 75.6739 51.5343C93.6841 51.5343 108.446 65.4209 109.845 83.0715H135.926C134.488 51.0376 108.067 25.5059 75.6739 25.5059C42.3591 25.5059 15.3506 52.5145 15.3506 85.8292C15.3506 102.068 21.7808 116.804 32.2235 127.646L50.6259 109.237C44.8948 103.114 41.3789 94.8866 41.3789 85.8292Z" fill="white" fillOpacity="0.4"/>
                </g>
                <g opacity="0.15">
                  <path d="M109.859 88.4238C108.532 106.153 93.7372 120.124 75.6748 120.124C66.7482 120.124 58.6254 116.713 52.5218 111.126L34.1196 129.535C44.9414 139.827 59.5664 146.153 75.6748 146.153C108.121 146.153 134.574 120.536 135.933 88.4238H109.859Z" fill="white" fillOpacity="0.15"/>
                </g>
                <path d="M96.1088 29.061L87.2867 53.5602C93.5341 55.8082 98.9385 59.8207 102.899 65.0028L123.555 49.1558C116.589 40.0658 107.087 33.0146 96.1088 29.061Z" fill="white"/>
              </g>

              {/* STATIC PROGRESS ARC */}
              <circle
                cx="75.67" cy="85.75"
                r="54"
                stroke="#BEF3DF"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={RING_CIRCUMFERENCE}
                strokeDashoffset={0}
                transform="rotate(-90 75.67 85.75)"
                className={styles.progressRing}
                style={{ filter: glitching ? 'drop-shadow(0 0 8px #BEF3DF) brightness(2)' : undefined }}
              />

              {/* Tick marks around progress ring - Now entirely static */}
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * 360 - 90
                const rad = (angle * Math.PI) / 180
                const r1 = 57, r2 = 60
                const x1 = 75.67 + r1 * Math.cos(rad)
                const y1 = 85.75 + r1 * Math.sin(rad)
                const x2 = 75.67 + r2 * Math.cos(rad)
                const y2 = 85.75 + r2 * Math.sin(rad)
                return (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#BEF3DF"
                    strokeWidth={i % 6 === 0 ? 2 : 1}
                  />
                )
              })}

              {/* Outer ring decoration */}
              <g opacity="0.35">
                <path d="M75.6734 0V6.40416C119.496 6.40416 155.02 41.9277 155.02 85.7505C155.02 129.573 119.496 165.097 75.6734 165.097C57.9443 165.097 41.5744 159.281 28.3675 149.452L24.551 154.595C38.8297 165.215 56.5197 171.501 75.6799 171.501C123.038 171.501 161.431 133.109 161.431 85.7505C161.424 38.3923 123.032 0 75.6734 0Z" fill="white" fillOpacity="0.15"/>
              </g>
              <path d="M126.993 17.0494C112.682 6.34534 94.92 0 75.6748 0V6.40416C93.4824 6.40416 109.924 12.2725 123.164 22.1793L126.993 17.0494Z" fill="white"/>
              <g opacity="0.8">
                <path d="M75.6413 161.392C33.9291 161.392 0 127.456 0 85.7506C0 72.8508 3.30657 60.1144 9.55391 48.9201L11.2661 49.8742C5.17562 60.7809 1.96046 73.1841 1.96046 85.7506C1.96046 126.378 35.0139 159.431 75.6413 159.431C116.269 159.431 149.322 126.378 149.322 85.7506C149.322 72.8312 145.93 60.1209 139.513 48.9985L141.212 48.0183C147.799 59.4413 151.283 72.4914 151.283 85.7506C151.283 127.456 117.347 161.392 75.6413 161.392Z" fill="white" fillOpacity="0.15"/>
              </g>
            </svg>

            {/* Connecting line with running-light effect */}
            <div className={styles.connectingLine}>
              <svg
                viewBox="0 0 1051 330"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                className={styles.connectingLineSvg}
              >
                <defs>
                  <linearGradient id="runningLight" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(190,243,223,0)" />
                    <stop offset="50%" stopColor="rgba(190,243,223,0.8)" />
                    <stop offset="100%" stopColor="rgba(190,243,223,0)" />
                    <animateTransform
                      attributeName="gradientTransform"
                      type="translate"
                      values="-1 0; 1 0; -1 0"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </linearGradient>
                  <mask id="lineMask">
                    <path stroke="white" strokeWidth="3" fill="none"
                      d="M8 8 H33 L73.5 48.5 V223.5 L119.5 269.5 H443 L502 328.5 H1049"
                    />
                  </mask>
                </defs>
                <circle cx="8" cy="8" r="8" fill="white" opacity="0.5" />
                {/* Base path */}
                <path stroke="white" strokeWidth="2" fill="none" opacity="0.25"
                  d="M8 8 H33 L73.5 48.5 V223.5 L119.5 269.5 H443 L502 328.5 H1049"
                />
                {/* Running light overlay */}
                <rect x="0" y="0" width="1051" height="330"
                  fill="url(#runningLight)"
                  mask="url(#lineMask)"
                  className={styles.runningLight}
                />
              </svg>
            </div>
          </div>

          {/* Thumbnail gallery track */}
          <div className={styles.galleryTrack}>
            {professors.map((prof, idx) => {
              const N = professors.length
              let offset = idx - activeIndex
              if (offset > Math.floor(N / 2)) offset -= N
              else if (offset < -Math.floor(N / 2)) offset += N

              let y = 0
              const ACTIVE_OFFSET = 130
              const INACTIVE_OFFSET = 94
              if (offset > 0) y = ACTIVE_OFFSET + (offset - 1) * INACTIVE_OFFSET
              else if (offset < 0) y = -ACTIVE_OFFSET - (Math.abs(offset) - 1) * INACTIVE_OFFSET

              return (
                <button
                  key={prof.id}
                  className={`${styles.thumbnailWrapper} ${idx === activeIndex ? styles.thumbnailActive : styles.thumbnailInactive}`}
                  style={{ transform: `translate(-50%, calc(-50% + ${y}px))` }}
                  onClick={() => handleSelectProfessor(idx)}
                  onTouchEnd={(e) => { e.preventDefault(); handleSelectProfessor(idx) }}
                  aria-label={`View message from ${prof.name}`}
                  type="button"
                >
                  <Image
                    src={prof.imagePath}
                    alt={prof.name}
                    width={100}
                    height={100}
                    className={styles.thumbnailImg}
                  />
                  {/* Breathing glow for active */}
                  {idx === activeIndex && (
                    <span className={styles.activeBreath} aria-hidden="true" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Featured card */}
        <div className={styles.featuredColumn}>
          <div className={styles.featuredCard}>
            <svg
              className={styles.frameSvg}
              viewBox="0 0 272 383"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <mask id="mask0_119_630" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="21" width="253" height="362">
                <path d="M1.67378e-05 382.917L9.18178e-07 21.0055L252.643 21.0055L252.643 382.917L1.67378e-05 382.917Z" fill="white"/>
              </mask>
              <g mask="url(#mask0_119_630)">
                <path d="M252.465 21.1929L252.465 104.88L227.29 125.189L227.29 275.031L252.465 296.506L252.465 382.888L179.838 382.888L170.588 373.317L102.265 373.317L93.136 382.888L19.7854 382.888L1.59099e-05 363.946L1.24117e-05 283.919L21.1933 270.205L21.1933 60.7248L65.0264 21.1929L252.465 21.1929ZM250.936 104.277L250.936 22.5999L65.6295 22.6L22.7208 61.287L22.7209 270.888L1.52759 284.642L1.5276 363.424L20.4694 381.521L92.452 381.521L101.581 371.949L171.272 371.949L180.521 381.521L250.896 381.521L250.896 297.149L225.722 275.674L225.722 124.626L250.936 104.277Z" fill="#BEF3DF"/>
              </g>
              <path d="M96.5945 382.888L104.395 375.046L168.94 375.046L176.861 382.888L96.5945 382.888Z" fill="#BEF3DF"/>
              <path d="M251.7 360.408L269.234 353.089L269.234 276.961L245.386 259.347L245.386 109.505L226.526 124.867L226.526 275.272L251.741 297.069L251.7 360.408Z" fill="#BEF3DF"/>
              <mask id="mask1_119_630" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="164" y="4" width="108" height="83">
                <path d="M164.952 86.0074L164.952 4.82576L271.566 4.82576L271.566 86.0074L164.952 86.0074Z" fill="white"/>
              </mask>
              <g mask="url(#mask1_119_630)">
                <path d="M165.079 21.8769L176.781 11.1393L211.646 11.1393L215.95 4.86571L263.282 4.86571L263.282 40.0944L271.566 46.6485L271.566 78.298L251.699 85.7779L251.699 21.8769L165.079 21.8769Z" fill="#BEF3DF"/>
              </g>
              <mask id="mask12_119_630" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="0" y="0" width="146" height="154">
                <path d="M1.67378e-05 153.848L1.00129e-05 2.71293e-05L145.938 2.07501e-05L145.938 153.848L1.67378e-05 153.848Z" fill="white"/>
              </mask>
              <g mask="url(#mask12_119_630)">
                <path d="M21.9571 138.902L1.67378e-05 153.822L1.23151e-05 52.6411L48.6188 8.76603L90.1595 8.76603L97.9215 0.240486L131.862 0.240485L145.816 21.9164L65.1872 21.8764L21.9571 61.1256L21.9571 138.902Z" fill="#BEF3DF"/>
              </g>
            </svg>

            <div className={styles.featuredImageWrapper}>
              <Image
                src={activeProfessor.imagePath}
                alt={activeProfessor.name}
                fill
                className={`${styles.featuredImage} ${revealing ? styles.scanReveal : ''}`}
                sizes="(max-width: 768px) 200px, 250px"
                priority
              />
              {/* Scanline overlay */}
              <div className={`${styles.scanlines} ${glitching ? styles.scanlinesPulse : ''}`} aria-hidden="true" />
              <div className={styles.vignette} />
              {/* Chromatic aberration fringe (CSS only) */}
              {glitching && <div className={styles.chromaticFringe} aria-hidden="true" />}
            </div>
          </div>

          <div className={styles.profInfo}>
            <h3 className={styles.profName}>
              <DecryptedText
                key={`name-${activeIndex}`}
                text={activeProfessor.name}
                animateOn="view"
                speed={40}
                sequential={true}
              />
            </h3>
            {activeProfessor.designation.map((line, i) => (
              <span key={i} className={styles.profDesignation}>
                <DecryptedText
                  key={`desig-${activeIndex}-${i}`}
                  text={line}
                  animateOn="view"
                  speed={30}
                  sequential={true}
                />
              </span>
            ))}
          </div>
        </div>

        {/* Message content — masked scan reveal */}
        <div
          key={textKey}
          className={`${styles.messageContent} ${revealing ? styles.messageRevealing : ''}`}
        >
          {activeProfessor.message.split('\n').map((paragraph, i) => (
            <p
              key={i}
              className={`${i === 0 ? styles.messageHeading : styles.messageParagraph} ${styles.messageRow}`}
              style={{ '--row-index': i } as React.CSSProperties}
            >
              <DecryptedText
                key={`msg-${textKey}-${i}`}
                text={paragraph}
                animateOn="view"
                speed={12}
                maxIterations={15}
                sequential={false}
              />
            </p>
          ))}
        </div>
      </div>

      {/* Bottom decor */}
      <div className={styles.decorGraphic} aria-hidden="true">
        <svg className={styles.decorGraphicSvg} width="108" height="115" viewBox="0 0 108 115" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g opacity="0.9">
            <g opacity="0.5">
              <path d="M27.5374 57.0145C27.5374 69.6178 37.7531 79.8378 50.3607 79.8378C62.3464 79.8378 72.1707 70.5963 73.1014 58.8498L90.4582 58.8498C89.5014 80.1683 71.9185 97.1597 50.3607 97.1597C28.1897 97.1597 10.2156 79.1855 10.2156 57.0145C10.2156 46.2074 14.4949 36.4005 21.4445 29.1856L33.6912 41.4366C29.8772 45.5115 27.5374 50.9869 27.5374 57.0145Z" fill="white" fillOpacity="0.4"/>
            </g>
            <path d="M63.96 94.7939L58.0889 78.4897C62.2465 76.9937 65.8431 74.3235 68.4786 70.8747L82.2256 81.4209C77.5896 87.4703 71.2662 92.1628 63.96 94.7939Z" fill="#BEF3DF"/>
          </g>
          <path d="M84.5134 102.787C74.9892 109.911 63.1688 114.134 50.3611 114.134V109.872C62.212 109.872 73.154 105.966 81.965 99.3735L84.5134 102.787Z" fill="#BEF3DF"/>
          <path d="M50.3394 63.4902C46.7907 63.4902 43.916 60.6156 43.916 57.0668C43.916 53.5181 46.7907 50.6434 50.3394 50.6434C53.8882 50.6434 56.7627 53.5181 56.7627 57.0668C56.7627 60.6156 53.8882 63.4902 50.3394 63.4902ZM50.3394 53.0701C48.1345 53.0701 46.3427 54.8576 46.3427 57.0668C46.3427 59.2717 48.1302 61.0635 50.3394 61.0635C52.5444 61.0635 54.3361 59.2761 54.3361 57.0668C54.3317 54.8619 52.5444 53.0701 50.3394 53.0701Z" fill="white" fillOpacity="0.4"/>
        </svg>
      </div>
    </section>
  )
}

export default GoodwillMessage