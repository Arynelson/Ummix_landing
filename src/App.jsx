import Header from './components/Header'
import Hero from './components/Hero'
import VideoEmbed from './components/VideoEmbed'
import CountersStrip from './components/CountersStrip'
import WorkflowSection from './components/WorkflowSection'
import Features from './components/Features'
import Segmentation from './components/Segmentation'
import Partners from './components/Partners'
import Testimonials from './components/Testimonials'
import PlatformAccess from './components/PlatformAccess'
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
        <WorkflowSection />
        <Features />
        <Segmentation />
        <Partners />
        <Testimonials />
        <PlatformAccess />
      </main>
      <FloatingCTA />
      <Footer />
    </>
  )
}
