import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  cacheDir: '.vite',
  build: {
    rollupOptions: {
      input: {
        main:     resolve(__dirname, 'index.html'),
        cashback: resolve(__dirname, 'cashback.html'),
        partner:  resolve(__dirname, 'partner.html'),
        monetize: resolve(__dirname, 'monetize.html'),
        investors: resolve(__dirname, 'investidores.html'),
        english: resolve(__dirname, 'en/index.html'),
        englishCashback: resolve(__dirname, 'en/cashback.html'),
        englishPartner: resolve(__dirname, 'en/partner.html'),
        englishMonetize: resolve(__dirname, 'en/monetize.html'),
        englishInvestors: resolve(__dirname, 'en/investidores.html'),
        spanish: resolve(__dirname, 'es/index.html'),
        spanishCashback: resolve(__dirname, 'es/cashback.html'),
        spanishPartner: resolve(__dirname, 'es/partner.html'),
        spanishMonetize: resolve(__dirname, 'es/monetize.html'),
        spanishInvestors: resolve(__dirname, 'es/investidores.html'),
      },
    },
  },
})
