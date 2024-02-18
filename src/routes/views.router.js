import express from "express";
import productModel from "../dao/models/products.model.js";
const router = express.Router()
router.use(express.json())

const products = productModel.find().lean()



router.get('/', async(req, res) => {
    res.render("home", {
        layout: "main",
        product: await products,
        title: "home"
    })
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