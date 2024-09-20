import { CricketersData, User } from "../models/userhandler.js"

function createData(request, response) {
    const { email, place, player } = request.body

    User.findOne({ email })
        .then((existingUser) => {
            if (!existingUser) {
                return response.status(404).send({ err_msg: "User not found" })
            }

            const cricketersDetails = {
                email,
                place,
                player: player.map((player) => ({
                    name: player.name,
                    age: player.age,
                    nation: player.nation,
                    playerType: player.playerType,
                    image: player.image,
                    totalIndividualScore: player.totalIndividualScore,
                    fours: player.fours,
                    sixes: player.sixes,
                    highestScore: player.highestScore,
                    currentMatchScore: player.currentMatchScore,
                    battingAverage: player.battingAverage,
                    numberOfHundreds: player.numberOfHundreds,
                    numberOfFifties: player.numberOfFifties,
                    manOfTheMatchAwards: player.manOfTheMatchAwards,
                    currentMatchWicketsTaken: player.currentMatchWicketsTaken,
                    totalWicketsTaken: player.totalWicketsTaken,
                    catchesTaken: player.catchesTaken,
                    totalOvers: player.totalOvers,
                    totalRunOuts: player.totalRunOuts,
                    fiveWicketsSpell: player.fiveWicketsSpell,
                })),
            }

            const CreateCricketersData = new CricketersData(cricketersDetails)

            return CreateCricketersData.save()
        })
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
