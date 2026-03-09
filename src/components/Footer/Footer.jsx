import React from "react";
import "./footer.css";
import { FaInstagram, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import footerLogo from '../../assets/ingenium-logo-full1.jpeg'; // Light mode logo
import footerLogo2 from '../../assets/ingenium-logo-full2.png'; // Dark mode logo
import { useTheme } from "../../theme/ThemeProvider.jsx"; // Import the theme hook

const Footer = () => {
  const { theme } = useTheme(); // Get the current theme
  const year = new Date().getFullYear();

  // Select the appropriate logo based on theme
  const currentLogo = theme === "dark" ? footerLogo2 : footerLogo;

  return (
    <footer className="footer" aria-label="Site footer">
        <div className="footer__container">
          {/* Left: Logo + text */}
          <div className="footer__brand">
            <img
              className="footer__logo"
              src={currentLogo}
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
                <li><a className="footer__link" href="/services">Services</a></li>
              <li><a className="footer__link" href="/about">About</a></li>
                <li><a className="footer__link" href="/integrity">Integrity</a></li>
                    <li><a className="footer__link" href="/impact">Impact</a></li>
                       <li><a className="footer__link" href="/the-engine">The Engine</a></li>
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
            <a
              className="footer__socialBtn"
              href="https://www.instagram.com/ingeniumhub?igsh=MTk5MWptMXZqeDYxMg%3D%3D&utm_source=qr"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <FaInstagram className="footer__socialIcon" aria-hidden="true" focusable="false" />
            </a>

            <a
              className="footer__socialBtn"
              href="https://www.facebook.com/share/186SqipaQU/?mibextid=wwXIfr"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <FaFacebookF className="footer__socialIcon" aria-hidden="true" focusable="false" />
            </a>

            <a
              className="footer__socialBtn"
              href="https://x.com/ingeniumhub?s=21"
              target="_blank"
              rel="noreferrer"
              aria-label="X (Twitter)"
              title="X"
            >
              <FaXTwitter className="footer__socialIcon" aria-hidden="true" focusable="false" />
            </a>

            <a
              className="footer__socialBtn"
              href="https://youtube.com/@ingeniumhq?si=S6fFL9sG0bo4A1sN"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              title="YouTube"
            >
              <FaYoutube className="footer__socialIcon" aria-hidden="true" focusable="false" />
            </a>

            <a
              className="footer__socialBtn"
              href="https://www.linkedin.com/in/ingeniumhub"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <FaLinkedinIn className="footer__socialIcon" aria-hidden="true" focusable="false" />
            </a>
          </div>
        </div>
    </footer>
  );
};

export default Footer;