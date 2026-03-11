import PageHeader from '../components/PageHeader.jsx'
import Footer from "../components/Footer/Footer.jsx";
import ieeImage from '../assets/iee.png';

export default function HowWeThink() {
  return (
    <main className="page">
      <PageHeader title="INGENIUM INTELLIGENCE ENGINE" />

      <div className="pageBody">
        <div className="container">
          <div className="iie-intro">
            <h2 className="iie-headline">From Intelligence to Impact</h2>
            <p className="iie-paragraph">
              The Ingenium Intelligence Engine is our proprietary system for transforming research, experience, and strategic planning into disciplined market action. Developed through real-world execution, it is applied exclusively by Ingenium to convert intelligence into strategy, execution, and measurable progress.
            </p>
          </div>

          <div className="iie-infographic-section">
            <p className="infographic-support-line">
              A six-stage cycle that turns intelligence into direction, direction into execution, and execution into performance.
            </p>
            
            <div className="infographic-container">
              <img 
                src={ieeImage} 
                alt="Ingenium Intelligence Engine infographic showing the six-stage cycle" 
                className="infographic-image"
              />
            </div>
            
            <p className="infographic-closing">
              The Intelligence Engine is how Ingenium moves organizations from complexity to clarity, and from ambition to measurable progress.
              Applied across sectors, markets, and growth stages through a system built on lived experience, not theory alone.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}