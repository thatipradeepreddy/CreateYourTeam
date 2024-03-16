import jwt from 'jsonwebtoken'

function jwt_token_generator(email) {
	var payload = {
		email,
	}

	const jwt_Token = jwt.sign(payload)
	return jwt_Token
}

export { jwt_token_generator }
