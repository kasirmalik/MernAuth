import {User} from "../models/Usermodel.js";
import { sendVerificationEmail } from "../mailtrap/emails.js";
import bcrypt from "bcryptjs";
import {generateTokenAndSetCookie} from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
    // using postman to test this route
    const {name, email, password} = req.body;
    try {
        if(!name || !email || !password){
            throw new Error("Please fill all fields");
        }
        const userAlreadyExists = await User.findOne({email});
        if(userAlreadyExists){
            return res.status(400).json({message: "User already exists"});
        };
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const user = new User ({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60* 1000, // 24 hours

        });
        await user.save();
        // send email with verification token
        generateTokenAndSetCookie(res,user._id);
        // sending email with verification token
        await sendVerificationEmail(user.email,verificationToken)

        res.status(201).json({
            sucess: true,
            message: "User created successfully",
            user:{
                ...user._doc,
                password: undefined,
            }
        });
    } catch (error) {
        res.status(400).json({message: error.message});
    }
};
export const login = async (req, res) => {
    res.send("login route");
};
export const logout = async (req, res) => {
    res.send("logout route");
};