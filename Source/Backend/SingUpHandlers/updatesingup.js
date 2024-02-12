import { SignUpData } from '../Connections/database.js';

function updateUserData(request, response) {
    const userData = {
        username: request.body.username,
        email: request.body.email,
        password: request.body.password,
    };

    SignUpData.findByIdAndUpdate(
        request.params.id,
        { $set: userData },
        { new: true },
        (err, data) => {
            if (!err) {
                response.status(200).json(data);
            } else {
                console.log(err);
            }
        }
    );
}
export default updateUserData;
