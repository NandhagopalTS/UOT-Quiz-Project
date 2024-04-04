import express from "express"
import dotenv from "dotenv"
import sigin_router from "./Router/admin_router.js"
import user_router from "./Router/user_router.js"
import path,{dirname, join} from "path"
import { fileURLToPath } from "url"
import {engine} from "express-handlebars"
import {connectDB}  from "./DB/Confi/connection.js"

const dir=dirname(fileURLToPath(import.meta.url))
const app=express()
dotenv.config()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
connectDB()

app.set("views",path.join(dir,"views"))
app.set("view engine","hbs")
app.engine("hbs",engine({
    extname:"hbs",
    defaultLayout:"index",
    layoutsDir:path.join(dir,"views/layout")
}))


app.use("/admin",sigin_router)
app.use("/",user_router)

app.listen(process.env.PORT,()=>{
    console.log(`Server PORT ${process.env.PORT}`);
})