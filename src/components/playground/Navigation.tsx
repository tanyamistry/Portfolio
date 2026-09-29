import { useEffect, useState } from 'react'
import { FiArrowUpRight, FiMenu, FiX } from 'react-icons/fi'

const links = [{ label: 'About', id: 'about' }, { label: 'Work', id: 'work' }, { label: 'Journey', id: 'journey' }, { label: 'Contact', id: 'contact' }]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id) })
    }, { rootMargin: '-15% 0px -60% 0px' })
    document.querySelectorAll('section[id]').forEach(section => observer.observe(section))
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false) }
    const onResize = () => { if (window.innerWidth > 700) setOpen(false) }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => { observer.disconnect(); document.removeEventListener('keydown', onKey); window.removeEventListener('resize', onResize) }
  }, [])
  return <header className="site-header">
    <nav className="nav-shell" aria-label="Main navigation">
      <a className="wordmark" href="#home" aria-label="Tanya Mistry, home" onClick={() => setOpen(false)}><span className="brand-flower">✳</span> tm<span className="wordmark-dot">.</span></a>
      <div className={`nav-links ${open ? 'is-open' : ''}`} id="navigation-links">
        {links.map(link => <a key={link.id} href={`#${link.id}`} className={active === link.id ? 'active' : ''} aria-current={active === link.id ? 'location' : undefined} onClick={() => setOpen(false)}>{link.label}<span className="nav-dot" /></a>)}
      </div>
      <a className="nav-resume" href="/Tanya_Mistry_Resume.pdf" target="_blank" rel="noreferrer">Résumé <FiArrowUpRight /></a>
      <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="navigation-links" onClick={() => setOpen(value => !value)}>{open ? <FiX /> : <FiMenu />}</button>
    </nav>
  </header>
}
