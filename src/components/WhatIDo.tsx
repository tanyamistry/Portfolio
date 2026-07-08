import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/WhatIDo.css'
import { HiOutlineDatabase } from 'react-icons/hi'
import { TbBrain } from 'react-icons/tb'
import { LuCode } from 'react-icons/lu'
import type { IconType } from 'react-icons'

gsap.registerPlugin(ScrollTrigger)

interface Service {
  Icon: IconType
  title: string
  description: string
  techs: string[]
}

const services: Service[] = [
  {
    Icon: HiOutlineDatabase,
    title: 'Pipelines & Streaming',
    description:
      'I design the path from raw input to trusted output: event ingestion, transformation, storage, orchestration, and the observability that keeps it dependable.',
    techs: ['Apache Kafka', 'Apache Spark', 'PostgreSQL', 'Snowflake', 'AWS Glue', 'Docker'],
  },
  {
    Icon: TbBrain,
    title: 'Applied Intelligence',
    description:
      'I use ML and computer vision where they create a clearer product—not as decoration. Models become useful when the surrounding data and interface are thoughtfully engineered.',
    techs: ['Python', 'Scikit-learn', 'TensorFlow', 'OpenCV', 'EasyOCR', 'Ollama'],
  },
  {
    Icon: LuCode,
    title: 'Backend & Product Systems',
    description:
      'I connect APIs, databases, authentication, and interfaces into tools people can actually use, from Canvas LTI integrations to live operational dashboards.',
    techs: ['React', 'Next.js', 'Node.js', 'Express', 'PostgreSQL', 'Streamlit'],
  },
]

export default function WhatIDo() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const cardsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading word-by-word reveal
      if (headingRef.current) {
        const words = headingRef.current.textContent?.split(' ') || []
        headingRef.current.innerHTML = words
          .map(w => `<span class="reveal-word"><span class="reveal-inner">${w}</span></span>`)
          .join(' ')
        gsap.fromTo(
          headingRef.current.querySelectorAll('.reveal-inner'),
          { y: '100%' },
          {
            y: '0%', duration: 0.7, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
          }
        )
      }

      // Cards stagger in
      if (cardsRef.current?.children) {
        gsap.fromTo(
          Array.from(cardsRef.current.children),
          { y: 60, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.85, ease: 'power3.out', stagger: 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
          }
        )
      }

      // Icon spin on scroll enter
      if (cardsRef.current) {
        cardsRef.current.querySelectorAll('.whatido__card-icon').forEach((icon, i) => {
          gsap.fromTo(icon,
            { rotate: -180, opacity: 0, scale: 0.5 },
            {
              rotate: 0, opacity: 1, scale: 1,
              duration: 0.7, ease: 'back.out(1.8)',
              delay: i * 0.15,
              scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
            }
          )
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="whatido" id="whatido">
      <div className="section-head">
        <span className="section-num">02</span>
        <span className="section-name">What I Do</span>
        <span className="section-rule" />
      </div>
      <h2 ref={headingRef} className="whatido__heading">My Expertise</h2>
      <div ref={cardsRef} className="whatido__cards">
        {services.map(s => (
          <div key={s.title} className="whatido__card" data-hoverable>
            <div className="whatido__card-icon">
              <s.Icon />
            </div>
            <h3 className="whatido__card-title">{s.title}</h3>
            <p className="whatido__card-desc">{s.description}</p>
            <div className="whatido__card-techs">
              {s.techs.map(t => (
                <span key={t} className="whatido__card-tech">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
