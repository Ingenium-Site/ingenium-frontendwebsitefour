import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import HeroFlowmap from './HeroFlowmap.jsx'
// particles.js (UMD) attaches window.particlesJS
import 'particles.js'
import heroArtwork from '../assets/hero-artwork.png'
import logoFull from '../assets/ingenium-logo-full.jpeg'

export default function Hero({ videoSrc = '' }) {
  // Particles background (repulse) – matches the BannerHomeSection behavior you liked
  useEffect(() => {
    const init = () => {
      if (!window.particlesJS) return

      // Destroy existing instances (HMR / route changes)
      try {
        if (window.pJSDom && window.pJSDom.length) {
          window.pJSDom.forEach((p) => p?.pJS?.fn?.vendors?.destroypJS?.())
          window.pJSDom.length = 0
        }
      } catch {
        // ignore
      }

      window.particlesJS('particles-js', {
        particles: {
          number: { value: 86, density: { enable: true, value_area: 950 } },
          color: { value: ['#00C2B8', '#00A3FF', '#F55A1F', '#C9A227'] },
          shape: { type: ['triangle', 'circle'] },
          opacity: { value: 0.42, random: true },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 145,
            color: '#00C2B8',
            opacity: 0.16,
            width: 1,
          },
          move: {
            enable: true,
            speed: 1.25,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true,
          },
          modes: {
            repulse: { distance: 170, duration: 0.45 },
            push: { particles_nb: 3 },
          },
        },
        retina_detect: true,
      })
    }

    const raf = requestAnimationFrame(init)
    return () => {
      cancelAnimationFrame(raf)
      try {
        if (window.pJSDom && window.pJSDom.length) {
          window.pJSDom.forEach((p) => p?.pJS?.fn?.vendors?.destroypJS?.())
          window.pJSDom.length = 0
        }
      } catch {
        // ignore
      }
    }
  }, [])

  return (
    <section className="hero" aria-label="Home hero">
      <HeroFlowmap image={heroArtwork} opacity={1.2} className="flowmapWrap" />
      {/* Particles layer (repulse) */}
      <div id="particles-js" className="heroParticles" aria-hidden="true" />
      <div className="heroOverlay" aria-hidden="true" />

      <div className="heroInner">
        {/* Video slot moved ABOVE the headline (per your request) */}
        <div className="videoCard" aria-label="Hero looping video">
          {videoSrc ? (
            <video className="heroVideo" src={videoSrc} autoPlay loop muted playsInline preload="auto" />
          ) : (
            <div className="videoFallback">
              <img
                className="videoFallbackImg"
                src={logoFull}
                alt="Ingenium — Strategy · Creative · Digital"
                draggable={false}
              />
              <div className="videoFallbackHint">
                <span>Looping video slot</span>
                <span className="videoFallbackHintSub">
                  Add a file to <code>public/videos/</code> and set <code>videoSrc</code> in{' '}
                  <code>src/pages/Home.jsx</code>
                </span>
              </div>
            </div>
          )}
        </div>

        <h1 className="heroTitle">Build with Ingenium</h1>

        <p className="heroSubtitle">
          We are a strategy-led creative and digital agency that helps businesses develop immersive and engaging user
          experiences that drive top level growth
        </p>

        <div className="heroCtas">
          <Link className="btn btnOutline" to="/services">
            Explore Services
          </Link>
          <Link className="btn btnSolid" to="/contact">
            Let’s Build Something Great
          </Link>
        </div>
       
      </div>
    </section>
  )
}
