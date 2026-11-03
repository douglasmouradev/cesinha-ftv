import { useCallback, useEffect, useState } from 'react'
import { Header } from './components/Header'
import { Preloader } from './components/Preloader'
import { WhatsAppFloat } from './components/WhatsAppFloat'
import { About } from './sections/About'
import { Classes } from './sections/Classes'
import { FinalCTA } from './sections/FinalCTA'
import { Footer } from './sections/Footer'
import { Gallery } from './sections/Gallery'
import { Hero } from './sections/Hero'
import { HowItWorks } from './sections/HowItWorks'
import { Location } from './sections/Location'
import { Testimonials } from './sections/Testimonials'

function shouldSkipPreloader() {
  if (typeof window === 'undefined') return false
  return (
    sessionStorage.getItem('cesinha-preloader-seen') === '1' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function scrollToHashOrTop() {
  const hash = window.location.hash
  if (hash && hash !== '#topo') {
    const el = document.querySelector(hash)
    if (el) {
      el.scrollIntoView({ behavior: 'auto', block: 'start' })
      return
    }
  }
  window.scrollTo(0, 0)
}

export default function App() {
  const [ready, setReady] = useState(shouldSkipPreloader)
  const onPreloaderDone = useCallback(() => setReady(true), [])

  useEffect(() => {
    scrollToHashOrTop()
    // Depois do pin/spacers do GSAP recalcularem a altura
    const t1 = window.setTimeout(scrollToHashOrTop, 50)
    const t2 = window.setTimeout(() => {
      scrollToHashOrTop()
      document.documentElement.classList.add('is-smooth-scroll')
    }, 300)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [ready])

  return (
    <>
      <Preloader onDone={onPreloaderDone} />
      <Header />
      <main>
        <Hero ready={ready} />
        <About />
        <Classes />
        <HowItWorks />
        <Gallery />
        <Testimonials />
        <Location />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
