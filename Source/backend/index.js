import express from "express"
import cors from "cors"
import connectDB from "./src/config/db.js"
import userRouter from "./src/controllers/userhandler.js"
import { config } from "dotenv"
import path from "path"
import { fileURLToPath } from "url"

config()
const app = express()
app.use(cors())
app.use(express.json())
connectDB()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use("/user", userRouter)

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
