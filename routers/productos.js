const { Router, request } = require("express");
const router = Router();
const Contenedor = require("../controllers/productsController.js");
const productos = new Contenedor("./controllers/productos.json");
const notFound = { error: "Producto no encontrado" };

router.get('/',(req, res)=>{
    res.send('index.html', {root: publicRoot})
})

router.get("/productos", (req, res) => {
    res.render('formulario', {})
})



module.exports = router;
