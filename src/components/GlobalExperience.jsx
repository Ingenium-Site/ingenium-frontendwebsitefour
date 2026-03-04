import React from 'react'
import Reveal from '../components/Reveal.jsx'
import AnimateOnScroll from '../components/AnimateOnScroll.jsx'
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
        <AnimateOnScroll animation="fadeInUp" speed="normal">
          <div> 
            <h2 className="globalExpTitle">Global Experience</h2>
            <p className="globalExpSub">
              We operate from within the problem, then govern execution to measurable outcomes.
            </p>    
          </div>
        </AnimateOnScroll>
        
        <div className="globalExpCards">
          <AnimateOnScroll animation="fadeInUp" delay={100} speed="normal">
            <div> 
              <article className="globalExpCard">
                <h4 className="globalExpCardTitleTop">We operate from within the problem, then govern execution to measurable outcomes.</h4>
                <h5 className="globalExpCardTitle">Cross-border</h5>
                <p className="globalExpCardText">Africa • EU • UK • US • Asia</p>
              </article>
            </div>
          </AnimateOnScroll>
          
          <AnimateOnScroll animation="zoomInRight" delay={300} speed="normal">
            <div> 
              <article className="globalExpCard">
                <h4 className="globalExpCardTitleTop">We operate from within the problem, then govern execution to measurable outcomes.</h4>
                <h5 className="globalExpCardTitle">Governed</h5>
                <p className="globalExpCardText">Strategy → Systems → Oversight</p>
              </article>
            </div>
          </AnimateOnScroll>
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