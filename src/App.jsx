// App.jsx — componente raiz. Aqui fica o ESTADO CENTRAL do sistema:
// o array de pacotes. Todas as páginas recebem dados e funções daqui por props.
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Cadastro from './pages/Cadastro.jsx'
import Visualizacao from './pages/Visualizacao.jsx'
import NaoEncontrada from './pages/NaoEncontrada.jsx'
import Navbar from './components/Navbar.jsx'
import './App.css'

// Chave usada no localStorage (opcional O6)
const CHAVE_STORAGE = 'pacotes-26176915'

// 3 registros de exemplo. O terceiro tem o meu RA no campo complementar
// (Data de saída), como pede o requisito R3.
const registrosIniciais = [
  { id: 1, destino: 'Gramado', valor: 1850, transporte: 'Rodoviário', dataSaida: '2026-12-20' },
  { id: 2, destino: 'Lisboa', valor: 6400, transporte: 'Aéreo', dataSaida: '2027-01-15' },
  { id: 3, destino: 'Fernando de Noronha', valor: 4200, transporte: 'Marítimo', dataSaida: '26176915' },
]

// Constante passada para a Visualização via props (requisito R4)
const TITULO_VISUALIZACAO = 'Pacotes cadastrados'

// Lê os registros salvos no navegador; se não houver nada (ou der erro),
// começa com os 3 registros de exemplo.
function carregarRegistros() {
  try {
    const salvos = localStorage.getItem(CHAVE_STORAGE)
    return salvos ? JSON.parse(salvos) : registrosIniciais
  } catch {
    return registrosIniciais
  }
}

function App() {
  // Estado central: o array de pacotes. A função passada ao useState só roda
  // na primeira renderização (leitura do localStorage).
  const [registros, setRegistros] = useState(carregarRegistros)

  // Sempre que o array muda: mostra no console (para o vídeo) e salva no
  // localStorage, assim os dados continuam após o F5 (opcional O6).
  useEffect(() => {
    console.log('Estado do App -> registros:', registros)
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(registros))
  }, [registros])

  // Recebe um pacote novo vindo do Cadastro e cria um NOVO array com o spread,
  // sem alterar o antigo (atualização imutável). O Cadastro recebe esta função,
  // e não o setRegistros direto.
  function adicionarRegistro(novoRegistro) {
    setRegistros((anteriores) => [...anteriores, novoRegistro])
  }

  // Remove um pacote pelo id usando filter, que também devolve um novo array
  // (opcional O3). É passada para a Visualização por props.
  function removerRegistro(id) {
    setRegistros((anteriores) => anteriores.filter((registro) => registro.id !== id))
  }

  return (
    <>
      <main className="conteudo">
        <Routes>
          <Route path="/" element={<Home quantidade={registros.length} />} />
          <Route
            path="/pacotes/novo"
            element={<Cadastro adicionarRegistro={adicionarRegistro} />}
          />
          <Route
            path="/pacotes"
            element={
              <Visualizacao
                title={TITULO_VISUALIZACAO}
                registros={registros}
                removerRegistro={removerRegistro}
              />
            }
          />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>
      <Navbar quantidade={registros.length} />
    </>
  )
}

export default App
