import express from "express"
import { NewUser } from "../../../Backend/src/Connections/database.js"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import nodemailer from "nodemailer"
import { v4 as uuidv4 } from "uuid"
import path from "path"
import { aunthenticateUser, createNewUser } from "./controller.js"

const loginrouter = express.Router()

loginrouter.post("/signin", async (req, res) => {
    try {
        let { email, password } = req.body
        email = email.trim()
        password = password.trim()

        if (!(email && password)) {
            throw new Error("Empty credentials supplied!")
        }

        const authenticateUser = await aunthenticateUser({ email, password })
        res.status(200).json(authenticateUser)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

export default loginrouter
