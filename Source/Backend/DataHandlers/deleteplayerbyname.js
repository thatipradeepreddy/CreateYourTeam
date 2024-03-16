import { CricketersData } from '../Connections/database.js'

export const deletePlayerByName = async (request, response) => {
	const { id, name } = request.params

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

		cricketer.player.splice(playerIndex, 1)

		await cricketer.save()

		response.status(200).json({ message: 'Player deleted successfully' })
	} catch (error) {
		response.status(500).json({ error: error.message })
	}
}
