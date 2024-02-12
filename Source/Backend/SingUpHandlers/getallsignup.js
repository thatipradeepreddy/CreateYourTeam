import { SignUpData } from '../Connections/database.js';

function getAllUsersData(request, response) {
    SignUpData.find(
        (err, data) => {
            if (err) {
                response.status(500).send("Database err", err);
            } else {
                response.status(200).json(data);
            }
        }
    );
}

export { getAllUsersData };