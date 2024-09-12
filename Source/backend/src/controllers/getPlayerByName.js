import { CricketersData } from "../models/userhandler.js"

export const getPlayerByIdAndName = async (request, response) => {
    const { id, name } = request.params

    try {
        const cricketer = await CricketersData.findOne({
            _id: id,
            "player.name": name,
        })

        if (!cricketer) {
            return response.status(404).json({ message: "Cricketer or player not found" })
        }

        const player = cricketer.player.find((player) => player.name === name)

        if (!player) {
            return response.status(404).json({ message: "Player not found" })
        }

        response.status(200).json(player)
    } catch (error) {
        response.status(500).json({ error: error.message })
    }
}
