import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Разрешить доступ по сети
    port: 5173,
    cors: true,  // Разрешить CORS
    proxy: {
      // Если есть API запросы, добавьте прокси
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})