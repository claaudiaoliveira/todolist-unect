const listas = document.querySelectorAll('ul') 
const inputToDo = document.querySelector('div.header input')
const btAdd= document.querySelector('div.header button')
const toDo = document.querySelector('#toDo');
const doing = document.querySelector('#doing');
const done = document.querySelector('#done');

const save = () => {

    let listasTransformadas = Array.from(listas)
        .map(lista => {
            return {
                nomeLista: lista.getAttribute('id'),
                itens: Array.from(lista.children)
                    .map(filho => {
                        const [descricao] = filho.querySelectorAll('p')
                        return {
                            descricao: descricao.textContent
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
        transform: 'scale(0.7)'
    }], 200)

    animation.onfinish = () => {
        done.removeChild(item)
        save()
    }
}

const criarItem = (descricao, toDo) => {
    const li = document.createElement('li')
    const button = document.createElement('button')
    const img = document.createElement('i')
    const pDescricao = document.createElement('p')

    img.setAttribute('class','fa fa-angle-double-right')
    button.appendChild(img)

    pDescricao.textContent = descricao
    pDescricao.classList.add('descricao')

    li.append(pDescricao, button)

    button.onclick = () => irDoing(li, pDescricao)

    toDo.appendChild(li)

    save()
}

const adicionarItem = () => {
    if (inputToDo.value) {
        criarItem(inputToDo.value, toDo)
        inputToDo.value = ''
        save()
    } else {
        alert('Preencha o campo!')
    }
    
}

btAdd.onclick = adicionarItem

const irDoing = (item, pDescricao) => {
    const li = document.createElement('li')
    const button = document.createElement('button')
    const btDoing = document.createElement('i')
  
    btDoing.setAttribute('class', 'fa fa-angle-double-right')
    button.appendChild(btDoing)
    button.onclick = () => irDone(li, pDescricao)
  
    li.append(pDescricao, button)
  
    doing.appendChild(li)
    toDo.removeChild(item)
    save()
  }

const irDone = (item, pDescricao) => {
    const li = document.createElement('li')
    const button = document.createElement('button')
    const btDone = document.createElement('i')
  
    btDone.setAttribute('class', 'fa fa-times')
    button.appendChild(btDone)
    button.onclick = () => excluirItem(li)
  
    li.append(pDescricao, button)
  
    done.appendChild(li)
    doing.removeChild(item)
    save()
  }

  load()