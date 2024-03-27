import express from "express";
import userModel from "../dao/models/usser.model.js";
import auth from "../midlewares/auth.js"
import {createHash, isValidatePassword} from "../utils.js";
import  passport from "passport";
import { log } from "console";

const router = express.Router()
router.use(express.json())

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


router.get('/api/sessions/login/github', passport.authenticate('github', {scope: ["user:email"]}), async(req, res)=>{
})

router.get('/api/sessions/githubcallback', passport.authenticate("github", {failureRedirect:"/api/sessions/error"}), async(req, res)=>{
console.log(req.user);
    try {
        if(req.user){
                req.session.user = {
                    first_name : req.user.first_name,
                    last_name : req.user.last_name,
                    age: req.user.age,
                    email: req.user.email}
               
                if (req.user.email === "adminCoder@coder.com") {
                    req.session.user.rol = "admin"
                }
                else{
                    req.session.user.rol = "user"
                }
                res.redirect('/products')
            }
            else{
                res.status(400).send("lo sentimos, el usuario o la contraseña son incorrectos")
            }
        } catch (error) {
            res.send("algo salio mal")
        }
})


router.post('/api/sessions/login', passport.authenticate('login', {failureRedirect: "/api/sessions/register"}), async (req, res)=>{
    try {
    if(req.user){
        // console.log(req.user);
            req.session.user = {
                first_name : req.user.first_name,
                last_name : req.user.last_name,
                age: req.user.age,
                email: req.user.email,
                role: req.user.role,
                cart: req.user.cart}
           
            if (req.user.email === "adminCoder@coder.com") {
                req.session.user.role = "admin"
            }
            // else{
            //     req.session.user.role = "user"
            // }
            res.redirect('/products')
        }
        else{
            res.status(400).send("lo sentimos, el usuario o la contraseña son incorrectos")
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
router.get('/api/sessions/current', auth ,(req, res)=>{

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

router.post("/api/sessions/register", passport.authenticate("register", {failureRedirect: "/api/sessions/register"}), async (req, res) => {

    // res.send("usuario registrado")
    res.redirect("/api/sessions/login") 
        // try {
        //     const { first_name, last_name, email, age, password } = req.body
        //     if (!first_name || !last_name || !email || !age || !password ) {
        //         res.send("Todos los campos son obligatorios")
        //     }
        //     await userModel.create({ 
        //         first_name,
        //         last_name,
        //         email,
        //         age,
        //         password : createHash(password)})
        //     // await userModel.save
        //     res.redirect("/api/sessions/login")  
        // } catch (error) {
        //     res.send("Error de registro")
        // }  
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