import React from 'react'
import Reveal from '../components/Reveal.jsx'
import TextMorph from '../components/TextMorph.jsx'


/**
 * GlobalExperience
 * - White background section beneath the Hero
 * - Fully responsive (stacks cards on mobile)
 */
export default function GlobalExperience() {
  return (
<section className="globalExp" aria-label="Global experience">
  <div className="globalExpInner">
    <h2 className="globalExpTitle">Global Experience</h2>
    <p className="globalExpSub">
      We operate from within the problem, then govern execution to measurable outcomes.
    </p>

    <div className="globalExpCards">
          <article className="globalExpCard">
        <h4 className="globalExpCardTitleTop">We operate from within the problem, then govern execution to measurable outcomes.</h4>
        <h5 className="globalExpCardTitle">Cross-border</h5>
        <p className="globalExpCardText">Africa &nbsp;&nbsp; •&nbsp; &nbsp; EU &nbsp;&nbsp; •&nbsp; &nbsp; UK &nbsp;&nbsp; •&nbsp;&nbsp;  US &nbsp;&nbsp; •&nbsp; &nbsp; Asia</p>
      </article>

      <article className="globalExpCard">
        <h4 className="globalExpCardTitleTop">We operate from within the problem, then govern execution to measurable outcomes.</h4>
        <h5 className="globalExpCardTitle">Governed</h5>
        <p className="globalExpCardText">Strategy &nbsp;→&nbsp; &nbsp; Systems &nbsp; &nbsp;→&nbsp; &nbsp; Oversight</p>
      </article>
    </div>

    {/* Centered morph container below the cards */}
    {/* <div className="morph-container centered">
      <Reveal from="bottom" delay={120}>
        <span className="morph-text"><TextMorph /></span>
      </Reveal>
    </div> */}
  </div>
</section>
  
  
  )
}
