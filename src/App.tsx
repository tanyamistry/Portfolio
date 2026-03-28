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
      <ErrorBoundary name="App">
        <Suspense fallback={<div style={{ background: '#0a0e17', height: '100vh' }} />}>
          <ErrorBoundary name="Landing"><Landing /></ErrorBoundary>
          <ErrorBoundary name="About"><About /></ErrorBoundary>
          <ErrorBoundary name="WhatIDo"><WhatIDo /></ErrorBoundary>
          <ErrorBoundary name="Career"><Career /></ErrorBoundary>
          <ErrorBoundary name="Work"><Work /></ErrorBoundary>
          <ErrorBoundary name="TechStack"><TechStack /></ErrorBoundary>
          <ErrorBoundary name="Contact"><Contact /></ErrorBoundary>
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default App
