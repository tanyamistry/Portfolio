import { useEffect, useRef } from 'react'
import './styles/Cursor.css'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    let mouseX = 0
    let mouseY = 0
    let outlineX = 0
    let outlineY = 0
    let animId: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = `${mouseX}px`
      dot.style.top = `${mouseY}px`
    }

    const animate = () => {
      outlineX += (mouseX - outlineX) * 0.12
      outlineY += (mouseY - outlineY) * 0.12
      outline.style.left = `${outlineX}px`
      outline.style.top = `${outlineY}px`
      animId = requestAnimationFrame(animate)
    }
    animate()

    const onEnter = () => {
      dot.classList.add('cursor-dot--active')
      outline.classList.add('cursor-outline--active')
    }
    const onLeave = () => {
      dot.classList.remove('cursor-dot--active')
      outline.classList.remove('cursor-outline--active')
    }

    const attach = () => {
      document.querySelectorAll('a, button, [data-hoverable]').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    attach()

    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })
    window.addEventListener('mousemove', onMove)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(animId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </>
  )
}
