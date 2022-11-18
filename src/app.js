const express = require("express");
const bp = require("body-parser");
const routers = require("../routers");
const app = express();
const PORT = 8080;
const fs = require('fs');

const { Server: HttpServer} = require('http')
const { Server: IOServer} = require('socket.io')

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

class Contenedor {
    constructor(archivo){
        this.archivo = archivo
    }

    save = async(producto) => {
        
        try {
            if(fs.existsSync(this.archivo)){
                let info = await fs.promises.readFile(this.archivo, 'utf8');
                let result = JSON.parse(info)
                if(result.length>0) {
                    let lastId = result[result.length-1].id+1
                    let newProduct = {
                        id: lastId,
                        ...producto
                }
                result.push(newProduct)
                await fs.promises.writeFile(this.archivo,JSON.stringify(result, null, 2))
                return lastId;
                } else {
                    let lastId = 1
                    let newProduct = {
                        id: lastId,
                        ...producto
                }
                result.push(newProduct)
                await fs.promises.writeFile(this.archivo,JSON.stringify(result, null, 2))
                return lastId;
            }
            }else {
                let newProducto={
                    id:1,
                    title: producto.title,
                    price: producto.price,
                    thumbail: producto.thumbail
                }
                await fs.promises.writeFile(this.archivo,JSON.stringify([newProducto],null, 2))
                return 1
            }
        } catch (error) {
            console.log(error)
        }
    }



getById = async (id) => {
    try {

        /* chequeo que exista el documento */

        if ((this.archivo)) {
            const data = await fs.promises.readFile(this.archivo, 'utf-8');
            let result= JSON.parse(data);

            /* uso filter para buscar el producto con el id que queramos */

            const dataId = result.filter(item => item.id === id);
            if (dataId.length === 0) {
                throw new Error(
                    "No se encontro un producto con el id solicitado"
                );
            } else {
                console.log(`Producto con id ${id} encontrado:\n`, dataId);
                return dataId;
            }
        }
    } catch (error) {
        console.log(`Error buscando producto con el id: ${error.message}`);
    }
}

 async getAll() { 
    try {
        if(fs.existsSync(this.archivo)){
        let info= await fs.promises.readFile(this.archivo, 'utf8');
        let result= JSON.parse(info);
        return result;
        }else{
          return "No se encontro el archivo"
        }  
    } catch (error) {
        console.log(error)
    }  
  }

deleteById = async(id) => {

    /* chequeo si existe el documento */

    try {
        if ((this.archivo)) {
            const data = await this.readFile(this.archivo);

            /* verifico que exista el id */

            console.log(`Buscando producto con el id solicitado...`);
            if (data.some(item => item.id === id)) {
                const data = await this.readFile(this.archivo);

                /* elimino producto */

                console.log(`Eliminando producto con id solicitado...`);
                const datos = data.filter(item => item.id !== id);
                this.writeFile(this.archivo, datos);
                console.log(`Producto con el id ${id} eliminado`);
            } else {
                throw new Error(
                    `No se encontro el producto con el id ${id}`
                );
            }
        }
    } catch (error) {
        console.log(
            `Ocurrio un error eliminando el producto con el id solicitado: ${error.message}`
        );
    }

     deleteAll = async() =>{
        try {

            /* chequeo si existe el documento */

            let nuevoArray = [];
            console.log(`Borrando datos...`);
            await this.writeFile(this.archivo, nuevoArray);
            console.log(
                `Se borraron todos los datos del archivo ${this.archivo}`
            );
        } catch (error) {
            console.log(
                `Ocurrio un error eliminando los datos: ${error.message}`
            );
        }
    }
}
}



let contenedor = new Contenedor("prodcutos.txt")


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