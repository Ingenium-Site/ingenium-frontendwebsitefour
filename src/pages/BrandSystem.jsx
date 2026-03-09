import PageHeader from '../components/PageHeader.jsx'
import Footer from "../components/Footer/Footer.jsx"; 

export default function BrandSystem() {
  return (
    <main className="page">
      <PageHeader title="Brand System" />

      <div className="pageBody">
        <div className="container">
          <p className="pageNote">
            This is the Brand System page. Replace this content with your actual brand system content based on Figma design.
          </p>

          <div className="card">
            <p className="pageNote" style={{ margin: 0 }}>
              Add your brand system content here per the Figma design.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}