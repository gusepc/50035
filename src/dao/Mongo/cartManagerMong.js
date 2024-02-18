import cartModel from "../models/carts.model.js";
import MongoProductManager from "./productManagerMong.js";
const productManager = new MongoProductManager()
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
            return await cartModel.findById(cId)
        } catch (error) {
            return{error: error.message}
        }
    }
    async updateCart(cId, pId) {
        try {
            let product = await productManager.getProductById(pId)
            let cart = await cartModel.findById(cId)
            let enCarrito = cart.products.find(p => p.producto === product.title)
            if (enCarrito) {
                return await cartModel.findOneAndUpdate(
                    { _id: cId, "products.producto": product.title },
                    { $inc: { "products.$.quantity": 1 } }
                );
                }
            else {
                return await cartModel.findOneAndUpdate(
                    { _id: cId },
                    { $addToSet: { products: { producto: product.title, quantity: 1 } } }
                );
            }

        } catch (error) {
            
        }


        
    }
}

export default MongoCartManager