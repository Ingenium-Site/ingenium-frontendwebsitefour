import Hero from '../components/Hero.jsx'
import GlobalExperience from '../components/GlobalExperience.jsx'
import OurExpertise from "../components/OurExpertise/OurExpertise";
import WhyChooseIngenium from "../components/WhyChooseIngenium/WhyChooseIngenium";
import Footer from "../components/Footer/Footer";
import { useEffect, useRef, useState } from 'react';
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
  const servicesPopupShownRef = useRef(false);
  const servicesPopupAutoRef = useRef({ timeoutId: null, removeListeners: null });
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

  // Auto-popup between 30s and 60s, once per Home page visit.
  // Do not show while the page/tab is inactive (hidden or unfocused).
  useEffect(() => {
    if (servicesPopupShownRef.current) return;

    const isPageActive = () => document.visibilityState === "visible";

    const showIfActive = () => {
      if (servicesPopupShownRef.current) return;
      if (!isPageActive()) return;
      servicesPopupShownRef.current = true;
      setServicesOpen(true);
      servicesPopupAutoRef.current.timeoutId = null;
      servicesPopupAutoRef.current.removeListeners?.();
      servicesPopupAutoRef.current.removeListeners = null;
    };

    const onActive = () => showIfActive();
    window.addEventListener("focus", onActive);
    document.addEventListener("visibilitychange", onActive);
    servicesPopupAutoRef.current.removeListeners = () => {
      window.removeEventListener("focus", onActive);
      document.removeEventListener("visibilitychange", onActive);
    };

    const delay = 30000 + Math.floor(Math.random() * 30001);
    servicesPopupAutoRef.current.timeoutId = window.setTimeout(() => {
      // Arm the popup; if the page is active now, show immediately, otherwise wait for focus/visibility.
      showIfActive();
    }, delay);

    return () => {
      if (servicesPopupAutoRef.current.timeoutId != null) {
        window.clearTimeout(servicesPopupAutoRef.current.timeoutId);
        servicesPopupAutoRef.current.timeoutId = null;
      }
      servicesPopupAutoRef.current.removeListeners?.();
      servicesPopupAutoRef.current.removeListeners = null;
    };
  }, []);

  // If the user opens it manually before the timer, count it as "shown" and cancel auto logic.
  useEffect(() => {
    if (!servicesOpen) return;
    servicesPopupShownRef.current = true;
    if (servicesPopupAutoRef.current.timeoutId != null) {
      window.clearTimeout(servicesPopupAutoRef.current.timeoutId);
      servicesPopupAutoRef.current.timeoutId = null;
    }
    servicesPopupAutoRef.current.removeListeners?.();
    servicesPopupAutoRef.current.removeListeners = null;
  }, [servicesOpen]);

  // const [showAnimation, setShowAnimation] = useState(true);

 return (
  <>
    <Hero videoSrc={videoSrc} resetAnimations={resetAnimations} />
    <div id="after-hero" className="homeAfterHeroMarker" aria-hidden="true" />
    <GlobalExperience resetAnimations={resetAnimations} />
    <OurExpertise resetAnimations={resetAnimations} />

  {/* Floating services button */}
<span 
  className="homeServicesFloat__container" 
  aria-hidden="true"
  onClick={() => setServicesOpen(true)}
>
  <span className="homeServicesFloat__tooltip">Explore Our Services</span>
  <div className="homeServicesFloat homeServicesFloat--animated">
    <span className="homeServicesFloat__icon">
      <Sparkles size={30} strokeWidth={1.9} />
    </span>
    <span className="homeServicesFloat__label">
      <span className="homeServicesFloat__title">Explore Our Services</span>
    </span>
  </div>
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
