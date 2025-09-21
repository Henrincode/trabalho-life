// SUPABASE - Biblioteca
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// SUPABASE - Conexão
const supabaseUrl = 'https://hzyxcgembkrkdxmioipf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6eXhjZ2VtYmtya2R4bWlvaXBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM0OTgyOTQsImV4cCI6MjA2OTA3NDI5NH0.oe3zRnVUa5Qovm7nAbk_j2yu7RtQByIk0dhgnzmdZPs';
const supabase = createClient(supabaseUrl, supabaseKey);

// seletores
const formal = document.querySelector(".formal section")
const naoFormal = document.querySelector(".nao-formal section")
const informal = document.querySelector(".informal section")

const formCriar = document.querySelectorAll(".criar-nota")
// 
// 
// 

let dbNotas

carregarPagina()

formCriar.forEach(form => {
    form.addEventListener("submit", async e => {
        e.preventDefault();

        const texto = form.nota.value.trim();
        if (!texto) return;

        const categoria = form.nota.getAttribute('categoria'); // pega categoria do input

        // cadastrar no banco antes de criar no DOM
        const { data, error } = await supabase
            .from('ll_notas')
            .insert([
                {
                    usuario_id: 1,       // usuário fixo 1
                    categoria_id: parseInt(categoria), // categoria do input
                    texto: texto
                }
            ])
            .select(); // retorna o registro inserido

        if (error) {
            console.error('Erro ao cadastrar nota:', error);
            return; // não adiciona no DOM se der erro
        }

        // limpar input
        form.nota.value = '';

        // criar nota no DOM
        const pai = form.closest('.categoria');
        const section = pai.querySelector('section');

        // data[0] é a nota recém-inserida no banco
        const nota = criarNota(data[0].texto);

        section.prepend(nota);
    });
});



function criarNota(texto) {
    const nota = document.createElement('div')
    nota.classList.add('nota')
    nota.textContent = texto
    nota.addEventListener('click', e => {
        e.currentTarget.remove()
    })
    return nota
}

// async function preencherNotas() {
//     const data = await fetch('data-notas.json')
//     const notas = await data.json()

//     dbNotas = notas

//     notas.forEach(nota => {

//         if (nota.categoria == 1) {
//             const nnota = criarNota(nota.texto)
//             formal.appendChild(nnota)
//         }
//         if (nota.categoria == 2) {
//             const nnota = criarNota(nota.texto)
//             naoFormal.appendChild(nnota)
//         }
//         if (nota.categoria == 3) {
//             const nnota = criarNota(nota.texto)
//             informal.appendChild(nnota)
//         }
//     })
// }

async function preencherNotas() {

    console.log(dbNotas)

    dbNotas.forEach(nota => {

        if (nota.categoria_id == 1) {
            const nnota = criarNota(nota.texto)
            formal.appendChild(nnota)
        }
        if (nota.categoria_id == 2) {
            const nnota = criarNota(nota.texto)
            naoFormal.appendChild(nnota)
        }
        if (nota.categoria_id == 3) {
            const nnota = criarNota(nota.texto)
            informal.appendChild(nnota)
        }
    })
}

// carregar página

async function carregarPagina() {
    const { data, error } = await supabase
        .from('ll_notas')
        .select('*')
        .order('data', { ascending: false }); // ← últimas notas primeiro

    if (error) {
        console.error('Erro ao conectar:', error);
    } else {
        dbNotas = data
    }

    preencherNotas()
}