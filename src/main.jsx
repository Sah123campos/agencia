// Ponto de entrada da aplicação.
// O BrowserRouter envolve o App inteiro: assim todas as rotas, links e hooks
// do React Router (useNavigate, useLocation...) funcionam em qualquer página.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
