import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/About.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '3.6',  display: '3.6',  suffix: '',  label: 'GPA at Northeastern', numeric: 3.6,  decimals: 1 },
  { value: '3+',   display: '3+',   suffix: '+', label: 'Years Experience',     numeric: 3,    decimals: 0 },
  { value: '8+',   display: '8+',   suffix: '+', label: 'Projects Built',       numeric: 8,    decimals: 0 },
  { value: '2026', display: '2026', suffix: '',  label: 'Graduating MS CS',     numeric: 2026, decimals: 0 },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef    = useRef<HTMLDivElement>(null)
  const statsRef   = useRef<HTMLDivElement>(null)
  const valueRefs  = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text slide in
      gsap.fromTo(textRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 76%' },
        }
      )

      // Stat cards stagger in
      if (statsRef.current?.children) {
        gsap.fromTo(
          Array.from(statsRef.current.children),
          { y: 40, opacity: 0, scale: 0.92 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.7, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
          }
        )
      }

      // Number counters
      stats.forEach((s, i) => {
        const el = valueRefs.current[i]
        if (!el) return
        const obj = { val: s.numeric === 2026 ? 2020 : 0 }
        gsap.to(obj, {
          val: s.numeric,
          duration: s.numeric === 2026 ? 1 : 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            const v = s.decimals > 0
              ? obj.val.toFixed(s.decimals)
              : Math.round(obj.val).toString()
            el.textContent = v + s.suffix
          },
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
        })
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="about" id="about">
      <div className="section-label">About</div>
      <div className="about__inner">
        <div ref={textRef} className="about__text">
          <h2 className="about__heading">
            Building data-driven<br />
            <span className="about__heading--teal">solutions at scale</span>
          </h2>
          <p className="about__body">
            I'm a graduate student at <strong>Northeastern University</strong> pursuing my MS in Computer
            Science (Dec 2026), with a BTech in Information Technology from the University of Mumbai.
          </p>
          <p className="about__body">
            I specialize in building <strong>real-time data pipelines</strong>,{' '}
            <strong>machine learning systems</strong>, and <strong>full-stack applications</strong>.
            From Kafka streaming and Spark transformations to cloud-native ETL workflows on AWS — I
            enjoy turning raw data into actionable insights.
          </p>
          <p className="about__body">
            Currently an <strong>Engineering Co-op at Northeastern University EDGE</strong>, where I
            architect ETL pipelines and build LTI-integrated learning tools with React, Node.js, and
            PostgreSQL.
          </p>
        </div>

        <div ref={statsRef} className="about__stats">
          {stats.map((s, i) => (
            <div key={s.label} className="about__stat" data-hoverable>
              <span
                ref={el => { valueRefs.current[i] = el }}
                className="about__stat-value"
              >
                {s.display}
              </span>
              <span className="about__stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
