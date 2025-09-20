// seletores

const formal = document.querySelector(".formal section")
const naoFormal = document.querySelector(".nao-formal section")
const informal = document.querySelector(".informal section")

const formCriar = document.querySelectorAll(".criar-nota")

let dbNotas

preencherNotas()

formCriar.forEach(form => {
    form.addEventListener("submit", e => {
        e.preventDefault()

        const texto = form.nota.value
        form.nota.value = ''

        if (texto == '') return

        const pai = form.closest('.categoria')
        const section = pai.querySelector('section')

        const nota = criarNota(texto)

        section.appendChild(nota)
    })
})


function criarNota(texto) {
    const nota = document.createElement('div')
    nota.classList.add('nota')
    nota.textContent = texto
    nota.addEventListener('click', e => {
        e.currentTarget.remove()
    })
    return nota
}

async function preencherNotas(params) {
    const data = await fetch('data-notas.json')
    const notas = await data.json()

    dbNotas = notas

    notas.forEach(nota => {

        if (nota.categoria == 1) {
            const nnota = criarNota(nota.texto)
            formal.appendChild(nnota)
        }
        if (nota.categoria == 2) {
            const nnota = criarNota(nota.texto)
            naoFormal.appendChild(nnota)
        }
        if (nota.categoria == 1) {
            const nnota = criarNota(nota.texto)
            informal.appendChild(nnota)
        }
    })
}