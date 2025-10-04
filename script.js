// ===========================================================
// SUPABASE - Biblioteca e Conexão
// ===========================================================
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://hzyxcgembkrkdxmioipf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6eXhjZ2VtYmtya2R4bWlvaXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0OTgyOTQsImV4cCI6MjA2OTA3NDI5NH0.oe3zRnVUa5Qovm7nAbk_j2yu7RtQByIk0dhgnzmdZPs'
const supabase = createClient(supabaseUrl, supabaseKey)

ouvirTabelaUsuarios()
ouvirTabelaNotas()

// ===========================================================
// Seletores DOM
// ===========================================================
const formal = document.querySelector(".formal section")
const naoFormal = document.querySelector(".nao-formal section")
const informal = document.querySelector(".informal section")

const formCriar = document.querySelectorAll(".criar-nota")

const modal = document.querySelector('#modal')
const modalMudarNome = document.querySelector('#modalMudarNome')
const modalChat = document.querySelector('#modalChat')
const btnModalNome = document.querySelector('#menus .nome')
const btnModalMudarNome = modalMudarNome.querySelector('button')
const inputModalMudarNome = modalMudarNome.querySelector('input')
const btnModalChat = document.querySelector('#menus .chat')
const btnModalFechar = document.querySelector('#modal .fechar')

// ===========================================================
// Variáveis globais
// ===========================================================
let logado
const usuarios = {}

// ===========================================================
// Inicialização
// ===========================================================
carregarPagina()

// ===========================================================
// Listener formulário criar nova nota
// ===========================================================
formCriar.forEach(form => {
  form.addEventListener("submit", async e => {
    e.preventDefault()


    const texto = form.nota.value.trim()
    if (!texto) return

    const categoria = form.nota.dataset.categoria // pega categoria do input

    const nota = { categoria_id: categoria, texto }
    await dbInserirNota(nota)

    // limpar input
    form.nota.value = ''
  })
})

// Modal nome
// Listener btn nome
btnModalNome.addEventListener('click', e => {
  modalChat.classList.add('display-none')
  modalMudarNome.classList.remove('display-none')
  modal.classList.remove('display-none')
})

inputModalMudarNome.addEventListener('keydown', e => {
  console.log(e.key)
})

btnModalMudarNome.addEventListener('click', e => {
  e.preventDefault()
  dbMudarNomeUsuario(inputModalMudarNome.value.trim())
})

// Modal Chat
// Listener btn chat
btnModalChat.addEventListener('click', e => {
  modalMudarNome.classList.add('display-none')
  modalChat.classList.remove('display-none')
  modal.classList.remove('display-none')
})

// Modal fechar
// Listener btn fechar
btnModalFechar.addEventListener('click', e => {
  modal.classList.add('display-none')
  modalMudarNome.classList.add('display-none')
  modalChat.classList.add('display-none')
})

// ===========================================================
// Funções - Manipulando o DOM
// ===========================================================

// carregar página
async function carregarPagina() {

  // Se for a primeira vez cria o usuário e deixa a id salva no storage
  logado = await dbLogarUsuario()
  menusNome()

  // faz a primeira consulta ao banco de dados e imprime todas as notas
  const { data, error } = await supabase
    .from('ll_vw_notas')
    .select('*')

  if (error) {
    console.error('Erro ao conectar:', error)
  } else {
    apagarCarregando()
    data.forEach(nota => {
      // Salva usuarios em obj
      if (!usuarios[nota.usuario_id]) {
        usuarios[nota.usuario_id] = nota.usuario_nome
      }

      // cria as notas
      criarNotaElemento(nota)
    })
  }
}

function apagarCarregando() {
  const elementos = document.querySelectorAll('.carregando')
  elementos.forEach(carregando => carregando.remove())
}

// ===========================================================
// Funções - Elementos - criar/editar/apagar
// ===========================================================

// Cria elemento da nota no DOM
function criarNotaElemento({ id, usuario_id, categoria_id, texto }) {
  const nota = document.createElement('div')
  nota.dataset.id = id
  nota.dataset.usuario = usuario_id
  nota.dataset.categoria = categoria_id
  nota.classList.add('nota')
  nota.textContent = texto
  
  // Coloca criador da nota
  const autor = document.createElement('div')
  autor.textContent = usuarios[usuario_id]
  autor.classList.add('autor')
  nota.prepend(autor)
  
  // Se a nota é do usuário logado, adiciona classe extra e botão de apagar
  if (logado.id === usuario_id) {
    nota.classList.add('nota-pessoal')
    
    const apagar = document.createElement('button')
    apagar.innerHTML = '<i class="bi bi-x-circle-fill"></i>'
    apagar.addEventListener('click', async e => {
      e.stopPropagation()  // evita que o click suba para a div
      await dbApagarNota(id)
    })
    
    nota.appendChild(apagar)
  }
  // coloca a nota na coluna certa
  let elemento
  if (categoria_id == 1) elemento = formal
  if (categoria_id == 2) elemento = naoFormal
  if (categoria_id == 3) elemento = informal
  if (elemento) elemento.prepend(nota)
  }

// Apaga elemento da nota no DOM
function apagarNotaElemento(id) {
  const notas = document.querySelectorAll('.nota')
  
  notas.forEach(nota => {
    const nota_id = parseInt(nota.dataset.id)
    if (nota_id === id) nota.remove()
    })
}

// Muda nome de usuário nas notas
function notasUsuarioAlterado({id, nome}) {
const notas = document.querySelectorAll(`.quadro .nota[data-usuario="${id}"] .autor`)

notas.forEach(autor => autor.textContent = nome)
}

// #menus nome
function menusNome() {
  const nome = document.querySelector('#menus .nome')
  nome.innerHTML = `<i class="bi bi-person-fill-gear"></i> ${logado.nome}`
}

// ===========================================================
// Funções - Banco de dados
// ===========================================================

// Logar ou criar usuário
async function dbLogarUsuario() {

  let logado = localStorage.getItem('logado')

  if (logado) {
    return JSON.parse(logado)
  }

  // se não tem no localStorage, cria no Supabase
  const { data, error } = await supabase
    .from('ll_usuarios')
    .insert([{}]) // insere usuário com id auto increment e nome default
    .select()
    .single() // retorna apenas um objeto, não array

  if (error) {
    console.error('Erro ao criar usuário:', error)
    return null
  }

  localStorage.setItem('logado', JSON.stringify(data))
  usuarios[data.id] = data.nome
  return data
}

async function dbMudarNomeUsuario(nome) {
  if (!nome) return

  const { data } = await supabase
    .from('ll_usuarios')
    .update({ nome })
    .eq('id', logado.id)
    .select()
    .single()

  logado = data
  localStorage.setItem('logado', JSON.stringify(data))
  menusNome()

  return data
}

async function dbInserirNota({ categoria_id, usuario_id = logado.id, texto }) {
  const { data, error } = await supabase
    .from('ll_notas')
    .insert([{ categoria_id, usuario_id, texto }])
    .select()
    .single()

  criarNotaElemento(data)
}

async function dbApagarNota(id) {
  const { data, error } = await supabase
    .from('ll_notas')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Erro ao apagar nota:', error)
    return null
  }

  apagarNotaElemento(id)
}

// ===========================================================
// Realtime
// ===========================================================
function ouvirTabelaNotas() {
  const channel = supabase
    .channel('canal_ll_notas')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'll_notas' },
      (payload) => {
        console.log("Evento:", payload.eventType)

        if (payload.eventType === "INSERT") {
          console.log("Nova nota:", payload.new)

          if (logado.id !== payload.new.usuario_id) criarNotaElemento(payload.new)
          // ex: adicionar no DOM
        }

        if (payload.eventType === "UPDATE") {
          console.log("Nota atualizada:", payload.new)
          console.log("Antes era:", payload.old)
          // ex: atualizar no DOM
        }

        if (payload.eventType === "DELETE") {
          console.log("Nota removida:", payload.old)

          apagarNotaElemento(payload.old.id)
          // ex: remover do DOM
        }
      }
    )
    .subscribe()

  console.log('ouvindo ll_notas')
}


function ouvirTabelaUsuarios() {
  const channel = supabase
    .channel('canal_ll_usuarios')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'll_usuarios' },
      (payload) => {
        console.log("Evento:", payload.eventType)

        if (payload.eventType === "INSERT") {
          console.log("Novo usuario:", payload.new)

          usuarios[payload.new.id] = payload.new.nome
          // ex: adicionar no DOM
        }

        if (payload.eventType === "UPDATE") {
          console.log("Usuario atualizado:", payload.new)
          console.log("Antes era:", payload.old)

          usuarios[payload.new.id] = payload.new.nome
          notasUsuarioAlterado(payload.new)
          // ex: atualizar no DOM
        }

        if (payload.eventType === "DELETE") {
          console.log("Usuario removido:", payload.old)

          // ex: remover do DOM
        }
      }
    )
    .subscribe()

  console.log('ouvindo ll_usuarios')
}




//-------------------------------------------------------------------------


// trava barra de rolagem
function rolagemBloquear() {
  // Pega a posição atual do scroll
  const scrollTop = window.scrollY || document.documentElement.scrollTop;

  // Congela a rolagem
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollTop}px`;
  document.body.style.width = '100%';
}

// Libera barra de rolagem
function rolagemLiberar() {
  // Recupera a posição que estava
  const scrollTop = parseInt(document.body.style.top || '0') * -1;

  // Libera o scroll
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';

  // Restaura o scroll
  window.scrollTo(0, scrollTop);
}






// particle.js
document.addEventListener("DOMContentLoaded", function () {
  particlesJS("particles-js",
    {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle"
        },
        "opacity": {
          "value": 0.5
        },
        "size": {
          "value": 3,
          "random": true
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          }
        }
      },
      "retina_detect": true
    },
    function () {
      console.log("particles.js carregado com configuração personalizada");
    }
  );
});