'use client'
import React from 'react'
import DecryptedText from '@/components/ui/DecryptedText'

type RevealDirection = 'start' | 'end' | 'center'

/**
 * Tailwind font-weight utilities that map to the TT Lakes Neue Trial
 * weights registered in globals.css:
 *   font-thin       → 100  (Thin)
 *   font-light      → 300  (Light)
 *   font-normal     → 400  (Regular)
 *   font-medium     → 500  (Medium)
 *   font-extrabold  → 800  (ExtraBold)
 */
type TTLakesFontWeight =
    | 'font-thin'
    | 'font-light'
    | 'font-normal'
    | 'font-medium'
    | 'font-extrabold'

type TerminalTextProps = {
    /** The raw terminal string — use \n for newlines */
    text: string
    /** Tailwind / custom className forwarded to the outer wrapper */
    className?: string
    /** Text alignment: 'left' (default) | 'right' */
    align?: 'left' | 'right'
    /** DecryptedText speed (ms per character). Default 450 */
    speed?: number
    /** DecryptedText reveal direction. Default 'start' */
    revealDirection?: RevealDirection
    /**
     * TT Lakes Neue Trial weight via Tailwind utility.
     * Defaults to 'font-light' (300) — crisp at small terminal sizes.
     * Options: 'font-thin' | 'font-light' | 'font-normal' | 'font-medium' | 'font-extrabold'
     */
    fontWeight?: TTLakesFontWeight
}

/**
 * TerminalText
 *
 * A thin wrapper around <DecryptedText> styled for the green terminal aesthetic
 * used in the Hero section. Uses the TT Lakes Neue Trial font registered via
 * @font-face in globals.css and exposed as the `font-tt-lakes` Tailwind utility
 * (from the --font-tt-lakes token in @theme).
 *
 * Usage:
 *   <TerminalText text={`> boot\nINIT...`} />
 *   <TerminalText text={`END >>`} align="right" revealDirection="end" speed={500} fontWeight="font-medium" />
 */
const TerminalText: React.FC<TerminalTextProps> = ({
    text,
    className = '',
    align = 'left',
    speed = 450,
    revealDirection = 'start',
    fontWeight = 'font-light',
}) => {
    return (
        <div
            className={`
                hidden lg:block absolute
                font-tt-lakes ${fontWeight}
                text-xs text-[#BEF3DF] blur-[0.6px]
                ${align === 'right' ? 'text-right' : ''}
                ${className}
            `}
        >
            <DecryptedText
                text={text}
                animateOn="view"
                speed={speed}
                revealDirection={revealDirection}
                className="whitespace-pre-wrap"
            />
        </div>
    )
}

export default TerminalText
