import { CricketersData } from '../Connections/database.js';

export const deletePlayerByName = async (request, response) => {
    const { name } = request.params;

    try {
        const deletedPlayer = await CricketersData.findOneAndDelete({ name });
        if (!deletedPlayer) {
            return response.status(404).json({ message: "Player not found" });
        }
        response.status(200).json({ message: "Player deleted successfully", deletedPlayer });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};
