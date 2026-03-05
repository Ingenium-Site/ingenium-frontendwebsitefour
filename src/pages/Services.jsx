import PageHeader from "../components/PageHeader.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { services } from "../data/services";
import { Link } from "react-router-dom";
import "./servicesPage.css";

const groups = [
  {
    key: "digital",
    title: "Digital & Web",
    sub: "Web experiences built to perform across devices.",
    keys: ["web-development", "wordpress-design"],
  },
  {
    key: "design",
    title: "Design & Content",
    sub: "Visual and written assets that strengthen your brand.",
    keys: ["graphic-design", "logo-design", "editing"],
  },
  {
    key: "tech",
    title: "IT & Security",
    sub: "Support, protection, and systems that keep you running.",
    keys: ["information-security", "cybersecurity", "it-consulting", "network-support", "computer-repair"],
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
