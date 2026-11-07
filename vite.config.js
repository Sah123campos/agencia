import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// BASE_PATH é definido no workflow do GitHub Pages ("/<nome-do-repositorio>/"),
// porque lá o site fica numa subpasta. Rodando local, a base é "/".
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE_PATH || '/',
})
