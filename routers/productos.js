const { Router, request } = require("express");
const router = Router();
const Contenedor = require("../controllers/productsController.js");
const productos = new Contenedor("./controllers/productos.json");
const notFound = { error: "Producto no encontrado" };

/* ok: 200
   created: 201
   no content: 204
   bad request: 400
   not found: 404
   internal server error: 500
    */

// router.get("/productos/lista", async (req, res) => {
//     console.log(`getAll req recibida con exito`);
//     const arrayProductos = await productos.getAll();
//     console.log("ARRAYPRODUCTOS:::: ", arrayProductos)
//     res.render('lista', {
//         arrayProductos
//     })
// });


// router.post("/productos", async (req, res) => {
//     console.log(`post req recibida con exito`);
//     const data = req.body;
//     console.log(data);
//     await productos.save(data);
//     !data && res.status(204).json(notFound);
//     res.render("formulario", {})
// });

router.get('/',(req, res)=>{
    res.send('index.html', {root: publicRoot})
})

router.get("/productos", (req, res) => {
    res.render('formulario', {})
})



module.exports = router;
