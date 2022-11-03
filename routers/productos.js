const { Router } = require("express");
const router = Router();
const Contenedor = require("../controllers/productsController");
const productos = new Contenedor("./controllers/productos.json");
const notFound = { error: "Producto no encontrado" };
const multer = require('multer')
const upload = multer({ storage: multer.memoryStorage()})



router.get("/", async (req, res) => {
    const arrayProductos = await productos.getAll();
    !arrayProductos && res.status(404).json(notFound);
    res.status(200).json(arrayProductos);
});

router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await productos.getById(id);
    !producto && res.status(404).json(notFound);
    res.status(200).json(producto);
});

router.post("/",upload.single('imagen'), async (req, res) => {
    const data = req.body;
    console.log(data);
    const nuevoProducto = await productos.save(data);
    !data && res.status(204).json(notFound);
    res.status(201).json(data);
});

router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const data = req.body;
    const productoEditado = await productos.modify(id, data);
    !productoEditado && res.status(404).json(notFound);
    res.status(200).json(productoEditado);
});

router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const producto = await productos.getById(id);
    const eliminarProducto = await productos.deleteById(id);
    !producto && res.status(404).json(notFound);
    res.status(200).json(producto);
});

module.exports = router;
