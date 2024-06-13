import mongoose from 'mongoose'

const PlayerSchema = mongoose.Schema({
	name: { type: String, required: true },
	age: { type: String, required: true },
	nation: { type: String, required: true },
	ranking: { type: String, required: true },
	premierLeague: { type: String, required: true },
	image: { type: String, required: true },
	wikipediaUrl: { type: String, required: true },
})

const CricketersSchema = mongoose.Schema({
	place: { type: String, required: true },
	player: [PlayerSchema],
})

const UserSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
})

export { CricketersSchema, UserSchema }
