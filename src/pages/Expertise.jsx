import { useMemo } from "react"
import { useParams, Navigate } from "react-router-dom"
import PageHeader from "../components/PageHeader.jsx"
import Footer from "../components/Footer/Footer.jsx"
import { expertisePackages, bespokePackage } from "../data/expertisePackages.js"

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
      {items.map((t) => (
        <li key={t}>{t}</li>
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
              <div className="expCard">
                {data.intro?.map((p) => (
                  <p className="expParagraph" key={p}>
                    {p}
                  </p>
                ))}
              </div>

              <div className="expCategoryGrid" aria-label="Bespoke categories">
                {data.categories.map((cat) => {
                  const CatIcon = iconMap?.[cat.key] || Boxes
                  return (
                    <section className="expCategory" key={cat.key}>
                      <div className="expCategoryHead">
                        <div className="expCategoryIcon" aria-hidden="true">
                          <CatIcon size={28} strokeWidth={1.5} />
                        </div>
                        <h2 className="expH2">{cat.title}</h2>
                      </div>

                      {cat.blocks.map((blk) => (
                        <div className="expCard" key={blk.heading}>
                          <h3 className="expH3">{blk.heading}</h3>
                          <BulletList items={blk.items} />
                          {blk.outcome ? (
                            <p className="expOutcome">
                              <strong>Outcome:</strong> {blk.outcome}
                            </p>
                          ) : null}
                        </div>
                      ))}
                    </section>
                  )
                })}
              </div>
            </>
          ) : (
            <>
              <div className="expCard">
                {data.sections?.map((sec) => (
                  <section key={sec.heading} className="expSection">
                    <h2 className="expH2">{sec.heading}</h2>
                    <BulletList items={sec.items} />
                  </section>
                ))}
              </div>

              {data.outcome ? (
                <div className="expCard">
                  <p className="expOutcome">
                    <strong>Outcome:</strong> {data.outcome}
                  </p>
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
