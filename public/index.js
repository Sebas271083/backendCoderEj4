const socket = io()

socket.on('producto', data => {
    data.forEach(producto => {
        const linea = document.createElement('tr')
        const titulo = document.createElement('td')
        titulo.innerHTML = producto.title
        linea.appendChild(titulo)
        const precio = document.createElement('td')
        precio.innerHTML = producto.price
        linea.appendChild(precio)

        const foto = document.createElement('td')
        foto.innerHTML = producto.thumbail
        linea.appendChild(foto)


        document.getElementById('productos').appendChild(linea)


    });

})