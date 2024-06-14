import express from 'express'
import { User, UserVerification } from '../Connections/database.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

dotenv.config()

const router = express.Router()

// Configure the email transporter
let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.AUTH_EMAIL,
		pass: process.env.AUTH_PASS,
	},
})

transporter.verify((error, success) => {
	if (error) {
		console.log(error)
	} else {
		console.log('Ready for messages')
		console.log(success)
	}
})

router.post('/signup', (req, res) => {
	let { name, email, password } = req.body
	name = name.trim()
	email = email.trim()
	password = password.trim()

	if (name === '' || email === '' || password === '') {
		res.json({
			status: 'FAILED',
			message: 'Empty input fields!',
		})
	} else if (!/^[a-zA-Z ]*$/.test(name)) {
		res.json({
			status: 'FAILED',
			message: 'Invalid name entered',
		})
	} else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
		res.json({
			status: 'FAILED',
			message: 'Invalid email entered',
		})
	} else if (password.length < 8) {
		res.json({
			status: 'FAILED',
			message: 'Password is too short!',
		})
	} else {
		User.find({ email })
			.then((result) => {
				if (result.length) {
					res.json({
						status: 'FAILED',
						message: 'User with the provided email already exists!',
					})
				} else {
					const saltRounds = 10
					bcrypt
						.hash(password, saltRounds)
						.then((hashedPassword) => {
							const newUser = new User({
								name,
								email,
								password: hashedPassword,
								verified: false,
							})
							newUser
								.save()
								.then((result) => {
									sendVerificationEmail(result, res)
								})
								.catch((err) => {
									res.json({
										status: 'FAILED',
										message: 'Signup failed',
									})
								})
						})
						.catch((err) => {
							res.json({
								status: 'FAILED',
								message:
									'An error occurred while hashing the password',
							})
						})
				}
			})
			.catch((err) => {
				console.log(err)
				res.json({
					status: 'FAILED',
					message:
						'An error occurred while checking for existing user!',
				})
			})
	}
})

const sendVerificationEmail = ({ _id, email }, res) => {
	const currentUrl = 'http://192.168.68.69:5000/'
	const uniqueString = uuidv4() + _id
	const mailOptions = {
		from: process.env.AUTH_EMAIL,
		to: email,
		subject: 'Verify Your Email!',
		html: `<p>Verify your email address to complete the signup process.</p>
           <p>This link <b>expires in 6 hours</b>.</p>
           <p>Press <a href="${currentUrl}user/verify/${_id}/${uniqueString}">here</a> to verify your email.</p>`,
	}
	const saltRounds = 10
	bcrypt
		.hash(uniqueString, saltRounds)
		.then((hashedUniqueString) => {
			const newVerification = new UserVerification({
				userId: _id,
				uniqueString: hashedUniqueString,
				createdAt: Date.now(),
				expiresAt: Date.now() + 21600000,
			})
			newVerification
				.save()
				.then(() => {
					transporter
						.sendMail(mailOptions)
						.then(() => {
							res.json({
								status: 'PENDING',
								message: 'Verification email sent',
							})
						})
						.catch((error) => {
							console.log(error)
							res.json({
								status: 'FAILED',
								message: 'Verification email failed',
							})
						})
				})
				.catch((error) => {
					console.log(error)
					res.json({
						status: 'FAILED',
						message: "Couldn't save verification email data",
					})
				})
		})
		.catch(() => {
			res.json({
				status: 'FAILED',
				message: 'An error occurred while hashing the unique string',
			})
		})
}

router.get('/verify/:userId/:uniqueString', (req, res) => {
	let { userId, uniqueString } = req.params
	UserVerification.find({ userId })
		.then((result) => {
			if (result.length > 0) {
				const { expiresAt } = result[0]
				const hashedUniqueString = result[0].uniqueString
				if (expiresAt < Date.now()) {
					UserVerification.deleteOne({ userId })
						.then(() => {
							User.deleteOne({ _id: userId })
								.then(() => {
									let message =
										'Link has expired, please sign up again!'
									res.redirect(
										`/user/verified/error=true&message=${message}`
									)
								})
								.catch((error) => {
									let message =
										'Clearing user with expired unique string failed'
									res.redirect(
										`/user/verified/error=true&message=${message}`
									)
								})
						})
						.catch((error) => {
							console.log(error)
							let message =
								'An error occurred while clearing the expired user record'
							res.redirect(
								`/user/verified/error=true&message=${message}`
							)
						})
				} else {
					bcrypt
						.compare(uniqueString, hashedUniqueString)
						.then((result) => {
							if (result) {
								User.updateOne(
									{ _id: userId },
									{ verified: true }
								)
									.then(() => {
										UserVerification.deleteOne({ userId })
											.then(() => {
												res.sendFile(
													path.join(
														__dirname,
														'verified.html'
													)
												) // Make sure you have this file
											})
											.catch((error) => {
												console.log(error)
											})
									})
									.catch((error) => {
										console.log(error)
									})
							} else {
								let message =
									'Invalid verification details passed, please check your inbox'
								res.redirect(
									`/user/verified/error=true&message=${message}`
								)
							}
						})
						.catch((error) => {
							let message =
								'An error occurred while comparing the unique strings'
							res.redirect(
								`/user/verified/error=true&message=${message}`
							)
						})
				}
			} else {
				let message =
					'Account does not exist or has been verified already, please sign up or log in'
				res.redirect(`/user/verified/error=true&message=${message}`)
			}
		})
		.catch((error) => {
			console.log(error)
			let message =
				'An error occurred while checking for existing user verification'
			res.redirect(`/user/verified/error=true&message=${message}`)
		})
})

router.get('/verified', (req, res) => {
	res.sendFile(path.join(__dirname, 'verified.html')) // Ensure this path is correct and the file exists
})

router.post('/signin', (req, res) => {
	let { email, password } = req.body
	email = email.trim()
	password = password.trim()
	if (email == '' || password == '') {
		res.json({
			status: 'FAILED',
			message: 'Empty credentials supplied!',
		})
	} else {
		User.find({ email })
			.then((data) => {
				if (data.length) {
					if (!data[0].verified) {
						res.json({
							status: 'FAILED',
							message:
								'Email has not been verified, please check your inbox',
						})
					} else {
						const hashedPassword = data[0].password
						bcrypt
							.compare(password, hashedPassword)
							.then((result) => {
								if (result) {
									res.json({
										status: 'SUCCESS',
										message: 'Login successful',
										data: data[0],
									})
								} else {
									res.json({
										status: 'FAILED',
										message: 'Invalid password entered!',
									})
								}
							})
							.catch((err) => {
								res.json({
									status: 'FAILED',
									message:
										'An error occurred while comparing the passwords',
								})
							})
					}
				} else {
					res.json({
						status: 'FAILED',
						message: 'Invalid credentials entered!',
					})
				}
			})
			.catch((err) => {
				res.json({
					status: 'FAILED',
					message: 'An error occurred while checking the user!',
				})
			})
	}
})

export default router
