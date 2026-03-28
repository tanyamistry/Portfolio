import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './styles/Landing.css'
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

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

// Split text into letter spans for per-letter animation
function splitLetters(el: HTMLElement) {
  const text = el.textContent || ''
  el.innerHTML = text
    .split('')
    .map(c => `<span class="letter">${c}</span>`)
    .join('')
  return Array.from(el.querySelectorAll<HTMLElement>('.letter'))
}

export default function Landing() {
  const sectionRef  = useRef<HTMLElement>(null)
  const hiRef       = useRef<HTMLDivElement>(null)
  const nameRowRef  = useRef<HTMLDivElement>(null)
  const tanyaRef    = useRef<HTMLSpanElement>(null)
  const mistryRef   = useRef<HTMLSpanElement>(null)
  const avatarRef   = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const metaRef     = useRef<HTMLDivElement>(null)
  const actionsRef  = useRef<HTMLDivElement>(null)
  const primaryBtn  = useRef<HTMLAnchorElement>(null)
  const ghostBtn    = useRef<HTMLAnchorElement>(null)


  // Main entrance timeline
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.15 })

    // "Hi, I'm" letter-by-letter reveal
    if (hiRef.current) {
      const letters = splitLetters(hiRef.current)
      tl.fromTo(letters,
        { y: 40, opacity: 0, rotateX: -90 },
        {
          y: 0, opacity: 1, rotateX: 0,
          duration: 0.5, ease: 'back.out(2)',
          stagger: 0.04,
        }
      )
    }


    // Avatar pops in with spring
    tl.fromTo(avatarRef.current,
      { scale: 0, opacity: 0, rotate: -10 },
      { scale: 1, opacity: 1, rotate: 0, duration: 1, ease: 'elastic.out(1, 0.55)' },
      '-=0.1'
    )

    // TANYA clips in from left + scramble
    tl.fromTo(tanyaRef.current,
      { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.75, ease: 'power4.inOut',
        onStart: () => { if (tanyaRef.current) scramble(tanyaRef.current, 'TANYA', 0) },
      },
      '<-=0.3'
    )

    // MISTRY clips in from right + scramble
    tl.fromTo(mistryRef.current,
      { clipPath: 'inset(0 0 0 100%)', opacity: 1 },
      {
        clipPath: 'inset(0 0 0 0%)',
        duration: 0.75, ease: 'power4.inOut',
        onStart: () => { if (mistryRef.current) scramble(mistryRef.current, 'MISTRY', 100) },
      },
      '<'
    )

    // Subtitle, meta, actions fade up with stagger
    tl.fromTo(
      [subtitleRef.current, metaRef.current, actionsRef.current],
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.12 },
      '-=0.2'
    )
  }, [])

  // Spotlight that follows cursor in the hero section
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
          x: (e.clientX - r.left - r.width  / 2) * 0.35,
          y: (e.clientY - r.top  - r.height / 2) * 0.35,
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

  // Avatar tilt on global mouse
  useEffect(() => {
    const wrap = avatarRef.current
    if (!wrap) return
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth  / 2
      const cy = window.innerHeight / 2
      const dx = (e.clientX - cx) / cx
      const dy = (e.clientY - cy) / cy
      gsap.to(wrap, {
        rotateY: dx * 12,
        rotateX: -dy * 8,
        duration: 0.6, ease: 'power2.out',
        transformPerspective: 800,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section ref={sectionRef} className="landing" id="home">

      {/* Animated background grid */}
      <div className="landing__grid-bg" aria-hidden="true" />

      {/* Spotlight overlay */}
      <div className="landing__spotlight" aria-hidden="true" />

      {/* Ambient blobs */}
      <div className="landing__blob landing__blob--1" aria-hidden="true" />
      <div className="landing__blob landing__blob--2" aria-hidden="true" />

      {/* Row 1 – greeting badge */}
      <div ref={hiRef} className="landing__hi">
        hi, i'm
      </div>


      {/* Row 2 – TANYA [avatar] MISTRY */}
      <div ref={nameRowRef} className="landing__name-row">
        <span ref={tanyaRef} className="landing__name landing__name--left">TANYA</span>

        <div ref={avatarRef} className="landing__avatar-wrap">
          <div className="landing__avatar-ring" aria-hidden="true" />
          <div className="landing__avatar-glow" aria-hidden="true" />
          <img src="/avatar.png" alt="Tanya Mistry" className="landing__avatar-img" />
        </div>

        <span ref={mistryRef} className="landing__name landing__name--right">MISTRY</span>
      </div>

      {/* Row 3 – subtitle */}
      <p ref={subtitleRef} className="landing__subtitle">
        Data Engineer <span className="landing__sep">·</span> Software Developer
      </p>

      {/* Row 4 – meta */}
      <div ref={metaRef} className="landing__meta">
        <span>MS CS @ Northeastern University</span>
        <span className="landing__meta-sep">|</span>
        <span>Boston, MA</span>
      </div>

      {/* Row 5 – actions */}
      <div ref={actionsRef} className="landing__actions">
        <a ref={primaryBtn} href="#work"    className="landing__btn landing__btn--primary">View My Work</a>
        <a ref={ghostBtn}   href="#contact" className="landing__btn landing__btn--ghost">Get In Touch</a>
      </div>

      {/* Row 6 – socials */}
      <div className="landing__socials">
        <a href="https://github.com/tanyamistry"           target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FiGithub /></a>
        <a href="https://www.linkedin.com/in/tanya-mistry/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FiLinkedin /></a>
        <a href="mailto:tanyamistry21@gmail.com" aria-label="Email"><FiMail /></a>
      </div>

      <a href="#about" className="landing__scroll-indicator" aria-label="Scroll down">
        <FiArrowDown />
      </a>
    </section>
  )
}
