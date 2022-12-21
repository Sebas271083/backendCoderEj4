import express from 'express';
import {Contenedor} from '../src/contenedor/contenedorFs.js';

const rutaCarrito = express.Router();


const carritos = new Contenedor("src/db/carrito.txt");
const productos = new Contenedor("src/db/productos.txt");



rutaCarrito.get('/', async (req, res)=>{
    const listaCarritos = await carritos.getAll();
    res.json(listaCarritos)
})

rutaCarrito.delete ('/:id', async(req, res)=>{
    const idCarrito = parseInt(req.params.id) 
    await carritos.deleteById(idCarrito);
    res.json({
        status: 'ok'
    })
})


rutaCarrito.get(':id/productos', (req, res)=> {

})

rutaCarrito.post('/:id/productos',(req, res)=>{
})

rutaCarrito.delete('/:id/productos/:id_prod',(req, res)=>{
})




export {rutaCarrito};
