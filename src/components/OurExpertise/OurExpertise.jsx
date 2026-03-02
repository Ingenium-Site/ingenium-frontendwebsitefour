import React from "react";
import "./ourExpertise.css";

const expertiseItems = [
  {
    title: "Social Media\nManagement",
    desc: "We operate from within the problem, then govern execution to measurable outcomes.",
  },
  {
    title: "SEO Optimization",
    desc: "We operate from within the problem, then govern execution to measurable outcomes.",
  },
  {
    title: "Website\nDevelopment",
    desc: "We operate from within the problem, then govern execution to measurable outcomes.",
  },
  {
    title: "Content Marketing",
    desc: "We operate from within the problem, then govern execution to measurable outcomes.",
  },
  {
    title: "Branding Strategy",
    desc: "We operate from within the problem, then govern execution to measurable outcomes.",
  },
  {
    title: "Email Marketing",
    desc: "We operate from within the problem, then govern execution to measurable outcomes.",
  },
];

const OurExpertise = () => {
  return (
    <section className="oeSection" id="our-expertise">
      <div className="oeContainer">
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

        <div className="oeGrid">
          {expertiseItems.map((item, idx) => (
            <article className="oeCard" key={idx}>
              <div className="oeIconCircle" aria-hidden="true" />
              <h3 className="oeCardTitle">
                {item.title.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i !== item.title.split("\n").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h3>

              <p className="oeCardText">{item.desc}</p>

              <button className="wciBtn oeBtn" type="button">
                Read More <span className="oeArrow">↗</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurExpertise;