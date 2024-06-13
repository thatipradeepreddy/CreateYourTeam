import mongoose from 'mongoose'

import { CricketersSchema, LoginSchema, SignUpSchema } from './datatypes.js'

mongoose.connect(
	'mongodb+srv://bablureddy47:7aksMw5qRF2HkwFt@cluster0.ekjvktq.mongodb.net/?retryWrites=true&w=majority',
	() => {
		console.log('DB connected')
	}
)

const CricketersData = mongoose.model('tournamets', CricketersSchema)

const SignUpData = mongoose.model('User', SignUpSchema)

const LoginData = mongoose.model('Loginuser', LoginSchema)

export { CricketersData, SignUpData, LoginData }
