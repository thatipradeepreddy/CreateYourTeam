import { verifyToken } from "../middleware/auth.js"
import express from "express"

const protectedrouter = express.Router()

protectedrouter.get("/privated_data", verifyToken, (req, res) => {
    res.status(200).send(`You are in the private territory of ${req.currentUser.email}`)
})

export default protectedrouter
