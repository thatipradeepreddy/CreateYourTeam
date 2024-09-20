import { CricketersData } from "../models/userhandler.js"

function updateData(request, response) {
    const cricketerData = {
        email: request.body.email,
        place: request.body.place,
        player: request.body.player.map((player) => ({
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

    CricketersData.findByIdAndUpdate(request.params.id, { $set: cricketerData }, { new: true }, (err, data) => {
        if (!err) {
            response.status(200).json(data)
        } else {
            console.log(err)
        }
    })
}
export default updateData
