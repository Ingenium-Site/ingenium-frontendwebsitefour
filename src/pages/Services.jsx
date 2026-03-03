import PageHeader from '../components/PageHeader.jsx'
import Footer from "../components/Footer/Footer.jsx"; 
export default function Services() {
  return (
    <main className="page">
      <PageHeader title="Services" />

      <div className="pageBody">
        <div className="container">
          <p className="pageNote">
            This is a minimal Services page scaffold (routing + layout). Replace the content below with your exact Figma
            sections.
          </p>

          <div className="card">
            <p className="pageNote" style={{ margin: 0 }}>
              Add your services list / cards here per the Figma design.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
