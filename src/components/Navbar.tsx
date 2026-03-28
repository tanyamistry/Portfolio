import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './styles/Navbar.css'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#techstack' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

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
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav ref={navRef} className="navbar">
      <a href="#home" className="navbar__logo">TM</a>
      <ul className="navbar__links">
        {links.map(l => (
          <li key={l.label}>
            <a href={l.href} className="navbar__link">{l.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
