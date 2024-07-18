import express from 'express'
import { NewUser } from '../Connections/database.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import nodemailer from 'nodemailer'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import { createNewUser } from './controller.js'

const signuprouter = express.Router()

signuprouter.post('/signup', async (req, res) => {
	try {
		let { name, email, password } = req.body
		name = name.trim()
		email = email.trim()
		password = password.trim()

		if (!(name && email && password)) {
			throw new Error('Empty input fields!')
		} else if (!/^[a-zA-Z]+$/.test(name)) {
			throw new Error('Invalid name entered')
		} else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
			throw Error('Invalid email entered')
		} else if (password.length < 8) {
			throw Error('Passwordis too short')
		} else {
			const newUser = await createNewUser({
				name,
				email,
				password,
			})
			res.status(200).json(newUser)
		}
	} catch (error) {
		res.status(400).send(error.message)
	}
})

export default signuprouter
