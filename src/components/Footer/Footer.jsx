import React from "react";
import "./footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer__container">
        {/* Left: Logo + text */}
        <div className="footer__brand">
          <img
            className="footer__logo"
            src="/images/ingenium-footer-logo.png"
            alt="Ingenium"
            loading="lazy"
          />
          <p className="footer__blurb">
            We operate at the intersection where ideas are made practical and
            creativity is held to professional standards so the work performs
            over time, not just at launch.
          </p>
        </div>

        {/* Middle: Quick links */}
        <nav className="footer__links" aria-label="Quick links">
          <h3 className="footer__title">Quick Links</h3>
          <ul className="footer__list">
            <li><a className="footer__link" href="/">Home</a></li>
            <li><a className="footer__link" href="/about">About</a></li>
            <li><a className="footer__link" href="/services">Services</a></li>
            <li><a className="footer__link" href="/case-studies">Case Studies</a></li>
            <li><a className="footer__link" href="/blog">Blog</a></li>
            <li><a className="footer__link" href="/contact">Contact</a></li>
          </ul>
        </nav>

        {/* Right: Contact info */}
        <div className="footer__contact">
          <h3 className="footer__title">Contact Info</h3>

          <div className="footer__contactBlock">
            <a className="footer__link footer__bold" href="mailto:info@ingeniumhub.com">
              info@ingeniumhub.com
            </a>
          </div>

          <div className="footer__contactBlock">
            <p className="footer__text footer__bold">
              3 Adomkorapa Street Dzorwulu- Accra
            </p>
          </div>

          <div className="footer__contactBlock">
            <a className="footer__link footer__bold" href="tel:+233302260243">
              +233 302 260 243
            </a>
            <span className="footer__sep">/</span>
            <a className="footer__link footer__bold" href="tel:+23595008128">
              +23 595 008 128
            </a>
          </div>
        </div>
      </div>

      <div className="footer__divider" />

      <div className="footer__bottom">
        <p className="footer__copyright">
          © {year} Ingenium. All Rights Reserved
        </p>

        <div className="footer__social" aria-label="Social links">
          <a className="footer__socialBtn" href="#" aria-label="Instagram">
            <span className="footer__socialIcon">◎</span>
          </a>
          <a className="footer__socialBtn" href="#" aria-label="Facebook">
            <span className="footer__socialIcon">f</span>
          </a>
          <a className="footer__socialBtn" href="#" aria-label="X">
            <span className="footer__socialIcon">X</span>
          </a>
          <a className="footer__socialBtn" href="#" aria-label="YouTube">
            <span className="footer__socialIcon">▶</span>
          </a>
          <a className="footer__socialBtn" href="#" aria-label="LinkedIn">
            <span className="footer__socialIcon">in</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;