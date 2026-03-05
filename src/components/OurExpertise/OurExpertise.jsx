import React from "react";
import "./ourExpertise.css";
import AnimateOnScroll from "../AnimateOnScroll.jsx";
import { Link } from "react-router-dom";

// Import icons from lucide-react
import { BadgeCheck, Globe, Mic, Megaphone, Rocket, Boxes } from "lucide-react";

const expertiseItems = [
  {
    title: "Corporate Brand\nPackage",
    desc: "Strategic brand architecture that clarifies positioning, identity, and governance.",
    to: "/expertise/corporate-brand-package",
    icon: <BadgeCheck size={32} strokeWidth={1.5} />,
  },
  {
    title: "Corporate Website\nPackage",
    desc: "A conversion-ready website system aligned with your brand positioning.",
    to: "/expertise/corporate-website-package",
    icon: <Globe size={32} strokeWidth={1.5} />,
  },
  {
    title: "Executive\nCommunications",
    desc: "Quarterly advisory for messaging, reputation planning, and influence.",
    to: "/expertise/executive-communications",
    icon: <Mic size={32} strokeWidth={1.5} />,
  },
  {
    title: "Authority Social\nMedia Retainer",
    desc: "Strategic content and positioning to build consistent authority over time.",
    to: "/expertise/authority-social-media-retainer",
    icon: <Megaphone size={32} strokeWidth={1.5} />,
  },
  {
    title: "Launch\nCampaign",
    desc: "Coordinated market activation across strategy, creative, rollout, and reporting.",
    to: "/expertise/launch-campaign",
    icon: <Rocket size={32} strokeWidth={1.5} />,
  },
  {
    title: "Ingenium\nBespoke Package",
    desc: "Modular strategic solutions across Strategy, Creative, Digital, and Advisory.",
    to: "/expertise/ingenium-bespoke-package",
    icon: <Boxes size={32} strokeWidth={1.5} />,
  },
];

const OurExpertise = ({ resetAnimations }) => {
  return (
    <section className="oeSection" id="our-expertise">
      <div className="oeContainer">
        <AnimateOnScroll animation="zoomInUp" speed="normal" resetKey={resetAnimations}>
          <div className="oeTop">
            <div className="oeLeftTop">
              <div className="oePill">Our Expertise</div>
              <p className="oeIntro">
                Whether you are rebranding, launching, or growing, we help you move
                with clarity.
              </p>
            </div>

            <h2 className="oeTitle">
              At Ingenium, Clarity
              <br />
              Drives Creative and
              <br />
              Digital Impact
            </h2>
          </div>
        </AnimateOnScroll>
        <div className="oeGrid">
          {expertiseItems.map((item, idx) => (
            <AnimateOnScroll 
              key={idx} 
              animation="fadeInUp" 
              delay={idx * 100}
              threshold={0.15}
              resetKey={resetAnimations}
            >
              <article className="oeCard" key={idx}>
                <div className="oeIconCircle" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 className="oeCardTitle">
                  {item.title.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i !== item.title.split("\n").length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </h3>

                <p className="oeCardText">{item.desc}</p>

                <Link className="wciBtn oeBtn" to={item.to}>
                  Read More <span className="oeArrow">↗</span>
                </Link>
              </article>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurExpertise;