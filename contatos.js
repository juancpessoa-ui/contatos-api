'use strict'

const URL = 'https://bakcend-fecaf-render.onrender.com/contatos'

// GET
export async function getContatos() {

    const response = await fetch(URL)

    if(!response.ok)
        throw new Error('Erro ao buscar contatos')

    return response.json()
}

// POST
export async function postContatos(contato) {

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(URL, options)

    if(!response.ok)
        throw new Error('Erro ao cadastrar contato')

    return response.json()
}

// PUT
export async function putContato(id, contato) {

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(contato)
    }

    const response = await fetch(`${URL}/${id}`, options)

    if(!response.ok)
        throw new Error('Erro ao atualizar contato')

    return response.json()
}

// DELETE
export async function deleteContato(id){

    const options = {
        method: 'DELETE'
    }

    const response = await fetch(`${URL}/${id}`, options)

    if(!response.ok)
        throw new Error('Erro ao deletar contato')

    return true
}


