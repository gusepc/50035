import { log } from "console"
import messageModel from "../dao/Mongo/models/messages.model.js"
const socketChat = async(socketServer) => {

    

socketServer.on("connection", async(socket) => {
    
    let print = await messageModel.find({ message: { $exists: true } })
    socketServer.emit("cargarMensajes", print)
    socket.on("username", async username => {
        await messageModel.create({user: username})
        console.log("se registro el correo");
        socket.emit("username", username)
    })
    socket.on("mensajeUsuario", async envio =>{
        await messageModel.create(envio)
        console.log("se registro el mensaje");
    })

console.log('usuario conectado al chat')

try {
    
    let mensajes = await messageModel.create()
    socketServer.emit("mensajes", mensajes)
    
} catch (error) {
   
}}

)}
    

export default socketChat