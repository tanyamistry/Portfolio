import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/Contact.css'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="contact" id="contact">
      <div ref={innerRef} className="contact__inner">
        <div className="section-label">Contact</div>
        <h2 className="contact__heading">Let's Connect</h2>
        <p className="contact__sub">
          I'm actively seeking opportunities in data engineering and software development.
          Whether you have a role, a project, or just want to say hi — feel free to reach out!
        </p>
        <a href="mailto:tanyamistry21@gmail.com" className="contact__email">
          tanyamistry21@gmail.com
        </a>
        <div className="contact__links">
          <a
            href="https://github.com/tanyamistry"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link"
          >
            <FiGithub />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/tanya-mistry/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__link"
          >
            <FiLinkedin />
            <span>LinkedIn</span>
          </a>
          <a href="mailto:tanyamistry21@gmail.com" className="contact__link">
            <FiMail />
            <span>Email</span>
          </a>
        </div>
      </div>

      <footer className="contact__footer">
        <span>Designed & Built by Tanya Mistry</span>
        <span className="contact__footer-sep">·</span>
        <span>Boston, MA · 2025</span>
      </footer>
    </section>
  )
}
