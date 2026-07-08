import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiArrowUpRight, FiGithub } from 'react-icons/fi'
import './styles/Work.css'

gsap.registerPlugin(ScrollTrigger)

const featured = [
  {
    number: '01', kicker: 'Streaming data platform', title: 'Real-Time Crypto Market Pipeline',
    statement: 'A streaming platform for processing and analyzing live market data.',
    description: 'A reproducible streaming stack that ingests Coinbase trades, processes 10K+ events per minute, aggregates event-time OHLCV candles, and serves a live dashboard.',
    result: '10K+', resultLabel: 'events / minute',
    techs: ['Python', 'Redpanda / Kafka', 'Spark', 'PostgreSQL', 'Docker'],
    link: 'https://github.com/tanyamistry/streaming-market-pipeline', accent: 'coral', architecture: true,
  },
  {
    number: '02', kicker: 'Computer vision + local AI', title: 'Automated Chart Insights',
    statement: 'A local computer-vision workflow that extracts and explains chart insights.',
    description: 'An OpenCV and EasyOCR pipeline detects chart structure and labels before a local LLaVA model produces plain-English findings, trends, anomalies, and JSON output.',
    result: 'Local', resultLabel: 'privacy-first inference',
    techs: ['OpenCV', 'EasyOCR', 'LLaVA', 'Ollama', 'Streamlit'],
    link: 'https://github.com/tanyamistry/automated-chart-insights-generator', accent: 'rose',
  },
  {
    number: '03', kicker: 'Computer vision classifier', title: 'Spoof Image Detection',
    statement: 'A baseline vision system for identifying spoofed image inputs.',
    description: 'An OpenCV preprocessing pipeline extracts LBP and HOG features, then trains a tuned scikit-learn classifier evaluated with precision, recall, F1, and confusion-matrix analysis.',
    result: 'CV', resultLabel: 'image classification',
    techs: ['Python', 'OpenCV', 'LBP / HOG', 'Scikit-learn'],
    link: 'https://github.com/tanyamistry/spoof-image-detection', accent: 'lavender',
  },
]

const archive = [
  ['YouTube Analytics ETL', 'AWS Glue · S3 · Athena · Power BI', '50K+ records', 'https://github.com/tanyamistry'],
  ['DQN Learning Agent', 'Python · PyTorch · Reinforcement learning', 'End-to-end RL system', 'https://github.com/tanyamistry/FOAI-Project'],
  ['Retail Sales BI', 'Power BI · DAX · Data modeling', 'Interactive dashboard', 'https://github.com/tanyamistry/Retail-Sales---Power-BI'],
] as const

function Architecture() {
  const nodes = ['Coinbase', 'Redpanda', 'Spark', 'Postgres', 'Dashboard']
  return <div className="architecture" aria-label="Architecture: Coinbase to Redpanda to Spark to Postgres to dashboard">
    {nodes.map((node, index) => <div className="architecture__step" key={node}>
      <span className="architecture__node">{node}</span>
      {index < nodes.length - 1 && <span className="architecture__line"><i /></span>}
    </div>)}
  </div>
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.project').forEach(project => {
        gsap.fromTo(project, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: project, start: 'top 82%' } })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return <section ref={sectionRef} className="work" id="work">
    <div className="section-head"><span className="section-num">04</span><span className="section-name">Projects</span><span className="section-rule" /></div>
    <div className="work__intro"><h2>Engineering projects.</h2><p>Hands-on systems that show my experience with streaming data, machine learning, computer vision, databases, and production-oriented tooling.</p></div>
    <div className="work__featured">
      {featured.map((project, index) => <article className={`project project--${project.accent}`} key={project.title}>
        <div className="project__rail"><span>{project.number}</span><span>{project.kicker}</span></div>
        <div className="project__body">
          <h3>{project.title}</h3><p className="project__statement">{project.statement}</p><p className="project__description">{project.description}</p>
          {project.architecture && <Architecture />}
          <div className="project__techs">{project.techs.map(tech => <span key={tech}>{tech}</span>)}</div>
          <a href={project.link} target="_blank" rel="noreferrer" className="project__link"><FiGithub /> Explore the build <FiArrowUpRight /></a>
        </div>
        <div className="project__result"><strong>{project.result}</strong><span>{project.resultLabel}</span><i>{String(index + 1).padStart(2, '0')}</i></div>
      </article>)}
    </div>
    <div className="archive"><div className="archive__heading"><span>Project archive</span><span>More experiments, analyses &amp; builds</span></div>
      {archive.map(([title, stack, result, link]) => <a key={title} href={link} target="_blank" rel="noreferrer" className="archive__row"><strong>{title}</strong><span>{stack}</span><span>{result}</span><FiArrowUpRight /></a>)}
    </div>
  </section>
}
