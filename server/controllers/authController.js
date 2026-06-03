import authModel from "../models/authModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

class AuthController {
    static userRegistration = async (req, res) => {
        const { username, email, password } = req.body;
        try {
            if (username && email && password) {
                const isUser = await authModel.findOne({ email: email });
                if (!isUser) {
                    //password hasing
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashedPassword = await bcryptjs.hash(password, genSalt);

                    //savedUser
                    const newUser = new authModel({
                        username,
                        email,
                        password: hashedPassword,
                    });

                    const savedUser = await newUser.save();
                    if (savedUser) {
                        return res.status(200).json({ message: "User Registration Successfuly" });
                    }

                } else {
                    return res.status(400).json({ message: "Email Already Exits" });
                }
            } else {
                return res.status(400).json({ message: "All Fields are Required" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };
    static userLogin = async (req, res) => {
        const { email, password } = req.body;
        try {
            if (email && password) {
                const isEmail = await authModel.findOne({ email: email });
                if (isEmail) {
                    if (isEmail.email === email && await bcryptjs.compare(password, isEmail.password)) {
                        //Generate Token
                        const token = jwt.sign({ userID: isEmail._id }, "pleaseSubscribe", {
                            expiresIn: "2d",
                        })
                        return res.status(200).json({ message: "Login Successfully", token, name: isEmail.username });
                    } else {
                        return res.status(400).json({ message: "Wrong Credentials" });
                    }
                } else {
                    return res.status(400).json({ message: "Email ID NOT Found" });
                }
            } else {
                return res.status(400).json({ message: "All fields are required" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    static forgetPassword = async (req, res) => {
        const { email } = req.body;
        try {
            const isUser = await authModel.findOne({ email: email });
            if (!isUser) {
                return res.status(400).json({ message: "User does not exist" });
            }
            const token = jwt.sign({ userID: isUser._id }, "pleaseSubscribe", {
                expiresIn: "15m",
            });
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "prabhatmunjal74@gmail.com",
                    pass: "yitnfipzcxlegerq",
                },
            });
            let mailOptions = {
                from: "prabhatmunjal74@gmail.com",
                to: email,
                subject: "Reset your password",
                html: `
        <p>Hello ${isUser.username || "User"},</p>
        <p>You requested to reset your password.</p>
        <p>Click the link below to reset it (valid for 15 minutes):</p>
        <a href="http://localhost:9000/reset-password/${isUser._id}/${token}">
          Reset Password
        </a>
      `,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    return res.status(500).json({ message: "Error sending email" });
                } else {
                    console.log("Email sent: " + info.response);
                    return res.status(200).json({
                        message: "Password reset link sent to your email",
                        token,
                    });
                }
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
    static resetPassword = async (req, res) => {
        const { id, token } = req.params;
        const { password } = req.body;
        try {
            const decoded = jwt.verify(decodeURIComponent(token), "pleaseSubscribe");
            if (decoded.userID.toString() !== id.toString()) {
                return res.status(400).json({ message: "Invalid token or ID" });
            }
            if (!password) {
                return res.status(400).json({ message: "Password is required" });
            }
            const genSalt = await bcryptjs.genSalt(10);
            const hashedPassword = await bcryptjs.hash(password, genSalt);


            const updatedUser = await authModel.findByIdAndUpdate(
                id,
                { password: hashedPassword },
                { new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ message: "Password updated successfully" });

        } catch (error) {
            console.error("Reset password error:", error.message);
            return res.status(400).json({ message: "Invalid or expired token" });
        }
    };

}

export default AuthController;


