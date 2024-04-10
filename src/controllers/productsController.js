import productsService from "../services/productsService.js"

async function addProduct(req, res) {
    try {
        const newProduct = req.body
        let result = await productsService.addProduct(newProduct)
        res.send({result: "succes", payload: result})
    } catch (error) {
        res.send("no se pudo completar tu peticion")
    }
}
async function getProducts(req, res) {
    try {
        const products = await productsService.getProducts(req)
        res.json(products)
                
        } catch (error) {
            res.send("no se pudo completar tu petición")
        }
        
    }
async function getProductById(req, res) {
    try {
        let pId = req.params.id
        let productById = await productsService.getProductById(pId)
        if (productById) {
            res.send(productById)
        }
        else{
            res.send(`Lo sentimos, el producto con id:"${pId}" no existe`)
        }
    } catch (error) {
        console.log(productById);
        res.send("no se pudo completar tu peticion");
    }
}
async function updateProduct(req, res) {
    try {
        let pId = req.params.id
        const updatedProdduct = req.body
        let productById = await productsService.getProductById(pId)
        if (productById) {
            productsService.updateProduct(pId, updatedProdduct)
            res.send("se actualizo tu producto")
        }
        else{
            res.send(`Lo sentimos, el producto con id:"${pId}" no existe`)
        }
    } catch (error) {
        res.send("no se pudo completar tu peticion");
    }
}
async function deleteProduct(req, res) {
    try {
        let pId = req.params.id
        let productById = await productsService.getProductById(pId)
        if (productById) {
            productsService.deleteProduct(pId)
            res.send(`se elimino el producto`)
        }
        else{
            res.send(`Lo sentimos, el producto con id:"${req.params.id}" no existe`)
        }
    }
    catch (error) {
        res.send("no se pudo completar tu peticion")
 
    }
}

 export default {
    getProducts,
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct
   }
