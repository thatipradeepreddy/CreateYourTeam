import jwt from "jsonwebtoken";

function jwt_token_generator(email) {
    var payload = {
        email,
    };

    const jwt_Token = jwt.sign(payload);
    return jwt_Token;
}

// function jwt_validator_helper(req, res, next, array_of_roles) {

//     let authorization_header = req.header("authorization");
//     if (typeof authorization_header != 'string') {
//         res.status(401).send({ err: "JWT Token is required" });
//     } else {
//         if (authorization_header.split(' ').length != 2) {
//             res.status(401).send({ err: "Token is of invalid format!" })
//         } else {
//             let jwt_token = authorization_header.split(" ")[1];
//             if (jwt_token) {
//                 jwt.verify(jwt_token, process.env.SECRET_KEY, (error, payload) => {
//                     if (error) {
//                         res.status(401).send("Invalid Jwt Token " + error);
//                     }
//                     else {
//                         if (array_of_roles.includes(payload.role)) {
//                             req.email = payload.email;
//                             req.role = payload.role;
//                             next();
//                         } else {
//                             res.status(401).send("Unauthorized role: your role is " + payload.role);
//                         }
//                     }
//                 });
//             } else {
//                 res.status(401).send("Invalid Jwt Token");
//             }
//         }
//     }
// }

export { jwt_token_generator };