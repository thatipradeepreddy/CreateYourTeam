import { CricketersData } from "../models/userhandler.js"

export const updatePlayerByIdAndName = async (request, response) => {
	const { id, name } = request.params
	const updatedFields = request.body

	try {
		const cricketer = await CricketersData.findOne({ _id: id })

		if (!cricketer) {
			return response.status(404).json({ message: 'Cricketer not found' })
		}

		const playerIndex = cricketer.player.findIndex(
			(player) => player.name === name
		)

		if (playerIndex === -1) {
			return response.status(404).json({ message: 'Player not found' })
		}

		// Update all fields for the player
		cricketer.player[playerIndex] = {
			...cricketer.player[playerIndex],
			...updatedFields,
		}

		await cricketer.save()

		response.status(200).json({ message: 'Player updated successfully' })
	} catch (error) {
		response.status(500).json({ error: error.message })
	}
}
