import Header from './components/Header'
import Hero from './components/Hero'
import ValueProp from './components/ValueProp'
import Features from './components/Features'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValueProp />
        <Features />
      </main>
      <Footer />
    </>
  )
}
