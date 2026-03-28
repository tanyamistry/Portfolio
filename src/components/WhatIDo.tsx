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
    title: 'Data Engineering',
    description:
      'Building robust ETL/ELT pipelines and real-time streaming architectures. From Kafka ingestion to Spark transformations, cloud data warehouses, and containerized deployments with Docker.',
    techs: ['Apache Kafka', 'Apache Spark', 'PostgreSQL', 'Snowflake', 'AWS Glue', 'Docker'],
  },
  {
    Icon: TbBrain,
    title: 'Machine Learning & Analytics',
    description:
      'Developing predictive models, computer vision classifiers, and data analysis workflows. Transforming complex datasets into clear, actionable insights with interactive visualization tools.',
    techs: ['Python', 'Scikit-learn', 'TensorFlow', 'OpenCV', 'Pandas', 'Tableau'],
  },
  {
    Icon: LuCode,
    title: 'Full-Stack Development',
    description:
      'Designing and building end-to-end web applications with modern frameworks. REST APIs, interactive dashboards, LTI integrations, and cloud-native deployments on AWS.',
    techs: ['React', 'Node.js', 'Express', 'PostgreSQL', 'AWS Lambda', 'Streamlit'],
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
      <div className="section-label">What I Do</div>
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
