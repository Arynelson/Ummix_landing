import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import './monetize.css'
import MonetizePage from './MonetizePage'
import { LocaleProvider } from '../LocaleProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocaleProvider>
      <MonetizePage />
    </LocaleProvider>
  </StrictMode>,
)
