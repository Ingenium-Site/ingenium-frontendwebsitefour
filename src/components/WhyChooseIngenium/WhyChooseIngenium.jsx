import React, { useEffect, useState } from "react";
import AnimateOnScroll from "../AnimateOnScroll";
import "./whyChooseIngenium.css";
import whyChooseImage from "../../assets/why-choose-ingenium.png";

const WhyChooseIngenium = ({ resetAnimations }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return undefined;

    const mobileQuery = window.matchMedia("(max-width: 760px)");
    const syncMobile = () => setIsMobile(mobileQuery.matches);

    syncMobile();

    if (typeof mobileQuery.addEventListener === "function") {
      mobileQuery.addEventListener("change", syncMobile);
      return () => mobileQuery.removeEventListener("change", syncMobile);
    }

    mobileQuery.addListener(syncMobile);
    return () => mobileQuery.removeListener(syncMobile);
  }, []);

  const leftContent = (
    <div className="wciLeft">
      <div className="wciPill">Why Choose Ingenium</div>

      <h2 className="wciTitle">
        <span className="wciTitleMuted">The Difference</span>
        <br />
        Clarity, Craft,
        <br />
        Results
      </h2>

      <p className="wciSubtitle">
        We operate at the intersection where ideas are made practical and
        creativity is held to professional standards so the work performs
        over time, not just at launch.
      </p>

      <div className="wciImageCard" aria-hidden="true">
        <img
          className="wciImage"
         src={whyChooseImage}  
           alt="Why choose Ingenium visual representation"
          loading="lazy"
        />
      </div>
    </div>
  );

  return (
    <section className="wciSection" id="why-choose-ingenium">
      <div className="wciContainer">
        {isMobile ? (
          leftContent
        ) : (
          <AnimateOnScroll animation="fadeInLeft" delay={100} speed="normal" resetKey={resetAnimations}>
            {leftContent}
          </AnimateOnScroll>
        )}

        <div className="wciRight">
          <AnimateOnScroll animation="fadeInUp" delay={200} speed="normal" resetKey={resetAnimations}>
            <article className="wciCard">
              <h3 className="wciCardTitle">Data-Driven Approach</h3>
              <p className="wciCardText">
                We operate from within the problem, then govern execution to
                measurable outcomes. We operate from within the problem.
              </p>
              <button className="wciBtn" type="button">
                Read More <span className="wciArrow">↗</span>
              </button>
            </article>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeInUp" delay={300} speed="normal" resetKey={resetAnimations}>
            <article className="wciCard">
              <h3 className="wciCardTitle">Creative &amp; Innovative</h3>
              <p className="wciCardText">
                We operate from within the problem, then govern execution to
                measurable outcomes. We operate from within the problem.
              </p>
              <button className="wciBtn" type="button">
                Read More <span className="wciArrow">↗</span>
              </button>
            </article>
          </AnimateOnScroll>

          <AnimateOnScroll animation="fadeInUp" delay={400} speed="normal" resetKey={resetAnimations}>
            <article className="wciCard">
              <h3 className="wciCardTitle">Transparent Reporting</h3>
              <p className="wciCardText">
                We operate from within the problem, then govern execution to
                measurable outcomes. We operate from within the problem.
              </p>
              <button className="wciBtn" type="button">
                Read More <span className="wciArrow">↗</span>
              </button>
            </article>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseIngenium;
