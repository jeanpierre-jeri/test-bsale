const modal = document.getElementById('modal')

const toggleModal = () => {
    modal.classList.toggle('opacity-0')
    modal.classList.toggle('pointer-events-none')
}

const openmodal = document.getElementById('cart')
openmodal.addEventListener('click', () => {
    toggleModal()
})
    
const overlay = document.getElementById('modalOverlay')
overlay.addEventListener('click', toggleModal)

const modalClose = document.getElementById('modalClose')
modalClose.addEventListener('click', toggleModal)  

const getProducts = async () => {

        return (await (await fetch('https://backend-bsale-test.herokuapp.com/api')).json())  
}

const itemPage = document.getElementById('products')
const loading = document.getElementById('loading')

const loadProducts = async () => {
    itemPage.classList.add('hidden')
    let items = []

    try {

        items = await getProducts()
        items.forEach(item => {
            let discount = item.discount > 0 ? item.price : ''
            let html = `
                <div class="product item bg-gray-200 w-52 rounded overflow-hidden shadow-lg hover:shadow-xl opacity-2 flex flex-col">
                    <img 
                        src="${item.url_image}" 
                        alt="bebida"
                        class="object-cover flex-grow"
                    >
                    <h3 class="itemName p-3 text-center text-base font-bold">${item.name.toUpperCase()}</h3>
                    <div class="flex justify-between border-t border-gray-400 p-3 items-center">
                        <div class="flex gap-2">
                            <p class="priceValue font-bold text-sm">$${item.price - item.discount}</p>
                            <span class="line-through">${discount}</span>
                        </div>
                        <button onclick="addToCart(${item.id}, '${item.name}', ${item.price - item.discount}, '${item.url_image}')" class="product bg-gray-300 rounded-full px-3 py-2 hover:bg-gray-400 cursor-pointer"><i class="fas fa-cart-plus"></i></button>
                    </div>
                </div>
            `
            
            itemPage.insertAdjacentHTML('beforeend', html)
        })

    } catch (error){
        console.log(error)
        itemPage.innerHTML = 'Error, no se pudo establecer la conexión con la API. Recargue la página'
    } finally {
        loading.classList.add('hidden')
        itemPage.classList.remove('hidden')
    }
}

loadProducts()

const form = document.getElementById('form')

form.addEventListener('submit', async e => {
    e.preventDefault()

    const headers = {
        'Content-type': 'application/json'
    }

    let data = {
        search: search.value
    }

    const response = await fetch('https://backend-bsale-test.herokuapp.com/api', {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    })

    const items = await response.json()

    if (items.length == 0) {
        alert('No se encontraron artículos')
    } else {
        itemPage.innerHTML = ''
        items.forEach(item => {
            let discount = item.discount > 0 ? item.price : ''
            let html = `
                <div class="item bg-gray-200 w-52 rounded overflow-hidden shadow-lg hover:shadow-xl opacity-2 flex flex-col">
                    <img 
                        src="${item.url_image}" 
                        alt="bebida"
                        class="object-contain flex-grow"
                    >
                    <h3 class="itemName p-3 text-center text-base font-bold">${item.name.toUpperCase()}</h3>
                    <div class="flex justify-between border-t border-gray-400 p-3 items-center">
                        <div class="flex gap-2">
                            <p class="priceValue font-bold text-sm">$${item.price - item.discount}</p>
                            <span class="line-through">${discount}</span>
                        </div>
                        <button data-item-id="${item.id}" class="bg-gray-300 rounded-full px-3 py-2  hover:bg-gray-400 cursor-pointer"><i class="fas fa-cart-plus"></i></button>
                    </div>
                </div>
            `

            itemPage.insertAdjacentHTML('beforeend', html)
        })
    }  
})
