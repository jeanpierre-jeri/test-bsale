<<<<<<< HEAD
const cartItems = document.getElementById('cartItems')

let cart = JSON.parse(localStorage.getItem('CART')) || []
updateCart()

function addToCart(id, name, price, url_image) {
    
    const alreadyInCart = (product) => product.id === id
    if(cart.some(alreadyInCart)) {
        changeNumberOfUnits("plus", id)
    } else {
        let product = {
            id,
            name,
            price,
            url_image
        }
        cart.push({
            ...product,
            numberOfUnits: 1
        })
    }

    
    updateCart()
}

function updateCart() {
    renderCartItems()
    renderSubTotal()

    localStorage.setItem('CART', JSON.stringify(cart))
}

function renderSubTotal() {
    const counter = document.getElementById('counter')
    const subTotal = document.getElementById('subTotal')
    const total = document.getElementById('total')
    let totalPrice = 0
    let totalItems = 0

    cart.forEach(item => {
        totalPrice += item.price * item.numberOfUnits
        totalItems += item.numberOfUnits
    })

    subTotal.innerHTML = `${totalPrice}`
    total.innerHTML = `${totalPrice}`
    counter.innerHTML = `${totalItems}`
}

function renderCartItems() {
    cartItems.innerHTML = ''
    cart.forEach(item => {
        let html = `
            <tr>
                <td class="px-1.5 py-3">
                <div class="flex flex-wrap">
                    <img class="w-20 h-20 mr-2.5" src="${item.url_image}" alt="${item.name}">
                    <div>
                    <p>${item.name}</p>
                    <small>${item.price}</small><br>
                    <div onclick="removeItem(${item.id})" class="text-red-400 text-xs cursor-pointer" href="">Quitar</div>
                    </div>
                </div>
                </td>
                <td class="px-1.5 py-3">
                    <div class="flex items-center">
                      <div onclick="changeNumberOfUnits('minus', ${item.id})" class="bg-blue-400 text-white w-7 h-7 flex items-center justify-center rounded-full cursor-pointer">-</div>
                      <div class="mx-3 text-base">${item.numberOfUnits}</div>
                      <div onclick="changeNumberOfUnits('plus', ${item.id})" class="bg-blue-400 text-white w-7 h-7 flex items-center justify-center rounded-full cursor-pointer">+</div>
                    </div>
                  </td>
                  <td class="text-right px-1.5 py-3">${item.price * item.numberOfUnits}</td>
                </tr>
        `
        cartItems.insertAdjacentHTML('beforeend', html)
    })
}

function removeItem(id) {
    cart = cart.filter( (item) => item.id !== id)

    updateCart()
}

function changeNumberOfUnits(action, id) {
    cart = cart.map(item => {

        let numberOfUnits = item.numberOfUnits

        if (item.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--
            } else if (action === "plus") {
                numberOfUnits++
            }
        }

        return {
            ...item,
            numberOfUnits
        }
    })

    updateCart()

=======
const cartItems = document.getElementById('cartItems')

let cart = JSON.parse(localStorage.getItem('CART')) || []
updateCart()

function addToCart(id, name, price, url_image) {
    
    const alreadyInCart = (product) => product.id === id
    if(cart.some(alreadyInCart)) {
        changeNumberOfUnits("plus", id)
    } else {
        let product = {
            id,
            name,
            price,
            url_image
        }
        cart.push({
            ...product,
            numberOfUnits: 1
        })
    }

    
    updateCart()
}

function updateCart() {
    renderCartItems()
    renderSubTotal()

    localStorage.setItem('CART', JSON.stringify(cart))
}

function renderSubTotal() {
    const counter = document.getElementById('counter')
    const subTotal = document.getElementById('subTotal')
    const total = document.getElementById('total')
    let totalPrice = 0
    let totalItems = 0

    cart.forEach(item => {
        totalPrice += item.price * item.numberOfUnits
        totalItems += item.numberOfUnits
    })

    subTotal.innerHTML = `${totalPrice}`
    total.innerHTML = `${totalPrice}`
    counter.innerHTML = `${totalItems}`
}

function renderCartItems() {
    cartItems.innerHTML = ''
    cart.forEach(item => {
        let html = `
            <tr>
                <td class="px-1.5 py-3">
                <div class="flex flex-wrap">
                    <img class="w-20 h-20 mr-2.5" src="${item.url_image}" alt="${item.name}">
                    <div>
                    <p>${item.name}</p>
                    <small>${item.price}</small><br>
                    <div onclick="removeItem(${item.id})" class="text-red-400 text-xs cursor-pointer" href="">Quitar</div>
                    </div>
                </div>
                </td>
                <td class="px-1.5 py-3">
                    <div class="flex items-center">
                      <div onclick="changeNumberOfUnits('minus', ${item.id})" class="bg-blue-400 text-white w-7 h-7 flex items-center justify-center rounded-full cursor-pointer">-</div>
                      <div class="mx-3 text-base">${item.numberOfUnits}</div>
                      <div onclick="changeNumberOfUnits('plus', ${item.id})" class="bg-blue-400 text-white w-7 h-7 flex items-center justify-center rounded-full cursor-pointer">+</div>
                    </div>
                  </td>
                  <td class="text-right px-1.5 py-3">${item.price * item.numberOfUnits}</td>
                </tr>
        `
        cartItems.insertAdjacentHTML('beforeend', html)
    })
}

function removeItem(id) {
    cart = cart.filter( (item) => item.id !== id)

    updateCart()
}

function changeNumberOfUnits(action, id) {
    cart = cart.map(item => {

        let numberOfUnits = item.numberOfUnits

        if (item.id === id) {
            if (action === "minus" && numberOfUnits > 1) {
                numberOfUnits--
            } else if (action === "plus") {
                numberOfUnits++
            }
        }

        return {
            ...item,
            numberOfUnits
        }
    })

    updateCart()

>>>>>>> b47f4a0 (first commit of frontend)
}