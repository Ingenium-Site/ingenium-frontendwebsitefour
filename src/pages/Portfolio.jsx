import PageHeader from '../components/PageHeader.jsx'
import Footer from "../components/Footer/Footer.jsx"; 

export default function Portfolio() {
  return (
    <main className="page">
      <PageHeader title="Portfolio" />

      <div className="pageBody">
        <div className="container">
          <p className="pageNote">
            This is the Portfolio page. Replace this content with your actual portfolio content based on Figma design.
          </p>

          <div className="card">
            <p className="pageNote" style={{ margin: 0 }}>
              Add your portfolio content here per the Figma design.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}