import { useState } from 'react'
import { FiArrowUpRight, FiCode, FiCpu, FiDatabase, FiMapPin } from 'react-icons/fi'

const toolkits = [
  { name: 'Data & AI', icon: FiDatabase, tools: ['Python', 'SQL', 'Apache Spark', 'Kafka', 'PostgreSQL', 'pgvector', 'Snowflake', 'RAG', 'PyTorch', 'Pandas'] },
  { name: 'Development', icon: FiCode, tools: ['JavaScript', 'Java', 'React', 'Next.js', 'Node.js', 'Express', 'REST APIs', 'Git'] },
  { name: 'Cloud & tools', icon: FiCpu, tools: ['AWS S3', 'AWS Glue', 'Lambda', 'Athena', 'Docker', 'Tableau', 'Power BI', 'Streamlit', 'Plotly'] },
]

export default function About() {
  const [toolkit, setToolkit] = useState(0)
  return <section className="about-section section-pad" id="about">
    <div className="content-width">
      <div className="section-kicker"><span>01 / THE HUMAN BEHIND THE CODE</span><span className="little-star" aria-hidden="true">✳</span></div>
      <div className="about-grid">
        <div className="about-copy" data-reveal>
          <h2>Big on curiosity.<br /><span className="serif">Bigger on building.</span></h2>
          <p>I’m Tanya, a Computer Science master’s student at Northeastern University. I work at the intersection of <strong>data, software, and applied AI</strong>—making complicated systems a little more useful, and a lot more human.</p>
          <p>From migrating entire courses into Canvas to helping make clinical trials searchable, I like the kind of problems that start with <em>“there has to be a better way.”</em></p>
          <a className="text-link dark-link" href="/Tanya_Mistry_Resume.pdf" target="_blank" rel="noreferrer">The slightly more formal version <FiArrowUpRight /></a>
        </div>
        <div className="profile-board" data-reveal>
          <div className="profile-card"><span className="tape" aria-hidden="true" /><div className="profile-image"><span className="profile-spark" aria-hidden="true">✦</span><img src="/avatar.png" alt="Tanya’s illustrated avatar, wearing glasses and a brown jacket" width="548" height="730" loading="lazy" /><span className="profile-greeting">hello, internet!</span></div><div className="profile-caption"><span>Tanya, in a nutshell.</span><span>☺</span></div></div>
          <div className="location-sticker"><FiMapPin /> Boston, MA</div>
          <div className="degree-sticker"><span>IN MY</span><strong>MS CS</strong><span>ERA ✷ NORTHEASTERN</span></div>
        </div>
      </div>
      <div className="about-bottom" data-reveal>
        <div className="note-card"><span className="mono">THE WAY I THINK</span><p>Understand the problem.<br />Connect the dots.<br /><em>Build something that matters.</em></p><span className="note-doodle" aria-hidden="true">↳ ✧</span></div>
        <div className="toolkit"><div className="toolkit-heading"><h3>Good ideas. The right tools.</h3><span className="mono">MY EVERYDAY KIT</span></div><div className="toolkit-tabs" role="tablist" aria-label="Technical skill categories">{toolkits.map((item, i) => <button key={item.name} role="tab" id={`toolkit-tab-${i}`} aria-selected={toolkit === i} aria-controls="toolkit-panel" tabIndex={toolkit === i ? 0 : -1} className={toolkit === i ? 'selected' : ''} onClick={() => setToolkit(i)} onKeyDown={event => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 2 : (i + (event.key === 'ArrowRight' ? 1 : 2)) % 3; setToolkit(next); document.getElementById(`toolkit-tab-${next}`)?.focus() } }}><item.icon />{item.name}</button>)}</div><div className="toolkit-pills" role="tabpanel" id="toolkit-panel" aria-labelledby={`toolkit-tab-${toolkit}`} tabIndex={0}>{toolkits[toolkit].tools.map(tool => <span key={tool}>{tool}</span>)}</div></div>
      </div>
    </div>
  </section>
}
