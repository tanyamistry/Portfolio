import { useEffect, useRef, useState } from 'react'
import { FiArrowUpRight, FiCheck, FiCopy, FiGithub, FiLinkedin } from 'react-icons/fi'

const email = 'tanyamistry21@gmail.com'

export default function Contact() {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const timer = useRef<ReturnType<typeof setTimeout>>()
  useEffect(() => () => clearTimeout(timer.current), [])
  async function copyEmail() {
    clearTimeout(timer.current)
    try { await navigator.clipboard.writeText(email); setCopyState('copied') }
    catch { setCopyState('failed') }
    timer.current = setTimeout(() => setCopyState('idle'), 3500)
  }
  return <section className="contact-section" id="contact"><div className="contact-grid" aria-hidden="true" /><div className="content-width">
    <div className="contact-main" data-reveal><div className="contact-status mono"><span className="status-dot" /> A GOOD CONVERSATION IS A GREAT START.</div><h2>Let’s build<br />something <span className="serif">good.</span><span className="contact-asterisk" aria-hidden="true">✳</span></h2><div className="contact-lower"><p>Have an interesting problem, an opportunity,<br />or just a really good idea? I’m all ears.</p><div className="email-action"><a href={`mailto:${email}`}>{email}<FiArrowUpRight /></a><button onClick={copyEmail} aria-label={copyState === 'copied' ? 'Email copied' : 'Copy email address'}>{copyState === 'copied' ? <FiCheck /> : <FiCopy />}</button><span className="copy-status" role="status">{copyState === 'copied' ? 'Copied. Say hello!' : copyState === 'failed' ? 'Select the email above to copy it.' : ''}</span></div></div></div>
    <footer className="site-footer"><a className="wordmark" href="#home" aria-label="Back to Tanya Mistry’s home"><span className="brand-flower">✳</span> tm<span className="wordmark-dot">.</span></a><span className="footer-note">A little logic. A lot of heart.<br /><span>© {new Date().getFullYear()} Tanya Mistry</span></span><div className="footer-links"><a href="https://github.com/tanyamistry" target="_blank" rel="noreferrer"><FiGithub /> GitHub <FiArrowUpRight /></a><a href="https://www.linkedin.com/in/tanya-mistry/" target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn <FiArrowUpRight /></a><a href="/Tanya_Mistry_Resume.pdf" target="_blank" rel="noreferrer">Résumé <FiArrowUpRight /></a></div><span className="footer-location mono">BOSTON, MA<br /><span>42.3601° N · 71.0589° W</span></span></footer>
  </div></section>
}
