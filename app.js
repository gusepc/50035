import express from "express"
import session from "express-session" 
import mongoose from "mongoose"
import path from "path"
import cookieParser from "cookie-parser"
import { Server } from "socket.io"
import {engine} from "express-handlebars"
import MongoStore from "connect-mongo"

import productsRouter from "./src/routes/products.router.js"
import cartsRouter from "./src/routes/carts.router.js"
import viewsRouter from "./src/routes/views.router.js"
import sessionRouter from "./src/routes/sessions.router.js"
import productModel from "./src/dao/models/products.model.js"
import socketChat from "./src/socket/chat.contection.js"
import socketP from "./src/socket/realTimeP.conection.js"
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join("src/public")))


app.use(session({
    store: MongoStore.create({
    mongoUrl: "mongodb+srv://gustavofloresenciso:12345epc@ecommerce.l3fhqou.mongodb.net/ecommerce?retryWrites=true&w=majority"}),
    secret: "CoderSecret",
    resave: false,
    saveUninitialized: false,
}))

app.use("/", productsRouter)
app.use("/", cartsRouter)
app.use("/", viewsRouter)
app.use("/", sessionRouter)
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
