import User from "../models/Usermodel.js";
import crypto from "crypto";


import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            throw new Error("Please fill all fields");
        }
        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        const user = new User({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            verificationTokenExpiresAt, // Ensure this field is correctly set
        });
        await user.save();
        console.log(`User created: ${JSON.stringify(user, null, 2)}`); // Debugging line
        generateTokenAndSetCookie(res, user._id);
        await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                ...user._doc,
                password: undefined,
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    const { code } = req.body;
    try {
        console.log(`Verification code received: ${code}`); // Debugging line
        const query = {
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        };
        console.log(`Query: ${JSON.stringify(query, null, 2)}`); // Debugging line
        const user = await User.findOne(query);
        console.log(`User found: ${user}`); // Debugging line
        if (!user) {
            console.log("Invalid verification token or token expired"); // Debugging line
            return res.status(400).json({ success: false, message: "Invalid or expired verification code" });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: {
                ...user._doc,
                password: undefined,
            },
        });
    } catch (error) {
        console.log("error in verifyEmail ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password"});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ success: false, message: "Invalid email or password"});
        }
        generateTokenAndSetCookie(res,user._id);

        user.lastLogin = new Date();
        await user.save();
        res.status(200).json({
            ...user._doc,
            password: undefined,
        })

    } catch (error) {
        console.log(error,"error occured")
        res.status(400).JSON({success:false,message:error.message})
    }

};

export const logout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
       const user = await User.findOne({email});
       if(!user) return res.status(400).json({success:false,message:"Invalid email"})

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now()  + 1 * 60 * 60 * 1000; // 1 hour from now

        

    } catch (error) {
        
    }
}