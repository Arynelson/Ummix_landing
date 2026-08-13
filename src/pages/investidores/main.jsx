import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../index.css'
import './investidores.css'
import InvestidoresPage from './InvestidoresPage'
import { LocaleProvider } from '../../LocaleProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocaleProvider>
      <InvestidoresPage />
    </LocaleProvider>
  </StrictMode>,
)
