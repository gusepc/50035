const socket = io()


document.getElementById("username-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const usernameInput = document.getElementById("username")
    const username = usernameInput.value
    


    Swal.fire({
        icon: "success",
        title: "Bienvenido al chat",
        text: `Estas conectado como ${username}`
    })
    document.getElementById("username-form").style.display = "none"
    document.getElementById("chat-form").style.display = "block"
    socket.emit("username", username)
})
socket.on("username", username =>{
document.getElementById("chat-form").addEventListener("submit", (e) => {
    e.preventDefault()
    const messageInput = document.getElementById("message")
    const message = messageInput.value
    messageInput.value = ""
    const envio = {
        user: username,
        message: message
    }
    socket.emit("mensajeUsuario", envio)

    const chatMessages = document.getElementById("chat-messages")
    const messageElement = document.createElement("div")

        messageElement.innerHTML = `<strong>${username}:</strong> ${message}`
        chatMessages.appendChild(messageElement)

})
})

socket.on("cargarMensajes", print=>{
   
    const chatMessages = document.getElementById("chat-messages")
    
    print.forEach(element => {

        const messageElement = document.createElement("div")
        messageElement.innerHTML += `<strong>${element.user}:</strong> ${element.message}`
        chatMessages.appendChild(messageElement)
    });


} )



