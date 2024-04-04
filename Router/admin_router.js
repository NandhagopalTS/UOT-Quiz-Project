import express  from "express";
import { signup_controller, save_question, signup, admin_login, admin_controller, update_question, delete_question } from "../Controller/admin_controller.js";
import { Questions } from "../DB/models/user_model.js";

const sigin_router=express.Router()

sigin_router.get("/signup",signup)
sigin_router.post("/signup",signup_controller)
sigin_router.get("/login",(req,res) =>{
    res.render("admin_login")
})
sigin_router.post("/login",admin_controller)
sigin_router.post("/",save_question)
sigin_router.get("/",admin_login)
sigin_router.get("/update/:id",async(req,res)=>{
    const question=await Questions.findById(req.params.id).lean()
    res.render("update",{question})
})
sigin_router.post("/update/:id",update_question)
sigin_router.get("/delete/:id",delete_question)
export default sigin_router