import express from "express";
import MongoProductManager from "../dao/Mongo/productManagerMong.js";
import productModel from "../dao/models/products.model.js";
import auth from "../midlewares/auth.js";

const router = express.Router()
router.use(express.json())

const productManager = new MongoProductManager()

//Create

router.post("/api/products", async(req, res)=>{
    try {
        const newProduct = req.body
        let result = await productManager.addProduct(newProduct)
        res.send({result: "succes", payload: result})
    } catch (error) {
        res.send("no se pudo completar tu peticion")
    }

})


//read

router.get("/api/products", auth,async(req, res)=>{
    try {

const products =  await productManager.getProducts(req)
        res.json(products)
        
        
    } catch (error) {
        res.send("no se pudo completar tu petición")
    }

})

router.get('/api/products/:id', auth,async(req, res)=>{
    try {
        let pId = req.params.id
        let productById = await productManager.getProductById(pId)
        if (!productById.error) {
            res.send(productById)
        }
        else{
            res.send(`Lo sentimos, el producto con id:"${pId}" no existe`)
        }
    } catch (error) {
        res.send("no se pudo completar tu peticion");
    }
})
//update
router.put('/api/products/:id', async (req, res)=>{
    try {
        let pId = req.params.id
        const updatedProdduct = req.body
        let productById = await productManager.getProductById(pId)
        if (!productById.error) {
            productManager.updateProduct(pId, updatedProdduct)
            res.send("se actualizo tu producto")
        }
        else{
            res.send(`Lo sentimos, el producto con id:"${pId}" no existe`)
        }
    } catch (error) {
        res.send("no se pudo completar tu peticion");
    }
})

//delete
router.delete('/api/products/:id', async(req, res)=>{
    try {
        let pId = req.params.id
        let productById = await productManager.getProductById(pId)
        if (!productById.error) {
            productManager.deleteProduct(pId)
            res.send(`se elimino el producto`)
        }
        else{
            res.send(`Lo sentimos, el producto con id:"${req.params.id}" no existe`)
        }
    }
    catch (error) {
        res.send("no se pudo completar tu peticion")
 
    }

})






export default router