import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../../index.css'
import './investidores.css'
import InvestidoresPage from './InvestidoresPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <InvestidoresPage />
  </StrictMode>,
)
