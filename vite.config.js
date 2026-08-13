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
        investors: resolve(__dirname, 'investidores.html'),
        english: resolve(__dirname, 'en/index.html'),
        englishCashback: resolve(__dirname, 'en/cashback.html'),
        englishPartner: resolve(__dirname, 'en/partner.html'),
      },
    },
  },
})
