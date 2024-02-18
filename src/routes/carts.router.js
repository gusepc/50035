import express from "express";
import MongoCartManager from "../dao/Mongo/cartManagerMong.js";

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
router.get("/api/carts/:cid", async(req, res)=>{
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
            let updatedCart = cartManager.updateCart(cId, pId)
            res.send(updatedCart)
        }
        catch (error) {
            res.send("no se pudo completar tu petición"); 
        }
})

export default router