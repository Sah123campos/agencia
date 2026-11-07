// Página de Cadastro (rota "/pacotes/novo").
// Prop "adicionarRegistro": função criada no App.jsx. O Cadastro não mexe no
// estado do App diretamente; ele só chama essa função com o pacote novo.
// Regra da Tabela B (valor 9): depois de salvar, vamos para a visualização
// levando uma mensagem de sucesso no state do navigate.
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Opções do campo de seleção (Tabela A, linha 15)
const OPCOES_TRANSPORTE = ['Aéreo', 'Rodoviário', 'Marítimo']

// Valores do formulário vazio, usados no useState
const formularioVazio = { destino: '', valor: '', transporte: '', dataSaida: '' }

function Cadastro({ adicionarRegistro }) {
  // Estado local do formulário controlado: cada input mostra o valor daqui
  const [form, setForm] = useState(formularioVazio)
  // Mensagem de erro quando algum campo fica vazio
  const [erro, setErro] = useState('')
  // Hook para trocar de rota pelo código, sem recarregar a página
  const navigate = useNavigate()

  // Chamada a cada tecla/seleção: copia o form com spread e troca só o campo
  // que mudou (o "name" do input diz qual é).
  function handleChange(e) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  // Chamada ao enviar o formulário
  function handleSubmit(e) {
    // Impede o comportamento padrão do form (recarregar a página)
    e.preventDefault()

    // Validação obrigatória: nenhum campo pode ficar vazio
    const destino = form.destino.trim()
    if (!destino || form.valor === '' || !form.transporte || !form.dataSaida) {
      setErro('Preencha todos os campos antes de salvar.')
      return
    }

    // Monta o pacote com id único gerado por Date.now()
    const novoRegistro = {
      id: Date.now(),
      destino,
      valor: Number(form.valor),
      transporte: form.transporte,
      dataSaida: form.dataSaida,
    }

    // Envia para o App, que atualiza o estado de forma imutável
    adicionarRegistro(novoRegistro)

    // Regra B (9): vai para a visualização levando a mensagem no state
    navigate('/pacotes', { state: { mensagem: 'Pacote cadastrado com sucesso!' } })
  }

  return (
    <section className="pagina">
      <h1>Novo pacote</h1>
      <p className="subtitulo">Preencha os dados do pacote de viagem.</p>

      <form className="formulario" onSubmit={handleSubmit} noValidate>
        <label>
          Destino
          <input
            type="text"
            name="destino"
            value={form.destino}
            onChange={handleChange}
            placeholder="Ex.: Paris"
          />
        </label>

        <label>
          Valor (R$)
          <input
            type="number"
            name="valor"
            value={form.valor}
            onChange={handleChange}
            min="0"
            step="0.01"
            placeholder="Ex.: 3500"
          />
        </label>

        <label>
          Transporte
          <select name="transporte" value={form.transporte} onChange={handleChange}>
            <option value="">Selecione...</option>
            {OPCOES_TRANSPORTE.map((opcao) => (
              <option key={opcao} value={opcao}>
                {opcao}
              </option>
            ))}
          </select>
        </label>

        <label>
          Data de saída
          <input type="date" name="dataSaida" value={form.dataSaida} onChange={handleChange} />
        </label>

        {erro && (
          <p className="alerta alerta-erro" role="alert">
            {erro}
          </p>
        )}

        <button type="submit" className="botao">
          Salvar pacote
        </button>
      </form>
    </section>
  )
}

export default Cadastro
