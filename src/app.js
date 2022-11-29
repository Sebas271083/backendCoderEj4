const express = require("express");
const bp = require("body-parser");
const routers = require("../routers");
const app = express();
const PORT = 8080;
const fs = require('fs');

const { Server: HttpServer} = require('http')
const { Server: IOServer} = require('socket.io')
const Contenedor = require('./contenedor/contenedorFs')

/* middlewares incorporados */
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
const publicRoot = './public'

/* visibilizo la carpeta public */
// app.set('view engine', 'ejs')

const httpServer = new HttpServer (app);
const io = new IOServer(httpServer); 

app.use(express.static(publicRoot));
app.use("/", routers);




let contenedor = new Contenedor('./src/db/productos.txt')


// metodos = async()=> {
//     await contenedor.save({title:"papitas", price:200, thumbail:"https://www.larazon.es/resizer/_PdPCAn83uB64KhR3r_Mx3BBqLY=/600x400/smart/filters:format(webp):quality(65)/cloudfront-eu-central-1.images.arcpublishing.com/larazon/DTZL5ZLQK5BMLNVPFPOGNM5Y6A.jpg"})
//     await contenedor.save({title:"galletitas", price:100, thumbail:"https://www.larazon.es/resizer/_PdPCAn83uB64KhR3r_Mx3BBqLY=/600x400/smart/filters:format(webp):quality(65)/cloudfront-eu-central-1.images.arcpublishing.com/larazon/DTZL5ZLQK5BMLNVPFPOGNM5Y6A.jpg"})
// }

// metodos()




const server = httpServer.listen(PORT, () => {
    console.log(
        `Servidor http escuchando en el puerto ${server.address().port}`
    );
    console.log(`http://localhost:${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor: ${error}`));

//Socket
io.on('connection', async (socket)=> {
    console.log('nuevo cliente conectado')

    const listaProductos = await contenedor.getAll()
    console.log(listaProductos)
    socket.emit('nueva-conexion',listaProductos)

    socket.on('new-product', (data)=> {
        contenedor.save(data)
        io.sockets.emit('producto', data)
    })
})