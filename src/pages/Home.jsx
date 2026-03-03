import Hero from '../components/Hero.jsx'
import GlobalExperience from '../components/GlobalExperience.jsx'
import OurExpertise from "../components/OurExpertise/OurExpertise";
import WhyChooseIngenium from "../components/WhyChooseIngenium/WhyChooseIngenium";
import Footer from "../components/Footer/Footer";
export default function Home() {
  // Optional: set this to a real file like "/videos/hero-loop.mp4"
  const videoSrc = ''

  return (
    <>
      <Hero videoSrc={videoSrc} />
      <GlobalExperience />
      <OurExpertise />
      <WhyChooseIngenium />
      <Footer />  
    </>
  )
}
