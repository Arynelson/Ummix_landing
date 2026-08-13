import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../index.css'
import PartnerPage from './PartnerPage'
import { LocaleProvider } from '../../LocaleProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocaleProvider>
      <PartnerPage />
    </LocaleProvider>
  </StrictMode>
)
