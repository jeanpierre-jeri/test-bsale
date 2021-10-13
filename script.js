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

const categoryFilterForm = `
    <div id="categoryFilter" class="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex gap-4 flex-wrap">
        <button onclick="loadProducts()" class="bg-blue-500 px-4 py-1 text-gray-200 rounded-full font-semibold hover:bg-blue-600">Todos</button>
        <button onclick="filter('bebida')" class="bg-blue-500 px-4 py-1 text-gray-200 rounded-full font-semibold hover:bg-blue-600">Bebida</button>
        <button onclick="filter('bebida energetica')" class="bg-blue-500 px-4 py-1 text-gray-200 rounded-full font-semibold hover:bg-blue-600">Bebida Energética</button>
        <button onclick="filter('cerveza')" class="bg-blue-500 px-4 py-1 text-gray-200 rounded-full font-semibold hover:bg-blue-600">Cerveza</button>
        <button onclick="filter('pisco')" class="bg-blue-500 px-4 py-1 text-gray-200 rounded-full font-semibold hover:bg-blue-600">Pisco</button>
        <button onclick="filter('ron')" class="bg-blue-500 px-4 py-1 text-gray-200 rounded-full font-semibold hover:bg-blue-600">Ron</button>
        <button onclick="filter('snack')" class="bg-blue-500 px-4 py-1 text-gray-200 rounded-full font-semibold hover:bg-blue-600">Snack</button>
        <button onclick="filter('vodka')" class="bg-blue-500 px-4 py-1 text-gray-200 rounded-full font-semibold hover:bg-blue-600">Vodka</button>
    </div>
`

const getProducts = async () => {

        // return (await (await fetch('https://backend-bsale-test.herokuapp.com/api')).json())  
        return (await (await fetch('http://localhost:3000/api')).json())  
}

const itemPage = document.getElementById('products')
const loading = document.getElementById('loading')

const loadProducts = async () => {
    itemPage.classList.add('hidden')
    let items = []

    try {

        products.innerHTML = categoryFilterForm

        items = await getProducts()
        items.forEach(item => {
            let discount = item.discount > 0 ? item.price : ''
            let html = `
                <div class="product item bg-gray-200 max-w-full rounded overflow-hidden shadow-lg hover:shadow-xl opacity-2 flex flex-col">
                    <img 
                        src="${item.url_image || './assets/no-photos.png'}" 
                        alt="bebida"
                        class="object-scale-down bg-white h-80 w-80"
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

    // const response = await fetch('https://backend-bsale-test.herokuapp.com/api', {
    const response = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    })

    const items = await response.json()
    console.log(items)

    if (items.length == 0) {
        alert('No se encontraron artículos')
    } else {
        itemPage.innerHTML = ''
        products.innerHTML = categoryFilterForm

        items.forEach(item => {
            let discount = item.discount > 0 ? item.price : ''
            
            let html = `
                <div class="item bg-gray-200 w-52 rounded overflow-hidden shadow-lg hover:shadow-xl opacity-2 flex flex-col">
                    <img 
                        src="${item.url_image || './assets/no-photos.png'}"   
                        alt="bebida"
                        class="object-scale-down bg-white h-80 w-80"
                    >
                    <h3 class="itemName p-3 text-center text-base font-bold">${item.name.toUpperCase()}</h3>
                    <div class="flex justify-between border-t border-gray-400 p-3 items-center">
                        <div class="flex gap-2">
                            <p class="priceValue font-bold text-sm">$${item.price - item.discount}</p>
                            <span class="line-through">${discount}</span>
                        </div>
                        <button onclick="addToCart(${item.id}, '${item.name}', ${item.price - item.discount}, '${item.url_image}')" class="bg-gray-300 rounded-full px-3 py-2  hover:bg-gray-400 cursor-pointer"><i class="fas fa-cart-plus"></i></button>
                    </div>
                </div>
            `

            itemPage.insertAdjacentHTML('beforeend', html)
        })
    }  
})

const filter = async (category) => {
    
    const headers = {
        'Content-type': 'application/json'
    }

    let data = {
        category
    }

    const response = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    })

    const items = await response.json()
    console.log(items)

    itemPage.innerHTML = ''
    products.innerHTML = categoryFilterForm

    items.forEach(item => {
        let discount = item.discount > 0 ? item.price : ''
        
        let html = `
            <div class="product item bg-gray-200 max-w-full rounded overflow-hidden shadow-lg hover:shadow-xl opacity-2 flex flex-col">
                <img 
                    src="${item.url_image || './assets/no-photos.png'}" 
                    alt="bebida"
                    class="object-scale-down bg-white h-80 w-full"
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
}