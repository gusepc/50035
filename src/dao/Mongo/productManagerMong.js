import productModel from "../models/products.model.js";

class MongoProductManager {

    async addProduct( product){
        try {
            await productModel.create(product)
            return{message: "se agregó tu producto"}
        } catch (error) {
            return{error: error.message}
        }

    }

    async getProducts(){
        try {
            return await productModel.find()
        } catch (error) {
            return{error: error.message}
        }
    }
    
    async getProductById(pId){
        try {
            return await productModel.findById(pId)
        } catch (error) {
            return{error: error.message}
        }
    }

    async updateProduct(pId, actualizacion){
    try {
        return await productModel.findByIdAndUpdate(pId, actualizacion)
    } catch (error) {
        return{error: error.message}
    }
    }
    
    async deleteProduct(pId){
        try {
            return await productModel.findByIdAndDelete(pId)
        } catch (error) {
            return{error: error.message}
        }
    }

}

export default MongoProductManager