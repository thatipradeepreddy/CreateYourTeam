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
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	verified: { type: Boolean },
})

const NewUserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	token: { type: String },
})

const UserVerificationSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	otp: { type: String},
	createdAt: { type: Date, required: true },
	expiresAt: { type: Date },
})

const OTPSchema = new mongoose.Schema({
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

export {
	CricketersSchema,
	UserSchema,
	UserVerificationSchema,
	passwordResetSchema,
	NewUserSchema,
	OTPSchema,
}
