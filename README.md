# router-26176915 — Agência de Viagens - Samuel

SPA em React + Vite + React Router feita para a Situação-Problema Individual (Agenda Personalizada com React Router).

- **Aluno:** Samuel Santana Pereira Campos
- **RA:** 26176915
- **Sistema:** Agência de Viagens - Samuel
- **Slug:** `pacotes`
- **Site publicado:** https://sah123campos.github.io/agencia/

## Meus parâmetros

Dígitos do RA: **2 6 1 7 6 9 1 5**

| Parâmetro | Cálculo | Resultado |
|---|---|---|
| **A** | dois últimos = 15; 15 ÷ 20 = 0, resto **15** | Agência de viagens, slug `pacotes` |
| **B** | antepenúltimo dígito = **9** | Após salvar, a visualização mostra mensagem de sucesso enviada pelo state do `navigate` |
| **C** | 2+6+1+7+6+9+1+5 = 37; 37 ÷ 6 = 6, resto **1** | Tabela `<table>`, uma coluna por campo |
| **D** | quarto do final = 6; 6 ÷ 4 = 1, resto **2** | Navbar fixa no rodapé, estilo barra de aplicativo de celular |
| **Cor** | três últimos = 915; 915 ÷ 360 = 2, resto **195** | `hsl(195, 60%, 35%)` (azul petróleo) |

**Campos (Tabela A, linha 15):** Destino (texto), Valor (R$) (número), Transporte (Aéreo, Rodoviário, Marítimo) e Data de saída.

## Rotas

| Rota | Página |
|---|---|
| `/` | Home: nome do sistema, meu nome e quantidade de pacotes |
| `/pacotes/novo` | Cadastro (formulário controlado + regra B) |
| `/pacotes` | Visualização em tabela |
| `*` | Página não encontrada (mostra o caminho com `useLocation`) |

## Como rodar

```bash
npm install
npm run dev
```

Depois abra o endereço mostrado no terminal (normalmente http://localhost:5173).

## Opcionais feitos

- [x] **O3 — Remover:** botão em cada linha da tabela; a função `removerRegistro` é criada no App e passada por props (usa `filter`).
- [x] **O5 — Busca:** campo na visualização que filtra pelo Destino enquanto o usuário digita (estado local + `filter` + `includes`).
- [x] **O6 — Persistência:** registros salvos no `localStorage` com `useEffect` + `JSON.stringify`, mantidos após o F5.
- [x] **O8 — Publicação:** site no GitHub Pages, publicado por GitHub Actions (`.github/workflows/deploy.yml`) a cada push. Para as rotas funcionarem ao recarregar, o `vite.config.js` usa a subpasta do repositório como `base`, o `BrowserRouter` recebe o `basename` e o workflow copia o `index.html` para `404.html`.

## Estrutura

```
src/
├── main.jsx              # BrowserRouter envolvendo o App
├── App.jsx               # estado central, funções e rotas
├── App.css / index.css   # estilos e variável --cor-principal
├── components/
│   ├── Navbar.jsx        # barra fixa no rodapé (Tabela D = 2) com contador
│   └── Rodape.jsx        # nome completo + RA
└── pages/
    ├── Home.jsx
    ├── Cadastro.jsx
    ├── Visualizacao.jsx
    └── NaoEncontrada.jsx
```
