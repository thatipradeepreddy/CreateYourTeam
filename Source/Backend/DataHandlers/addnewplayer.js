import { CricketersData } from "../Connections/database.js";


export function addNewPlayer(req, res) {
    const { _id, place } = req.params;
    const { name, age, nation, ranking, premierLeague, image, wikipediaUrl } = req.body;

    CricketersData.findById(_id).then(cricketer => {
        if (!cricketer) {
            return res.status(404).json({ message: "Cricketer not found" });
        }

        if (cricketer.place !== place) {
            return res.status(400).json({ message: "Invalid place for the cricketer" });
        }

        const newPlayer = {
            name,
            age,
            nation,
            ranking,
            premierLeague,
            image,
            wikipediaUrl,
        };

        cricketer.players.push(newPlayer);

        cricketer.save().then(savedCricketer => {
            res.status(201).json({ message: "Player added successfully", cricketer: savedCricketer });
        }).catch(error => {
            console.error("Error saving cricketer:", error);
            res.status(500).json({ message: "Server error" });
        });
    }).catch(error => {
        console.error("Error finding cricketer:", error);
        res.status(500).json({ message: "Server error" });
    });
}
