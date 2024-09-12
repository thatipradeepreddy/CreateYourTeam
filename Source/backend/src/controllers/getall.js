import { CricketersData } from "../models/userhandler.js"

export async function getAllData(request, response) {
    try {
        const data = await CricketersData.find()
        console.log(data, "Fetched Data")
        response.status(200).json(data)
    } catch (err) {
        console.error("Database error:", err)
        response.status(500).send("Database error")
    }
}
