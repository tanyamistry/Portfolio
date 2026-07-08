import { lazy, Suspense } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import ErrorBoundary from './components/ErrorBoundary'

const Landing = lazy(() => import('./components/Landing'))
const About = lazy(() => import('./components/About'))
const WhatIDo = lazy(() => import('./components/WhatIDo'))
const Career = lazy(() => import('./components/Career'))
const Work = lazy(() => import('./components/Work'))
const TechStack = lazy(() => import('./components/TechStack'))
const Contact = lazy(() => import('./components/Contact'))

function App() {
  return (
    <>
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <div className="site-rail" aria-hidden="true">
        <span>TM / PORTFOLIO 2026</span>
        <i />
        <span>BOS · 42.3601° N</span>
      </div>
      <ErrorBoundary name="App">
        <Suspense fallback={<div style={{ background: '#fff6f1', height: '100vh' }} />}>
          <main>
            <ErrorBoundary name="Landing"><Landing /></ErrorBoundary>
            <ErrorBoundary name="About"><About /></ErrorBoundary>
            <ErrorBoundary name="WhatIDo"><WhatIDo /></ErrorBoundary>
            <ErrorBoundary name="Career"><Career /></ErrorBoundary>
            <ErrorBoundary name="Work"><Work /></ErrorBoundary>
            <ErrorBoundary name="TechStack"><TechStack /></ErrorBoundary>
            <ErrorBoundary name="Contact"><Contact /></ErrorBoundary>
          </main>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default App
