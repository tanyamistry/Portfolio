import { useMemo } from 'react'
import './styles/LandingVisual.css'

interface Particle {
  x: string
  y: string
  size: string
  delay: string
  duration: string
}

export default function LandingVisual() {
  const particles = useMemo<Particle[]>(() =>
    Array.from({ length: 22 }, () => ({
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 100}%`,
      size: `${2 + Math.random() * 3.5}px`,
      delay: `${(Math.random() * 6).toFixed(2)}s`,
      duration: `${(4 + Math.random() * 5).toFixed(2)}s`,
    })), [])

  return (
    <div className="lv">
      {/* Aurora blobs */}
      <div className="lv__blob lv__blob--1" />
      <div className="lv__blob lv__blob--2" />
      <div className="lv__blob lv__blob--3" />

      {/* Subtle grid overlay */}
      <div className="lv__grid" />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <span
          key={i}
          className="lv__particle"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
          }}
        />
      ))}

      {/* Central orb */}
      <div className="lv__orb">
        <div className="lv__orb-core" />
        <div className="lv__orb-ring lv__orb-ring--1" />
        <div className="lv__orb-ring lv__orb-ring--2" />
        <div className="lv__orb-ring lv__orb-ring--3" />
        <div className="lv__orb-dot lv__orb-dot--1" />
        <div className="lv__orb-dot lv__orb-dot--2" />
        <div className="lv__orb-dot lv__orb-dot--3" />
      </div>
    </div>
  )
}
