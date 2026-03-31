import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/Work.css'
import { FiExternalLink } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

// 3D tilt on hover
function addTilt(el: HTMLElement) {
  const onMove = (e: MouseEvent) => {
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width  - 0.5
    const y = (e.clientY - r.top)  / r.height - 0.5
    gsap.to(el, {
      rotateY: x * 12,
      rotateX: -y * 10,
      scale: 1.03,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    })
  }
  const onLeave = () => gsap.to(el, { rotateY: 0, rotateX: 0, scale: 1, duration: 0.5, ease: 'power2.out' })
  el.addEventListener('mousemove', onMove)
  el.addEventListener('mouseleave', onLeave)
  return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
}

const projects = [
  {
    title: 'Real-Time Crypto Market Pipeline',
    description:
      'Production-style streaming pipeline ingesting live trades from the Coinbase WebSocket API, processing 10K+ events/minute through Redpanda and Spark Structured Streaming. Features OHLCV candle aggregation and an auto-refreshing Streamlit dashboard.',
    techs: ['Python', 'Kafka', 'Apache Spark', 'PostgreSQL', 'Docker', 'Streamlit'],
    link: 'https://github.com/tanyamistry/streaming-market-pipeline',
    accent: '#5eead4',
    featured: true,
  },
  {
    title: 'DQN Reinforcement Learning Agent',
    description:
      'Deep Q-Network agent trained to play a shape-sorting game. Implements a full RL pipeline , environment, replay buffer, epsilon-greedy exploration, and model checkpointing.',
    techs: ['Python', 'Deep Q-Network', 'RL', 'PyTorch'],
    link: 'https://github.com/tanyamistry/FOAI-Project',
    accent: '#818cf8',
    featured: true,
  },
  {
    title: 'Spoof Image Detection',
    description:
      'Binary image classifier detecting spoofed images using OpenCV preprocessing with LBP/HOG features. Logistic Regression model tuned with decision threshold, evaluated on precision, recall, and F1.',
    techs: ['Python', 'OpenCV', 'Scikit-learn', 'NumPy'],
    link: 'https://github.com/tanyamistry/spoof-image-detection',
    accent: '#fb923c',
    featured: false,
  },
  {
    title: 'Automated Chart Insights Generator',
    description:
      'Automates generation of chart summaries by extracting axis labels and key data points using OpenCV, structuring them into JSON, and calling LLM endpoints through the Replicate API for accessible insights.',
    techs: ['Python', 'OpenCV', 'Replicate API', 'JSON', 'LLM'],
    link: null,
    accent: '#34d399',
    featured: false,
  },
  {
    title: 'YouTube Analytics ETL Pipeline',
    description:
      'End-to-end ETL pipeline processing 50K+ records from YouTube trending data. Automated with AWS Glue, stored in S3, queried via Athena, visualized in Power BI.',
    techs: ['Python', 'AWS S3', 'AWS Glue', 'Athena', 'Power BI'],
    link: 'https://github.com/tanyamistry',
    accent: '#60a5fa',
    featured: false,
  },
  {
    title: 'Retail Sales BI Dashboard',
    description:
      'Power BI dashboard for BlinkIT grocery retail data with KPI cards, sales breakdowns by item and outlet, rating analysis, and interactive slicers.',
    techs: ['Power BI', 'DAX', 'Data Modeling', 'Excel'],
    link: 'https://github.com/tanyamistry/Retail-Sales---Power-BI',
    accent: '#f472b6',
    featured: false,
  },
  {
    title: 'Netflix Data Analysis',
    description:
      'Exploratory analysis of Netflix content data using Python , uncovering trends in genres, release years, ratings, and content distribution across countries to surface insights about streaming strategy.',
    techs: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter'],
    link: 'https://github.com/tanyamistry/netflix-analysis',
    accent: '#ef4444',
    featured: false,
  },
  {
    title: 'Spotify Data Analysis',
    description:
      'Analysis of Spotify track data to identify patterns in audio features (tempo, energy, danceability) and their correlation with song popularity across genres and time periods.',
    techs: ['Python', 'Pandas', 'Plotly', 'Seaborn', 'Jupyter'],
    link: 'https://github.com/tanyamistry/spotify-analysis',
    accent: '#4ade80',
    featured: false,
  },
]

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (gridRef.current?.children) {
        gsap.fromTo(
          Array.from(gridRef.current.children),
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1,
            duration: 0.7, ease: 'power3.out', stagger: 0.08,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  // Attach 3D tilt to every card (desktop only)
  useEffect(() => {
    if (!gridRef.current || window.matchMedia('(hover: none)').matches) return
    const cleanups = Array.from(gridRef.current.children).map(el => addTilt(el as HTMLElement))
    return () => cleanups.forEach(c => c())
  }, [])

  return (
    <section ref={sectionRef} className="work" id="work">
      <div className="section-label">Projects</div>
      <h2 className="work__heading">Featured Work</h2>

      <div ref={gridRef} className="work__grid">
        {projects.map((p) => {
          const inner = (
            <>
              <div className="work__card-top">
                <span className="work__card-accent-bar" style={{ background: p.accent }} />
                {p.link && <FiExternalLink className="work__card-icon" style={{ color: p.accent }} />}
              </div>
              <h3 className="work__card-title">{p.title}</h3>
              <p className="work__card-desc">{p.description}</p>
              <div className="work__card-techs">
                {p.techs.map(t => (
                  <span
                    key={t}
                    className="work__card-tech"
                    style={{ borderColor: `${p.accent}35`, color: p.accent }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          )

          return p.link ? (
            <a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`work__card ${p.featured ? 'work__card--featured' : ''}`}
              data-hoverable
            >
              {inner}
            </a>
          ) : (
            <div
              key={p.title}
              className={`work__card ${p.featured ? 'work__card--featured' : ''}`}
            >
              {inner}
            </div>
          )
        })}
      </div>
    </section>
  )
}
