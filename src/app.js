import express from 'express';

import { rutaCarrito } from '../routers/carrito.js';
import { rutaProducto } from '../routers/productos.js';

//Servidor*********

//Importar rutas

const app = express()

const port = process.env.PORT || 8080;

// Lineas para usar json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Implementar ruta
app.use('/api/productos', rutaProducto)
app.use('/api/carrito', rutaCarrito)


//Midleware de rutas no implementadas
app.use((peticion, res, next)=>{
    if(peticion.route) {
        res.status(401).send({error : -2, descripcion: `ruta ${peticion.url} no encontrada`})
    }else {
        next()
    }
})

//Servidor
const servidor = app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto: ${servidor.address().port}`)
});

servidor.on('error', error => console.log(`Error: ${error}`))