import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

const { TOKEN_KEY, TOKEN_EXPIRY } = process.env

export const createToken = async (
	tokenData,
	tokenKey = TOKEN_KEY,
	expiresIn = TOKEN_EXPIRY
) => {
	try {
		const token = await jwt.sign(tokenData, tokenKey, {
			expiresIn,
		})
		return token
	} catch (error) {
		throw error
	}
}
