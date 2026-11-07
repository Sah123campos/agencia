// Ponto de entrada da aplicação.
// O BrowserRouter envolve o App inteiro: assim todas as rotas, links e hooks
// do React Router (useNavigate, useLocation...) funcionam em qualquer página.
// basename: no GitHub Pages o site fica em /<repositorio>/, então as rotas
// partem dessa subpasta (rodando local, é só "/").
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
