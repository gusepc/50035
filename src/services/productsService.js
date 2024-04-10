import MongoProductManager from "../dao/Mongo/productManagerMong.js";

const productManager = new MongoProductManager()

function addProduct(newProduct) {
    return productManager.addProduct(newProduct)
}

function getProducts(req) {
    return  productManager.getProducts(req)
}

function getProductById(pId){
    return productManager.getProductById(pId)
    
}
function updateProduct(pId, updatedProdduct) {
    return productManager.updateProduct(pId,updatedProdduct)
}
function deleteProduct(pId) {
    return productManager.deleteProduct(pId)
    
}

export default {
    getProducts,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct
}