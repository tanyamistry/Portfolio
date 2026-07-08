import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/About.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { display: '3.67', suffix: '',  label: 'GPA',              numeric: 3.67, decimals: 2 },
  { display: '2',    suffix: '',  label: 'TA roles',          numeric: 2,    decimals: 0 },
  { display: '3',    suffix: '',  label: 'Internships',       numeric: 3,    decimals: 0 },
  { display: '2026', suffix: '',  label: 'MS CS, Dec',       numeric: 2026, decimals: 0 },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const leadRef    = useRef<HTMLHeadingElement>(null)
  const introRef   = useRef<HTMLParagraphElement>(null)
  const statsRef   = useRef<HTMLDivElement>(null)
  const tagRef     = useRef<HTMLDivElement>(null)
  const valueRefs  = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (leadRef.current) {
        gsap.fromTo(
          leadRef.current.querySelectorAll('.about__lead-word'),
          { y: '110%' },
          {
            y: '0%', duration: 0.7, ease: 'power3.out', stagger: 0.04,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
            onComplete: () => {
              leadRef.current?.querySelectorAll('.about__lead-wrap').forEach(
                w => ((w as HTMLElement).style.overflow = 'visible')
              )
            },
          }
        )
      }

      gsap.fromTo([introRef.current, tagRef.current],
        { y: 24, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: introRef.current, start: 'top 88%' },
        }
      )

      if (statsRef.current?.children) {
        gsap.fromTo(
          Array.from(statsRef.current.children),
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.6, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: statsRef.current, start: 'top 90%' },
          }
        )
      }

      stats.forEach((s, i) => {
        const el = valueRefs.current[i]
        if (!el) return
        const obj = { val: s.numeric === 2026 ? 2020 : 0 }
        gsap.to(obj, {
          val: s.numeric,
          duration: s.numeric === 2026 ? 1 : 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            const v = s.decimals > 0 ? obj.val.toFixed(s.decimals) : Math.round(obj.val).toString()
            el.textContent = v + s.suffix
          },
          scrollTrigger: { trigger: statsRef.current, start: 'top 90%' },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  const leadParts = [
    { t: 'I build reliable ', em: false },
    { t: 'data systems', em: true },
    { t: ' and software that turn raw information into ', em: false },
    { t: 'useful products', em: true },
    { t: '.', em: false },
  ]

  return (
    <section ref={sectionRef} className="about" id="about">
      <div className="section-head">
        <span className="section-num">01</span>
        <span className="section-name">About</span>
        <span className="section-rule" />
      </div>

      <h2 ref={leadRef} className="about__lead">
        {leadParts.map((p, i) =>
          p.t.split(' ').map((w, j, arr) => (
            <span key={`${i}-${j}`} className="about__lead-wrap">
              <span className={`about__lead-word ${p.em ? 'about__lead-word--em' : ''}`}>
                {w}{j < arr.length - 1 ? ' ' : ''}
              </span>
            </span>
          ))
        )}
      </h2>

      <p ref={introRef} className="about__intro">
        I&apos;m an MS Computer Science student at Northeastern University with experience in data
        engineering, backend development, analytics, applied machine learning, and technical teaching.
      </p>

      <div ref={statsRef} className="about__stats">
        {stats.map((s, i) => (
          <div key={s.label} className="about__stat">
            <span ref={el => { valueRefs.current[i] = el }} className="about__stat-value">
              {s.display}
            </span>
            <span className="about__stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div ref={tagRef} className="about__tag">
        <span className="about__tag-dot" />
        Teaching Assistant · Engineering Co-op at Northeastern EDGE · MS Computer Science, graduating December 2026
      </div>
    </section>
  )
}
