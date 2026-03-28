import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/TechStack.css'
import Marquee from 'react-fast-marquee'

gsap.registerPlugin(ScrollTrigger)

const COLORS = ['#5eead4', '#818cf8', '#fb923c', '#34d399', '#60a5fa', '#f472b6', '#facc15']

const categories = [
  {
    label: 'Languages',
    techs: ['Python', 'SQL', 'Java', 'JavaScript', 'TypeScript', 'R'],
  },
  {
    label: 'Data Engineering',
    techs: ['Apache Kafka', 'Apache Spark', 'PostgreSQL', 'Snowflake', 'ETL Pipelines'],
  },
  {
    label: 'Cloud & DevOps',
    techs: ['AWS S3', 'AWS Glue', 'Athena', 'Lambda', 'Docker', 'Git'],
  },
  {
    label: 'ML / Data Science',
    techs: ['Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'OpenCV'],
  },
  {
    label: 'Visualization',
    techs: ['Tableau', 'Power BI', 'Streamlit', 'Plotly'],
  },
  {
    label: 'Web Development',
    techs: ['React', 'Node.js', 'Express', 'Vite'],
  },
]

const allTechs = categories.flatMap(c => c.techs)

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current?.children) {
        gsap.fromTo(
          Array.from(gridRef.current.children),
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.06,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 72%' },
          }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="techstack" id="techstack">
      <div className="section-label">Technologies</div>
      <h2 className="techstack__heading">Tech Stack</h2>
      <p className="techstack__sub">Tools and technologies I work with</p>

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
          </div>
        ))}
      </div>

      <div className="techstack__marquee-wrapper">
        <Marquee gradient={false} speed={36} pauseOnHover>
          {allTechs.map((t, i) => (
            <span key={i} className="techstack__tag" style={{ color: COLORS[i % COLORS.length] }}>
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
