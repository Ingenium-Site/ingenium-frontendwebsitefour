import PageHeader from '../components/PageHeader.jsx'
import Footer from "../components/Footer/Footer.jsx"; 

export default function HowWeThink() {
  return (
    <main className="page">
      <PageHeader title="How We Think (IIE)" />

      <div className="pageBody">
        <div className="container">
          <p className="pageNote">
            This is the How We Think (IIE) page. Replace this content with your actual content based on Figma design.
          </p>

          <div className="card">
            <p className="pageNote" style={{ margin: 0 }}>
              Add your how we think content here per the Figma design.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}