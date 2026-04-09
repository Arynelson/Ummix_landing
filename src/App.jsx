import Header from './components/Header'
import Hero from './components/Hero'
import VideoEmbed from './components/VideoEmbed'
import Features from './components/Features'
import Segmentation from './components/Segmentation'
import Partners from './components/Partners'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <VideoEmbed />
        <Features />
        <Segmentation />
        <Partners />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
