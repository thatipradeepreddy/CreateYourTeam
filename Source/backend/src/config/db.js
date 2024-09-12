import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("MongoDB connected")
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message)
        process.exit(1)
    }
}

export default connectDB
