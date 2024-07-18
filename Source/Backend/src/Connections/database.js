import {
	CricketersSchema,
	NewUserSchema,
	OTPSchema,
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

const CricketersData = mongoose.model('playersDB', CricketersSchema)

const User = mongoose.model('usersDB', UserSchema)

const NewUser = mongoose.model('newUserDB', NewUserSchema)

const UserVerification = mongoose.model('userVerificationDB', UserVerificationSchema)

const OTP = mongoose.model('OTPDB', OTPSchema)

const PasswordReset = mongoose.model('passwordResetDB', passwordResetSchema)

export { CricketersData, User, UserVerification, PasswordReset, NewUser, OTP }
