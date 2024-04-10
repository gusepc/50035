import express from "express";
import viewsController from "../controllers/viewsController.js";
import auth from "../middlewares/auth.js";

const router = express.Router()
router.use(express.json())





router.get('/', auth, viewsController.getRoot)

router.get('/products', auth, viewsController.getProducts)

router.get('/carts/:cid', auth, viewsController.getCart)


router.get('/realtimeproducts', auth, viewsController.getRtProducts)


router.get('/chat', auth, viewsController.getChat)


export default router