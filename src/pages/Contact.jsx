import PageHeader from "../components/PageHeader.jsx";
import { useState } from "react";
import Footer from "../components/Footer/Footer.jsx"; 
import "./contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);

  const validateEmail = (email) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setErrorMessageVisible(true);
      setSuccessMessageVisible(false);
      window.setTimeout(() => setErrorMessageVisible(false), 3000);
      return;
    }

    setSuccessMessageVisible(true);
    setErrorMessageVisible(false);

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    });

    window.setTimeout(() => setSuccessMessageVisible(false), 3000);
  };

  return (
    <main className="page">
      <PageHeader title="Contact" />

      <section className="contactWrap">
        <div className="container">
          {/* Top grid: info + form */}
          <div className="contactTopGrid">
            {/* Left card */}
            <aside className="contactCard contactInfoCard">
              <div className="contactSubHeading">
                <i className="fa-regular fa-circle-dot" aria-hidden="true" />
                <span>Reach out to us</span>
              </div>

              <h2 className="contactTitle">Get in Touch</h2>
              <p className="contactBlurb">
                Reach out to us for tailored digital solutions that drive results sollicitudin nec.
              </p>

              <div className="contactInfoList">
                <div className="contactInfoRow">
                  <div className="contactIconTile" aria-hidden="true">
                    <i className="fa-solid fa-phone-volume" />
                  </div>
                  <div className="contactInfoText">
                    <span className="contactLabel">Phone Number</span>
                    <strong className="contactValue">(+233) 123 456 789</strong>
                  </div>
                </div>

                <div className="contactInfoRow">
                  <div className="contactIconTile" aria-hidden="true">
                    <i className="fa-solid fa-envelope" />
                  </div>
                  <div className="contactInfoText">
                    <span className="contactLabel">Email Address</span>
                    <strong className="contactValue">info@ingeniumhub.com</strong>
                  </div>
                </div>

                <div className="contactInfoRow">
                  <div className="contactIconTile" aria-hidden="true">
                    <i className="fa-solid fa-location-dot" />
                  </div>
                  <div className="contactInfoText">
                    <span className="contactLabel">Office Address</span>
                    <strong className="contactValue">INGENIUM</strong>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right card */}
            <div className="contactCard contactFormCard">
              <h3 className="contactFormTitle">Let&apos;s Talk About Your Next Project</h3>

              {successMessageVisible && (
                <div className="contactAlert success" role="status" aria-live="polite">
                  <span className="contactAlertIcon" aria-hidden="true">
                    <i className="fa-solid fa-check" />
                  </span>
                  <p>Thank you! Message sent successfully.</p>
                </div>
              )}

              {errorMessageVisible && (
                <div className="contactAlert error" role="status" aria-live="polite">
                  <span className="contactAlertIcon" aria-hidden="true">
                    <i className="fa-solid fa-xmark" />
                  </span>
                  <p>Oops! Please enter a valid email.</p>
                </div>
              )}

              <form className="contactForm" onSubmit={handleSubmit}>
                <div className="contactFormGrid2">
                  <input
                    className="contactInput"
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    autoComplete="given-name"
                  />
                  <input
                    className="contactInput"
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    autoComplete="family-name"
                  />
                </div>

                <div className="contactFormGrid2">
                  <input
                    className="contactInput"
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                  />
                  <input
                    className="contactInput"
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <textarea
                  className="contactTextarea"
                  name="message"
                  placeholder="Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                />

                <div className="contactBtnRow">
                  <button className="contactBtn" type="submit">
                    <span className="contactBtnText">Send a Message</span>
                    <span className="contactBtnIcon" aria-hidden="true">
                      <i className="fa-solid fa-arrow-right" />
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

      
{/* Bottom grid: preview + map */}
<div className="contactBottomGrid">
  

  <div className="contactCard contactMapCard">
    <iframe
        title="INGENIUM Office Location"
       aria-label="INGENIUM Office Location" 
      className="contactMap"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps?ll=5.612832,-0.203421&z=15&t=m&hl=en-US&gl=US&mapclient=embed&cid=15581004579820986434"
    />
  </div>
</div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
