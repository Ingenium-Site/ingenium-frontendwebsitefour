import Hero from '../components/Hero.jsx'
import GlobalExperience from '../components/GlobalExperience.jsx'
import OurExpertise from "../components/OurExpertise/OurExpertise";
import WhyChooseIngenium from "../components/WhyChooseIngenium/WhyChooseIngenium";
import Footer from "../components/Footer/Footer";
import { useState, useEffect } from 'react';
import ServicePickerModal from "../components/ServicePicker/ServicePickerModal.jsx";
import { services as allServices } from "../data/services";
import { expertisePackages, bespokePackage } from "../data/expertisePackages";
import { Sparkles, BadgeCheck, Globe, Mic, Megaphone, Rocket, Boxes } from "lucide-react";
import "./homeServicesPrompt.css";

/* Build combined list so localStorage rehydration finds expertise packages too */
const expertiseIconMap = {
  "corporate-brand-package": BadgeCheck,
  "corporate-website-package": Globe,
  "executive-communications": Mic,
  "authority-social-media-retainer": Megaphone,
  "launch-campaign": Rocket,
};
const combinedServices = [
  ...allServices,
  ...Object.entries(expertisePackages).map(([slug, pkg]) => ({
    key: slug,
    name: pkg.title,
    desc: pkg.subtitle,
    icon: expertiseIconMap[slug] || Boxes,
  })),
  {
    key: "ingenium-bespoke-package",
    name: bespokePackage.title,
    desc: bespokePackage.subtitle,
    icon: Boxes,
  },
];

export default function Home() {
  // Optional: set this to a real file like "/videos/hero-loop.mp4"
  const videoSrc = '';
  
  const [resetAnimations, setResetAnimations] = useState(false);

  const [servicesOpen, setServicesOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState(() => {
    try {
      const raw = window.localStorage.getItem("selectedServices");
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      const allowed = new Map(combinedServices.map((s) => [s.key, s]));
      return parsed.map((k) => allowed.get(k)).filter(Boolean);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setResetAnimations(prev => !prev); // Toggle to trigger reset
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Persist selections
  useEffect(() => {
    try {
      window.localStorage.setItem(
        "selectedServices",
        JSON.stringify(selectedServices.map((s) => s.key))
      );
    } catch {
      // ignore
    }
  }, [selectedServices]);

  // Auto-popup between 30s and 60s, once per session.
  useEffect(() => {
    try {
      const already = window.sessionStorage.getItem("servicesPopupShown");
      if (already === "1") return;
    } catch {
      // ignore
    }

    const delay = 30000 + Math.floor(Math.random() * 30001);
    const id = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem("servicesPopupShown", "1");
      } catch {
        // ignore
      }
      setServicesOpen(true);
    }, delay);

    return () => window.clearTimeout(id);
  }, []);

  return (
    <>
      <Hero videoSrc={videoSrc} resetAnimations={resetAnimations} />
      <GlobalExperience resetAnimations={resetAnimations} />
      <OurExpertise resetAnimations={resetAnimations} />

      {/* Floating services trigger (icon only) */}
      {/* <button
        type="button"
        className="homeServicesFloat"
        onClick={() => setServicesOpen(true)}
        aria-label="Open services picker"
        title="What do you need?"
      >
      
        <span className="homeServicesFloat__label" aria-hidden="true">
          <span className="homeServicesFloat__title">What do you need?</span>
          <span className="homeServicesFloat__sub">Pick services and continue to Contact</span>
        </span>
      </button> */}

  <span className="homeServicesFloat__icon homeServicesFloat " aria-hidden="true"
  onClick={() => setServicesOpen(true)}>
          <Sparkles size={22} strokeWidth={1.7} />
        </span>


      <WhyChooseIngenium resetAnimations={resetAnimations} />
      <Footer resetAnimations={resetAnimations} />  

      <ServicePickerModal
        open={servicesOpen}
        onClose={() => setServicesOpen(false)}
        value={selectedServices}
        onChange={setSelectedServices}
      />
    </>
  )
}