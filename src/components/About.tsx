import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/About.css'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const leadRef    = useRef<HTMLHeadingElement>(null)
  const introRef   = useRef<HTMLParagraphElement>(null)
  const tagRef     = useRef<HTMLDivElement>(null)

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

      <div ref={tagRef} className="about__tag">
        <span className="about__tag-dot" />
        Teaching Assistant · Engineering Co-op at Northeastern EDGE · MS Computer Science, graduating December 2026
      </div>
    </section>
  )
}
