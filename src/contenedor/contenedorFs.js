
import * as fs from 'fs'

export class Contenedor {
    constructor(archivo){
        this.archivo = archivo
    }

    save = async(producto) => {
        let result;
        try {
            let info = await fs.promises.readFile(this.archivo, 'utf8');
            if(info === "") {
                console.log("vacio")
            } else {
            result = JSON.parse(info)
            console.log("result.... ", result)
            }
            if(fs.existsSync(this.archivo) && info !== ""){
                result = JSON.parse(info)
                
                if(result !== "" && result.length>0) {
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
            } else {
                let newProducto=[{
                    nombre: producto.nombre,
                    descripcion: producto.descripcion,
                    timestamp: 1669756860406,
                    codigo: producto.codigo,
                    precio: producto.precio,
                    stock: 10,
                    foto: producto.foto,
                    id: 1
                }]
                await fs.promises.writeFile(this.archivo,JSON.stringify(newProducto,null, 2))
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

// update = async (id, producto) => {
//     try {

       
//     } catch {
//     }
// }



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
    console.log("id.....", id)

    /* chequeo si existe el documento */

    try {
        if ((this.archivo)) {
            const data = await fs.promises.readFile(this.archivo);
            let result= JSON.parse(data);


            /* verifico que exista el id */

            console.log(`Buscando producto con el id solicitado...`);
            console.log("data....", result)
            
            if (result.some(item => item.id === id)) {

                const data = await fs.promises.readFile(this.archivo);

                /* elimino producto */

                console.log(`Eliminando producto con id solicitado...`);
                const datos = result.filter(item => item.id !== id);
                console.log("datos....", datos)
                fs.promises.writeFile(this.archivo, datos);
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
    
}
     deleteAll = async() =>{
            try {

                /* chequeo si existe el documento */

                let nuevoArray = [];
                console.log(`Borrando datos...`);
                await fs.promises.writeFile(this.archivo, nuevoArray);
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


