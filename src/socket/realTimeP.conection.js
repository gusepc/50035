import productModel from "../dao/Mongo/models/products.model.js"
const socketP = async(socketServer) => {


socketServer.on("connection", async(socket) => {
console.log('usuario conectado a los productos')
try {

    let products = await productModel.find()
    socketServer.emit("envioProductos", products)
    
} catch (error) {
   
}


socket.on("nuevoProducto", async(newProduct) => {
    try {
        let products = await productModel.find()
    
    let existe = products.find(p => p.code === newProduct.code)
    if (existe) {
        console.log("ya existe un producto con ese codigo");
    }
    else {
        productModel.create(newProduct)
        let products = await productModel.find()
         socketServer.emit("envioProductos", products)
    }
    } catch (error) {
        console.log(error, error)
    }

    })
})
    
}
export default socketP