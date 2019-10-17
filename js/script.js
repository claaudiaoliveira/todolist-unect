const inputToDo = document.querySelector('div.header input')
const btAdd= document.querySelector('div.header button')
const toDo = document.querySelector('#toDo');
const doing = document.querySelector('#doing');
const done = document.querySelector('#done');

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

const criarItem = (descricao) => {
    const li = document.createElement('li')
    const button = document.createElement('button')
    const img = document.createElement('i')

    img.setAttribute('class','fa fa-angle-double-right')
    button.appendChild(img)

    inputToDo.textContent = descricao
    li.append(descricao,' ', button)

    button.onclick = () => irDoing(li, descricao)

    toDo.appendChild(li)
}

const adicionarItem = () => {
    if (inputToDo.value) {
        criarItem(inputToDo.value)
        inputToDo.value = ''
    } else {
        alert('Preencha o campo!')
    }
}

btAdd.onclick = adicionarItem

const irDoing = (item, descricao) => {
    const li = document.createElement('li')
    const button = document.createElement('button')
    const btDoing = document.createElement('i')
  
    btDoing.setAttribute('class', 'fa fa-angle-double-right')
    button.appendChild(btDoing)
    button.onclick = () => irDone(li, descricao)
  
    li.append(descricao,' ', button)
  
    doing.appendChild(li)
    toDo.removeChild(item)
  }

const irDone = (item, descricao) => {
    const li = document.createElement('li')
    const button = document.createElement('button')
    const btDone = document.createElement('i')
  
    btDone.setAttribute('class', 'fa fa-times')
    button.appendChild(btDone)
    button.onclick = () => excluirItem(li)
  
    li.append(descricao,' ', button)
  
    done.appendChild(li)
    doing.removeChild(item)
  }