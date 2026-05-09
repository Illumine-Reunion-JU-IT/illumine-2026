'use client'

import React, { useState } from 'react'
import BigCircle from '@/components/ui/BigCircle'
import BlueCircle from '@/components/ui/BlueCircle'
import GlitchLogo from '@/components/ui/GlitchLogo'
import DecryptedText from '@/components/ui/DecryptedText'
import TerminalText from '@/components/ui/TerminalText'
import Plus from '@/components/ui/Plus'
import SmallCircle from '@/components/ui/SmallCircle'
import VtLine from '@/components/ui/VtLine'
import Countdown from '@/components/ui/Countdowm'
import ArcReactor from '@/components/arc-reactor'

// ─── Types ──────────────────────────────────────────────────────────────────

type Tab = 'preview' | 'code'

// ─── Reusable sub-components ───────────────────────────────────────────────

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-2 py-0.5 text-[10px] font-mono font-bold tracking-widest rounded-sm bg-[#6265fe]/20 text-[#b6bbff] border border-[#6265fe]/30 uppercase">
      {children}
    </span>
  )
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="relative rounded-lg overflow-hidden border border-[#1e2240]">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0b0e1a] border-b border-[#1e2240]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <button
          onClick={copy}
          className="text-[10px] font-mono text-[#6265fe] hover:text-[#b6bbff] transition-colors tracking-wider"
        >
          {copied ? '✓ COPIED' : 'COPY'}
        </button>
      </div>
      {/* Code body */}
      <pre className="p-4 bg-[#080b14] text-[#bec8e4] text-xs font-mono leading-relaxed overflow-x-auto whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function Section({
  id,
  title,
  description,
  badges,
  props,
  preview,
  code,
}: {
  id: string
  title: string
  description: string
  badges: string[]
  props: { name: string; type: string; default: string; desc: string }[]
  preview: React.ReactNode
  code: string
}) {
  const [tab, setTab] = useState<Tab>('preview')

  return (
    <section id={id} className="scroll-mt-28 mb-20">
      {/* Title row */}
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <h2 className="text-xl font-bold tracking-tight text-white font-mono">{title}</h2>
        {badges.map(b => <Badge key={b}>{b}</Badge>)}
      </div>

      <p className="text-sm text-[#8892b0] mb-5 leading-relaxed max-w-2xl">{description}</p>

      {/* Tab strip */}
      <div className="flex gap-0 mb-4 border-b border-[#1e2240]">
        {(['preview', 'code'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 text-[11px] font-mono font-bold tracking-widest uppercase transition-all duration-200 border-b-2 -mb-px ${
              tab === t
                ? 'border-[#6265fe] text-[#6265fe]'
                : 'border-transparent text-[#8892b0] hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Panel */}
      {tab === 'preview' ? (
        <div className="min-h-[180px] flex items-center justify-center rounded-lg bg-[#080b14] border border-[#1e2240] p-8 relative overflow-hidden">
          {/* Dot-grid bg */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
          />
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-8">
            {preview}
          </div>
        </div>
      ) : (
        <CodeBlock code={code} />
      )}

      {/* Props table */}
      {props.length > 0 && (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b border-[#1e2240]">
                {['Prop', 'Type', 'Default', 'Description'].map(h => (
                  <th key={h} className="text-left py-2 px-3 text-[#6265fe] font-bold tracking-widest uppercase text-[10px]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.map(p => (
                <tr key={p.name} className="border-b border-[#1e2240]/60 hover:bg-[#6265fe]/5 transition-colors">
                  <td className="py-2 px-3 text-[#bef3df]">{p.name}</td>
                  <td className="py-2 px-3 text-[#b6bbff]">{p.type}</td>
                  <td className="py-2 px-3 text-[#8892b0]">{p.default || '—'}</td>
                  <td className="py-2 px-3 text-[#8892b0]">{p.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

// ─── Sidebar nav ────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'big-circle',     label: 'BigCircle' },
  { id: 'blue-circle',    label: 'BlueCircle' },
  { id: 'glitch-logo',    label: 'GlitchLogo' },
  { id: 'decrypted-text', label: 'DecryptedText' },
  { id: 'terminal-text',  label: 'TerminalText' },
  { id: 'plus',           label: 'Plus' },
  { id: 'small-circle',   label: 'SmallCircle' },
  { id: 'vt-line',        label: 'VtLine' },
  { id: 'countdown',      label: 'Countdown' },
  { id: 'arc-reactor',    label: 'ArcReactor' },
]

// ─── Page ───────────────────────────────────────────────────────────────────

export default function DocsPage() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #080b14; }
        ::-webkit-scrollbar-thumb { background: #6265fe55; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #6265fe; }
      `}</style>

      <div className="min-h-screen bg-[#060915] text-white" style={{ fontFamily: 'var(--font-geist-sans, Arial, sans-serif)' }}>

        {/* ── Hero header ── */}
        <div className="relative border-b border-[#1e2240] overflow-hidden">
          {/* Animated gradient orb */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#6265fe] opacity-10 blur-[80px] pointer-events-none" />
          <div className="max-w-[88rem] mx-auto px-6 py-16 relative">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#6265fe] uppercase">illumine-2026</span>
              <div className="flex-1 h-px bg-gradient-to-r from-[#6265fe]/40 to-transparent" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-white mb-3">
              Component <span className="text-[#6265fe]">Library</span>
            </h1>
            <p className="text-[#8892b0] text-base max-w-xl">
              All reusable UI primitives built for Illumine 2026 — previews, usage code, and prop references in one place.
            </p>
          </div>
        </div>

        {/* ── Layout: sidebar + content ── */}
        <div className="max-w-[88rem] mx-auto px-4 sm:px-6 flex gap-0">

          {/* Sidebar */}
          <aside className="hidden lg:block w-56 shrink-0 sticky top-20 self-start h-[calc(100vh-5rem)] overflow-y-auto pt-10 pb-10 pr-4 border-r border-[#1e2240]">
            <p className="text-[10px] font-mono tracking-[0.25em] text-[#6265fe] uppercase mb-4">Components</p>
            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-left px-3 py-2 text-sm text-[#8892b0] hover:text-white hover:bg-[#6265fe]/10 rounded transition-all duration-150 font-mono"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 min-w-0 py-10 lg:pl-10">

            {/* ── BigCircle ── */}
            <Section
              id="big-circle"
              title="BigCircle"
              description="An animated SVG orbital graphic with three independently rotating ring groups and a pulsing center dot. Supports four accent color presets that tint the highlight and accent paths."
              badges={['svg', 'framer-motion', 'animated']}
              props={[
                { name: 'className', type: 'string', default: "''", desc: 'Extra Tailwind classes on the wrapper div.' },
                { name: 'color', type: "'neutral' | 'cyan' | 'red' | 'yellow'", default: "'neutral'", desc: 'Accent color applied to highlight paths.' },
              ]}
              preview={
                <div className="flex gap-16 items-center flex-wrap justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <BigCircle color="neutral" className="relative" />
                    <span className="text-[10px] font-mono text-[#8892b0] mt-14">neutral</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <BigCircle color="cyan" className="relative" />
                    <span className="text-[10px] font-mono text-[#8892b0] mt-14">cyan</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <BigCircle color="red" className="relative" />
                    <span className="text-[10px] font-mono text-[#8892b0] mt-14">red</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <BigCircle color="yellow" className="relative" />
                    <span className="text-[10px] font-mono text-[#8892b0] mt-14">yellow</span>
                  </div>
                </div>
              }
              code={`import BigCircle from '@/components/ui/BigCircle'

// Default (neutral)
<BigCircle />

// With accent color
<BigCircle color="cyan" />
<BigCircle color="red" />
<BigCircle color="yellow" />

// With positioning class
<BigCircle color="cyan" className="top-4 left-8" />`}
            />

            {/* ── BlueCircle ── */}
            <Section
              id="blue-circle"
              title="BlueCircle"
              description="A compact animated SVG tech-badge with spinning orbital rings, blinking indicator dots, a drifting scan line, and a color-cycling center dot. Enters with a spring-pop animation."
              badges={['svg', 'framer-motion', 'animated']}
              props={[
                { name: 'className', type: 'string', default: "''", desc: 'Extra Tailwind classes (used for positioning).' },
              ]}
              preview={
                <div className="flex gap-12 items-center flex-wrap justify-center">
                  <BlueCircle className="relative" />
                  <BlueCircle className="relative rotate-90" />
                  <BlueCircle className="relative rotate-180" />
                </div>
              }
              code={`import BlueCircle from '@/components/ui/BlueCircle'

// Standard usage
<BlueCircle />

// Rotated variants (used to flip orientation)
<BlueCircle className="rotate-180" />

// Positioned absolutely in a container
<BlueCircle className="absolute top-12 left-22" />
<BlueCircle className="absolute bottom-8 right-22 rotate-180" />`}
            />

            {/* ── GlitchLogo ── */}
            <Section
              id="glitch-logo"
              title="GlitchLogo"
              description='Renders the "ILLUMINE NUMBERS" wordmark as an SVG that glitch-animates into view when it enters the viewport. Each letter flickers independently before locking into place — fires once per mount.'
              badges={['svg', 'intersection-observer', 'animated']}
              props={[
                { name: 'className', type: 'string', default: "''", desc: 'Extra classes on the outer wrapper div.' },
              ]}
              preview={
                <div className="flex items-center justify-center w-full py-4">
                  <GlitchLogo />
                </div>
              }
              code={`import GlitchLogo from '@/components/ui/GlitchLogo'

// Drop-in — animation fires once on viewport enter
<GlitchLogo />

// With extra class (e.g. for color override via currentColor)
<GlitchLogo className="text-white" />`}
            />

            {/* ── DecryptedText ── */}
            <Section
              id="decrypted-text"
              title="DecryptedText"
              description="A polymorphic text scramble effect. Characters cycle through a random character set before resolving to the real text. Supports hover, view, click (once/toggle), and inViewHover trigger modes; sequential or random reveal; and forward/reverse directions."
              badges={['text', 'framer-motion', 'animated']}
              props={[
                { name: 'text', type: 'string', default: '', desc: 'The text to decrypt into.' },
                { name: 'speed', type: 'number', default: '50', desc: 'Interval in ms between scramble ticks.' },
                { name: 'maxIterations', type: 'number', default: '10', desc: 'Scramble ticks before resolving (non-sequential).' },
                { name: 'sequential', type: 'boolean', default: 'false', desc: 'Reveal characters one-by-one instead of all at once.' },
                { name: 'revealDirection', type: "'start' | 'end' | 'center'", default: "'start'", desc: 'Order in which chars are revealed.' },
                { name: 'animateOn', type: "'hover' | 'view' | 'click' | 'inViewHover'", default: "'hover'", desc: 'Event that triggers the animation.' },
                { name: 'clickMode', type: "'once' | 'toggle'", default: "'once'", desc: "For animateOn='click': run once, or toggle." },
                { name: 'characters', type: 'string', default: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+', desc: 'Character pool used during scramble.' },
                { name: 'useOriginalCharsOnly', type: 'boolean', default: 'false', desc: 'Scramble only uses unique chars from the text itself.' },
                { name: 'className', type: 'string', default: "''", desc: 'Class applied to revealed characters.' },
                { name: 'encryptedClassName', type: 'string', default: "''", desc: 'Class applied to still-scrambled characters.' },
                { name: 'parentClassName', type: 'string', default: "''", desc: 'Class on the outer <span> wrapper.' },
              ]}
              preview={
                <div className="flex flex-col gap-6 items-center w-full">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-mono text-[#6265fe] tracking-widest">hover</span>
                    <span className="text-2xl font-bold text-[#b6bbff]">
                      <DecryptedText text="HOVER OVER ME" animateOn="hover" sequential revealDirection="start" />
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-mono text-[#6265fe] tracking-widest">view (fires on load)</span>
                    <span className="text-lg text-[#bef3df]">
                      <DecryptedText text="Decoded on viewport enter" animateOn="view" sequential speed={40} />
                    </span>
                  </div>
                </div>
              }
              code={`import DecryptedText from '@/components/ui/DecryptedText'

// Hover trigger, sequential left-to-right reveal
<DecryptedText
  text="HOVER OVER ME"
  animateOn="hover"
  sequential
  revealDirection="start"
/>

// View trigger — fires once when element enters viewport
<DecryptedText
  text="Decoded on viewport enter"
  animateOn="view"
  sequential
  speed={40}
/>

// Click toggle — encrypts back on second click
<DecryptedText
  text="CLICK ME"
  animateOn="click"
  clickMode="toggle"
  sequential
/>

// Styled revealed vs scrambled chars
<DecryptedText
  text="ILLUMINE"
  animateOn="hover"
  className="text-white"
  encryptedClassName="text-[#6265fe]/40"
  sequential
/>`}
            />

            {/* ── TerminalText ── */}
            <Section
              id="terminal-text"
              title="TerminalText"
              description="A styled wrapper around DecryptedText for terminal / boot-log aesthetics. Uses the TT Lakes Neue Trial font, green-tinted color, and a subtle blur. Hidden on mobile (lg: only). Multiline via \\n."
              badges={['text', 'animated', 'font']}
              props={[
                { name: 'text', type: 'string', default: '', desc: 'Terminal string — use \\n for newlines.' },
                { name: 'className', type: 'string', default: "''", desc: 'Extra classes on the outer div.' },
                { name: 'align', type: "'left' | 'right'", default: "'left'", desc: 'Text alignment.' },
                { name: 'speed', type: 'number', default: '450', desc: 'ms per character reveal.' },
                { name: 'revealDirection', type: "'start' | 'end' | 'center'", default: "'start'", desc: 'Reveal order.' },
                { name: 'fontWeight', type: 'font-thin | font-light | font-normal | font-medium | font-extrabold', default: "'font-light'", desc: 'TT Lakes weight utility.' },
              ]}
              preview={
                <div className="flex flex-col gap-4 items-start w-full">
                  <TerminalText text={`> boot\nINIT SYSTEM...\nCORE ONLINE`} className="text-sm" />
                  <TerminalText text={`END >>`} align="right" revealDirection="end" className="text-sm w-full" />
                </div>
              }
              code={`import TerminalText from '@/components/ui/TerminalText'

// Left-aligned boot log
<TerminalText
  text={\`> boot\\nINIT SYSTEM...\\nCORE ONLINE\`}
/>

// Right-aligned, reveals from end
<TerminalText
  text="END >>"
  align="right"
  revealDirection="end"
/>

// Custom weight + speed
<TerminalText
  text="MISSION CRITICAL"
  fontWeight="font-extrabold"
  speed={200}
/>`}
            />

            {/* ── Plus ── */}
            <Section
              id="plus"
              title="Plus"
              description="A small SVG crosshair / plus-sign ornament that glitch-flickers into view and then breathes with a slow opacity pulse. Used as a decorative corner accent. Supports a delay prop to stagger multiple instances."
              badges={['svg', 'css-animation', 'decorative']}
              props={[
                { name: 'className', type: 'string', default: "''", desc: 'Extra classes (typically for absolute positioning).' },
                { name: 'delay', type: 'number', default: '0', desc: 'Seconds before the glitch-in animation fires.' },
              ]}
              preview={
                <div className="relative flex items-center justify-center gap-16 flex-wrap">
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <Plus className="relative" delay={0} />
                  </div>
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <Plus className="relative" delay={0.3} />
                  </div>
                  <div className="relative w-8 h-8 flex items-center justify-center">
                    <Plus className="relative" delay={0.6} />
                  </div>
                </div>
              }
              code={`import Plus from '@/components/ui/Plus'

// Default — no delay
<Plus />

// Staggered group (absolute positioning in a relative parent)
<Plus className="top-0 left-0" delay={0} />
<Plus className="top-0 right-0" delay={0.15} />
<Plus className="bottom-0 left-0" delay={0.3} />
<Plus className="bottom-0 right-0" delay={0.45} />`}
            />

            {/* ── SmallCircle ── */}
            <Section
              id="small-circle"
              title="SmallCircle"
              description="A three-segment SVG ring that spins continuously and breathes opacity. Used as an auxiliary orbital element. Speed is controlled via the speedFactor prop — higher values spin faster."
              badges={['svg', 'css-animation', 'decorative']}
              props={[
                { name: 'className', type: 'string', default: "''", desc: 'Extra classes on the wrapper div.' },
                { name: 'speedFactor', type: 'number', default: '1', desc: 'Multiplier — 2 = twice as fast, 0.5 = half speed.' },
              ]}
              preview={
                <div className="flex items-center gap-12 flex-wrap justify-center">
                  <div className="flex flex-col items-center gap-3 h-12">
                    <SmallCircle speedFactor={1} />
                    <span className="text-[10px] font-mono text-[#8892b0]">×1</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 h-12">
                    <SmallCircle speedFactor={2} />
                    <span className="text-[10px] font-mono text-[#8892b0]">×2</span>
                  </div>
                  <div className="flex flex-col items-center gap-3 h-12">
                    <SmallCircle speedFactor={0.5} />
                    <span className="text-[10px] font-mono text-[#8892b0]">×0.5</span>
                  </div>
                </div>
              }
              code={`import SmallCircle from '@/components/ui/SmallCircle'

// Default speed
<SmallCircle />

// Faster
<SmallCircle speedFactor={2} />

// Slower
<SmallCircle speedFactor={0.5} />`}
            />

            {/* ── VtLine ── */}
            <Section
              id="vt-line"
              title="VtLine"
              description="A vertical line that draws itself from bottom to top on mount (stroke-dashoffset animation) followed by a slow opacity pulse. An arrow head fades in at the top once the draw completes."
              badges={['svg', 'css-animation', 'decorative']}
              props={[
                { name: 'className', type: 'string', default: "''", desc: 'Extra classes on the wrapper div (for positioning).' },
              ]}
              preview={
                <div className="relative h-40 flex items-center justify-center gap-16">
                  <VtLine className="relative" />
                  <VtLine className="relative rotate-180" />
                </div>
              }
              code={`import VtLine from '@/components/ui/VtLine'

// Upward arrow (default)
<VtLine />

// Downward — rotate 180°
<VtLine className="rotate-180" />

// Positioned in a layout
<VtLine className="absolute left-8 top-0" />`}
            />

            {/* ── Countdown ── */}
            <Section
              id="countdown"
              title="Countdown"
              description="A live countdown timer targeting December 22, 2026 UTC midnight. Each digit flip-glitches when it changes — a subtle blue ghost frame flickers over the old value. Uses the Oxanium font from Google Fonts."
              badges={['timer', 'animated', 'client-only']}
              props={[]}
              preview={
                <div className="scale-90">
                  <Countdown />
                </div>
              }
              code={`import Countdown from '@/components/ui/Countdowm'

// Drop-in — no props required
// Target date is hard-coded to 2026-12-22 00:00 UTC
<Countdown />`}
            />

            {/* ── ArcReactor ── */}
            <Section
              id="arc-reactor"
              title="ArcReactor"
              description="A full canvas-drawn HUD reactor graphic with stepped mechanical ring rotations, breathing glow, blinking accent data-squares, crosshair lines, and a mouse-tilt parallax effect. Supports six accent color presets plus any custom CSS color string. Size scales all internal geometry proportionally."
              badges={['svg', 'canvas', 'mouse-tilt', 'animated']}
              props={[
                { name: 'size', type: 'number', default: '440', desc: 'Width & height in px. All internal radii scale proportionally.' },
                { name: 'className', type: 'string', default: "''", desc: 'Extra classes on the outermost div.' },
                { name: 'accentColor', type: "'teal' | 'yellow' | 'orange' | 'red' | 'purple' | 'white' | string", default: "'teal'", desc: 'Accent preset name or any hex/rgb CSS color.' },
              ]}
              preview={
                <div className="flex flex-wrap gap-10 items-center justify-center">
                  <div className="flex flex-col items-center gap-3">
                    <ArcReactor size={160} accentColor="teal" />
                    <span className="text-[10px] font-mono text-[#8892b0]">teal</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <ArcReactor size={160} accentColor="yellow" />
                    <span className="text-[10px] font-mono text-[#8892b0]">yellow</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <ArcReactor size={160} accentColor="red" />
                    <span className="text-[10px] font-mono text-[#8892b0]">red</span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <ArcReactor size={160} accentColor="purple" />
                    <span className="text-[10px] font-mono text-[#8892b0]">purple</span>
                  </div>
                </div>
              }
              code={`import ArcReactor from '@/components/arc-reactor'

// Default (teal, 440px)
<ArcReactor />

// Preset accent colors
<ArcReactor accentColor="yellow" />
<ArcReactor accentColor="red" />
<ArcReactor accentColor="purple" />
<ArcReactor accentColor="orange" />
<ArcReactor accentColor="white" />

// Custom color
<ArcReactor accentColor="#ff6b35" />

// Sized for a section background
<ArcReactor
  accentColor="yellow"
  size={reactorSize}   // derived from viewport
  className="opacity-50"
/>`}
            />

            {/* ── Footer ── */}
            <div className="mt-10 pt-8 border-t border-[#1e2240] text-center">
              <p className="text-[11px] font-mono text-[#3d4470] tracking-widest uppercase">
                illumine-2026 · internal component docs
              </p>
            </div>

          </main>
        </div>
      </div>
    </>
  )
}
