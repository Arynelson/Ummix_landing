import Header from './components/Header'
import Hero from './components/Hero'
import VideoEmbed from './components/VideoEmbed'
import CountersStrip from './components/CountersStrip'
import Features from './components/Features'
import Segmentation from './components/Segmentation'
import Partners from './components/Partners'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingCTA from './components/FloatingCTA'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CountersStrip />
        <VideoEmbed />
        <Features />
        <Segmentation />
        <Partners />
        <Testimonials />
        <Contact />
      </main>
      <FloatingCTA />
      <Footer />
    </>
  )
}
