import React from "react";
import "./whyChooseIngenium.css";

const WhyChooseIngenium = () => {
  return (
    <section className="wciSection" id="why-choose-ingenium">
      <div className="wciContainer">
        {/* Left */}
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
            {/* Replace this src with any image you prefer in your project */}
            <img
              className="wciImage"
              src="/images/why-choose-ingenium.png"
              alt=""
              loading="lazy"
            />
          </div>
        </div>

        {/* Right */}
        <div className="wciRight">
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
        </div>
      </div>
    </section>
  );
};

export default WhyChooseIngenium;