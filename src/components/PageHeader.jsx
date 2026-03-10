import heroArtwork from '../assets/hero-artwork.png';
import { ChevronDown } from "lucide-react";

export default function PageHeader({ title = '', edgeToTop = false }) {
  const scrollToNextSection = () => {
    const pageBody = document.querySelector('.pageBody');
    if (pageBody) {
      pageBody.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={`pageHeader${edgeToTop ? ' edgeToTop' : ''}`} aria-label={`${title} header`}>
      <div className="pageHeaderBg" style={{ backgroundImage: `url(${heroArtwork})` }} aria-hidden="true" />
      <div className="pageHeaderOverlay" aria-hidden="true" />
      <div className="pageHeaderInner">
        <h1 className="pageTitle">{title}</h1>
      </div>
      {/* Scroll down button in the middle of the PageHeader */}
      <button
        type="button"
        className="header-scroll-cue"
        aria-label="Scroll to content"
        onClick={scrollToNextSection}
      >
        <ChevronDown size={28} strokeWidth={2} aria-hidden="true" />
      </button>
    </header>
  )
}