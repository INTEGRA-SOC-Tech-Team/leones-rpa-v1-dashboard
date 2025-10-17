import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/leones-dashboard/',  // 👈 importante: todas las rutas serán relativas a /frontend
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.integraso.com',  // sigue siendo útil para desarrollo local
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
