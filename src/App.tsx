import { useEffect, useState } from 'react'
import { FiArrowUp, FiPause, FiPlay } from 'react-icons/fi'
import Navigation from './components/playground/Navigation'
import Hero from './components/playground/Hero'
import About from './components/playground/About'
import Projects from './components/playground/Projects'
import Journey from './components/playground/Journey'
import Contact from './components/playground/Contact'
import './App.css'

export default function App() {
  const [motion, setMotion] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [showTop, setShowTop] = useState(false)
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'on' : 'off'
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.08 })
    document.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element))
    const onScroll = () => setShowTop(window.scrollY > 800)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [motion])
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <Navigation />
    <main id="main">
      <Hero motion={motion} />
      <div className="ticker" aria-label="Data engineering, full-stack development, applied AI, creative problem solving">
        <div className="ticker-track" aria-hidden="true">
          {[0, 1, 2, 3].map(i => <span key={i}>DATA ENGINEERING <b>✳</b> FULL-STACK DEVELOPMENT <b>✳</b> APPLIED AI <b>✳</b> ENDLESS CURIOSITY <b>✳</b> </span>)}
        </div>
      </div>
      <About />
      <Projects />
      <Journey />
      <Contact />
    </main>
    <div className="floating-controls">
      <button className="motion-toggle" onClick={() => setMotion(value => !value)} aria-label={motion ? 'Pause animations' : 'Play animations'} title={motion ? 'Pause animations' : 'Play animations'}>{motion ? <FiPause /> : <FiPlay />}<span>Motion {motion ? 'on' : 'off'}</span></button>
      {showTop && <a className="back-top" href="#home" aria-label="Back to top"><FiArrowUp /></a>}
    </div>
  </>
}
