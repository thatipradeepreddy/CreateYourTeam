import bcrypt from 'bcrypt'
import { SignUpData } from '../Connections/database.js'
import { jwt_token_generator } from './token.js'

function loginUser(email, password, response) {
	SignUpData.findOne({ email }, (err, dataObj) => {
		if (err) {
			response
				.status(406)
				.send({ status_message: 'Error in finding user by emp_id' })
		} else {
			if (dataObj == null) {
				response
					.status(404)
					.send({
						status_message:
							'No user with this ' + email + ' exists.',
					})
			} else {
				const hashed_password = dataObj.password

				bcrypt.compare(password, hashed_password, (err, res) => {
					if (err) {
						response
							.status(500)
							.send({ error: 'Internal server error' })
					} else {
						if (!res) {
							response
								.status(404)
								.send({
									err: 'Username and password do not match',
								})
						} else {
							const jwt_token = jwt_token_generator(dataObj.email)
							response.send({
								msg: 'Login successful',
								jwt_token,
							})
						}
					}
				})
			}
		}
	})
}

export { loginUser }
