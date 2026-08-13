import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../index.css'
import CashbackPage from './CashbackPage'
import { LocaleProvider } from '../../LocaleProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocaleProvider>
      <CashbackPage />
    </LocaleProvider>
  </StrictMode>
)
