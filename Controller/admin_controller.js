import bcrypt from "bcrypt"
import adminModel,{ Questions } from "../DB/models/user_model.js"//

// const users=[]
export const signup = (req, res) => {
    res.render("admin_signup")
}
export const signup_controller = async (req, res) => {
    const { name, email, password, age } = req.body
    //-----------------------------------------------------------
    if (!name || !password || !email || !age) {
        return res.status(400).json({
            success: false,
            message: "Fill all the fields "
        })

    }
    const existing_user = await adminModel.findOne({ email })
    if (existing_user) {
        return res.status(200).json({
            success: false,
            message: "admin already exities,login"
        })
    }
    //--------------------------------------------------------
    const encrypted_password = bcrypt.hashSync(password, 10)
    const admin = new adminModel({
        name,
        email,
        password: encrypted_password,
        age
    })
    await admin.save()
    // console.log(users);
    // res.status(200).json({
    //     messsage:"user added"
    // })
    res.redirect("/admin/login")
}

export const admin_controller = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body);
    const admin = await adminModel.findOne({ email })
    if (admin && (bcrypt.compareSync(password, admin.password))) {
        // res.status(200).json({
        //     messsage:"user varified"
        // })
        const questions = await Questions.find().lean({})
        res.redirect("/admin")
    }
    else {
        res.status(200).json({
            messsage: "no such admin"
        })
    }
}

export const save_question = async (req, res) => {
    const { cques, option1, option2, option3, option4, answer } = req.body

    const existing_question = await Questions.findOne({ Question: cques })

    const quest = new Questions({
        Question: cques,
        Option1: option1,
        Option2: option2,
        Option3: option3,
        Option4: option4,
        Answer: answer,
        used_question:false
    })
    if(!cques||!option1||!option2||!option3||!option4||!answer){
        return res.send({ans:"fill the blanks"})      
    }else 
    if (existing_question) {
        return res.send({ Question: "Already Existes" })
    }
    await quest.save()

    const questions = await Questions.find().lean({})
    res.render("admin", { questions })

}
// // update Question--------------------------------------------------
export const update_question=async(req,res)=>{
    const { cques, option1, option2, option3, option4, answer } = req.body
    const id=req.params.id
    console.log(id);
   try {
    const question = await Questions.findByIdAndUpdate(id,{$set:{
        Question: cques,
        Option1: option1,
        Option2: option2,
        Option3: option3,
        Option4: option4,
        Answer: answer
    }})
    await question.save()

    console.log(question);
   
    res.redirect("/admin")
   } catch (error) {
    console.log("rhgfhrth");
   }
   
}

// // ----------------------------------------------------------------
// // Delete Question-------------------------------------------------
export const delete_question=async(req,res)=>{
    const id=req.params.id

    await Questions.findByIdAndDelete(id)
   res.redirect("/admin")
}

// -------------------------------------------------------------------
 export const admin_login =async(req,res)=>{
    const questions = await Questions.find().lean({})
    res.render("admin",{questions})
 }