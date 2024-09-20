import { CricketersData, User } from "../models/userhandler.js"

export const getDataById = async (request, response) => {
    const { email } = request.query
    const { id } = request.params

    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return response.status(404).json({ message: "User not found" })
        }

        const cricketer = await CricketersData.findById(id)
        if (!cricketer) {
            return response.status(404).json({ message: "Cricketer not found" })
        }

        response.status(200).json(cricketer)
    } catch (error) {
        response.status(500).json({ message: error.message })
    }
}
