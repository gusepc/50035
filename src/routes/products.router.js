import express from "express";
import auth from "../middlewares/auth.js";
import productsController from  "../controllers/productsController.js"

const router = express.Router()
router.use(express.json())

//Create
router.post("/api/products", productsController.addProduct)

//Read
router.get("/api/products", auth, productsController.getProducts)
router.get('/api/products/:id', auth, productsController.getProductById)

//Update
router.put('/api/products/:id', productsController.updateProduct)

//Delete
router.delete('/api/products/:id', productsController.deleteProduct)


export default router