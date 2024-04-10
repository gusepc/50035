import productModel from "./models/products.model.js";

class MongoProductManager {

    async addProduct( product){
        try {
            await productModel.create(product)
            return{message: "se agregó tu producto"}
        } catch (error) {
            return{error: error.message}
        }

    }

    async getProducts(req){
        try {
            let limit = parseInt(req.query.limit) || 10
            let page = req.query.page || 1
            let sort = parseInt(req.query.sort) || null
            let category = req.query.category || null
            let available = req.query.available || true
            let filter = {}
            if (category) {
                filter.category = category;
            }
            if (available === "false") {
                filter.stock = { $eq: 0 }
            }
            let options = { limit, page, lean: true }
            if (sort) {
                options.sort = { price: sort }
            }
            const products = await productModel.paginate(filter, options,)
            products.prevLink = products.page > 1 ? `/products?page=${products.page - 1}` : " ";
            products.nextLink = products.page < products.totalPages ? `/products?page=${products.
            page + 1}` : " ";
            products.isValid = !(page <= 0 || page > products.totalPages || isNaN(page))
            return products
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