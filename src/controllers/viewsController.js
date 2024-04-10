// import viewsService from "../services/viewsService.js"
import productsService from "../services/productsService.js"
import cartsService from "../services/cartsServices.js"


async function getRoot(req, res) {
    let products =  await productsService.getProducts(req)
    let status = 'error'
    if(products.docs){
         status = 'success'
         }
    res.send({
        status: status,
        payload: products.docs,
        totalPages: products.totalPages,
        prevPage: products.prevPage,
        nextPage: products.nextPage,
        page: products.page,
        hasPrevPage: products.hasPrevPage,
        hasNextPage: products.hasNextPage,
        prevLink: products.prevLink,
        nextLink: products.nextLink
    })
}

async function getProducts(req, res) {
    let products =  await productsService.getProducts(req)
    if (products.isValid) {
        res.render("products", {
            layout: "main",
            title: "products",
            product: products,
            style: "products.css",
            user: req.session.user
            
        })  
    }
    else{
        res.send(`la pagina ${req.query.page} no existe`)
    }
}

async function getCart(req, res) {
    let cId = req.params.cid
    const cart = await cartsService.cartById(cId)
    if (cart._id != req.session.user.cart) {
        res.send(`${cId} no es tu carrito`)
    }
    else if (cart._id) {
        res.render("cart", {
            layout: "main",
            title: "cart",
            cart: cart,
            style: "cart.css" 
    })}
    else{
        res.send(`${cId} no existe`)
    }
}
function getRtProducts(req, res) {
    res.render("realTimeProducts", {
        layout: "main",
        title: "realtimeproducts"
    })
}
function getChat(req, res) {
    res.render("chat"), {
        layout: "main",
        title: "LatinChat"
    }
}

export default {
    getRoot,
    getProducts,
    getCart,
    getRtProducts,
    getChat
}