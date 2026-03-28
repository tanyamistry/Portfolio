import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/Career.css'

gsap.registerPlugin(ScrollTrigger)

const jobs = [
  {
    title: 'Engineering Co-op',
    company: 'Northeastern University (EDGE)',
    period: 'Jan 2025 - Present',
    current: true,
    bullets: [
      'Architected an ETL pipeline to migrate course content to Canvas via REST APIs, reducing manual migration effort by 25%',
      'Designed a Canvas LTI-based interactive page builder using React + Vite, Node.js/Express, and PostgreSQL for dynamic page rendering',
    ],
  },
  {
    title: 'Data Analyst Intern',
    company: 'One Hand Clap',
    period: 'Jun 2023 - May 2024',
    current: false,
    bullets: [
      'Built automated reporting workflows with ListenFirst API, SQL, and Excel tracking engagement metrics for Amazon Prime Video',
      'Developed Tableau dashboards comparing Prime Video and Netflix by content type, contributing to an 8% lift in engagement',
      'Analyzed competitor trends for Bumble India using Python (Pandas, Matplotlib) to identify popular content patterns',
    ],
  },
  {
    title: 'Business Intelligence Intern',
    company: 'Your Career Folio',
    period: 'Sep 2022 - Nov 2022',
    current: false,
    bullets: [
      'Researched and benchmarked 10+ competitor platforms; findings shaped new client offerings and drove a 12% increase in platform usage',
      'Leveraged MS Power BI DAX to develop 5 BI solutions improving career guidance offerings',
    ],
  },
]

export default function Career() {
  const sectionRef  = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw the vertical line top → bottom
      gsap.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: 'top center' },
        {
          scaleY: 1, duration: 1.4, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        }
      )

      // Rows animate in with alternating direction
      if (timelineRef.current?.children) {
        Array.from(timelineRef.current.children).forEach((row, i) => {
          gsap.fromTo(row,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
              delay: i * 0.15,
              scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
            }
          )
        })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="career" id="career">
      <div className="section-label">Experience</div>
      <h2 className="career__heading">Career Timeline</h2>

      {/* Animated vertical line sitting behind the rows */}
      <div className="career__line-track">
        <div ref={lineRef} className="career__line-fill" />
      </div>

      <div ref={timelineRef} className="career__timeline">
        {jobs.map((job, i) => (
          <div key={i} className="career__row">
            {/* LEFT - date */}
            <div className="career__left">
              <span className="career__period">
                {job.current && <span className="career__now">Now</span>}
                {job.period}
              </span>
            </div>

            {/* CENTER - line + dot */}
            <div className="career__center">
              <div className={`career__dot ${job.current ? 'career__dot--active' : ''}`} />
            </div>

            {/* RIGHT - content */}
            <div className="career__right">
              <div className="career__card">
                <h3 className="career__title">{job.title}</h3>
                <p className="career__company">{job.company}</p>
                <ul className="career__bullets">
                  {job.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
