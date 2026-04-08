import Header from './components/Header'
import Hero from './components/Hero'
import ValueProp from './components/ValueProp'
import Features from './components/Features'
import Segmentation from './components/Segmentation'
import Partners from './components/Partners'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValueProp />
        <Features />
        <Segmentation />
        <Partners />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
