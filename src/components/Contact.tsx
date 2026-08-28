import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/Contact.css'
import { FiGithub, FiLinkedin, FiCopy, FiCheck, FiDownload } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

const EMAIL = 'tanyamistry21@gmail.com'

export default function Contact() {
  const sectionRef  = useRef<HTMLElement>(null)
  const headingRef  = useRef<HTMLHeadingElement>(null)
  const innerRef    = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current.querySelectorAll('.contact__heading-word'),
          { y: '110%' },
          {
            y: '0%', duration: 0.8, ease: 'power3.out', stagger: 0.08,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
            onComplete: () => {
              headingRef.current?.querySelectorAll('.contact__heading-wrap').forEach(
                w => ((w as HTMLElement).style.overflow = 'visible')
              )
            },
          }
        )
      }

      if (innerRef.current) {
        const children = Array.from(innerRef.current.children).filter(c => c !== headingRef.current)
        gsap.fromTo(children,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
          }
        )
      }
    })
    return () => ctx.revert()
  }, [])

  const copyEmail = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${EMAIL}`
    }
  }

  return (
    <section ref={sectionRef} className="contact" id="contact">
      <div ref={innerRef} className="contact__inner">
        <div className="section-head section-head--center">
          <span className="section-num">06</span>
          <span className="section-name">Contact</span>
        </div>

        <h2 ref={headingRef} className="contact__heading">
          {['Let’s', 'work', 'together'].map((w, i) => (
            <span key={i} className="contact__heading-wrap">
              <span className="contact__heading-word">{w}</span>
            </span>
          ))}
        </h2>

        <p className="contact__sub">
          I&apos;m seeking <strong>full-time data engineering and software engineering roles</strong>
          where I can contribute to reliable systems and production software. Feel free to get in touch.
        </p>

        <button className="contact__email-btn" onClick={copyEmail} data-hoverable>
          <span className="contact__email-text">{EMAIL}</span>
          <span className="contact__email-icon">
            {copied ? <FiCheck /> : <FiCopy />}
            {copied ? 'Copied!' : 'Copy'}
          </span>
        </button>

        <div className="contact__links">
          <a href="https://github.com/tanyamistry" target="_blank" rel="noopener noreferrer" className="contact__link">
            <FiGithub /><span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/tanya-mistry/" target="_blank" rel="noopener noreferrer" className="contact__link">
            <FiLinkedin /><span>LinkedIn</span>
          </a>
          <a href={`mailto:${EMAIL}`} className="contact__link contact__link--primary">
            Say hello →
          </a>
          <a href="/Tanya_Mistry_Resume.pdf" target="_blank" rel="noreferrer" className="contact__link">
            <FiDownload /><span>Résumé</span>
          </a>
        </div>
      </div>

      <footer className="contact__footer">
        <span>Designed &amp; built by Tanya Mistry</span>
        <span className="contact__footer-sep">✦</span>
        <span>San Jose, CA · 2026</span>
      </footer>
    </section>
  )
}
