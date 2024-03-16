import { CricketersData } from '../Connections/database.js'

function getAllData(request, response) {
	CricketersData.find((err, data) => {
		if (err) {
			response.status(500).send('Database err', err)
		} else {
			response.status(200).json(data)
		}
	})
}

export { getAllData }
