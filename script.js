// ===========================================================
// SUPABASE - Biblioteca e Conexão
// ===========================================================
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://hzyxcgembkrkdxmioipf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6eXhjZ2VtYmtya2R4bWlvaXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0OTgyOTQsImV4cCI6MjA2OTA3NDI5NH0.oe3zRnVUa5Qovm7nAbk_j2yu7RtQByIk0dhgnzmdZPs'
const supabase = createClient(supabaseUrl, supabaseKey)

ouvirTabelaNotas()

// ===========================================================
// Seletores DOM
// ===========================================================
const formal = document.querySelector(".formal section")
const naoFormal = document.querySelector(".nao-formal section")
const informal = document.querySelector(".informal section")

const formCriar = document.querySelectorAll(".criar-nota")

// ===========================================================
// Variáveis globais
// ===========================================================
let logado
let dbNotas

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

        const nota = {categoria_id: categoria, texto}
        await inserirNota(nota)

        // limpar input
        form.nota.value = ''
    })
})

// ===========================================================
// Funções - Manipulando o DOM
// ===========================================================

// carregar página
async function carregarPagina() {

    // Se for a primeira vez cria o usuário e deixa a id salva no storage
    logado = await logarUsuario()

    // faz a primeira consulta ao banco de dados
    const { data, error } = await supabase
        .from('ll_vw_notas')
        .select('*')

    if (error) {
        console.error('Erro ao conectar:', error)
    } else {
        dbNotas = data
    }
    preencherNotas()
}

async function preencherNotas() {

    dbNotas.forEach(nota => {
        criarNotaElemento(nota)
    })
}

// ===========================================================
// Funções - Banco de dados
// ===========================================================

// Cria elemento da nota no DOM
function criarNotaElemento({ id, usuario_id, categoria_id, texto }) {
    const nota = document.createElement('div')
    nota.dataset.id = id
    nota.dataset.usuario = usuario_id
    nota.dataset.categoria = categoria_id
    nota.classList.add('nota')
    nota.textContent = texto

    // Se a nota é do usuário logado, adiciona classe extra e botão de apagar
    if (logado.id === usuario_id) {
        nota.classList.add('nota-pessoal')

        const apagar = document.createElement('button')
        apagar.innerHTML = '<i class="bi bi-x-circle-fill"></i>'
        apagar.addEventListener('click', async e => {
            e.stopPropagation()  // evita que o click suba para a div
            await apagarNota(id)
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

// ===========================================================
// Funções - Banco de dados
// ===========================================================

// Logar ou criar usuário
async function logarUsuario() {

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
    return data
}
async function inserirNota({ categoria_id, usuario_id = logado.id, texto }) {
    const { data, error } = await supabase
        .from('ll_notas')
        .insert([{ categoria_id, usuario_id, texto }])
        .select()
        .single()

    criarNotaElemento(data)
}

async function apagarNota(id) {
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