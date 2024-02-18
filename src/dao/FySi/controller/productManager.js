import fs from "fs"

class ProductManager {
    constructor(nombreDeArchivo){
        this.path = `src/dao/data/${nombreDeArchivo}`

        if(!fs.existsSync(this.path)){
            try {
                fs.writeFileSync(this.path, "[]")
                console.log("archivo creado exitosamente");
            } catch (error) {
                console.log("no se pudo crear el archivo");
            }
        }
    }
    //seccion fs

    convertirArchivo(){
        try {
        this.products = JSON.parse(fs.readFileSync(this.path))
            
        } catch (error) {
            console.log("no se pudieron obtener los datos correctamente");
            this.products = []
        }
    }
    
    escribirProducto(){
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products))
        } catch (error) {
            console.log("Error al agregar productos");
        }
    }

    updateProduct(pId, actualizacion) {
        this.convertirArchivo()
        const i = this.products.findIndex(product => product.id === pId)
        if (i !== -1) {
            actualizacion.id = pId
            this.products[i] = actualizacion
            this.escribirProducto()
            console.log("Producto ha sido actualizado:", actualizacion)
            console.log("los productos ahora son", this.products);
        }
        else {
            console.log(`el producto con el ese id no existe`);
        }
           
    }
    deleteProduct(pId) {
        this.convertirArchivo()
        const i = this.products.findIndex(product => product.id == pId)

        if (i !== -1) {
            const deletedProduct = this.products.splice(i, 1)[0]
            this.escribirProducto()
            console.log("Se elimino el sguiente producto:", deletedProduct)

        } else {
            console.log("El producto no existe, no se puede eliminar.")

        }
    }


    //seccion desafio 1
    getProducts(){
        this.convertirArchivo()
        return this.products
    }
    addProduct(product){
        this.convertirArchivo()
        const {title,description,price,stock,status = true,category,thumbnail,code,} = product
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.stock ||
            !product.status ||
            !product.category ||
            !product.code 
            )
        {return console.log("Todos los campos son obligatorios, excepto thumbnail")}

        if (this.products.some(product => product.code === code)) {
            return console.log("Ya existe un producto con este codigo")
        }
        const newProduct = {
            id: this.products.length + 1,
            title,
            description,
            price,
            stock,
            status, 
            category,
            thumbnail,
            code,
          };
          this.products.push(newProduct)
          this.escribirProducto()
    }
    getProductById(pId){
        this.convertirArchivo()
        const product = this.products.find(product => product.id === pId)
        if (product) {
            console.log("Producto encontrado:", product)
        } else {
            console.log("Lo sentimos, el producto no existe")
        }
    }



}

export default ProductManager


// const productManager = new ProductManager("products.json")

// for (let i = 0; i < 11; i++) {

//     productManager.addProduct({title: `Producto ${i}`,
//     description:`Este es el producto prueba ${i}`,
//     price: i * 10 ,
//     stock: i * 10,
//     status: true,
//     category: `productos`,
//     thumbnail:'Sin imagen',
//     code: i,
// })
// }

