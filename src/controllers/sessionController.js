import config from "../config/config.js"


function getLogin(req, res) {
    if (!req.session.user) {
        res.render("login", {
            layout: "main",
            title: "login",
            style: "styles.css"
            
        })  
    }else {
        res.redirect("/products")
       }
}
 function getGithub(req, res) {
    console.log(req.user);
    try {
        if(req.user){
                req.session.user = {
                    first_name : req.user.first_name,
                    last_name : req.user.last_name,
                    age: req.user.age,
                    email: req.user.email,
                    cart: req.user.cart}
               
                if (req.user.email === config.adminName) {
                    req.session.user.role = "admin"
                }
                else{
                    req.session.user.role = "user"
                }
                res.redirect('/products')
            }
            else{
                res.status(400).send("lo sentimos, el usuario o la contraseña son incorrectos")
            }
        } catch (error) {
            res.send("algo salio mal")
        }
}

function passLogin(req, res) {
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
                    // console.log(req.session.user);
    
                if (req.user.email === "adminCoder@coder.com") {
                    req.session.user.role = "admin"
                }
                else{
                    req.session.user.role = "user"
                }
                res.redirect('/products')
            }
            else{
                res.status(400).send("lo sentimos, el usuario o la contraseña son incorrectos")
            }
        } catch (error) {
            res.send("algo salio mal")
        }
    
}

function getProfile(req, res) {
    res.render("profile", {
        layout: "main",
        title: "profile",
        style: "styles.css",
        user: req.session.user
    })
}
function getRegister(req, res) {
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
}
function postRegister(req, res) {
    res.redirect("/api/sessions/login") 
}
function getLogout(req, res) {
    req.session.destroy(err =>{
        if (err) {
            res.send("algo salio mal")
        }else{
            res.clearCookie('connect.sid')
            res.redirect('/api/sessions/login')  
        }
     })
}

export default {
    getLogin,
    getGithub,
    passLogin,
    getProfile,
    getRegister,
    postRegister,
    getLogout
}