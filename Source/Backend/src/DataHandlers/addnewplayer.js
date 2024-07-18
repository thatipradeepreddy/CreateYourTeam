import { CricketersData } from '../Connections/database.js'

export const addNewPlayer = async (request, response) => {
	const newPlayer = {
		name: request.body.name,
		age: request.body.age,
		nation: request.body.nation,
		ranking: request.body.ranking,
		premierLeague: request.body.premierLeague,
		image: request.body.image,
		wikipediaUrl: request.body.wikipediaUrl,
	}

	const query = {
		_id: request.params.id,
		place: request.body.place,
	}

	CricketersData.findOneAndUpdate(
		query,
		{ $push: { player: newPlayer } },
		{ new: true },
		(err, data) => {
			if (!err) {
				response.status(200).json(data)
			} else {
				console.log(err)
			}
		}
	)
}
