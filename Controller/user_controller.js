import bcrypt from "bcrypt"
import { userModel, Questions } from "../DB/models/user_model.js"
let mark = 0


export const signup = (req, res) => {
    res.render("signup")
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
    const existing_user = await userModel.findOne({ email })
    if (existing_user) {
        return res.status(200).json({
            success: false,
            message: "admin already exities,login"
        })
    }
    //--------------------------------------------------------
    const encrypted_password = bcrypt.hashSync(password, 10)
    const user = new userModel({
        name,
        email,
        password: encrypted_password,
        age
    })
    await user.save()

    res.redirect("/login")
}

export const user_controller = async (req, res) => {
    const { email, password } = req.body



    const user = await userModel.findOne({ email })
    if (user && (bcrypt.compareSync(password, user.password))) {
        const questions = await Questions.find().lean({})
        res.redirect("/user")
    }
    else {
        res.status(200).json({
            messsage: "no such user"
        })
    }
}

export const user_login = async (req, res) => {
    const questions = await Questions.aggregate([
        { $match: { used_question: false } },
        { $sample: { size: 1 } }]);
    console.log(questions);
    if (questions.length != 0) {
        res.render("user", { questions: questions[0] })
    }
    else {
        await Questions.updateMany({ $set: { used_question: false } })
        let score = mark
        mark = 0
        res.render("result", { score: score })
    }


}

// ----------------------------------------------------------------------------
export const user_hall = async (req, res) => {
    const { answer, canswer, id } = req.body

    await Questions.findByIdAndUpdate(id, { $set: { used_question: true } })

    if (answer == canswer) {
        mark++
    }
    res.redirect("/user")
}

// ------------------------------------------------------------------
// ----------------------------------------------------------------
// ==============================================================

// let x=5

// x==5?console.log("true"):console.log("false");