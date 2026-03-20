import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'paws-preferences' with your actual GitHub repo name
export default defineConfig({
  plugins: [react()],
  base: '/paws-preferences/',
})
