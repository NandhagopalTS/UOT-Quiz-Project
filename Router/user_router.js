import express  from "express"; 
import {signup, signup_controller, user_controller, user_hall, user_login } from "../Controller/user_controller.js";


const user_router=express.Router()

user_router.get("/signup",signup)
user_router.post("/signup",signup_controller)
user_router.get("/login",(req,res) =>{
    res.render("login")
})
user_router.post("/login",user_controller)
user_router.get("/user",user_login)
user_router.post("/user",user_hall)


export default user_router