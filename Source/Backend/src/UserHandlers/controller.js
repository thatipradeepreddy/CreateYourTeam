import { NewUser, OTP } from '../Connections/database.js'
import { hashData, verifyHashedData } from './utils/hashdata.js'
import { generateOTP } from './utils/otpgenerate.js'
import { sendEmail } from './utils/sendEmail.js'
import { createToken } from './utils/tokengen.js'

export const aunthenticateUser = async (data) => {
	try {
		const { email, password } = data
		const fetchedUser = await NewUser.findOne({ email })
		if (!fetchedUser) {
			throw Error('Invalid credentials supplied!')
		}
		const hashedPassword = fetchedUser.password
		const passwordMatch = await verifyHashedData(password, hashedPassword)
		if (!passwordMatch) {
			throw Error('Invalid credentials supplied!')
		}

		const tokenData = { userId: fetchedUser._id, email }
		const token = await createToken(tokenData)
		fetchedUser.token = token
		return fetchedUser
	} catch (error) {
		throw error
	}
}

export const createNewUser = async (data) => {
	try {
		const { name, email, password } = data
		const eixstingUser = await NewUser.findOne({ email })

		if (eixstingUser) {
			throw Error('User with the provided email already exists')
		}
		const hashedPassword = await hashData(password)
		const newUser = new NewUser({
			name,
			email,
			password: hashedPassword,
		})
		const createdUser = await newUser.save()
		return createdUser
	} catch (error) {
		throw error
	}
}

const { AUTH_EMAIL, AUTH_PASS } = process.env

export const sendOTP = async ({ email, subject, message, duration = 1 }) => {
	try {
		if (!(email && subject && message)) {
			throw Error('Provide values for email, subject, message')
		}

		await OTP.deleteOne({ email })

		const generatedOTP = await generateOTP()
		const mailOptions = {
			from: AUTH_EMAIL,
			to: email,
			subject,
			html: `
            <p>${message}</p><p style = "color: tomato; font-size: 25px; letter-spacing:2px;"><b>${generatedOTP}</b></p>
            <p> This code <b>expires in ${duration} minute(s)</b></p>
            `,
		}
		await sendEmail(mailOptions)

		const hashedOTP = await hashData(generateOTP)
		const newOTP = await new OTP({
			email,
			otp: hashedOTP,
			createdAt: Date.now(),
			expiresAt: Date.now() + 15000 * +duration,
		})

		const createdOTPRecord = await newOTP.save()
		return createdOTPRecord
	} catch (error) {
		throw error
	}
}
