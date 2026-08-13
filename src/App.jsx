import Header from './components/Header'
import Hero from './components/home/Hero'
import ClientView from './components/home/ClientView'
import Backstage from './components/home/Backstage'
import Method from './components/home/Method'
import Eliminates from './components/home/Eliminates'
import Deliverables from './components/home/Deliverables'
import Segmentations from './components/home/Segmentations'
import CashbackSection from './components/home/CashbackSection'
import ForWhom from './components/home/ForWhom'
import Contact from './components/home/Contact'
import Partners from './components/Partners'
import Footer from './components/Footer'
import { useLocale } from './LocaleProvider.jsx'
import { LABELS } from './i18n-labels.js'

export default function App() {
  const { locale } = useLocale()
  const labels = LABELS[locale]

  return (
    <>
      <Header active="/" surface="light" />
      <a className="skip-link" href="#main-content">{labels.skipToContent}</a>
      <main id="main-content" tabIndex="-1">
        <Hero />
        <Segmentations />
        <ClientView />
        <Backstage />
        <Method />
        <Eliminates />
        <Deliverables />
        <CashbackSection />
        <ForWhom />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
