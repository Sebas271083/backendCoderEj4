import express from 'express';
import {Contenedor} from '../src/contenedor/contenedorFs.js';

const rutaProducto = express.Router();


const productos = new Contenedor("src/db/productos.txt");
const privilegios = (peticion, res, next)=> {
    const administrador = peticion.headers.administrador
    if (administrador === 'true') {
        next()
    } else {
        res.status(401).send({error : -1, descripcion: `ruta ${peticion.url} no autorizada`})
    }
}


rutaProducto.get('/', async(req, res)=>{
    const listaProductos = await productos.getAll();
    res.json(listaProductos)

})

rutaProducto.post('/', privilegios,(req, res)=>{
})


rutaProducto.put('/:id',privilegios, async(req, res)=>{
    const idProducto = parseInt(req.params.id)
    const producto = req.body
    privilegios.id = idProducto
    console.log("privilegios.id", privilegios.id)
    console.log("producto", producto)

    await productos.deleteById(idProducto)
    console.log("Prodcuto.....", producto)
    await productos.save(producto)
    res.json(producto)
})

rutaProducto.delete('/:id',privilegios,(req, res)=> {

})




export {rutaProducto};
