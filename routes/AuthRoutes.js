import {register, login } from "../controller/Auth.js";
import express from "express";
const AuthRoutes = express.Router()

// user regitration route
AuthRoutes.post("/register",register )

export default AuthRoutes;