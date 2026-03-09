import { useMemo } from "react"
import { useParams, Navigate } from "react-router-dom"
import PageHeader from "../components/PageHeader.jsx"
import Footer from "../components/Footer/Footer.jsx"
import { expertisePackages, bespokePackage } from "../data/expertisePackages.js"
import AnimateOnScroll from "../components/AnimateOnScroll.jsx"

import {
  BadgeCheck,
  Globe,
  Mic,
  Megaphone,
  Rocket,
  Boxes,
  Compass,
  Palette,
  MonitorSmartphone,
  Briefcase,
  Check,
} from "lucide-react"

const iconMap = {
  "corporate-brand-package": BadgeCheck,
  "corporate-website-package": Globe,
  "executive-communications": Mic,
  "authority-social-media-retainer": Megaphone,
  "launch-campaign": Rocket,
  "ingenium-bespoke-package": Boxes,
  strategy: Compass,
  creative: Palette,
  digital: MonitorSmartphone,
  advisory: Briefcase,
}

function BulletList({ items = [] }) {
  return (
    <ul className="expList">
      {items.map((t, idx) => (
        <li
          key={t}
          className="expListItem"
          style={{ transitionDelay: `${idx * 60}ms` }}
        >
          <span className="expListIcon" aria-hidden="true">
            <Check size={15} strokeWidth={2.6} />
          </span>
          <span className="expListText">{t}</span>
        </li>
      ))}
    </ul>
  )
}

export default function Expertise() {
  const { slug } = useParams()

  const isBespoke = slug === "ingenium-bespoke-package"
  const data = useMemo(() => {
    if (isBespoke) return bespokePackage
    return expertisePackages?.[slug]
  }, [slug, isBespoke])

  if (!data) return <Navigate to="/" replace />

  const TitleIcon = iconMap?.[slug] || Boxes

  return (
    <main className="page">
      <PageHeader title={data.title} edgeToTop />

      <div className="pageBody">
        <div className="container">
          <div className="expTop">
            <div className="expIcon" aria-hidden="true">
              <TitleIcon size={34} strokeWidth={1.5} />
            </div>

            {data.subtitle ? <p className="expSubtitle">{data.subtitle}</p> : null}
          </div>

          {isBespoke ? (
            <>
              <AnimateOnScroll animation="fadeInUp" delay={40}>
                <div className="expIntroCard">
                  {data.intro?.map((p) => (
                    <p className="expParagraph" key={p}>
                      {p}
                    </p>
                  ))}
                </div>
              </AnimateOnScroll>

              {data.categories.map((cat) => {
                const CatIcon = iconMap?.[cat.key] || Boxes
                return (
                  <section key={cat.key} className="expCatSection">
                    <AnimateOnScroll animation="fadeInUp" delay={60}>
                      <div className="expCategoryHead">
                        <div className="expCategoryIcon" aria-hidden="true">
                          <CatIcon size={28} strokeWidth={1.5} />
                        </div>
                        <h2 className="expH2">{cat.title}</h2>
                      </div>
                    </AnimateOnScroll>

                    <div className="expCardGrid">
                      {cat.blocks.map((blk, idx) => (
                        <AnimateOnScroll key={blk.heading} animation="fadeInUp" delay={80 + idx * 80}>
                          <article className="expGridCard">
                            <h3 className="expGridCardTitle">{blk.heading}</h3>
                            <BulletList items={blk.items} />
                            {blk.outcome ? (
                              <p className="expOutcome">
                                <strong>Outcome:</strong> {blk.outcome}
                              </p>
                            ) : null}
                          </article>
                        </AnimateOnScroll>
                      ))}
                    </div>
                  </section>
                )
              })}
            </>
          ) : (
            <>
              <div className="expCardGrid">
                {data.sections?.map((sec, idx) => (
                  <AnimateOnScroll key={sec.heading} animation="fadeInUp" delay={40 + idx * 80}>
                    <article className="expGridCard">
                      <h2 className="expGridCardTitle">{sec.heading}</h2>
                      <BulletList items={sec.items} />
                    </article>
                  </AnimateOnScroll>
                ))}
              </div>

              {data.outcome ? (
                <AnimateOnScroll animation="fadeInUp" delay={80}>
                  <div className="expOutcomeCard">
                    <p className="expOutcome">
                      <strong>Outcome:</strong> {data.outcome}
                    </p>
                  </div>
                </AnimateOnScroll>
              ) : null}
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
