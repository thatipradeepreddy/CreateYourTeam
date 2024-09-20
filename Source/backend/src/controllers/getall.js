import { CricketersData, User } from "../models/userhandler.js"

export async function getAllData(request, response) {
    const { email } = request.query

    try {
        if (email) {
            const existingUser = await User.findOne({ email })
            if (!existingUser) {
                return response.status(404).json({ message: "User not found" })
            }
        }

        const data = await CricketersData.find()
        console.log(data, "Fetched Data")

        response.status(200).json(data)
    } catch (err) {
        console.error("Database error:", err)

        response.status(500).send("Database error")
    }
}
