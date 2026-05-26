'use strict'

import {
    getContatos,
    postContatos,
    putContato,
    deleteContato
} from './contatos.js'


// tabela
const tabela = document.getElementById('tabela')

// botão
const btnSalvar = document.getElementById('btn')

// inputs
const nome = document.getElementById('nome')
const foto = document.getElementById('foto')
const celular = document.getElementById('celular')
const email = document.getElementById('email')
const endereco = document.getElementById('endereco')
const cidade = document.getElementById('cidade')

// variável para UPDATE
let idContato = null


const listarContatos = async () => {

    try {

        const contatos = await getContatos()

        tabela.innerHTML = `
            <div class="header">ID</div>
            <div class="header">Foto</div>
            <div class="header">Nome</div>
            <div class="header">Email</div>
            <div class="header">Cidade</div>
            <div class="header">Celular</div>
            <div class="header">Ações</div>
        `

        contatos.forEach(contato => {

            tabela.innerHTML += `
            
                <div>${contato.id}</div>

                <div>
                    <img 
                        src="${contato.foto}" 
                        class="foto-contato"
                        alt="${contato.nome}">
                </div>

                <div>${contato.nome}</div>
                <div>${contato.email}</div>
                <div>${contato.cidade}</div>
                <div>${contato.celular}</div>

                <div class="acoes">

                    <button 
                        class="up"
                        onclick="editar(${contato.id})">
                        UP
                    </button>

                    <button 
                        class="delete"
                        onclick="remover(${contato.id})">
                        X
                    </button>

                </div>
            `
        })

    } catch (erro) {

        console.log('Erro ao listar contatos:', erro)

    }
}

const salvarContato = async () => {

    const contato = {

        nome: nome.value,
        foto: foto.value,
        celular: celular.value,
        email: email.value,
        endereco: endereco.value,
        cidade: cidade.value
    }

    try {

        // UPDATE
        if(idContato){

            await putContato(idContato, contato)

            // volta para modo cadastro
            idContato = null

        }else{

            // POST
            await postContatos(contato)
        }

        // limpar inputs
        nome.value = ''
        foto.value = ''
        celular.value = ''
        email.value = ''
        endereco.value = ''
        cidade.value = ''

        // atualizar tabela
        listarContatos()

    } catch (erro) {

        console.log('Erro ao salvar contato:', erro)

    }
}

window.remover = async (id) => {

    try {

        await deleteContato(id)

        listarContatos()

    } catch (erro) {

        console.log('Erro ao remover contato:', erro)

    }
}

window.editar = async (id) => {

    try {

        const contatos = await getContatos()

        const contato = contatos.find(item => item.id == id)

        // guarda o ID
        idContato = contato.id

        // preenche inputs
        nome.value = contato.nome
        foto.value = contato.foto
        celular.value = contato.celular
        email.value = contato.email
        endereco.value = contato.endereco
        cidade.value = contato.cidade

    } catch (erro) {

        console.log('Erro ao editar contato:', erro)

    }
}

btnSalvar.addEventListener('click', salvarContato)

listarContatos()