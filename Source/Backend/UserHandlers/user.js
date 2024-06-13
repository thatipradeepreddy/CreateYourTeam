import express from 'express'
import { User } from '../Connections/database.js'
import bcrypt from 'bcrypt'

const router = express.Router()

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
						message: 'User with the provided email already exist!',
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
							})
							newUser
								.save()
								.then((result) => {
									res.json({
										status: 'SUCCESS',
										message: 'Signup successful',
										data: result,
									})
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
									'An error occured while hashing the password',
							})
						})
				}
			})
			.catch((err) => {
				console.log(err)
				res.json({
					status: 'FAILED',
					message:
						'An error occured while checking for existing user!',
				})
			})
	}
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
					const hashedPassword = data[0].password
					bcrypt
						.compare(password, hashedPassword)
						.then((result) => {
							if (result) {
								res.json({
									status: 'SUCCESS',
									message: 'Login successful',
									data: result,
								})
							} else {
								res.json({
									status: 'FAILED',
									message:
										'Invalid email or password entered!',
								})
							}
						})
						.catch((err) => {
							res.json({
								status: 'FAILED',
								message: 'Login failed',
							})
						})
				} else {
					res.json({
						status: 'FAILED',
						message: 'Invalid credintials entered!',
					})
				}
			})
			.catch((err) => {
				res.json({
					status: 'FAILED',
					message: 'An error occured while checking the user!',
				})
			})
	}
})

export default router
