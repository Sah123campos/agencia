// Página de Visualização (rota "/pacotes") — formato da Tabela C, valor 1:
// uma <table> com uma coluna para cada campo.
// Props recebidas do App.jsx:
//   - title: constante (TITULO_VISUALIZACAO) usada como título da página;
//   - registros: o array do estado central (useState do App);
//   - removerRegistro: função do App que tira um pacote pelo id (opcional O3).
// A mensagem de sucesso NÃO vem por props: ela chega pelo state do navigate
// feito no Cadastro (regra B = 9) e é lida aqui com useLocation.
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// Formata o número como moeda brasileira (ex.: 1850 -> "R$ 1.850,00")
function formatarValor(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

// Converte "2026-12-20" para "20/12/2026". Se o texto não for uma data
// nesse formato (como o registro com o RA), mostra do jeito que está.
function formatarData(texto) {
  const partes = /^(\d{4})-(\d{2})-(\d{2})$/.exec(texto)
  return partes ? `${partes[3]}/${partes[2]}/${partes[1]}` : texto
}

function Visualizacao({ title, registros, removerRegistro }) {
  // location.state guarda o que o Cadastro mandou no navigate
  const location = useLocation()
  const navigate = useNavigate()
  const mensagem = location.state?.mensagem

  // Estado local da busca (opcional O5): o texto digitado no campo
  const [busca, setBusca] = useState('')

  // Filtra pelo Destino enquanto o usuário digita, sem diferenciar
  // maiúsculas de minúsculas. Não altera o array original.
  const termo = busca.trim().toLowerCase()
  const filtrados = registros.filter((registro) =>
    registro.destino.toLowerCase().includes(termo),
  )

  // Fecha o aviso de sucesso: troca a entrada atual do histórico por uma sem
  // state, assim a mensagem some e não volta ao apertar F5.
  function fecharMensagem() {
    navigate(location.pathname, { replace: true, state: null })
  }

  // Pede confirmação e chama a função do App para remover o pacote
  function handleRemover(registro) {
    if (window.confirm(`Remover o pacote para ${registro.destino}?`)) {
      removerRegistro(registro.id)
    }
  }

  return (
    <section className="pagina">
      <h1>{title}</h1>

      {mensagem && (
        <div className="alerta alerta-sucesso" role="status">
          <span>✅ {mensagem}</span>
          <button type="button" className="alerta-fechar" onClick={fecharMensagem} aria-label="Fechar aviso">
            ×
          </button>
        </div>
      )}

      {registros.length === 0 ? (
        // Lista vazia: mensagem com link para o cadastro (requisito R6)
        <div className="vazio">
          <p>Nenhum pacote cadastrado ainda.</p>
          <Link to="/pacotes/novo" className="botao">
            Cadastrar o primeiro pacote
          </Link>
        </div>
      ) : (
        <>
          <input
            type="search"
            className="busca"
            placeholder="🔎 Buscar por destino..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            aria-label="Buscar por destino"
          />

          <div className="tabela-container">
            <table className="tabela">
              <thead>
                <tr>
                  <th>Destino</th>
                  <th>Valor (R$)</th>
                  <th>Transporte</th>
                  <th>Data de saída</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {/* map com key={registro.id}: cada linha tem uma chave única */}
                {filtrados.map((registro) => (
                  <tr key={registro.id}>
                    <td>{registro.destino}</td>
                    <td className="numero">{formatarValor(registro.valor)}</td>
                    <td>
                      <span className="selo">{registro.transporte}</span>
                    </td>
                    <td>{formatarData(registro.dataSaida)}</td>
                    <td>
                      <button
                        type="button"
                        className="botao-remover"
                        onClick={() => handleRemover(registro)}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
                {filtrados.length === 0 && (
                  <tr>
                    <td colSpan="5" className="sem-resultado">
                      Nenhum destino encontrado para "{busca}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  )
}

export default Visualizacao
