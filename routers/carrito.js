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

rutaCarrito.get('/:id/productos', async (req, res)=> {
    const idCarrito = parseInt(req.params.id) 
    console.log(idCarrito)
    const listaProductos = await carritos.getById(idCarrito)
    res.json(listaProductos[0].productos)
})

rutaCarrito.post('/', async (req, res)=>{
    const carrito = {
        timestamp: Date.now(),
        productos:[]
    }
    const id = await carritos.save(carrito)
    res.json(id)
})  

rutaCarrito.post('/:id/productos', async (req, res)=>{
    const idCarrito = parseInt(req.params.id) 
    const idProducto = req.body.idProducto
    const producto = await productos.getById(idProducto)
    const carrito = await carritos.getById(idCarrito)
    carrito.productos.push(producto)
    await carritos.update(idCarrito)
})

rutaCarrito.delete('/:id/productos/:id_prod',(req, res)=>{
})




export {rutaCarrito};
