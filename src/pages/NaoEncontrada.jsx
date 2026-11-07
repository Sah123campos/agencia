// Página "Não encontrada" — aparece quando nenhuma rota combina com a URL.
// Ela é ligada no App.jsx pela rota coringa path="*".
// Não recebe props: o caminho digitado vem direto do hook useLocation.
import { Link, useLocation } from 'react-router-dom'

function NaoEncontrada() {
  // useLocation devolve o objeto da URL atual; pathname é o caminho digitado
  // pelo usuário (ex.: "/viagem123").
  const location = useLocation()

  return (
    <section className="pagina nao-encontrada">
      <span className="codigo-erro">404</span>
      <h1>Página não encontrada</h1>
      <p>
        O caminho <code>{location.pathname}</code> não existe neste sistema.
      </p>
      {/* Link (e não <a href>) para voltar à Home sem recarregar a página */}
      <Link to="/" className="botao">
        Voltar para a Home
      </Link>
    </section>
  )
}

export default NaoEncontrada
