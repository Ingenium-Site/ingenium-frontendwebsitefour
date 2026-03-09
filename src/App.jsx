import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import Integrity from './pages/Integrity.jsx'
import Contact from './pages/Contact.jsx'
import Expertise from './pages/Expertise.jsx'
import Portfolio from './pages/Portfolio.jsx'
import TheEngine from './pages/TheEngine.jsx'
import BrandSystem from './pages/BrandSystem.jsx'
import HowWeThink from './pages/HowWeThink.jsx'
import 'animate.css/animate.min.css';
import 'particles.js';
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/integrity" element={<Integrity />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/the-engine" element={<TheEngine />} />
        <Route path="/brand-system" element={<BrandSystem />} />
        <Route path="/how-we-think" element={<HowWeThink />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/expertise/:slug" element={<Expertise />} />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
