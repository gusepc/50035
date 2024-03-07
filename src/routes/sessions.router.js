import express from "express";
const router = express.Router()
router.use(express.json())
import userModel from "../dao/models/usser.model.js";
import auth from "../midlewares/auth.js"


router.get('/api/sessions/login', (req, res)=>{
    if (!req.session.user) {
        res.render("login", {
            layout: "main",
            title: "login",
            style: "styles.css"
            
        })  
    }else {
        res.redirect("/products")
       }
})

router.post('/api/sessions/login', async (req, res)=>{
    try {
        const {email, password} = req.body 
        let acces = await userModel.findOne({email: email, password: password})
        if (acces) {
            req.session.user = {
                first_name : acces.first_name,
                last_name : acces.last_name,
                age: acces.age,
                email: acces.email}
            if (acces.email === "adminCoder@coder.com") {
                req.session.user.rol = "admin"
            }
            else{
                req.session.user.rol = "user"
            }
            res.redirect('/products')
        }
        else{
            res.send("lo sentimos, el usuario o la contraseña son incorrectos")
        }
    } catch (error) {
        res.send("algo salio mal")
    }
       

})

router.get('/api/sessions/profile', auth ,(req, res)=>{

    res.render("profile", {
        layout: "main",
        title: "profile",
        style: "styles.css",
        user: req.session.user
    })  
})

router.get('/api/sessions/register', (req, res)=>{
    if (!req.session?.user) {
        res.render("register", {
            layout: "main",
            title: "register",
            style: "styles.css"
            
        })  
    }
    else {
        res.redirect("/products")
       }
})

router.post("/api/sessions/register", async (req, res) => {

        try {
            const { first_name, last_name, email, age, password } = req.body
            if (!first_name || !last_name || !email || !age || !password ) {
                res.send("Todos los campos son obligatorios")
            }
            userModel.create({ first_name, last_name, email, age, password })
            await userModel.save
    
            res.redirect("/api/sessions/login")  
        } catch (error) {
            res.send("Error de registro")
        }  
})


router.get('/api/sessions/logout', (req, res)=>{
     req.session.destroy(err =>{
        if (err) {
            res.send("algo salio mal")
        }else{
            res.clearCookie('connect.sid')
            res.redirect('/api/sessions/login')  
        }
     })

})

export default router