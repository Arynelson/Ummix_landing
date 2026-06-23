import Header from './components/Header'
import Hero from './components/home/Hero'
import ClientView from './components/home/ClientView'
import Backstage from './components/home/Backstage'
import Method from './components/home/Method'
import Eliminates from './components/home/Eliminates'
import Deliverables from './components/home/Deliverables'
import Segmentations from './components/home/Segmentations'
import Results from './components/home/Results'
import CashbackSection from './components/home/CashbackSection'
import ForWhom from './components/home/ForWhom'
import Contact from './components/home/Contact'
import Partners from './components/Partners'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ClientView />
        <Backstage />
        <Method />
        <Eliminates />
        <Deliverables />
        <Segmentations />
        <Results />
        <CashbackSection />
        <ForWhom />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
