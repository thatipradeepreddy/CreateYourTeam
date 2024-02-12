import { SignUpData } from '../Connections/database.js';

function createUserData(request, response) {
    const {
        username,
        email,
        password,
    } = request.body;

    const signupDetails = {
        username,
        email,
        password,
    };

    const CreateSignupData = new SignUpData(signupDetails);

    CreateSignupData.save()
        .then(() => {
            console.log("Registered user successfully");
            response.send({ msg: "User registered successfully", status_code: 200 });
        })
        .catch((err) => {
            console.error('Schema validation error:', err.errors);
            response.send({ err_msg: 'Unable to add user' });
        });

}

export { createUserData };
