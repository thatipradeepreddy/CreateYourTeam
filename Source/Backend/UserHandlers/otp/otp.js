import express from 'express'
import { sendOTP } from '../controller.js'

const otprouter = express.Router()

otprouter.post('/', async (req, res) => {
	try {
		const { email, subject, message, duration } = req.body
		const createdOTP = await sendOTP({
			email,
			subject,
			message,
			duration,
		})
		res.status.json(createdOTP)
	} catch (error) {
		res.status(400).send(error.message)
	}
})

export default otprouter
