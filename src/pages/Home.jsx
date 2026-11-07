// Página Home (rota "/").
// Prop "quantidade": calculada no App.jsx como registros.length e enviada
// por props. Como vem do estado do App, o número se atualiza sozinho quando
// um pacote é cadastrado ou removido, sem recarregar a página.
import { Link } from 'react-router-dom'

function Home({ quantidade }) {
  return (
    <section className="pagina home">
      <p className="etiqueta">Sistema de cadastro de pacotes</p>
      <h1>Agência de Viagens - Samuel</h1>
      <p className="autor">Desenvolvido por Samuel Santana Pereira Campos</p>

      <div className="contador-card">
        <span className="contador-numero">{quantidade}</span>
        <span className="contador-legenda">
          {quantidade === 1 ? 'pacote cadastrado' : 'pacotes cadastrados'}
        </span>
      </div>

      <div className="acoes">
        <Link to="/pacotes/novo" className="botao">
          Cadastrar pacote
        </Link>
        <Link to="/pacotes" className="botao botao-secundario">
          Ver pacotes
        </Link>
      </div>
    </section>
  )
}

export default Home
