import express from "express"
import productsRouter from "./src/routes/products.router.js"
import cartsRouter from "./src/routes/carts.router.js"
import viewsRouter from "./src/routes/views.router.js"
import {engine} from "express-handlebars"
import { Server } from "socket.io"
import path from "path"
import mongoose from "mongoose"
import productModel from "./src/dao/models/products.model.js"
import socketChat from "./src/socket/chat.contection.js"
import socketP from "./src/socket/realTimeP.conection.js"
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join("src/public")))


app.use("/", productsRouter)
app.use("/", cartsRouter)
app.use("/", viewsRouter)
app.engine("handlebars", engine())
app.set('view engine', 'handlebars')
app.set('views', 'src/views')



const httpServer = app.listen(8080,()=>console.log("server started"));



mongoose.connect("mongodb+srv://gustavofloresenciso:12345epc@ecommerce.l3fhqou.mongodb.net/ecommerce?retryWrites=true&w=majority")
.then(()=>{
    console.log("Conectado a la db...");
})
.catch(()=>{
    console.log("No conectado a la db...");
})


const socketServer = new Server(httpServer)
socketP(socketServer)
socketChat(socketServer)
