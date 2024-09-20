import mongoose from "mongoose"

const PlayerSchema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: String },
    nation: { type: String },
    playerType: { type: String },
    image: { type: String },
    totalIndividualScore: { type: Number },
    fours: { type: Number },
    sixes: { type: Number },
    highestScore: { type: Number },
    currentMatchScore: { type: Number },
    battingAverage: { type: Number },
    numberOfHundreds: { type: Number },
    numberOfFifties: { type: Number },
    manOfTheMatchAwards: { type: Number },
    currentMatchWicketsTaken: { type: Number },
    totalWicketsTaken: { type: Number },
    catchesTaken: { type: Number },
    totalOvers: { type: Number },
    totalRunOuts: { type: Number },
    fiveWicketsSpell: { type: Number },
})

const CricketersSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    place: { type: String, required: true },
    player: [PlayerSchema],
})

const ScheduleSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        TeamA: { type: String, required: true },
        TeamB: { type: String, required: true },
        TossWonTeam: { type: String, required: true },
        WonTeamDecided: { type: String, required: true },
        overs: { type: Number, required: true },
        numberofPlayers: { type: Number, required: true },
        Venue: { type: String, required: true },
        TeamACaptain: { type: String, required: true },
        TeamBCaptain: { type: String, required: true },
    },
    { timestamps: true }
)

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    verified: { type: Boolean },
})

const UserVerificationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    uniqueString: { type: String, required: true, unique: true },
    createdAt: { type: Date, required: true },
    expiresAt: { type: Date },
})

const passwordResetSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    resetString: { type: String, required: true, unique: true },
    createdAt: { type: Date, required: true },
    expiresAt: { type: Date },
})

const User = mongoose.model("userdbnew", UserSchema)

const UserVerification = mongoose.model("userpassowrdverfication", UserVerificationSchema)

const PasswordReset = mongoose.model("userpasswordreset", passwordResetSchema)

const CricketersData = mongoose.model("playerdata", CricketersSchema)

const ScheduleData = mongoose.model("scheduleData", ScheduleSchema)

export { User, UserVerification, PasswordReset, CricketersData, ScheduleData }
