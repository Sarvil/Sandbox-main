'use strict'
const User = require("../Models/user-model");
const emailToken = require("../Models/token-model");
const bcrypt = require("bcryptjs");
const sendMail = require("../Utils/sendemail");
const crypto = require("crypto");

const home = async (req, res) => {
    try {
        res.status(200).send("Hello World using controllers");
    } catch (error) {
        console.log(error);
    }
};

const register = async (req, res) => {
    try {
        const { username, email, DOB, country, password } = req.body;
        console.log("Request: " + req.body.email)

        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const userCreated = await User.create({ username, email, DOB, country, password });
        res.status(201).json({
            message: "Registration Successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),
        });
        
        const token = await new emailToken({
            userId: userCreated._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save();

        const URL = `${process.env.BACKEND_URL}/api/auth/user/${token.userId}/verify/${token.token}`;
        console.log(URL);
        await sendMail(userCreated.email, "Verify Email", URL);
        
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error, because of user creation");
    }
};

const verifyEmail = async (req, res) => {
    try {
        console.log("In Verify Email");
        const user = await User.findOne({_id: req.params.id});
        console.log(req.params.id);
        if(!user) return res.status(400).json({message: "Invalid Link"});

        const token = await emailToken.findOne({
            userId: req.params.id,
            token: req.params.token
        });
        if(!token) return res.status(400).json({message: "Invalid Link"});
        await User.updateOne({_id: user._id, isVerified: true}); 
        await token.deleteOne();
        res.status(200).send({message: "Email verified Successfully"});
    } catch (error) {
        console.log(error);
    };
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        console.log(userExist);
        if (!userExist) {

            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const user = await userExist.comparePassword(password);
  
        console.log(user);
        if (user) {

            if(!Boolean(userExist.isVerified)){
                let token = await emailToken.findOne({userId: userExist._id});
                if(!token){
                    const token = await new emailToken({
                        userId: userExist._id,
                        token: crypto.randomBytes(32).toString("hex")
                    }).save();
                    const URL = `${process.env.BACKEND_URL}/api/auth/user/${token.userId}/verify/${token.token}`;
                    await sendMail(userExist.email, "Verify Email", URL);
                }
                return res.status(400).json({message: "An Email has been sent to you email. please verify"});
            }

            return res.status(200).json({
                message: "Login Successful",
                token: await userExist.generateToken(),
                userId: userExist._id.toString(),
                isVerified: userExist.isVerified,
            });
        } else {
            return res.status(401).json({ message: "Invalid Email or Password" });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal server Error while Login" });
        //next(err);
    }
};

const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        return res.status(200).json({ userData });
    } catch (error) {
        console.log('error from the user route ${error}')
    }
}

module.exports = { home, register, login, user, verifyEmail };