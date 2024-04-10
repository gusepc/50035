import cartModel from "./models/carts.model.js"
import productModel from "./models/products.model.js";

class MongoCartManager {

    async addCart(cart){
        try {
            return await cartModel.create(cart)

        } catch (error) {
            return{error: error.message}
        }
    }
    async cartById(cId){
        try {
            return await cartModel.findById(cId).lean()
        } catch (error) {
            return{error: error.message}
        }
    }
    async addToCart(cId, products){
        try {
            let cart = await cartModel.findById(cId)
            products.forEach(async e => {
                let pId = e._id
                let enCarrito = cart.products.findIndex(p => p.product._id.toString() === pId)
  
            if (enCarrito !== -1) {
                cart.products[enCarrito].quantity += 1
                
                }
                else {
                    cart.products.push({ product: pId, quantity: 1 });
                    }
            });
            await cart.save()
            return cart
        } catch (error) {
            return{error: error.message}
        }
    }
    async updateCart(cId, pId, newQuantity) {
        try {
            
            let product = await productModel.findById(pId)
            let cart = await cartModel.findById(cId)
            let enCarrito = cart.products.findIndex(p => p.product._id.toString() === pId)
  
            if (enCarrito !== -1) {
                cart.products[enCarrito].quantity += 1
                if (newQuantity) {
                    cart.products[enCarrito].quantity = newQuantity
                }
                }
                else {
                    cart.products.push({ product: pId, quantity: 1 });
                    }
                    await cart.save();
                    return `se anadio ${product}`
        } catch (error) {
            return{error: error.message}
        }


        
    }
    async deleteProduct(cId, pId){
        try {
            let product = await productModel.findById(pId)
            let cart = await cartModel.findById(cId)
            let enCarrito = cart.products.findIndex(p => p.product._id.toString() === pId);
 
            
            if (enCarrito !== -1) {
                console.log(enCarrito);
                cart.products.splice(enCarrito, 1)
                await cart.save();
                return (`se elimino ${product}`)
            }
            else {
                console.log("no exite ese producto en el carrito");
                return "no exite ese producto en el carrito"
            }
            
        } catch (error) {
            return{error: error.message}
        }
    }
    async emptyCart(cId){
        try {
            let cart = await cartModel.findById(cId)
            cart.products = []
            await cart.save()
            return cart
        } catch (error) {
            return{error: error.message}

        }
    }
}

export default MongoCartManager