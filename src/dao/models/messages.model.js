import mongoose from "mongoose";

const messageCollection = "mensajes"

const productSchema = new mongoose.Schema({
    user: {type: String,max:50, trim: true},
    message: {type: String,max:200, trim: true},
})

const messageModel = mongoose.model(messageCollection,productSchema)

export default messageModel