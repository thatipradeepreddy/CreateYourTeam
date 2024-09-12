import { CricketersData } from "../models/userhandler.js"

function createData(request, response) {
    const { place, player } = request.body

    const cricketersDetails = {
        place,
        player: player.map((player) => ({
            name: player.name,
            age: player.age,
            nation: player.nation,
            ranking: player.ranking,
            premierLeague: player.premierLeague,
            image: player.image,
            wikipediaUrl: player.wikipediaUrl,
        })),
    }

    const CreateCricketersData = new CricketersData(cricketersDetails)

    CreateCricketersData.save()
        .then(() => {
            console.log("Data saved successfully")
            response.send({
                msg: "Data registered successfully",
                status_code: 200,
            })
        })
        .catch((err) => {
            console.error("Error saving data:", err)
            response.status(500).send({ err_msg: "Unable to add data" })
        })
}

export { createData }
