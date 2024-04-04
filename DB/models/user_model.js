import mongoose from "mongoose";

const adminSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number
},{
    timestamps:true
})
const questionCreate= new mongoose.Schema({
     Question:String,
     Option1:String,
     Option2:String,
     Option3:String,
     Option4:String,
     Answer:String,
     used_question:Boolean

})
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    age:Number
},{
    timestamps:true
})
// const answer= new mongoose.Schema({
//     Option1:String,
//     Option2:String,
//     Option3:String,
//     Option4:String,
// })
const adminModel=mongoose.model("admin",adminSchema)
export const Questions=mongoose.model("question",questionCreate)
export const userModel=mongoose.model("user",userSchema)
// export const Answers=mongoose.model("answer",answer)
export default adminModel