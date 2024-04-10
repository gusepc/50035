
import express from "express";
import auth from "../middlewares/auth.js";
import cartsController from  "../controllers/cartsController.js"

const router = express.Router()
router.use(express.json())


//Create
router.post("/api/carts", cartsController.addCart)

//Read
router.get("/api/carts/:cid", cartsController.cartById)

//Update
router.put("/api/carts/:cid/product/:id", cartsController.updateCart)
router.put("/api/carts/:cid", cartsController.addToCart)

//Delete
router.delete("/api/carts/:cid/product/:pid", cartsController.deleteProduct)
router.delete("/api/carts/:cid", cartsController.emptyCart)

export default router