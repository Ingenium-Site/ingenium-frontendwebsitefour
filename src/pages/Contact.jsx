import PageHeader from '../components/PageHeader.jsx'

export default function Contact() {
  const onSubmit = (e) => {
    e.preventDefault()
    // Hook this up to your backend / email provider when ready.
  }

  return (
    <main className="page">
      <PageHeader title="Contact" />

      <div className="pageBody">
        <div className="container">
          <p className="pageNote">
            This is a minimal Contact page scaffold (routing + layout). Replace the form layout/content below with your
            exact Figma design if needed.
          </p>

          <div className="card">
            <form className="form" onSubmit={onSubmit}>
              <input className="input" type="text" name="name" placeholder="Your name" autoComplete="name" />
              <input className="input" type="email" name="email" placeholder="Your email" autoComplete="email" />
              <textarea className="textarea" name="message" placeholder="Your message" />
              <button className="submit" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
