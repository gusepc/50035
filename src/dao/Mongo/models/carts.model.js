import mongoose from "mongoose";

const cartCollection = "carts"

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "productos"
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
});

cartSchema.pre('findOne', function() {
    this.populate('products.product')
});

const cartModel = mongoose.model(cartCollection,cartSchema)

export default cartModel