import jsonwebtoken from "jsonwebtoken"
import User from "../models/User.js"

const { verify } = jsonwebtoken

export async function protect(req, res, next) {
    const token = req.header("Authorization")?.replace("Bearer ", "")
    if (!token) return res.status(401).json({ message: "No token, authorization denied" })

    try {
        const decoded = verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select("-password")
        next()
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" })
    }
}
