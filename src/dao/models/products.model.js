import mongoose from "mongoose";

const productCollection = "productos"

const productSchema = new mongoose.Schema({
    title: {type: String, required: true,max:50},
    description: {type: String, required: true,max:100},
    price: {type: Number, required: true },
    stock: {type: Number, required: true },
    status: {type: Boolean, required: true},
    category: {type: String, required: true,max:50},
    thumbnail: {type: String, required: false,max:100},
    code: {type: String, required: true,max:50, unique:true}
})

const productModel = mongoose.model(productCollection,productSchema)

export default productModel