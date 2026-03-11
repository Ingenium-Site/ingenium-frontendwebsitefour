import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import HeroFlowmap from './HeroFlowmap.jsx'
import 'particles.js'
import heroArtwork from '../assets/hero-artwork.png'
import logoFull from '../assets/ingenium-logo-full.png'
import ingeniumHeaderVideo from '../assets/IngeniumHeaderWebsite.mp4' 
import { ChevronDown } from "lucide-react";
import TextMorph from './TextMorph.jsx'
import Reveal from './Reveal.jsx'

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

  const scrollToNextSection = () => {
    document.getElementById("after-hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="hero" aria-label="Home hero">
      <HeroFlowmap image={heroArtwork} opacity={1.2} className="flowmapWrap" />
      {/* Particles layer (repulse) */}
      <div id="particles-js" className="heroParticles" aria-hidden="true" />
      <div className="heroOverlay" aria-hidden="true" />

      <div className="heroInner">
        {/* Video slot moved ABOVE the headline (per your request) */}
        {/* <div className="videoCard" aria-label="Hero looping video">
          {ingeniumHeaderVideo ? (
          <video 
          className="heroVideo" 
          src={ingeniumHeaderVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          poster="" 
        />
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
               
              </div>
            </div>
          )}
        </div> */}

      {/* Centered morph container replacing the video */}
      <div className="morph-container centered hero-morph">
        <Reveal from="bottom" delay={120}>
          <span className="morph-text"><TextMorph /></span>
        </Reveal>
      </div>
        <h1 className="heroTitle">Build with Us</h1>

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
        <button
          type="button"
          className="heroScrollCue"
          aria-label="Scroll to content"
          onClick={scrollToNextSection}
        >
          <ChevronDown size={28} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}