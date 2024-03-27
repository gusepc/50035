import express from "express";
import MongoProductManager from "../dao/Mongo/productManagerMong.js";
import MongoCartManager from "../dao/Mongo/cartManagerMong.js"
import auth from "../midlewares/auth.js";

const router = express.Router()
router.use(express.json())
const productManager = new MongoProductManager()
const cartManager = new MongoCartManager()




router.get('/', auth, async(req, res) => {
    let products =  await productManager.getProducts(req)
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

})
router.get('/products', auth, async (req, res)=>{
    let products =  await productManager.getProducts(req)

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
})
router.get('/carts/:cid', auth, async (req, res)=>{
    let cId = req.params.cid
    
    const cart = await cartManager.cartById(cId)
if (cart._id != req.session.user.cart._id) {
        res.send(`${cId} no es tu carrito`)
    }
else if (cart._id) {
    res.render("cart", {
        layout: "main",
        title: "cart",
        cart: cart,
        style: "cart.css"
        
    })  
}
else{
    res.send(`${cId} no existe`)
}



})

router.get('/realtimeproducts', auth, (req, res)=>{
        res.render("realTimeProducts", {
            layout: "main",
            title: "realtimeproducts"
        })
})

router.get('/chat', auth,(req, res)=>{
    res.render("chat"), {
        layout: "main",
        title: "LatinChat"
    }})


export default router