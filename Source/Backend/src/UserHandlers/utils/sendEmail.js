import nodemailer from 'nodemailer'

const { AUTH_EMAIL, AUTH_PASS } = process.env
let transporter = nodemailer.createTransport({
	host: 'gmail.com',
	auth: {
		user: AUTH_EMAIL,
		pass: AUTH_PASS,
	},
})

transporter.verify((error, success) => {
	if (error) {
		console.log(error)
	} else {
		console.log('Ready for message')
		console.log(success)
	}
})

export const sendEmail = async (mailOptions) => {
	try {
		await transporter.sendEmail(mailOptions)
		return
	} catch (error) {
		throw error
	}
}
