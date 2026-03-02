import heroArtwork from '../assets/hero-artwork.png'

export default function PageHeader({ title = '' }) {
  return (
    <header className="pageHeader" aria-label={`${title} header`}>
      <div className="pageHeaderBg" style={{ backgroundImage: `url(${heroArtwork})` }} aria-hidden="true" />
      <div className="pageHeaderOverlay" aria-hidden="true" />
      <div className="pageHeaderInner">
        <h1 className="pageTitle">{title}</h1>
      </div>
    </header>
  )
}
