import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../index.css'
import AwardsPage from './AwardsPage'
import { LocaleProvider } from '../../LocaleProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocaleProvider>
      <AwardsPage />
    </LocaleProvider>
  </StrictMode>,
)
