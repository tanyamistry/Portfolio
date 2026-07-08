import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './styles/Landing.css'
import { FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&'

function scramble(el: HTMLElement, finalText: string, delay = 0) {
  let frame = 0
  const totalFrames = 32
  setTimeout(() => {
    const id = setInterval(() => {
      el.textContent = finalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < (frame / totalFrames) * finalText.length) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')
      if (frame++ >= totalFrames) { el.textContent = finalText; clearInterval(id) }
    }, 30)
  }, delay)
}

const MARQUEE = ['Streaming Systems', 'Data Platforms', 'Backend Engineering', 'Cloud Infrastructure', 'Full-Stack Development', 'Machine Learning']

export default function Landing() {
  const sectionRef  = useRef<HTMLElement>(null)
  const tanyaRef    = useRef<HTMLSpanElement>(null)
  const mistryRef   = useRef<HTMLSpanElement>(null)
  const badgeRef    = useRef<HTMLDivElement>(null)
  const introRef    = useRef<HTMLParagraphElement>(null)
  const actionsRef  = useRef<HTMLDivElement>(null)
  const socialsRef  = useRef<HTMLDivElement>(null)
  const primaryBtn  = useRef<HTMLAnchorElement>(null)
  const ghostBtn    = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 })

    tl.fromTo(badgeRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
    )

    // TANYA clip from left + scramble
    tl.fromTo(tanyaRef.current,
      { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
      {
        clipPath: 'inset(0 0% 0 0)', duration: 0.75, ease: 'power4.inOut',
        onStart: () => { if (tanyaRef.current) scramble(tanyaRef.current, 'Tanya', 0) },
        onComplete: () => { if (tanyaRef.current) gsap.set(tanyaRef.current, { clipPath: 'none' }) },
      },
      '-=0.1'
    )

    // MISTRY clip from right + scramble
    tl.fromTo(mistryRef.current,
      { clipPath: 'inset(0 0 0 100%)', opacity: 1 },
      {
        clipPath: 'inset(0 0 0 0%)', duration: 0.75, ease: 'power4.inOut',
        onStart: () => { if (mistryRef.current) scramble(mistryRef.current, 'Mistry', 100) },
        onComplete: () => { if (mistryRef.current) gsap.set(mistryRef.current, { clipPath: 'none' }) },
      },
      '<'
    )

    tl.fromTo(
      [introRef.current, actionsRef.current, socialsRef.current],
      { y: 26, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12 },
      '+=0.3'
    )
  }, [])

  // Spotlight
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect()
      section.style.setProperty('--mx', `${e.clientX - r.left}px`)
      section.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    section.addEventListener('mousemove', onMove)
    return () => section.removeEventListener('mousemove', onMove)
  }, [])

  // Magnetic buttons
  useEffect(() => {
    const btns = [primaryBtn.current, ghostBtn.current]
    const cleanups = btns.map(el => {
      if (!el) return
      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        gsap.to(el, {
          x: (e.clientX - r.left - r.width  / 2) * 0.3,
          y: (e.clientY - r.top  - r.height / 2) * 0.3,
          duration: 0.4, ease: 'power2.out',
        })
      }
      const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
    })
    return () => cleanups.forEach(c => c?.())
  }, [])

  return (
    <section ref={sectionRef} className="landing" id="home">
      <div className="landing__grid-bg" aria-hidden="true" />
      <div className="landing__spotlight" aria-hidden="true" />
      <div className="landing__blob landing__blob--1" aria-hidden="true" />
      <div className="landing__blob landing__blob--2" aria-hidden="true" />

      <div className="landing__particles" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, i) => (
          <span key={i} className="landing__particle" style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      <div className="landing__pipeline" aria-hidden="true">
        <svg viewBox="0 0 760 460" role="presentation">
          <defs>
            <linearGradient id="signal-line" x1="0" x2="1">
              <stop offset="0" stopColor="#ff9b85"/><stop offset=".55" stopColor="#f48fb1"/><stop offset="1" stopColor="#c9a7eb"/>
            </linearGradient>
            <filter id="signal-glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          <path className="landing__pipeline-path landing__pipeline-path--ghost" d="M30 90 C160 40 190 220 320 190 S500 110 720 190"/>
          <path className="landing__pipeline-path" d="M30 90 C160 40 190 220 320 190 S500 110 720 190"/>
          <path className="landing__pipeline-path landing__pipeline-path--second" d="M40 355 C180 430 220 250 350 295 S520 390 720 300"/>
          <g className="landing__pipeline-nodes">
            <g transform="translate(55 73)"><circle r="20"/><text y="4">01</text></g>
            <g transform="translate(322 190)"><circle r="28"/><text y="4">ETL</text></g>
            <g transform="translate(705 188)"><circle r="22"/><text y="4">DB</text></g>
            <g transform="translate(58 363)"><circle r="18"/><text y="4">API</text></g>
            <g transform="translate(351 296)"><circle r="25"/><text y="4">SQL</text></g>
            <g transform="translate(705 302)"><circle r="20"/><text y="4">UI</text></g>
          </g>
          {Array.from({ length: 9 }).map((_, i) => <circle key={i} className="landing__signal" r="4" style={{ '--delay': `${i * -0.45}s` } as React.CSSProperties}><animateMotion dur="4.6s" repeatCount="indefinite" path={i % 2 ? 'M30 90 C160 40 190 220 320 190 S500 110 720 190' : 'M40 355 C180 430 220 250 350 295 S520 390 720 300'}/></circle>)}
        </svg>
        <span className="landing__pipeline-label landing__pipeline-label--in">RAW SIGNALS</span>
        <span className="landing__pipeline-label landing__pipeline-label--out">USEFUL SYSTEMS</span>
      </div>

      <div className="landing__inner">
        <div ref={badgeRef} className="landing__badge">
          <span className="landing__badge-dot" />
          MS CS @ Northeastern · TA · Open to full-time roles
        </div>

        <h1 className="landing__name">
          <span ref={tanyaRef} className="landing__name-word">Tanya</span>{' '}
          <span ref={mistryRef} className="landing__name-word landing__name-word--italic">Mistry</span>
        </h1>

        <p className="landing__eyebrow">Data Engineer · Software Engineer, Data Platforms</p>
        <p ref={introRef} className="landing__intro">I build <span className="landing__intro-em">reliable data pipelines</span>, backend systems, and software that makes complex data useful.</p>

        <div ref={actionsRef} className="landing__actions">
          <a ref={primaryBtn} href="#work" className="landing__btn landing__btn--primary">
            View my work <FiArrowUpRight />
          </a>
          <a ref={ghostBtn} href="#contact" className="landing__btn landing__btn--ghost">
            Get in touch
          </a>
        </div>

        <div ref={socialsRef} className="landing__socials">
          <a href="https://github.com/tanyamistry" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub /></a>
          <a href="https://www.linkedin.com/in/tanya-mistry/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
          <a href="mailto:tanyamistry21@gmail.com" aria-label="Email"><FiMail /></a>
        </div>
      </div>

      {/* Full-width marquee anchor */}
      <div className="landing__marquee" aria-hidden="true">
        <div className="landing__marquee-track">
          {[...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
            <span key={i} className="landing__marquee-item">
              {w}<span className="landing__marquee-star">✦</span>
            </span>
          ))}
        </div>
      </div>

      <a href="#about" className="landing__scroll-indicator" aria-label="Scroll down">
        <FiArrowDown />
      </a>
    </section>
  )
}
