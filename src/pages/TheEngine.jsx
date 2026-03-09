import PageHeader from '../components/PageHeader.jsx'
import Footer from "../components/Footer/Footer.jsx"; 

export default function TheEngine() {
  return (
    <main className="page">
      <PageHeader title="The Engine" />

      <div className="pageBody">
        <div className="container">
          <p className="pageNote">
            This is the The Engine page. Replace this content with your actual engine content based on Figma design.
          </p>

          <div className="card">
            <p className="pageNote" style={{ margin: 0 }}>
              Add your engine content here per the Figma design.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}