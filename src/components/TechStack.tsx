import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/TechStack.css'

gsap.registerPlugin(ScrollTrigger)

const COLORS = ['#ec6a52', '#f48fb1', '#ef8e54', '#c178d6', '#e85d8a', '#d96a9e', '#e0a23c']

const categories = [
  { label: 'Core languages', techs: ['Python', 'SQL', 'Java', 'TypeScript'], proof: 'Used across streaming, ETL, APIs, and production-facing tools.' },
  { label: 'Pipelines & storage', techs: ['Kafka', 'Spark', 'PostgreSQL', 'Snowflake', 'ETL'], proof: 'Proven in a 10K+ events/min pipeline and Canvas migration system.' },
  { label: 'Cloud & operations', techs: ['AWS S3', 'Glue', 'Athena', 'Lambda', 'Docker'], proof: 'Applied to a 50K+ record analytics pipeline and reproducible deployments.' },
  { label: 'Backend & product', techs: ['React', 'Node.js', 'Express', 'REST APIs', 'Vite'], proof: 'Used to build LTI-integrated tools, dashboards, and API-driven workflows.' },
  { label: 'Applied ML', techs: ['PyTorch', 'Scikit-learn', 'OpenCV', 'Pandas', 'NumPy'], proof: 'Used in reinforcement learning, chart understanding, and vision classifiers.' },
  { label: 'Data communication', techs: ['Tableau', 'Power BI', 'Streamlit', 'Plotly'], proof: 'Used to make technical systems legible to operators and stakeholders.' },
]

export default function TechStack() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)
  const gridRef     = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading word reveal
      if (headingRef.current) {
        const words = headingRef.current.textContent?.split(' ') || []
        headingRef.current.innerHTML = words
          .map(w => `<span class="reveal-word"><span class="reveal-inner">${w}</span></span>`)
          .join(' ')
        gsap.fromTo(
          headingRef.current.querySelectorAll('.reveal-inner'),
          { y: '100%' },
          {
            y: '0%', duration: 0.7, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
          }
        )
      }

      // Category cards stagger in
      if (gridRef.current?.children) {
        gsap.fromTo(
          Array.from(gridRef.current.children),
          { y: 40, opacity: 0, scale: 0.93 },
          {
            y: 0, opacity: 1, scale: 1,
            duration: 0.65, ease: 'power3.out', stagger: 0.08,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
          }
        )
      }

      // Pills elastic pop in
      if (gridRef.current) {
        const pills = Array.from(gridRef.current.querySelectorAll('.techstack__pill'))
        gsap.fromTo(pills,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 0.5, ease: 'elastic.out(1, 0.5)', stagger: 0.025,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
          }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="techstack" id="techstack">
      <div className="section-head">
        <span className="section-num">05</span>
        <span className="section-name">Technologies</span>
        <span className="section-rule" />
      </div>
      <h2 ref={headingRef} className="techstack__heading">My toolkit</h2>
      <p className="techstack__sub">Capabilities first. Tools in context.</p>

      <div ref={gridRef} className="techstack__categories">
        {categories.map((cat, ci) => (
          <div key={cat.label} className="techstack__cat">
            <span className="techstack__cat-label" style={{ color: COLORS[ci % COLORS.length] }}>
              {cat.label}
            </span>
            <div className="techstack__cat-pills">
              {cat.techs.map((t, ti) => (
                <span
                  key={t}
                  className="techstack__pill"
                  style={{ '--accent': COLORS[(ci + ti) % COLORS.length] } as React.CSSProperties}
                  data-hoverable
                >
                  {t}
                </span>
              ))}
            </div>
            <p className="techstack__proof">{cat.proof}</p>
          </div>
        ))}
      </div>

    </section>
  )
}
