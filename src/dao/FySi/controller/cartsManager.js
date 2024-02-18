import fs from "fs"

class CartManager{
    constructor(nombreDelArchivo){
        this.path = `src/dao/data/${nombreDelArchivo}`

    if(!fs.existsSync(this.path)){
        try {
            fs.writeFileSync(this.path, "[]")
            console.log("archivo creado exitosamente");
        } catch (error) {
            console.log("no se pudo crear el archivo");
        }
    }

}
    convertirArchivo(){
        try {
        this.carts = JSON.parse(fs.readFileSync(this.path))
            
        } catch (error) {
            console.log("no se pudieron obtener los datos correctamente");
            this.carts = []
        }
    }
    
    escribirCarrito(){
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.carts))
        } catch (error) {
            console.log("Error al agregar productos");
        }
    }

    addCart(cart){
        this.convertirArchivo()
        console.log(cart.id);
        const product = cart.id
        if (product) {
            let quantity = 1
        const newCart = {
            cartId: this.carts.length + 1,
            products: [product, quantity]
          };
          this.carts.push(newCart)
          console.log("se ha creado un carrito existosamente:", newCart)
          this.escribirCarrito()
        } else {
            const newCart = {
                cartId: this.carts.length + 1,
                products: ["El carrito esta vacio"]
              };
              this.carts.push(newCart)
              console.log("se ha creado un carrito existosamente:", newCart)
              this.escribirCarrito()
            
        }

    }
    updateCart(cId, actualizacion) {
        this.convertirArchivo()
        const i = this.carts.findIndex(carts => carts.cartId == cId)


        if (i !== -1) {

            let cartToUpdate = this.carts[i]
            let cantidad = 1
            let toPush = {"product": actualizacion, quantity: cantidad}

            if (cartToUpdate.products[0] == "El carrito esta vacio" ) {
                cartToUpdate.products = []
                cartToUpdate.products.push(toPush)
                this.escribirCarrito()
            }
            else if (cartToUpdate.products.some(product => (product.product === toPush.product))) {
                    let toUpQ = cartToUpdate.products.findIndex(product => (product.product === toPush.product))
                    cartToUpdate.products[toUpQ].quantity++
                    this.escribirCarrito()
            }
            else if (cartToUpdate.products[0] !== "El carrito esta vacio" && !cartToUpdate.products.some(product => (product.product === toPush.product))) {
                cartToUpdate.products.push(toPush)
                this.escribirCarrito()
                
            }

            console.log("Carrito ha sido actualizado:")

        }
        else {
            console.log(`el producto con ese id no existe`);
        }
           
    }

}

export default CartManager


