import { CricketersData } from '../Connections/database.js';

export const getDataById = async (request, response) => {
  try {
    const product = await CricketersData.findById(request.params.id);
    response.status(209).json(product);
  } catch (error) {
    response.status(404).json({ message: error.message })
  }
}

