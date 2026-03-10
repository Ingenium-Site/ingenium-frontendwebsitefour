import PageHeader from "../components/PageHeader.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { services } from "../data/services";
import { expertisePackages, bespokePackage } from "../data/expertisePackages";
import { Link } from "react-router-dom";
import { BadgeCheck, Globe, Mic, Megaphone, Rocket, Boxes } from "lucide-react";
import "./servicesPage.css";

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

const expertiseIconMap = {
  "corporate-brand-package": BadgeCheck,
  "corporate-website-package": Globe,
  "executive-communications": Mic,
  "authority-social-media-retainer": Megaphone,
  "launch-campaign": Rocket,
};

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

export default function Services() {
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
      <Footer />
    </main>
  )
}
