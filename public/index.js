const socket = io()

socket.on('nueva-conexion', data => {
    data.forEach(producto => {
        const linea = document.createElement('tr')
        const titulo = document.createElement('td')
        titulo.innerHTML = producto.title
        linea.appendChild(titulo)
        const precio = document.createElement('td')
        precio.innerHTML = producto.price
        linea.appendChild(precio)

        const foto = document.createElement('td')
        
        const img = document.createElement('img')
        img.setAttribute('src', producto.thumbnail)
        img.setAttribute('width', '50')

        foto.appendChild(img)
        linea.appendChild(foto)


        document.getElementById('productos').appendChild(linea)


    });

})

socket.on('producto', data => {
        const linea = document.createElement('tr')
        const titulo = document.createElement('td')
        titulo.innerHTML = data.title
        linea.appendChild(titulo)
        const precio = document.createElement('td')
        precio.innerHTML = data.price
        linea.appendChild(precio)

        const foto = document.createElement('td')

        const img = document.createElement('img')
        img.setAttribute('src', data.thumbnail)
        img.setAttribute('width', '50')

        foto.appendChild(img)
        linea.appendChild(foto)
        document.getElementById('productos').appendChild(linea)

})

function addProduct(e) {
    const producto = {
        title: document.getElementById("title").value,
        price: document.getElementById("price").value,
        thumbnail:document.getElementById("thumbnail").value
    }
    console.log(producto)

    socket.emit('new-product', producto)
    return false
}