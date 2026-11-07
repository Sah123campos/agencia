// Navbar — layout da Tabela D, valor 2: barra fixa no rodapé, no estilo
// das barras de navegação de aplicativos de celular (ícone + texto).
// Prop "quantidade": vem do App.jsx (registros.length) e aparece como um
// selo ao lado do link da visualização.
// Só usamos NavLink (nunca <a href>), então trocar de página não recarrega nada.
import { NavLink } from 'react-router-dom'

// Lista dos links; "end" faz o link só ficar ativo na rota exata
// (sem ele, "/pacotes" ficaria ativo também em "/pacotes/novo").
const links = [
  { to: '/', texto: 'Home', icone: '🏠', end: true },
  { to: '/pacotes/novo', texto: 'Cadastrar', icone: '➕', end: true },
  { to: '/pacotes', texto: 'Visualizar', icone: '🧳', end: true },
]

function Navbar({ quantidade }) {
  // O NavLink chama esta função passando { isActive }; devolvemos a classe
  // extra "ativo" para destacar o link da página atual.
  const classeDoLink = ({ isActive }) => (isActive ? 'nav-link ativo' : 'nav-link')

  return (
    <nav className="navbar" aria-label="Navegação principal">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.end} className={classeDoLink}>
          <span className="nav-icone" aria-hidden="true">
            {link.icone}
            {link.to === '/pacotes' && <span className="nav-contador">{quantidade}</span>}
          </span>
          <span className="nav-texto">
            {link.texto}
            {link.to === '/pacotes' && ` (${quantidade})`}
          </span>
        </NavLink>
      ))}
    </nav>
  )
}

export default Navbar
