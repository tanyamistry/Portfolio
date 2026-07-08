import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './styles/Navbar.css'
import { FiMoon, FiSun } from 'react-icons/fi'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#career' },
  { label: 'Skills', href: '#techstack' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState('home')
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    return (localStorage.getItem('theme') as 'light' | 'dark' | null)
      ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    )

    const onScroll = () => {
      if (!navRef.current) return
      if (window.scrollY > 50) {
        navRef.current.classList.add('navbar--scrolled')
      } else {
        navRef.current.classList.remove('navbar--scrolled')
      }
    }
    window.addEventListener('scroll', onScroll)
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'))
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: '-35% 0px -55%' },
    )
    sections.forEach(section => observer.observe(section))
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect() }
  }, [])

  return (
    <nav ref={navRef} className="navbar">
      <a href="#home" className="navbar__logo" aria-label="Tanya Mistry, home">TM<span>.</span></a>
      <ul className="navbar__links">
        {links.map(l => (
          <li key={l.label}>
            <a href={l.href} className={`navbar__link ${active === l.href.slice(1) ? 'navbar__link--active' : ''}`}>{l.label}</a>
          </li>
        ))}
      </ul>
      <button
        className="navbar__theme"
        type="button"
        onClick={() => setTheme(current => current === 'dark' ? 'light' : 'dark')}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? <FiSun /> : <FiMoon />}
      </button>
      <a className="navbar__resume" href="/Tanya_Mistry_Resume.pdf" target="_blank" rel="noreferrer">Résumé ↗</a>
    </nav>
  )
}
