import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Ganti 'nama-repo-kamu' dengan nama repositori GitHub milikmu nanti
  base: '/fiela-project/', 
  build: {
    outDir: 'docs', // Mengarahkan hasil build ke folder docs
    emptyOutDir: true, // Membersihkan folder docs lama setiap kali build baru
  }
})