const inputToDo = document.querySelector('div.header input')
const btAdd= document.querySelector('div.header button')
const toDo = document.querySelector('#toDo');
const btToDo = document.querySelector('#toDo button')
const doing = document.querySelector('#doing');
const btDoing= document.querySelector('#doing button')
const done = document.querySelector('#done');
const btDone= document.querySelector('#done button')

const save = () => {

    let listasTransformadas = Array.from(listas)
        .map(lista => {
            return {
                nomeLista: lista.getAttribute('id'),
                itens: Array.from(lista.children)
                    .map(filho => {
                        const [descricao] = filho.querySelectorAll('p')
                        return {
                            descricao: descricao.textContent,
                        }
                    })
            }
        })

    localStorage.setItem('lista', JSON.stringify(listasTransformadas))
}

const load = () => {
    let listas = JSON.parse(localStorage.getItem('lista'))
    if (listas) {
        listas.forEach(lista => {
            let listaElemento = document.querySelector(`#${lista.nomeLista}`)
            lista.itens.forEach(item => {
                criarItem(item.descricao, listaElemento)
            })

        })

    }

}

const excluirItem = (item) => {

    let animation = item.animate([{
        opacity: '1',
        transform: 'scale(1)'
    }, {
        opacity: '0',
        transform: 'scale(0.8)'
    }], 200)

    animation.onfinish = () => {
        done.removeChild(item)
        save()
    }
}

const criarItem = (descricao) => {
    const li = document.createElement('li')
    const button = document.createElement('button')
    const img = document.createElement('i')

    img.setAttribute('class','fa fa-angle-double-right')
    button.appendChild(img)

    inputToDo.textContent = descricao
    li.append(descricao,' ', button)

    toDo.appendChild(li)
}

const adicionarItem = () => {
    if (inputToDo.value) {
        criarItem(inputToDo.value)
        save()
        inputToDo.value = ''
    } else {
        alert('Preencha o campo!')
    }
}

btAdd.onclick = adicionarItem

const transicaoLista = nomeLista => {

    listas.forEach(lista => lista.classList.add('hidden'))

    let listaSelecionada = document.querySelector(`#${nomeLista}`)

    listaSelecionada.classList.remove('hidden')

    icone.setAttribute('src', `./assets/imgs/${nomeLista}.svg`)

}

adicionarBt.onclick = adicionarLista

selectListas.onchange = () => transicaoLista(selectListas.value)

load()