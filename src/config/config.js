import dotenv from "dotenv"

dotenv.config()

export default {
    port: process.env.PORT,
    mongoURL: process.env.MONGOURL,
    adminName:process.env.ADMINNAME,
    adminPassword: process.env.ADMINPASSWORD
}