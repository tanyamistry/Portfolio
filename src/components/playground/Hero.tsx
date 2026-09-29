import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { FiArrowDown, FiArrowUpRight, FiGithub, FiLinkedin, FiMail, FiMove, FiRefreshCw } from 'react-icons/fi'

const LabScene = lazy(() => import('./LabScene'))

function LabFallback() {
  return <div className="lab-fallback" aria-hidden="true"><div className="fallback-monitor"><span>tanya@playground:~</span><strong>hello,<br /><em>world.</em></strong><p>ideas → code → impact</p></div><div className="fallback-stand" /><div className="fallback-keyboard">⌘ &nbsp; · &nbsp; · &nbsp; · &nbsp; · &nbsp; · &nbsp; ↵</div><span className="fallback-plant">✳</span></div>
}

class SceneBoundary extends Component<{ children: ReactNode; onFallback: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onFallback() }
  render() { return this.state.failed ? <LabFallback /> : this.props.children }
}

export default function Hero({ motion }: { motion: boolean }) {
  const [party, setParty] = useState(false)
  const [sceneKey, setSceneKey] = useState(0)
  const [sceneAvailable, setSceneAvailable] = useState(true)
  const lab = useRef<HTMLDivElement>(null)
  const [sceneVisible, setSceneVisible] = useState(true)
  const [pageVisible, setPageVisible] = useState(!document.hidden)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => setSceneVisible(entries[0].isIntersecting))
    if (lab.current) observer.observe(lab.current)
    const onVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility) }
  }, [])
  return <section className="hero" id="home">
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" />
    <div className="hero-inner content-width">
      <div className="hero-copy">
        <div className="eyebrow hero-eyebrow"><span className="status-dot" /> OPEN TO NEW OPPORTUNITIES</div>
        <p className="hero-hello">Hey there, I’m <span className="hello-spark">✧</span></p>
        <h1>Tanya<br /><span>Mistry<span className="name-period">.</span></span></h1>
        <div className="role-line"><span>DATA ENGINEER</span><i /> <span>SOFTWARE BUILDER</span></div>
        <p className="hero-description">Turning messy data into meaningful things.<br />A little logic. A lot of curiosity. Always building.</p>
        <div className="hero-actions"><a href="#work" className="button button-lime">Explore my work <FiArrowUpRight /></a><a href="#contact" className="text-link">Let’s talk <FiArrowUpRight /></a></div>
        <div className="hero-socials"><a href="https://github.com/tanyamistry" target="_blank" rel="noreferrer" aria-label="Tanya on GitHub"><FiGithub /></a><a href="https://www.linkedin.com/in/tanya-mistry/" target="_blank" rel="noreferrer" aria-label="Tanya on LinkedIn"><FiLinkedin /></a><a href="mailto:tanyamistry21@gmail.com" aria-label="Email Tanya"><FiMail /></a><span className="social-divider" /><span>BASED IN BOSTON, MA</span></div>
      </div>
      <div ref={lab} className={`hero-lab ${party ? 'party-mode' : ''}`}>
        <div className="lab-coordinate mono">FIG. 01 — MY LITTLE CORNER OF THE INTERNET</div>
        <div className="lab-scene" role="img" aria-label={sceneAvailable ? 'Interactive 3D workspace with a lavender computer, keyboard, plant, coffee, and floating data shapes. Drag to rotate.' : 'Illustrated workspace with a computer displaying hello, world.'}>
          <SceneBoundary onFallback={() => setSceneAvailable(false)}><Suspense fallback={<LabFallback />}><LabScene key={sceneKey} motion={motion && sceneVisible && pageVisible} party={party} /></Suspense></SceneBoundary>
        </div>
        <div className="floating-label label-code"><span className="label-icon">&lt;/&gt;</span><div>built with curiosity<span>and a few cups of coffee</span></div></div>
        <button className="lab-sticker" onClick={() => setParty(value => !value)} aria-pressed={party} aria-label={party ? 'Turn off playground mode' : 'Turn on playground mode'}><span>{party ? 'PLAY MODE' : 'GOOD DATA'}</span><strong>{party ? '✹' : '☺'}</strong><span>{party ? 'ACTIVATED!' : 'GOOD ENERGY'}</span></button>
        <div className="lab-bottom"><span>{sceneAvailable ? <><FiMove /> Go on, give it a spin</> : 'A little workspace. A lot of possibilities.'}</span>{sceneAvailable && <button onClick={() => { setSceneKey(key => key + 1); setParty(false) }} aria-label="Reset 3D workspace"><FiRefreshCw /></button>}</div>
      </div>
    </div>
    <div className="hero-bottom content-width"><span className="mono">ENGINEERING WITH A HUMAN TOUCH.</span><a href="#about">SCROLL TO EXPLORE <FiArrowDown /></a><span className="mono">EST. CURIOUS</span></div>
  </section>
}
