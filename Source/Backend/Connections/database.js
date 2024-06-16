import {
	CricketersSchema,
	UserSchema,
	UserVerificationSchema,
	passwordResetSchema,
} from './datatypes.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('DB Connected')
	})
	.catch((err) => {
		console.error('Connection error:', err.message)
	})

const CricketersData = mongoose.model('tournamets', CricketersSchema)

const User = mongoose.model('kambalapally', UserSchema)

const UserVerification = mongoose.model('chenukada', UserVerificationSchema)

const PasswordReset = mongoose.model('passwordReset', passwordResetSchema)

export { CricketersData, User, UserVerification, PasswordReset }
