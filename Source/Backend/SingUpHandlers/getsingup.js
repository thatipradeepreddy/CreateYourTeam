import { SignUpData } from '../Connections/database.js';

export const getUserById = async (request, response) => {
    try {
        const user = await SignUpData.findById(request.params.id);
        response.status(209).json(user);
    } catch (error) {
        response.status(404).json({ message: error.message })
    }
}

