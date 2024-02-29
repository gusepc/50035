import express from "express";
import MongoProductManager from "../dao/Mongo/productManagerMong.js";
import MongoCartManager from "../dao/Mongo/cartManagerMong.js"
const router = express.Router()
router.use(express.json())
const productManager = new MongoProductManager()
const cartManager = new MongoCartManager()


router.get('/', async(req, res) => {
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
router.get('/products', async (req, res)=>{
    let products =  await productManager.getProducts(req)
    console.log(products.page)
    if (products.isValid) {
        res.render("products", {
            layout: "main",
            title: "products",
            product: products,
            style: "products.css"
            
        })  
    }
    else{
        res.send(`la pagina ${req.query.page} no existe`)
    }
    // else{
    //     res.redirect("https://c0.klipartz.com/pngpicture/10/633/gratis-png-pocoyo-pocoyo-posando.png")
    // }
    
    
})
router.get('/carts/:cid', async (req, res)=>{
    let cId = req.params.cid
    const cart = await cartManager.cartById(cId)
    console.log(cart.products);
if (cart._id) {
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
// else{
//     res.redirect("https://c0.klipartz.com/pngpicture/10/633/gratis-png-pocoyo-pocoyo-posando.png")
// }
    
    
})

router.get('/realtimeproducts', (req, res)=>{
        res.render("realTimeProducts", {
            layout: "main",
            title: "realtimeproducts"
        })
})

router.get('/chat', (req, res)=>{
    res.render("chat"), {
        layout: "main",
        title: "LatinChat"
    }})


export default router