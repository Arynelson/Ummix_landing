import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../index.css'
import PartnerPage from './PartnerPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PartnerPage />
  </StrictMode>
)
