import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Visualizacao from './pages/Visualizacao.jsx'
import NaoEncontrada from './pages/NaoEncontrada.jsx'
import './App.css'

function App() {
  return (
    <main className="conteudo">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pacotes/novo" element={<Cadastro />} />
        <Route path="/pacotes" element={<Visualizacao />} />
        <Route path="*" element={<NaoEncontrada />} />
      </Routes>
    </main>
  )
}

export default App
