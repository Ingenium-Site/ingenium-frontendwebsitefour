import PageHeader from '../components/PageHeader.jsx'

export default function Insight() {
  return (
    <main className="page">
      <PageHeader title="Insight" />

      <div className="pageBody">
        <div className="container">
          <p className="pageNote">
            This is a minimal Insight page scaffold (routing + layout). Replace the content below with your exact Figma
            sections.
          </p>

          <div className="card">
            <p className="pageNote" style={{ margin: 0 }}>
              Add your Insight/blog/case study content here per the Figma design.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
