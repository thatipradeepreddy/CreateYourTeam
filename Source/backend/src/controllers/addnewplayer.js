import { CricketersData } from "../models/userhandler.js"

export const addNewPlayer = async (request, response) => {
    const newPlayer = {
        name: request.body.name,
        age: request.body.age,
        nation: request.body.nation,
        playerType: request.body.playerType,
        image: request.body.image,
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
    }

    const query = {
        _id: request.params.id,
        place: request.body.place,
    }

    CricketersData.findOneAndUpdate(query, { $push: { player: newPlayer } }, { new: true }, (err, data) => {
        if (!err) {
            response.status(200).json(data)
        } else {
            console.log(err)
        }
    })
}
