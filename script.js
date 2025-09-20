// seletores

const formal = document.querySelector(".formal section")

const formCriar = document.querySelectorAll(".criar-nota")

formCriar.forEach(form => {
    form.addEventListener("submit", e => {
        e.preventDefault()

        const texto = form.nota.value
        form.nota.value = ''

        if(texto == '') return

        const pai = form.closest('.categoria')
        const section = pai.querySelector('section')

        const nota = criarNota(texto)

        nota.addEventListener('click', e => {
            e.currentTarget.remove()
        })

        section.appendChild(nota)    
    })
})


function criarNota(texto) {
    const nota = document.createElement('div')
    nota.classList.add('nota')
    nota.textContent = texto
    return nota
}