import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const { TOKEN_KEY, TOKEN_EXPIRY } = process.env

export const verifyToken = async (req, res, next) => {
	const token =
		req.body.token || req.query.token || req.headers['x-access-token']
	if (!token) {
		return res.status(403).send('An authentication token is required')
	}
	try {
		const decodedToken = await jwt.verify(token, TOKEN_KEY)
		req.currentUser = decodedToken
	} catch (error) {
		return res.status(401).send('Invalid token provided')
	}

	return next()
}
