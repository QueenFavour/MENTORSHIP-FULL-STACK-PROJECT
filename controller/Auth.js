import express from "express";
import AuthModel from "../models/authSchema.js";
import jwt from "jsonwebtoken"; 
import bcrypt from "bcryptjs";

// user registration controller
const register = async (req, res) =>{
    const salt = 10
    try {
        const {name,email,password,role} = req.body;

        if(!name ||!email|| !password|| !role){
            return res.status(400).json({message:"All fields are required"});
        }

        // check if user already exists
        const existUser = await AuthModel.findOne(email)

        if(existUser){
            return res.status(400).json({message:"User already exists"});
        }
        // hash password

        const hashPassword = await bcrypt.hash(password, salt )

        // create user

        const user = new AuthModel({
            name,
            email,
            password:hashPassword,
            role
        })

        // save user to database
        await user.save();

        // generate token
        const token = jwt.sign ({id:user_id}, process.env.JWT_SECRET_KEY, {
            expiresIn:"3d"

        })
        res.cookie("token", token, {
            httpOnly:true,
            secure:true,
            sameSite:"strict",
            maxAge: 3 * 24 * 60 * 60 * 1000 // 3 days
        })

        

    } catch(error) {
        console.log(error);

    }
}

// use login controller
const login = async (req, res) =>{
    try {



    } catch(error) {
        console.log(error);
        
    }
}

// user logout controller
const logout = async (req, res) =>{
    try {
        

    } catch(error) {
        console.log(error);
        
    }
}

export{register,login,logout};