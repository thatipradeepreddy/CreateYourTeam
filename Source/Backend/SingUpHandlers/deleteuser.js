import { SignUpData } from '../Connections/database.js';

export const deleteUser = async (request, response) => {
  try {
    await SignUpData.deleteOne({ _id: request.params.id });

    response.status(201).json("User deleted");
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};
