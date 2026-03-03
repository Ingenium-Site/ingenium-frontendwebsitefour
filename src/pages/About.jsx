import PageHeader from '../components/PageHeader.jsx'
import Footer from "../components/Footer/Footer.jsx"; 
export default function About() {
  return (
    <main className="page">
      <PageHeader title="About Us" />

      <div className="pageBody">
        <div className="container">
          <p className="pageNote">
            This is a minimal About Us page scaffold (routing + layout). Replace the content below with your exact Figma
            sections.
          </p>

          <div className="card">
            <p className="pageNote" style={{ margin: 0 }}>
              Add your About content here per the Figma design.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
