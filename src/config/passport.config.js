import  passport  from "passport"
import local from "passport-local"
import userModel from "../dao/models/usser.model.js"
import { createHash, isValidatePassword } from "../utils.js"
import GitHubStrategy from "passport-github2"



const LocalStrategy = local.Strategy


const initializePassport = () => {

passport.use('github', new GitHubStrategy({
    clientID: 'Iv1.403bf7518fe8436c',
    clientSecret: '3b0810bc906ff5390bebf9c68dd8153f38d9a152',
    callbackURL:'http://localhost:8080/api/sessions/githubcallback'},async(accesToken, refreshToken, profile, done) => {

    try {
        let user = await userModel.findOne({email: profile._json.email || profile._json.id})
    
        if (user) {
    
            return done(null, user)
        }
    
       let result = await userModel.create({ 
            first_name : profile._json.name,
            last_name :'',
            email : profile._json.email || profile._json.id,
            age: '',
            password : ''
       })
    
        return done(null, result)
    
    } catch (error) {
    
        return done(error)
    }
        }
    ))

    passport.use('login', new LocalStrategy(
        {passReqToCallback: true, usernameField: "email"}, async(req, username, password, done) => {

console.log(username, password);
    try {
        let user = await userModel.findOne({email: username})
        let isValidate = isValidatePassword(user, password)
        console.log(user);
        if (user && isValidate){
                return done(null, user)
        }
        else{
            return done(null, false)
        }   
    } catch (error) {
        console.log("ya fallo");
        return done(null,false)   
    }}))

passport.use('register', new LocalStrategy(
    {passReqToCallback: true, usernameField: "email"}, async(req,username, password, done) => {
    const { first_name, last_name, email, age} = req.body

try {
    let user = await userModel.findOne({email: username})

    if (user) {

        return done(null, true)
    }

   let result = await userModel.create({ 
        first_name,
        last_name,
        email,
        age,
        password : createHash(password)})

    return done(null, result)

} catch (error) {

    return done(error)
}
    }
))
passport.serializeUser((user, done) => {
    done (null, user._id)
})
passport.deserializeUser(async(id, done)=>{
    let user = await userModel.findById(id)
    done (null, user)
})
}

export default initializePassport