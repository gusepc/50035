import MongoCartManager from "../dao/Mongo/cartManagerMong.js";
const cartManager = new MongoCartManager()


function addCart() {
 return cartManager.addCart()
}
function cartById(cId){
    return cartManager.cartById(cId)   
}
function updateCart(cId, pId, newQuantity) {
    return cartManager.updateCart(cId, pId, newQuantity)
}
function addToCart(cId, products) {
    return cartManager.addToCart(cId, products)
}
function deleteProduct(cId, pId) {
    return cartManager.deleteProduct(cId, pId) 
}
function emptyCart(cId){
    return cartManager.emptyCart(cId)
}

export default {
    addCart,
    cartById,
    updateCart,
    addToCart,
    deleteProduct,
    emptyCart
}