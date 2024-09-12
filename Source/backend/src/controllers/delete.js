import { CricketersData } from "../models/userhandler.js"

export const deleteData = async (request, response) => {
    try {
        await CricketersData.deleteOne({ _id: request.params.id })

        response.status(201).json("Cricketer deleted")
    } catch (error) {
        response.status(409).json({ message: error.message })
    }
}
