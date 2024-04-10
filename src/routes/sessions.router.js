import express from "express";
import  passport from "passport";
import auth from "../middlewares/auth.js"
import sessionController from "../controllers/sessionController.js";
// import userModel from "../dao/Mongo/models/usser.model.js";
// import {createHash, isValidatePassword} from "../utils.js";


const router = express.Router()
router.use(express.json())


router.get('/api/sessions/login', sessionController.getLogin )

router.get('/api/sessions/login/github', passport.authenticate('github', {scope: ["user:email"]}))

router.get('/api/sessions/githubcallback', passport.authenticate("github", {failureRedirect:"/api/sessions/error"}), sessionController.getGithub)


router.post('/api/sessions/login', passport.authenticate('login', {failureRedirect: "/api/sessions/register"}), sessionController.passLogin)

router.get('/api/sessions/profile', auth, sessionController.getProfile)

router.get('/api/sessions/current', auth, sessionController.getProfile)

router.get('/api/sessions/register', sessionController.getRegister)

router.post("/api/sessions/register", passport.authenticate("register", {failureRedirect: "/api/sessions/register"}), sessionController.postRegister)

router.get('/api/sessions/logout', sessionController.getLogout)

export default router