const socket = io()

socket.emit("message", "cliente conectado")
socket.on("envioProductos", (products)=>{
    try {
        const listContainer = document.getElementById("list-container")
    listContainer.innerHTML = ``
     products.forEach(product => {
     listContainer.innerHTML +=
        `
        <ul>
    <li>id: ${product._id}</li>
    <li>title: ${product.title}</li>
    <li>description: ${product.description}</li>
    <li>price: ${product.price}</li>
    <li>stock: ${product.stock}</li>
    <li>status: ${product.status}</li>
    <li>category: ${product.category}</li>
    <li>thumbnail: ${product.thumbnail}</li>
    <li>code: ${product.code}</li>
</ul> `
        
    })
    } catch (error) {
        console.log(error);
    }
    
})



document.getElementById("button").addEventListener("click", (e) => {
e.preventDefault()
const title = document.getElementById("title").value
const description = document.getElementById("description").value
const price = document.getElementById("price").value
const stock = document.getElementById("stock").value
const status = document.getElementById("status").value
const category = document.getElementById("category").value
const code = document.getElementById("code").value

const newProduct  = {
    title,
    description,
    price,
    stock,
    status, 
    category,
    code
}
socket.emit("nuevoProducto", newProduct);
})



