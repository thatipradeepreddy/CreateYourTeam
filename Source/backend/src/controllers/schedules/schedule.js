import { User, ScheduleData } from "../../models/userhandler.js"

function createScheduleData(request, response) {
    const { email, TeamA, TeamB, TossWonTeam, WonTeamDecided, overs, numberofPlayers, Venue, TeamACaptain, TeamBCaptain } =
        request.body

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return response.status(404).json({ msg: "User not found" })
            }

            const scheduleDetails = {
                email,
                TeamA,
                TeamB,
                TossWonTeam,
                WonTeamDecided,
                overs,
                numberofPlayers,
                Venue,
                TeamACaptain,
                TeamBCaptain,
            }

            const newSchedule = new ScheduleData(scheduleDetails)

            return newSchedule.save()
        })
        .then(() => {
            console.log("ScheduleData saved successfully")
            response.send({
                msg: "ScheduleData created successfully",
                status_code: 200,
            })
        })
        .catch((err) => {
            console.error("Error saving schedule:", err)
            response.status(500).send({ err_msg: "Unable to create schedule" })
        })
}

export { createScheduleData }
