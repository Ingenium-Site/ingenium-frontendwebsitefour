import PageHeader from "../components/PageHeader.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { services } from "../data/services";
import { expertisePackages, bespokePackage } from "../data/expertisePackages";
import { Link } from "react-router-dom";
import ServicePickerModal from "../components/ServicePicker/ServicePickerModal.jsx";
import { Sparkles, BadgeCheck, Globe, Mic, Megaphone, Rocket, Boxes } from "lucide-react";
import { useEffect, useRef, useState } from 'react'; // Added missing imports
import "./servicesPage.css";

// Define combinedServices constant similar to Home.jsx
const expertiseIconMap = {
  "corporate-brand-package": BadgeCheck,
  "corporate-website-package": Globe,
  "executive-communications": Mic,
  "authority-social-media-retainer": Megaphone,
  "launch-campaign": Rocket,
};

const combinedServices = [
  ...services,
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

const expertiseItems = [
  ...Object.entries(expertisePackages).map(([slug, pkg]) => ({
    slug,
    title: pkg.title,
    subtitle: pkg.subtitle,
    outcome: pkg.outcome,
    subItems: pkg.sections?.map((s) => s.heading) || [],
    Icon: expertiseIconMap[slug] || Boxes,
  })),
  {
    slug: "ingenium-bespoke-package",
    title: bespokePackage.title,
    subtitle: bespokePackage.subtitle,
    outcome: null,
    subItems: bespokePackage.categories?.map((c) => c.title) || [],
    Icon: Boxes,
  },
];

const groups = [
  // {
  //   key: "digital",
  //   title: "Digital & Web",
  //   sub: "Web experiences built to perform across devices.",
  //   keys: ["web-development", "wordpress-design"],
  // },
  // {
  //   key: "design",
  //   title: "Design & Content",
  //   sub: "Visual and written assets that strengthen your brand.",
  //   keys: ["graphic-design", "logo-design", "editing"],
  // },
  // {
  //   key: "tech",
  //   title: "IT & Security",
  //   sub: "Support, protection, and systems that keep you running.",
  //   keys: ["information-security", "cybersecurity", "it-consulting", "network-support", "computer-repair"],
  // },
];

export default function Services() {
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

  const [showAnimation, setShowAnimation] = useState(true);

  return (
    <main className="page">
      <PageHeader title="Services" />

      <div className="pageBody">
        <div className="container">
          <section className="srvTop">
            <div className="srvPill">Our Services</div>
            <h2 className="srvTitle">Practical solutions across design, web, and technology.</h2>
            <p className="srvIntro">
              Choose what you need, then continue to Contact and we will tailor a proposal based on your goals.
            </p>
            
            {/* Floating services button */}
            <span 
              className="homeServicesFloat__container" 
              aria-hidden="true"
              onClick={() => setServicesOpen(true)}
            >
              <span className="homeServicesFloat__tooltip">Request Our Services</span>
              <div className="homeServicesFloat homeServicesFloat--animated">
                <span className="homeServicesFloat__icon">
                  <Sparkles size={30} strokeWidth={1.9} />
                </span>
                <span className="homeServicesFloat__label">
                  <span className="homeServicesFloat__title">Request Our Services</span>
                </span>
              </div>
            </span>
          </section>

          {/* Strategic Packages */}
          <section className="srvSection" aria-label="Strategic Packages">
            <div className="srvSectionHead">
              <h2 className="srvSectionTitle">Strategic Packages</h2>
              <p className="srvSectionSub">End-to-end strategic solutions for branding, digital presence, and growth.</p>
            </div>
            <div className="srvGrid" aria-label="Strategic Packages">
              {expertiseItems.map((item) => {
                const Icon = item.Icon;
                return (
                  <article className="srvCard" key={item.slug}>
                    <div className="srvCardTop">
                      <div className="srvIconCircle" aria-hidden="true">
                        <Icon size={30} strokeWidth={1.6} />
                      </div>
                      <h3 className="srvCardTitle">{item.title}</h3>
                    </div>

                    <p className="srvCardText">{item.subtitle}</p>

                    {item.subItems.length > 0 && (
                      <div className="srvProducts" aria-label={`${item.title} areas`}>
                        {item.subItems.map((s) => (
                          <span className="srvChip" key={s}>{s}</span>
                        ))}
                      </div>
                    )}

                   <Link 
                    className="wciBtn srvBtn" 
                    to={`/expertise/${item.slug}`}
                    state={{ from: 'services' }}
                  >
                    Read More <span className="srvArrow">↗</span>
                  </Link>
                  </article>
                );
              })}
            </div>
          </section>

          {groups.map((g) => (
            <section className="srvSection" key={g.key} aria-label={g.title}>
              <div className="srvSectionHead">
                <h2 className="srvSectionTitle">{g.title}</h2>
                <p className="srvSectionSub">{g.sub}</p>
              </div>

              <div className="srvGrid" aria-label={`${g.title} services`}>
                {g.keys
                  .map((k) => services.find((s) => s.key === k))
                  .filter(Boolean)
                  .map((s) => {
                    const Icon = s.icon;
                    const href = `/contact?services=${encodeURIComponent(s.name)}`;

                    return (
                      <article className="srvCard" key={s.key}>
                        <div className="srvCardTop">
                          <div className="srvIconCircle" aria-hidden="true">
                            <Icon size={30} strokeWidth={1.6} />
                          </div>
                          <h3 className="srvCardTitle">{s.name}</h3>
                        </div>

                        <p className="srvCardText">{s.desc}</p>

                        {Array.isArray(s.products) && s.products.length ? (
                          <div className="srvProducts" aria-label={`${s.name} products`}>
                            {s.products.map((p) => (
                              <span className="srvChip" key={p}>
                                {p}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        <Link className="wciBtn srvBtn" to={href}>
                          Get Started <span className="srvArrow">↗</span>
                        </Link>
                      </article>
                    );
                  })}
              </div>
            </section>
          ))}
        </div>
      </div>
      
      <ServicePickerModal
        open={servicesOpen}
        onClose={() => setServicesOpen(false)}
        value={selectedServices}
        onChange={setSelectedServices}
      />
      
      <Footer />
    </main>
  )
}