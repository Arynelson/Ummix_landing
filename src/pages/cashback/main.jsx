import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../index.css'
import CashbackPage from './CashbackPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CashbackPage />
  </StrictMode>
)
