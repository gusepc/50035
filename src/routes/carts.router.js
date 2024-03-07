import express from "express";
import MongoCartManager from "../dao/Mongo/cartManagerMong.js";
import auth from "../midlewares/auth.js";

const router = express.Router()
router.use(express.json())

const cartManager = new MongoCartManager()

//create
router.post("/api/carts",async(req, res)=>{
    try {
        let carts = await cartManager.addCart()
        res.send({result:"succes", payload: carts})
        
    } catch (error) {
        res.send("no se pudo completar tu peticion")
    }

})
//read
router.get("/api/carts/:cid", auth, async(req, res)=>{
    try {
        const cId = req.params.cid
        let cartById = await cartManager.cartById(cId)
        if (!cartById.error) {
            res.send(cartById)
        }
        else{
            res.send(`Lo sentimos, el carrito con id:"${req.params.cid}" no existe`)
        }
    } catch (error) {
        res.send("no se pudo completar tu peticiooooon");
    }
})

//update
router.put("/api/carts/:cid/product/:id",async (req, res)=>{
        try {
            const cId = req.params.cid
            const pId = req.params.id
            const newQuantity = req.body.quantity
            let updatedCart = await cartManager.updateCart(cId, pId, newQuantity)
            res.send(updatedCart)
        }
        catch (error) {
            res.send("no se pudo completar tu petición"); 
        }
})

router.put("/api/carts/:cid",async (req, res)=>{
    try {
        const cId = req.params.cid
        const products = req.body
        let updatedCart = await cartManager.addToCart(cId, products)
        res.send(updatedCart)
    }
    catch (error) {
        res.send("no se pudo completar tu petición"); 
    }
})
//delete

router.delete("/api/carts/:cid/product/:pid", async(req, res)=>{
    try {
        const cId = req.params.cid
        const pId = req.params.pid
        let deletedProduct = await cartManager.deleteProduct(cId, pId)
        res.send(deletedProduct)
    }
    catch (error) {
        res.send("no se pudo completar tu petición"); 
    }
})

router.delete("/api/carts/:cid", async(req, res)=>{
    try {
        
        const cId = req.params.cid
        let emptyCart = await cartManager.emptyCart(cId)
        res.send(emptyCart)
    }
    catch (error) {
        res.send("no se pudo completar tu petición"); 
    }
})

export default router