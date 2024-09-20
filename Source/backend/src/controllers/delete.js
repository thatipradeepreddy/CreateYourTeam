import { CricketersData, User } from "../models/userhandler.js"

export const deleteData = async (request, response) => {
    const { email } = request.body

    try {
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return response.status(404).json({ message: "User not found" })
        }

        const result = await CricketersData.deleteOne({ _id: request.params.id })

        if (result.deletedCount === 0) {
            return response.status(404).json({ message: "Cricketer not found" })
        }

        response.status(200).json("Cricketer deleted")
    } catch (error) {
        response.status(409).json({ message: error.message })
    }
}
